package application.utils;

import java.text.Normalizer;

public class SlugUtility {

    public static String slugify(String input) {
        if (input == null) return null;
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("[^\\p{Alnum}]+", "-")
                .replaceAll("^-+|-+$", "")
                .toLowerCase();
    }
}
