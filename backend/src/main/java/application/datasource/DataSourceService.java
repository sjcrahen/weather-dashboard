package application.datasource;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DataSourceService {

    private DataSourceRepository dataSourceRepository;

    public List<DataSourceEntity> getAllDataSources() {
        return dataSourceRepository.findAll();
    }

    public DataSourceEntity getDataSourceById(Integer id) {
        if (id == null) return null;
        try {
            Optional<DataSourceEntity> dataSourceEntity = dataSourceRepository.findById(id);
            return dataSourceEntity.orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public DataSourceEntity update(DataSourceEntity toUpdate) {
        if (toUpdate == null) return null;
        try {
            return dataSourceRepository.save(toUpdate);
        } catch (Exception e) {
            return null;
        }
    }
}
