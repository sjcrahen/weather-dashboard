package application.scheduled.noaa;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CurrentPredictions {

    String units;
    List<CurrentPrediction> cp;

}
