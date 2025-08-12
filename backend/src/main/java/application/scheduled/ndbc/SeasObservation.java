package application.scheduled.ndbc;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SeasObservation extends NdbcObservation {

    private String waveHeight;
    private String dominantPeriod;
    private String waveDirection;
    private String direction;
}
