package com.hi_e.jwt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration

//프론트엔드, 백엔드를 구분지어서 개발하거나, 서로 다른 Server 환경에서 자원을 공유할 때,
//Cors설정이 안 되어있으면 오류가 발생한다. 이를 방지하기 위해 Cors 설정을 해주어야 한다.
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); //처리방식을 설정해 준다. 기본적으로 요청에 대한 응답으로 json타입이 나간다. 이를 Javascript에서 처리할 수 있게 해 준다. 
        								  //이를 통해 프런트엔드에서 처리된 응답을 뷰에 맞게 설정해 줄 수 있다. 
        config.addAllowedOrigin("*"); // Origin: ("*")는 모든 출처를 허용한다는 뜻이다. 
        config.addAllowedHeader("*"); // Header: ("*")는 모든 헤더를 허용한다는 뜻이다. 
        config.addAllowedMethod("*"); // Method: Get/Post/Delete.. 등 요청을 허용하는 방식, ("*")는 모든 방식을 허용한다는 뜻이다.

        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
