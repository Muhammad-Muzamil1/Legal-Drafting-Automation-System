package com.example.DraftService.Clients;

import com.example.DraftService.DTO.FormDocReq;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "DocumentService", url = "http://localhost:8082")
public interface DocumentClientService {

    @PostMapping("/FinalForm")
    String docForm(@RequestBody FormDocReq formDocReq);

}
