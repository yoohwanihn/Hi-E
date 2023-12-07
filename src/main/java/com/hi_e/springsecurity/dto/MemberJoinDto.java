package com.hi_e.springsecurity.dto;

import java.util.Date;

import lombok.Data;

/**
 * 폼을 통한 회원가입 정보를 담은 DTO (Data Transfer Object) 클래스입니다.
 * 롬복의 @Data 어노테이션을 사용하여 Getter, Setter 등을 자동으로 생성합니다.
 */
@Data
public class MemberJoinDto {

    private String email;           // 이메일
    private String ename;           // 사용자 이름
    private String pw;              // 비밀번호
    private Date birth_day;         // 생년월일
    private String phone_number;    // 전화번호
    private String address;         // 주소
    private String street_address;  // 도로명 주소
    private String detail_address;  // 상세 주소
    private String picture;         // 프로필 사진 경로
}