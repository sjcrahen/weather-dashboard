package application.api;

import application.datasource.DataSourceEntity;
import application.datasource.DataSourceForm;
import application.datasource.DataSourceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/admin/datasources")
public class DataSourcesController {

    private DataSourceService dataSourceService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DataSourceEntity>> getAllDataSources() {
        return ResponseEntity.ok(dataSourceService.getAllDataSources());
    }

    @GetMapping(value = "/{id:[0-9]+}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DataSourceEntity> getDataSource(@PathVariable Integer id) {
        DataSourceEntity dataSourceEntity = dataSourceService.getDataSourceById(id);
        if (dataSourceEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dataSourceEntity);
    }

    @PutMapping(value = "/{id:[0-9]+}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateDataSource(@PathVariable Integer id, @Valid @ModelAttribute DataSourceForm dataSourceForm, BindingResult result) {
        if (!result.hasErrors()) {
            DataSourceEntity existing = dataSourceService.getDataSourceById(id);
            if (existing == null) {
                return ResponseEntity.notFound().build();
            }
            DataSourceEntity updated = dataSourceService.update(dataSourceForm.applyFormToEntity(existing));
            if (updated == null) {
                result.addError(new ObjectError("datasource", "Unable to update datasource"));
            }
        }

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors().get(0).getDefaultMessage());
        }
        return ResponseEntity.ok().build();
    }
}
