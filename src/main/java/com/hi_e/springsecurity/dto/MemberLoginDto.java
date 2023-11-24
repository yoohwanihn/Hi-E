package com.hi_e.springsecurity.dto;

import lombok.Data;

@Data
//게터 세터 필요 없음, 폼 로그인 DTO
public class MemberLoginDto {

    private String email;
    private String pw;

}
