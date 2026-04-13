package com.example.TemplateService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DraftClientReq {

    private String htmlContent;
    private Map<String,String> Fields;
}
