package com.example.ApiGateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.Arrays;
import java.util.List;

import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouterFunction<ServerResponse> templateServiceRoute() {
        return route("TemplateService")
                .route(path("/api/v1/category/**").or(path("/api/v1/form/**")), http("http://localhost:8080"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> documentServiceRoute() {
        return route("DocumentService")
                .route(path("/api/v1/generatepdf/**"), http("http://localhost:8082"))
                .build();
    }
}
