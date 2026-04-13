package com.example.DraftService.Controller;

import com.example.DraftService.DTO.FormDataReq;
import com.example.DraftService.Service.DraftService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class DraftController {

    DraftService draftService;

    public DraftController(DraftService draftService) {
        this.draftService = draftService;
    }

    @PostMapping("/generateForm")
    public String replaceValues(@Valid @RequestBody FormDataReq FormDataReq){

        return draftService.replaceValues(FormDataReq.getHtmlContent(), FormDataReq.getFields());

    }
}
