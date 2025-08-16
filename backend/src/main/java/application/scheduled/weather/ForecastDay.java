package application.scheduled.weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ForecastDay {

    private String date;
    private Day day;
    private Astro astro;
}
