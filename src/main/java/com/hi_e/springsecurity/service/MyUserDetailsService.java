package com.hi_e.springsecurity.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.hi_e.springsecurity.entity.Member;

/**
 * Spring Security에서 사용하는 UserDetailsService를 구현한 클래스입니다.
 */
@Component
public class MyUserDetailsService implements UserDetailsService {
	//스프링부트가 제공하는 임시 비밀번호가 아니라 DB에서 가져온 회원정보 데이터를 사용하기 위해 UserDetailService 구현을 이용함.
    private final MemberService memberService;
    
    /**
     * 생성자로 MemberService를 주입받습니다.
     *
     * @param memberService 사용할 MemberService
     */
    public MyUserDetailsService(MemberService memberService) {
        this.memberService = memberService;
    }
    
    /**
     * Spring Security 인증 시 사용되는 메서드로, 입력된 이메일을 기반으로 회원 정보를 가져와 UserDetails 객체를 생성합니다.
     *
     * @param insertedUserEmail 로그인 시 입력된 이메일
     * @return UserDetails 객체
     * @throws UsernameNotFoundException 해당 이메일을 가진 회원이 없을 때 발생하는 예외
     */
    @Override 
    public UserDetails loadUserByUsername(String insertedUserEmail) throws UsernameNotFoundException {
        // 파라미터인 insertedId 부분에는 기존에 설정해두었던 usernameParameter("email")에 해당하는 정보가 들어오게 된다. 
    	//비밀번호가 동일한지 체크는 스프링부트에서 알아서 진행하게 되므로 DB에서 아이디만 가져오면 된다.
        Optional<Member> findOne = memberService.findOne(insertedUserEmail); 
        Member member = findOne.orElseThrow(() -> new UsernameNotFoundException("없는 회원입니다"));
        
        //User클래스의 빌더를 사용해 username에 아이디, password에 비밀번호, roles에 권한(역할)을 넣어주면 UserDetails가 리턴 된다.
        return User.builder()
                .username(member.getEmail())
                .password(member.getPw())
                .roles(member.getRoles().toString())
                .build();
    }
    
}