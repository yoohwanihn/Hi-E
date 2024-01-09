package com.hi_e.springsecurity.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${upload.path}")
	private String uploadPath;
	
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(uploadPath) // /upload/**
                .addResourceLocations("file:///C:/Hi_E/upload/"); //이미지 여기다 저장함, 저장한 날짜 기준으로 폴더 나눠놓음
		        
        registry.addResourceHandler("/**")
				.addResourceLocations("classpath:/frontend/",
						"classpath:/static/", "classpath:/templates/") // 반드시 / 로 끝나야함
				.setCachePeriod(20); // 캐시 지속시간 설정 (초)
    }
    
    /* Cors 관련 설정 메서드입니다. */
    @Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:3000")
		.allowCredentials(true) // 쿠키 인증 요청 허용
		.allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");
	}
}