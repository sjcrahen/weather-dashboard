package application.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class JacksonConfig {

    private ObjectMapper mapper;

    @PostConstruct
    public void setup() {
        mapper.setAnnotationIntrospector(new TransformAnnotationIntrospector());
    }

}
