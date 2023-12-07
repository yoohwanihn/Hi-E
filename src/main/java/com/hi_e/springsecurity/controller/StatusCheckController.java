package com.hi_e.springsecurity.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 서버 상태 확인 컨트롤러 클래스입니다.
 */
@RestController
@RequestMapping("/status")
public class StatusCheckController {
	
	/**
     * 서버 상태를 확인하는 엔드포인트입니다.
     *
     * @return 서버 상태 응답
     */
    @GetMapping
    public ResponseEntity<String> serverStatusCheck() {
        return ResponseEntity.ok("ok");
    }
}
