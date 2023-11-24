package com.hi_e.springsecurity.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hi_e.springsecurity.dto.MemberJoinDto;
import com.hi_e.springsecurity.service.RegisterMemberService;

@RestController
@RequestMapping("/auth")
public class AuthorizationController {
    private final RegisterMemberService registerMemberService;

    public AuthorizationController(RegisterMemberService registerMemberService) {
        this.registerMemberService = registerMemberService;
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberJoinDto dto) {
        try {
            registerMemberService.join(
            		dto.getEmail(),
            		dto.getEname(),
            		dto.getPw(),
            		dto.getBirth_day(),
            		dto.getPhone_number(),
            		dto.getAddress(), 
            		dto.getStreet_address(), 
            		dto.getDetail_address());
            return ResponseEntity.ok("join success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}


