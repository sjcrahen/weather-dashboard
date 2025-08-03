package application.config;

import application.annotations.Slugify;
import application.annotations.Trim;
import application.utils.SlugUtility;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;

import java.io.IOException;

public class TransformingStringDeserializer extends JsonDeserializer<String> implements ContextualDeserializer {

    private final boolean trim;
    private final boolean slugify;

    public TransformingStringDeserializer() {
        this(false, false);
    }

    public TransformingStringDeserializer(boolean trim, boolean slugify) {
        this.trim = trim;
        this.slugify = slugify;
    }

    @Override
    public String deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getValueAsString();
        if (value == null) return null;

        if (trim) value = value.trim();
        if (slugify) value = SlugUtility.slugify(value);
        return value;
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext ctxt, BeanProperty property) {
        if (property != null) {
            boolean hasTrim = property.getAnnotation(Trim.class) != null;
            boolean hasSlugify = property.getAnnotation(Slugify.class) != null;
            return new TransformingStringDeserializer(hasTrim, hasSlugify);
        }
        return this;
    }
}
