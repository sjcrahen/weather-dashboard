package application.api;

import application.datasource.DataSourceEntity;
import application.scheduled.Cache;
import application.station.StationEntity;
import application.station.StationService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final StationService stationService;

    @GetMapping()
    public ResponseEntity<?> getDashboard() {
        StationEntity station = stationService.getAllStations().stream().findFirst().orElse(null);
        if (station == null) return ResponseEntity.notFound().build();
        List<DataSourceEntity> dataSources = station.getDataSources();
        for (var ds : dataSources) {
            ds.setObservation(Cache.SNAPSHOTS.get(ds.getId()));
        }
        return ResponseEntity.ok(dataSources);
    }

    @GetMapping("/stations")
    public ResponseEntity<?> getStations() {
        return ResponseEntity.ok(stationService.getAllStations());
    }

    @GetMapping(value = "/{slug:^[a-z0-9]+(?:-[a-z0-9]+)*$}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StationEntity> getObservations(@PathVariable String slug) {
        StationEntity station = stationService.getStationBySlug(slug);
        if (station == null) return ResponseEntity.notFound().build();
        for (var ds : station.getDataSources()) {
            ds.setObservation(Cache.SNAPSHOTS.get(ds.getId()));
        }
        return ResponseEntity.ok(station);
    }
}
