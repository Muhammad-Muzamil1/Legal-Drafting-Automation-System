package com.example.ApiGateway.Filters;

import com.example.ApiGateway.Service.TokenBucketService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.HandlerFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

@Component
public class RateLimitFilter
        implements HandlerFilterFunction<ServerResponse, ServerResponse> {

    private final TokenBucketService tokenBucketService;

    public RateLimitFilter(
            TokenBucketService tokenBucketService) {

        this.tokenBucketService = tokenBucketService;
    }

    @Override
    public ServerResponse filter(
            ServerRequest request,
            HandlerFunction<ServerResponse> next)
            throws Exception {

        String clientIp =
                request.servletRequest()
                        .getRemoteAddr();

        boolean allowed =
                tokenBucketService.allowRequest(clientIp);

        if (!allowed) {

            return ServerResponse
                    .status(429)
                    .body("Rate limit exceeded");
        }

        return next.handle(request);
    }
}