package application.scheduled.weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CurrentWeather {

    private int temp_f;
    private Condition condition;
    private int wind_mph;
    private String wind_dir;
    private int gust_mph;
    private int feelslike_f;
    private String last_updated;
    private int pressure_mb;
    private int humidity;
}
