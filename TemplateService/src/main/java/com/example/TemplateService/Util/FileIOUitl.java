package com.example.TemplateService.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import javax.lang.model.type.ArrayType;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class FileIOUitl {

    @Autowired
    private ResourcePatternResolver resolver;

    public List<String> fieldextract(String htmlContent){

        List<String> fields = new ArrayList<>();

        Pattern pattern = Pattern.compile("\\{\\{(.*?)\\}\\}");
        Matcher matcher = pattern.matcher(htmlContent);

        while (matcher.find()){
            fields.add(matcher.group(1));
        }
        return fields;

    }

    public String readFileContent(Resource resource) {
        try (InputStream is = resource.getInputStream()) {
            return StreamUtils.copyToString(is, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read template", e);
        }
    }

    public Resource[] findFile (String selectedCategory){
        Resource[] resources = null;
        try {
            resources = resolver.getResources(
                    "classpath:templates/" + selectedCategory + "/*.html"
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return resources;
    }
}
