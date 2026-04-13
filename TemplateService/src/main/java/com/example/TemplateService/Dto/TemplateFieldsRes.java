package com.example.TemplateService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TemplateFieldsRes {

     private String templateName;
     private String category;
     private List<String> Fields;
}
