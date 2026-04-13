package com.example.TemplateService.Client;

import com.example.TemplateService.Dto.DraftClientReq;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "Draft-Service", url = "http://localhost:8081")
public interface DraftServiceClient {

    @PostMapping("/api/v1/generateForm")
    String Form(@Valid @RequestBody DraftClientReq draftClientReq);
}
