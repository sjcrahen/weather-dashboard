package application.scheduled.weather;

import application.datasource.DataSourceEntity;
import application.datasource.DataSourceService;
import application.datasource.DataSourceType;
import application.scheduled.Cache;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@AllArgsConstructor
public class WeatherService {

    private RestTemplate restTemplate;
    private DataSourceService dataSourceService;
    private WeatherApiProperties apiProperties;


    @Scheduled(fixedRate = 420_000)
    public void updateWeatherDataSources() {
        List<DataSourceEntity> dataSources = dataSourceService.getByType(DataSourceType.WEATHER);
        for (DataSourceEntity ds : dataSources) {
            WeatherData weather = restTemplate.getForObject(String.format("%s%s&q=%s&aqi=no", apiProperties.getBaseUrl(), apiProperties.getKey(), ds.getSourceIdentifier()), WeatherData.class);
            if (weather == null) continue;
            Cache.SNAPSHOTS.put(ds.getId(), weather);
        }
    }

}
