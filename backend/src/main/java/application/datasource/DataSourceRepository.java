package application.datasource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DataSourceRepository extends JpaRepository<DataSourceEntity, Integer> {

    List<DataSourceEntity> findByTypeIn(List<DataSourceType> types);

    List<DataSourceEntity> findByType(DataSourceType type);
}