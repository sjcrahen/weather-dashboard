package application.api;

import application.datasource.DataSourceEntity;
import application.station.StationEntity;
import application.station.StationForm;
import application.station.StationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/admin/stations")
@Slf4j
public class StationsController {

    private ObjectMapper objectMapper;
    private StationService stationService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StationEntity>> getAllStations() {
        return ResponseEntity.ok(stationService.getAllStations());
    }

    @GetMapping(value = "/{slug:^[a-z0-9]+(?:-[a-z0-9]+)*$}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StationEntity> getStation(@PathVariable String slug) {
        StationEntity stationEntity = stationService.getStationBySlug(slug);
        if (stationEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stationEntity);
    }

    @PostMapping()
    public ResponseEntity<String> createStation(@Valid @RequestBody StationForm stationForm, BindingResult result) {
        if (!result.hasErrors()) {
            StationEntity existing = stationService.getStationBySlug(stationForm.getSlug());
            if (existing != null) {
                result.addError(new ObjectError("station", "This station slug is already in use"));
            }
            StationEntity newStation = stationForm.formToEntity();
            boolean success = stationService.createStation(newStation);
            if (!success) {
                result.addError(new ObjectError("station", "Unable to create station"));
            }
        }

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors().get(0).getDefaultMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{slug:^[a-z0-9]+(?:-[a-z0-9]+)*$}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateStation(@PathVariable String slug, @RequestParam("dataSourcesJson") String dataSourcesJson, @Valid @ModelAttribute StationForm stationForm, BindingResult result) {
        if (!result.hasErrors()) {
            StationEntity existing = stationService.getStationBySlug(slug);
            if (existing == null) {
                return ResponseEntity.notFound().build();
            }
            if (!existing.getSlug().equals(slug)) {
                result.addError(new ObjectError("station", "Station slug mismatch"));
            }
            try {
                List<DataSourceEntity> datasources = objectMapper.readValue(dataSourcesJson, new TypeReference<List<DataSourceEntity>>() {
                });
                existing.setDataSources(datasources);
            } catch (JsonProcessingException ignore) {
                log.warn("Unable to deserialize data sources json: {}", dataSourcesJson);
            }
            StationEntity updated = stationService.update(stationForm.applyFormToEntity(existing));
            if (updated == null) {
                result.addError(new ObjectError("station", "Unable to update station"));
            }
        }

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors().get(0).getDefaultMessage());
        }
        return ResponseEntity.ok().build();
    }

}
