package com.hi_e.react;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

/**
 * 404 페이지 에러가 발생하면 path '/'로 이동시키게 작동하는 설정 입니다.
 * React는 SPA 이기 때문에 index.html 하나에서만 동작해서
 * errorPage로 현재 안된다고는 함
 * https://mopil.tistory.com/59
 */
@Configuration
public class ViewErrorConfig {
    
    @Bean
    public ErrorPageRegistrar errorPageRegistrar() {
        return new ErrorPageRegisterar();
    }
    
    private static class ErrorPageRegisterar implements ErrorPageRegistrar {

        @Override
        public void registerErrorPages(ErrorPageRegistry registry) {
            ErrorPage errorPage = new ErrorPage(HttpStatus.NOT_FOUND, "/");
            registry.addErrorPages(errorPage);
        }
    }
}