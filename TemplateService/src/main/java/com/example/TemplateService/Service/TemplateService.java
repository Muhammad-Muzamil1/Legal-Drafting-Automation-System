package com.example.TemplateService.Service;

import com.example.TemplateService.Client.DraftServiceClient;
import com.example.TemplateService.Dto.DraftClientReq;
import com.example.TemplateService.Dto.FormDataReq;
import com.example.TemplateService.Dto.TemplateFieldsRes;
import com.example.TemplateService.Util.FileIOUitl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TemplateService {

    @Autowired
    private FileIOUitl fileIOUitl;

    @Autowired
    private DraftServiceClient draftServiceClient;

    public List<String> getAllTemplates(String selectedCategory){

        Resource[] resources = fileIOUitl.findFile(selectedCategory);

        return Arrays.stream(resources)
                .map(Resource::getFilename)
                .toList();
    }

    public List<TemplateFieldsRes> getAllFields(String selectedTemplate, String selectedCategory){

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

    public String submitForm(FormDataReq formDataDto){

        Resource[] resources = fileIOUitl.findFile(formDataDto.getCategory());
        String htmlContent = null;

        for (Resource resource : resources) {

            if (resource.getFilename().equals(formDataDto.getTemplateName()+".html")) {
                htmlContent = fileIOUitl.readFileContent(resource);
// if file found return
            }
        }

        //send htmlcontent and formdatadto.fields to draft service
        DraftClientReq draftClientReq = new DraftClientReq(htmlContent,formDataDto.getFields());

        return draftServiceClient.Form(draftClientReq);

    }
}
