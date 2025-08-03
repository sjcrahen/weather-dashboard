package application.config;

import application.annotations.Slugify;
import application.annotations.Trim;
import com.fasterxml.jackson.databind.introspect.Annotated;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;

public class TransformAnnotationIntrospector extends JacksonAnnotationIntrospector {

    @Override
    public Object findDeserializer(Annotated annotated) {
        if (annotated.hasAnnotation(Trim.class) || annotated.hasAnnotation(Slugify.class)) {
            return TransformingStringDeserializer.class;
        }
        return super.findDeserializer(annotated);
    }
}
