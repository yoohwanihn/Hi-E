package com.hi_e.springsecurity.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.hi_e.springsecurity.entity.Member;

@Component
//스프링부트가 제공하는 임시 비밀번호가 아니라 DB에서 가져온 회원정보 데이터를 사용하기 위해 UserDetailService 구현을 이용함.
public class MyUserDetailsService implements UserDetailsService {
    private final MemberService memberService;

    public MyUserDetailsService(MemberService memberService) {
        this.memberService = memberService;
    }

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