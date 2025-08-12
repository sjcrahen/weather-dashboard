package application.scheduled.ndbc;

import application.datasource.DataSourceEntity;
import application.datasource.DataSourceService;
import application.datasource.DataSourceType;
import application.scheduled.Cache;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class NdbcService {

    private DataSourceService dataSourceService;
    public static final String BASE_URL = "https://www.ndbc.noaa.gov/data/realtime2/";

    @Scheduled(fixedRate = 180_000)
    public void updateNdbcDataSources() {
        List<DataSourceEntity> dataSources = dataSourceService.getByTypesIn(List.of(DataSourceType.SEAS, DataSourceType.WIND));
        Map<String, List<DataSourceEntity>> sourceIdMap = dataSources.stream()
                .collect(Collectors.groupingBy(DataSourceEntity::getSourceIdentifier, Collectors.toList()));

        for (var entry : sourceIdMap.entrySet()) {
            if (entry.getValue().size() > 1) {
                CombinedObservation observation = getCombinedObservation(entry.getValue().get(0));
                entry.getValue().forEach(ds -> Cache.SNAPSHOTS.put(ds.getId(), ds.getType().equals(DataSourceType.SEAS) ? observation.getSeasObservation() : observation.getWindObservation()));
            } else {
                DataSourceEntity ds = entry.getValue().iterator().next();
                if (DataSourceType.SEAS.equals(ds.getType())) {
                    SeasObservation seasObservation = getSeasObservation(ds);
                    if (seasObservation == null) continue;
                    Cache.SNAPSHOTS.put(ds.getId(), seasObservation);
                } else {
                    WindObservation windObservation = getWindObservation(ds);
                    if (windObservation == null) continue;
                    Cache.SNAPSHOTS.put(ds.getId(), windObservation);
                }
            }
        }
    }

    private CombinedObservation getCombinedObservation(DataSourceEntity ds) {
        CombinedObservation ob = new CombinedObservation();
        String sourceId = ds.getSourceIdentifier();
        String url = String.format("%s%s.txt", BASE_URL, sourceId);
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new URL(url).openStream()))) {
            for (int n = 2; n < 8; n++) {
                String line = br.readLine();
                String[] data = line.split("\\s+");
                if (ob.getSeasObservation() == null && !data[9].equals("MM"))
                    ob.setSeasObservation(parseSeasObservation(data));
                if (ob.getWindObservation() == null && !data[6].equals("MM"))
                    ob.setWindObservation(parseWindObservation(data));
                if (ob.getSeasObservation() != null && ob.getWindObservation() != null)
                    break;
            }
        } catch (IOException ex) {
            log.warn(ex.getMessage(), ex);
        }
        return ob;
    }

    private SeasObservation getSeasObservation(DataSourceEntity ds) {
        SeasObservation ob = null;
        String sourceId = ds.getSourceIdentifier();
        String url = String.format("%s%s.txt", BASE_URL, sourceId);
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new URL(url).openStream()))) {
            for (int n = 2; n < 8; n++) {
                String line = br.readLine();
                String[] data = line.split("\\s+");
                if (!data[9].equals("MM"))
                    ob = parseSeasObservation(data);
                if (ob != null) break;
            }
        } catch (IOException ex) {
            log.warn(ex.getMessage(), ex);
        }
        return ob;
    }

    private WindObservation getWindObservation(DataSourceEntity ds) {
        WindObservation ob = null;
        String sourceId = ds.getSourceIdentifier();
        String url = String.format("%s%s.txt", BASE_URL, sourceId);
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new URL(url).openStream()))) {
            for (int n = 2; n < 8; n++) {
                String line = br.readLine();
                String[] data = line.split("\\s+");
                if (!data[6].equals("MM"))
                    ob = parseWindObservation(data);
                if (ob != null) break;
            }
        } catch (IOException ex) {
            log.warn(ex.getMessage(), ex);
        }
        return ob;
    }

    private SeasObservation parseSeasObservation(String[] data) {
        if (data == null || data.length < 12) return null;
        SeasObservation ob = new SeasObservation();
        try {
            double wh = Double.parseDouble(data[8]) * 3.28084;
            ob.setWaveHeight(String.format("%.1f", wh));
        } catch (NumberFormatException ex) {
            return null;
        }
        ob.setType(DataSourceType.SEAS);
        ob.setDominantPeriod(data[9]);
        try {
            long dir = Math.round(Double.parseDouble(data[11]) / 5) * 5;
            ob.setWaveDirection(String.valueOf(dir));
            ob.setDirection(String.valueOf(dir)); // TODO: why this redundancy?
        } catch (NumberFormatException ex) {
            ob.setWaveDirection(null);
            ob.setDirection(null);
        }
        setZuluTime(ob, data);
        setExpired(ob);

        return ob;
    }

    private WindObservation parseWindObservation(String[] data) {
        if (data == null || data.length < 8) return null;
        WindObservation ob = new WindObservation();
        try {
            double windSpeed = Double.parseDouble(data[6]);
            if (windSpeed >= 0) ob.setWindSpeed((int) Math.round(windSpeed * 1.94384));
            else ob.setWindSpeed(-1);
        } catch (NumberFormatException ex) {
            return null;
        }
        ob.setType(DataSourceType.WIND);
        try {
            double windGust = Double.parseDouble(data[7]);
            if (windGust >= 0) ob.setWindSpeed((int) Math.round(windGust * 1.94384));
            else ob.setWindGust(-1);
        } catch (NumberFormatException ex) {
            ob.setWindGust(-1);
        }
        try {
            long dir = Math.round(Double.parseDouble(data[5]) / 5) * 5;
            ob.setWindDirection(String.format("%3d", dir).replace(' ', '0'));
            ob.setDirection(String.valueOf(dir)); // TODO: why this redundancy?
        } catch (NumberFormatException ex) {
            ob.setWindDirection(null);
            ob.setDirection(null);
        }
        setZuluTime(ob, data);
        setExpired(ob);

        return ob;
    }

    private void setZuluTime(NdbcObservation ob, String[] data) {
        int year = Integer.parseInt(data[0]);
        int month = Integer.parseInt(data[1]);
        int day = Integer.parseInt(data[2]);
        int hour = Integer.parseInt(data[3]);
        int minute = Integer.parseInt(data[4]);
        ZonedDateTime zuluTime = ZonedDateTime.of(LocalDateTime.of(year, month, day, hour, minute), ZoneId.of("Z"));
        ob.setDateTime(zuluTime);
        ob.setDateTimeString(zuluTime.format(DateTimeFormatter.ofPattern("HH:mm")));
    }

    private void setExpired(NdbcObservation ob) {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Z"));
        ob.setExpired(now.minusHours(4).compareTo(ob.getDateTime()) > 0);
    }
}
