package com.hi_e.springsecurity.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${upload.path}")
	private String uploadPath;
	
    @Override
    public void  addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(uploadPath) // /upload/**
                .addResourceLocations("file:///C:/Hi_E/upload/"); //이미지 여기다 저장함, 저장한 날짜 기준으로 폴더 나눠놓음
    }

}