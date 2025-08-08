package application.station;

import application.annotations.Slugify;
import application.annotations.Trim;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class StationForm {

    @Trim
    @NotEmpty
    private String name;

    @Slugify
    private String slug;

    private List<Integer> dataSourceIds;

    @Trim
    @NotEmpty
    private String city;

    @Trim
    @NotEmpty
    private String state;

    @NotEmpty
    private double latitude;

    @NotEmpty
    private double longitude;

    @Trim
    @NotEmpty
    private String timezone;

    public StationEntity formToEntity() {
        return formToEntity(null);
    }

    private StationEntity formToEntity(StationEntity stationEntity) {
        if (stationEntity == null) {
            stationEntity = new StationEntity();
        }
        stationEntity.setName(name);
        stationEntity.setSlug(slug);
        stationEntity.setCity(city);
        stationEntity.setState(state);
        stationEntity.setLatitude(latitude);
        stationEntity.setLongitude(longitude);
        stationEntity.setTimezone(timezone);
        return stationEntity;
    }

    public StationEntity applyFormToEntity(StationEntity stationEntity) {
        return formToEntity(stationEntity);
    }
}
