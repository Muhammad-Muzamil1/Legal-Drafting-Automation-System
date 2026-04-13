package com.example.TemplateService.Dto;

import lombok.Data;

import java.util.Map;

@Data
public class FormDataReq {

    private String category;
    private String templateName;
    private Map<String,String> fields;
}
