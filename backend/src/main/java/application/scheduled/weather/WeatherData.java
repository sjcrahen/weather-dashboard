package application.scheduled.weather;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WeatherData {

    @JsonProperty("current")
    private CurrentWeather currentWeather;
    private Forecast forecast;
}
