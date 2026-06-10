package com.example.ApiGateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.CircuitBreakerFilterFunctions.circuitBreaker;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Configuration
public class GatewayRoutesConfig {

    @Value("${services.template.url}")
    private String templateUrl;

    @Value("${services.document.url}")
    private String documentUrl;

    @Bean
    @SuppressWarnings("deprecation")
    public RouterFunction<ServerResponse> templateServiceRoute() {

        return route("TemplateService")

                .route(
                        path("/api/v1/category/**")
                                .or(path("/api/v1/form/**")),

                        http(templateUrl))

                .filter(
                        circuitBreaker(config -> config
                                .setId("templateService")
                                .setFallbackPath("/fallback/template")
                        )
                )

                .build();
    }

    @Bean
    @SuppressWarnings("deprecation")
    public RouterFunction<ServerResponse> documentServiceRoute() {

        return route("DocumentService")

                .route(
                        path("/api/v1/generatepdf/**"),

                        http(documentUrl))

                .filter(
                        circuitBreaker(config -> config
                                .setId("documentService")
                                .setFallbackPath("/fallback/document")
                        )
                )

                .build();
    }
}