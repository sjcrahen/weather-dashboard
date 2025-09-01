package application.scheduled.noaa;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CurrentPrediction {

    @JsonProperty("Type")
    String type;

    @JsonProperty("Time")
    String time;

    @JsonProperty("Velocity_Major")
    String velocity;

    int meanFloodDir;
    int meanEbbDir;
}
