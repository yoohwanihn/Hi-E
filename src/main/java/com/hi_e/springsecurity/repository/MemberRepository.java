package com.hi_e.springsecurity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hi_e.springsecurity.entity.Member;

/**
 * 회원 정보를 관리하기 위한 Spring Data JPA Repository 인터페이스입니다.
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

	/**
     * 이메일을 기반으로 회원을 찾습니다.
     *
     * @param email 찾을 회원의 이메일
     * @return 찾은 회원 정보(Optional)
     */
    Optional<Member> findByEmail(String email); 
    // Member타입이 아닌 Optional을 사용하는 이유는 null을 체크할 때 Member 타입은 클라이언트 코드에서 null을 체크해야함.
    
    /**
     * 이메일과 이름을 기반으로 회원을 찾습니다.
     *
     * @param email 찾을 회원의 이메일
     * @param ename 찾을 회원의 이름
     * @return 찾은 회원 정보(Optional)
     */
	Optional<Member> findByEmailAndEname(String email, String ename);
	
	/**
     * 회원 ID를 기반으로 회원을 찾습니다.
     *
     * @param id 찾을 회원의 ID
     * @return 찾은 회원 정보(Optional)
     */
	Optional<Member> findById(Long id);
    
	/**
     * 회원의 비밀번호를 업데이트하는 쿼리문입니다.
     *
     * @param email        업데이트할 회원의 이메일
     * @param newPassword  새로운 비밀번호
     */
    @Modifying
    @Query("UPDATE Member m SET m.pw = :newPassword WHERE m.email = :email")
    void updateUserPassword(@Param("email") String email, @Param("newPassword") String newPassword);
    
    /**
     * 회원의 프로필 사진을 업데이트하는 쿼리문입니다.
     *
     * @param email       업데이트할 회원의 이메일
     * @param newPicture  새로운 프로필 사진 경로
     */
    @Modifying
    @Query("UPDATE Member m SET m.picture = :newPicture WHERE m.email = :email")
    void updateUserProfile(@Param("email") String email, @Param("newPicture") String newPicture);

}