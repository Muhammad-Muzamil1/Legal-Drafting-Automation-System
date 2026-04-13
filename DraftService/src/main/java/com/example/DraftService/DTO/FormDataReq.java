package com.example.DraftService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormDataReq {

    private String htmlContent;
    private Map<String,String> fields;
}
