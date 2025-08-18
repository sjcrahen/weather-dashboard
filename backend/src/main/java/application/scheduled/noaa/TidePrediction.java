package application.scheduled.noaa;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TidePrediction {

    private LocalDateTime dateTime;
    @JsonProperty("t")
    private String time;
    @JsonProperty("v")
    private String height;
    private String type;
}
