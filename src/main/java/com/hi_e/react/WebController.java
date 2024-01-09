package com.hi_e.react;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * React 라우팅을 위한 컨트롤러 입니다.
 */
@RestController
public class WebController {

	// forward 로 무조건 넘겨줘야 함
    @GetMapping(value =  {"", "/vacation","/calendar"})
    public String forward() {
    	System.out.println("React 페이지");
        return "forward:/build/index.html";
    }
}