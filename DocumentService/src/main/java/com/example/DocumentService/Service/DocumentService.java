package com.example.DocumentService.Service;

import com.itextpdf.html2pdf.HtmlConverter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;


@Service
public class DocumentService {


    public byte[] generatePdf(String htmlContent) throws Exception {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        HtmlConverter.convertToPdf(htmlContent, outputStream);

        return outputStream.toByteArray();
    }
}
