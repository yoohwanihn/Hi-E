package com.hi_e.springsecurity.dto;

import java.io.Serializable;

import com.hi_e.springsecurity.model.Member;

import lombok.Getter;

// 다른 사람이 로그인을 할 때 사용하는 클래스
// Member 클래스와 차이점 - 직렬화를 구현 
// 자바 내부 Object를 외부에서 사용 가능하도록 byte 형태로 변환하는 기술

@Getter
public class SessionMember implements Serializable {
    private String email;
    private String ename;

    public SessionMember(Member member){
        this.email = member.getEmail();
        this.ename = member.getEname();
    }
}