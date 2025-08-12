package application.scheduled.ndbc;

import application.datasource.DataSourceType;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public abstract class NdbcObservation {

    private ZonedDateTime dateTime;
    private String dateTimeString;
    private boolean expired;
    private DataSourceType type;
}
