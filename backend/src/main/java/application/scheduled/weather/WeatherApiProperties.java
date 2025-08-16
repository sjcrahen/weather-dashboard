package application.scheduled.weather;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "api.weather")
public class WeatherApiProperties {

    private String baseUrl;
    private String key;

}
