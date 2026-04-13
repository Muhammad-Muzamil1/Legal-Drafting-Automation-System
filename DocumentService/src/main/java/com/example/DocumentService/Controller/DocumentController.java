package com.example.DocumentService.Controller;

import com.example.DocumentService.Service.DocumentService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
public class DocumentController {


    DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(value = "generatepdf", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<byte[]> generatePdf(@RequestBody String HtmlContent) throws Exception {

        byte[] pdf = documentService.generatePdf(HtmlContent);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=agreement.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

}
