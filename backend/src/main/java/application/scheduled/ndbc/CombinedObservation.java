package application.scheduled.ndbc;

import lombok.Data;

@Data
public class CombinedObservation {

    private SeasObservation seasObservation;
    private WindObservation windObservation;
}
