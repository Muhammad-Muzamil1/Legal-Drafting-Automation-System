package com.example.DraftService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class DraftServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DraftServiceApplication.class, args);
	}

}
