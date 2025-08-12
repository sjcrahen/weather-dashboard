package application.scheduled.ndbc;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class WindObservation extends NdbcObservation {

    private String windDirection;
    private String direction;
    private int windSpeed;
    private int windGust;
}
