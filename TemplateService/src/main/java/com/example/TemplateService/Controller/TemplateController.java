package com.example.TemplateService.Controller;

import com.example.TemplateService.Dto.FormDataReq;
import com.example.TemplateService.Dto.TemplateFieldsRes;
import com.example.TemplateService.Service.TemplateService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TemplateController {


    private TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping("/category/{category}/templates")
    public ResponseEntity<List<String>> getAllTemplates(@PathVariable String category) throws IOException {
        return ResponseEntity.ok().body(templateService.getAllTemplates(category));
    }

    @GetMapping("/category/{category}/template/{template}/fields")
    public ResponseEntity<List<TemplateFieldsRes>> getSelectedCategoryFields(@PathVariable String category, @PathVariable String template) throws IOException {
         return ResponseEntity.ok().body(templateService.getAllFields(template,category));
    }

    @PostMapping("/form")
    public ResponseEntity<String> receiveForm(@Valid @RequestBody FormDataReq formDataDto){
        return ResponseEntity.ok().body(templateService.submitForm(formDataDto));

    }

}
