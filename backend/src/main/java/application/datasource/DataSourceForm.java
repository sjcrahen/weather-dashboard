package application.datasource;

import application.annotations.Trim;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DataSourceForm {

    @Trim
    @NotEmpty
    private String name;

    @Trim
    @NotEmpty
    private String sourceIdentifier;

    @NotNull
    private DataSourceType type;

    public DataSourceEntity formToEntity() {
        return formToEntity(null);
    }

    private DataSourceEntity formToEntity(DataSourceEntity dataSourceEntity) {
        if (dataSourceEntity == null) {
            dataSourceEntity = new DataSourceEntity();
        }
        dataSourceEntity.setName(name);
        dataSourceEntity.setSourceIdentifier(sourceIdentifier);
        dataSourceEntity.setType(type);
        return dataSourceEntity;
    }

    public DataSourceEntity applyFormToEntity(DataSourceEntity dataSourceEntity) {
        return formToEntity(dataSourceEntity);
    }
}
