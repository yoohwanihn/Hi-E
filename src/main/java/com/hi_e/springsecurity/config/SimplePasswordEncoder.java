package com.hi_e.springsecurity.config;

import org.springframework.security.crypto.password.PasswordEncoder;

//비밀번호 암호화
//PasswordEncoder 인터페이스는 encode, matches 2가지 메서드가 있다.
public class SimplePasswordEncoder implements PasswordEncoder {
	//- encode : 해당 암호화 방식으로 암호화한 문자열을 리턴해준다. 회원가입 시 DB에 넣기전에 이걸 호출해 암호화하면 된다.
    @Override
    public String encode(CharSequence rawPassword) {
        return rawPassword.toString();
    }
    
    //matches : rawPassword가 로그인 시 사용자가 입력한 비밀번호입니다. 'usernameParameter("pw")' 로 설정해둔 부분의 값이 rawPassword로 들어와집니다. 
    //encodedPassword는 DB에서 조회한 이미 암호화되어있는 비밀번호 입니다. 
    //5.1에서 설정한 loadUserByUsername 에서 UserDetails에 넣어준 password() 부분이 여기로 들어옵니다.
    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encodedPassword.equals(encode(rawPassword));
    }
}

//현재 스프링 시큐리티에 내장된 암호화 방식을 사용하였기 때문에 이 클래스는 사용할 필요가 없다.