package com.example.DraftService.Service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DraftService {

    public String replaceValues(String templateContent, Map<String,String> fields){

        String FinalForm = templateContent;

        for(Map.Entry<String,String> entry : fields.entrySet()){

            String placeholder = "{{" + entry.getKey() + "}}";

            FinalForm = FinalForm.replace(placeholder, entry.getValue());

        }

//        FormDocReq formDocReq = new FormDocReq(FinalForm);
//        return DocumentClientService.docForm(formDocReq);
            return FinalForm;
    }

}
