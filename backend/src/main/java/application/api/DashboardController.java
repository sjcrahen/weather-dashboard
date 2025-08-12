package application.api;

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

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final StationService stationService;

    @GetMapping()
    public ResponseEntity<?> getDashboard() {
        return ResponseEntity.ok().body("Dashboard");
    }

    @GetMapping(value = "/{slug:^[a-z0-9]+(?:-[a-z0-9]+)*$}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Object>> getObservations(@PathVariable String slug) {
        StationEntity station = stationService.getStationBySlug(slug);
        if (station == null) return ResponseEntity.notFound().build();
        List<Object> observations = new ArrayList<>();
        for (var ds : station.getDataSources()) {
            observations.add(Cache.SNAPSHOTS.get(ds.getId()));
        }
        return ResponseEntity.ok(observations);
    }
}
