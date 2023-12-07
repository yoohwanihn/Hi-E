package com.hi_e.springsecurity.dto;

import java.io.Serializable;

import com.hi_e.springsecurity.entity.Member;

import lombok.Getter;

// 다른 사람이 로그인을 할 때 사용하는 클래스
// Member 클래스와 차이점 - 직렬화를 구현 
// 자바 내부 Object를 외부에서 사용 가능하도록 byte 형태로 변환하는 기술

/**
 * 로그인 시 세션에 저장할 회원 정보를 담기 위한 클래스입니다.
 * Member 클래스와의 차이점은 직렬화를 구현하여 자바 내부 Object를 외부에서 사용 가능하도록 byte 형태로 변환하는 기능을 갖추고 있습니다.
 */
@Getter
public class SessionMember implements Serializable {
    private String email;
    private String ename;
    
    /**
     * Member 엔티티를 기반으로 하는 생성자입니다.
     *
     * @param member Member 엔티티 객체
     */
    public SessionMember(Member member){
        this.email = member.getEmail();
        this.ename = member.getEname();
    }
}