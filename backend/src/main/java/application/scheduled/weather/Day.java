package application.scheduled.weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Day {

    private int maxtemp_f;
    private int mintemp_f;
    private int maxwind_mph;
    private Condition condition;
    private int daily_chance_of_rain;
    private int daily_chance_of_snow;
    private int chance_of_precip;
}
