package com.hi_e.springsecurity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hi_e.springsecurity.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    
    Optional<Member> findByEmail(String email);
    // 소셜 로그인으로 반환되는 값 중 email을 통해 이미 생성된 사용자인지, 처음 가입하는 사용자인지 판단.
    // Member타입이 아닌 Optional을 사용하는 이유는 null을 체크할 때 Member 타입은 클라이언트 코드에서 null을 체크해야함.
}
