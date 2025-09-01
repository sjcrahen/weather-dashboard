package application.scheduled.noaa;

import application.datasource.DataSourceEntity;
import application.datasource.DataSourceService;
import application.datasource.DataSourceType;
import application.scheduled.Cache;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class CurrentService {

    private final RestTemplate restTemplate;
    private DataSourceService dataSourceService;
    private static final String BASE_URL = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=currents_predictions&format=json&time_zone=LST_LDT&units=english&datum=MLLW&range=60&interval=MAX_SLACK&station=";

    @Scheduled(fixedRate = 21_600_000)
    public void updateCurrentDataSources() {
        List<DataSourceEntity> dataSources = dataSourceService.getByType(DataSourceType.CURRENT);
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        for (DataSourceEntity ds : dataSources) {
            try {
                CurrentData currentData = restTemplate.getForObject(String.format("%s%s&begin_date=%s", BASE_URL, ds.getSourceIdentifier(), today), CurrentData.class);
                if (currentData == null) continue;
                Cache.SNAPSHOTS.put(ds.getId(), currentData);
            } catch (RestClientException ex) {
                log.info("Current data source not found: {}", ds.getSourceIdentifier(), ex);
            }
        }
    }

}
