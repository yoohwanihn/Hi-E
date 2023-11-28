package com.hi_e.springsecurity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hi_e.springsecurity.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 소셜 로그인으로 반환되는 값 중 email을 통해 이미 생성된 사용자인지, 처음 가입하는 사용자인지 판단.
    // Member타입이 아닌 Optional을 사용하는 이유는 null을 체크할 때 Member 타입은 클라이언트 코드에서 null을 체크해야함.
    Optional<Member> findByEmail(String email);
    
    // Email과 이름을 비교해 임시 비밀번호를 전송할 때 사용
	Optional<Member> findByEmailAndEname(String email, String ename);
    
    // 기존 비밀번호를 변경하는 메서드
    // 수정할 일 있을거 같음
    @Modifying
    @Query("UPDATE Member m SET m.pw = :newPassword WHERE m.email = :email")
    void updateUserPassword(@Param("email") String email, @Param("newPassword") String newPassword);


}