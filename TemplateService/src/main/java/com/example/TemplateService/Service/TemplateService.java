package com.example.TemplateService.Service;

import com.example.TemplateService.Client.DraftServiceClient;
import com.example.TemplateService.Dto.DraftClientReq;
import com.example.TemplateService.Dto.FormDataReq;
import com.example.TemplateService.Dto.TemplateFieldsRes;
import com.example.TemplateService.Dto.TemplatesRes;
import com.example.TemplateService.Util.FileIOUitl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;

@Service
public class TemplateService {

    @Autowired
    private FileIOUitl fileIOUitl;

    @Autowired
    private DraftServiceClient draftServiceClient;


    @Cacheable(
            value = "templates",
            key = "#selectedCategory"
    )
    public TemplatesRes getAllTemplates(String selectedCategory){
        System.out.println("Get ALl templates Executed");
        Resource[] resources = fileIOUitl.findFile(selectedCategory);

        List<String> templates =
                Arrays.stream(resources)
                        .map(Resource::getFilename)
                        .toList();

        return new TemplatesRes(templates);
    }

    @Cacheable(
            value = "fields",
            key = "#selectedTemplate + '-' + #selectedCategory"
    )
    public List<TemplateFieldsRes> getAllFields(String selectedTemplate, String selectedCategory){
        System.out.println("Get all Fields Executed");
        Resource[] resources = fileIOUitl.findFile(selectedCategory);

        List<TemplateFieldsRes> result = new ArrayList<>();

        for (Resource resource : resources) {

            if (resource.getFilename().equals(selectedTemplate+".html")) {
                String htmlContent = fileIOUitl.readFileContent(resource);

                List<String> fields = fileIOUitl.fieldextract(htmlContent);

                    result.add(new TemplateFieldsRes(selectedTemplate,selectedCategory,fields));
            }
        }

        return result;

    }

    @CircuitBreaker(
            name = "draftService",
            fallbackMethod = "submitFormFallback"
    )
    @Retry(
            name = "draftService"
    )
    public String submitForm(FormDataReq formDataDto){

        Resource[] resources = fileIOUitl.findFile(formDataDto.getCategory());
        String htmlContent = null;

        for (Resource resource : resources) {

            if (resource.getFilename().equals(formDataDto.getTemplateName()+".html")) {
                htmlContent = fileIOUitl.readFileContent(resource);
            }
        }

        DraftClientReq draftClientReq =
                new DraftClientReq(
                        htmlContent,
                        formDataDto.getFields()
                );

        return draftServiceClient.Form(draftClientReq);
    }
    public String submitFormFallback(
            FormDataReq formDataDto,
            Exception ex
    ) {

        System.out.println("==============================");
        System.out.println("Circuit Breaker Activated");
        System.out.println("Reason : " + ex.getMessage());
        System.out.println("==============================");

        return "Draft Service is temporarily unavailable. Please try again later.";
    }
}
