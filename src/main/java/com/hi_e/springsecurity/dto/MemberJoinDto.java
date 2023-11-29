package com.hi_e.springsecurity.dto;

import java.util.Date;

import lombok.Data;

@Data
//게터 세터 필요 없음, 폼 회원가입 DTO
public class MemberJoinDto {

    private String email;
    private String ename;
    private String pw;
    private Date birth_day;
    private String phone_number;
    private String address;
    private String street_address;
    private String detail_address;
    private String picture;
}