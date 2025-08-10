package application.station;

import application.annotations.Slugify;
import application.annotations.Trim;
import application.datasource.DataSourceEntity;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.List;

@Data
public class StationForm {

    @Trim
    @NotEmpty
    private String name;

    @Slugify
    private String slug;

    @Trim
    @NotEmpty
    private String city;

    @Trim
    @NotEmpty
    private String state;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @Trim
    @NotEmpty
    private String timezone;

    private List<DataSourceEntity> dataSources;

    private List<ObjectError> errors;

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

    public static StationForm entityToForm(StationEntity stationEntity) {
        return entityToForm(stationEntity, null);
    }

    public static StationForm entityToForm(StationEntity stationEntity, BindingResult bindingResult) {
        StationForm stationForm = new StationForm();
        if (stationEntity == null) return stationForm;
        stationForm.setName(stationEntity.getName());
        stationForm.setSlug(stationEntity.getSlug());
        stationForm.setCity(stationEntity.getCity());
        stationForm.setState(stationEntity.getState());
        stationForm.setLatitude(stationEntity.getLatitude());
        stationForm.setLongitude(stationEntity.getLongitude());
        stationForm.setTimezone(stationEntity.getTimezone());
        stationForm.setDataSources(stationEntity.getDataSources());
        if (bindingResult != null && bindingResult.hasErrors()) {
            stationForm.setErrors(bindingResult.getAllErrors());
        }
        return stationForm;
    }

    public StationEntity applyFormToEntity(StationEntity stationEntity) {
        return formToEntity(stationEntity);
    }
}
