package com.example.ApiGateway.Service;


import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class TokenBucketService {

    private final StringRedisTemplate redisTemplate;
    private final RedisScript<Long> tokenBucketScript;

    public TokenBucketService(
            StringRedisTemplate redisTemplate,
            RedisScript<Long> tokenBucketScript) {

        this.redisTemplate = redisTemplate;
        this.tokenBucketScript = tokenBucketScript;
    }

    public boolean allowRequest(String clientId) {

        String tokensKey =
                "bucket:" + clientId + ":tokens";

        String timestampKey =
                "bucket:" + clientId + ":timestamp";

        Long result =
                redisTemplate.execute(
                        tokenBucketScript,
                        List.of(tokensKey, timestampKey),
                        "100",
                        "10",
                        String.valueOf(
                                Instant.now().getEpochSecond()
                        )
                );

        return result != null && result == 1;
    }
}
