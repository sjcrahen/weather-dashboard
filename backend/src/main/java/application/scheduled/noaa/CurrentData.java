package application.scheduled.noaa;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CurrentData {

    CurrentPredictions current_predictions;

}
