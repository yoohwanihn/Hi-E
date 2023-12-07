package com.hi_e.springsecurity.dto;

import lombok.Data;

/**
 * 폼을 통한 로그인 정보를 담은 DTO (Data Transfer Object) 클래스입니다.
 * 롬복의 @Data 어노테이션을 사용하여 Getter, Setter 등을 자동으로 생성합니다.
 */
@Data
public class MemberLoginDto {

    private String email;  // 이메일
    private String pw;     // 비밀번호
}