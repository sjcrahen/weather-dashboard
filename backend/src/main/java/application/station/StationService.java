package application.station;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StationService {

    private StationRepository stationRepository;

    public List<StationEntity> getAllStations() {
        return stationRepository.findAllByOrderByNameAsc();
    }

    public StationEntity getStationBySlug(String slug) {
        if (slug == null) return null;
        try {
            Optional<StationEntity> stationEntity = stationRepository.findBySlug(slug);
            return stationEntity.orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public StationEntity createStation(StationEntity newStation) {
        if (newStation == null) return null;
        try {
            return stationRepository.save(newStation);
        } catch (Exception e) {
            return null;
        }
    }

    public StationEntity update(StationEntity toUpdate) {
        if (toUpdate == null) return null;
        try {
            return stationRepository.save(toUpdate);
        } catch (Exception e) {
            return null;
        }
    }
}
