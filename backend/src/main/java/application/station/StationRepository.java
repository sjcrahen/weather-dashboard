package application.station;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StationRepository extends JpaRepository<StationEntity, Integer> {

    public Optional<StationEntity> findBySlug(String slug);

    public List<StationEntity> findAllByOrderByNameAsc();
}
