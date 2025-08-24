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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class TideService {

    private final RestTemplate restTemplate;
    private DataSourceService dataSourceService;
    private static final String BASE_URL = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?range=48&interval=hilo&product=predictions&datum=mllw&units=english&time_zone=lst_ldt&format=json&station=";

    @Scheduled(fixedRate = 21_600_000)
    public void updateTideDataSources() {
        List<DataSourceEntity> dataSources = dataSourceService.getByType(DataSourceType.TIDE);
        String yesterday = LocalDateTime.now().minusHours(6).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        for (DataSourceEntity ds : dataSources) {
            try {
                TideData tideData = restTemplate.getForObject(String.format("%s%s&begin_date=%s", BASE_URL, ds.getSourceIdentifier(), yesterday), TideData.class);
                if (tideData == null) continue;
                Cache.SNAPSHOTS.put(ds.getId(), tideData);
            } catch (RestClientException ex) {
                log.info("Tide data source not found: {}", ds.getSourceIdentifier(), ex);
            }
        }
    }

}
