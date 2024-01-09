package com.hi_e.springsecurity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.hi_e.springsecurity.service.CustomOAuth2UserService;

import jakarta.servlet.DispatcherType;

/**
 * 웹 보안 설정 클래스입니다.
 */
@EnableWebSecurity // 스프링 security 지원
@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class WebSecurityConfig {

	private final CustomOAuth2UserService customOAuth2UserServicer;

	// RequiredArgs로 생성자를 초기화하면 순환 참조 에러로 실행이 안됨.
	// Lazy로 실제 실행할때 생성자를 만들도록
	public WebSecurityConfig(@Lazy CustomOAuth2UserService customOAuth2UserServicer) {
		this.customOAuth2UserServicer = customOAuth2UserServicer;
	}
	
	@Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }
	
	/**
     * SecurityFilterChain을 설정하는 메서드입니다.
     *
     * @param http HttpSecurity 객체
     * @return SecurityFilterChain
     * @throws Exception 예외
     */
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()) // token을 사용하는 방식이기 때문에 csrf disable
			.authorizeHttpRequests(request -> request.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
			.requestMatchers("/status", "/img/**","/auth/join", "/css/**", "/js/**", "vendor/**", 
					"/view/forgot-password", "/sendEmail", "/send_email", "/h2-console/**")
			.permitAll() // 인증 필요없이 나올 사이트
			// 테스트를 위해 h2-console도 열어두자. 배포할때 지우기!
			// 이미지 폴더의 이미지와 회원가입 페이지는 로그인 전에도 접근할 수 있어야 하기 때문이다.
			
			.requestMatchers("/view/login", "/view/join", "/view/service-agree").anonymous() 
			// 인증 안한 유저만 접근 가능
			
			.anyRequest().authenticated() // 그 외의 모든 사이트는 어떠한 요청이라도 인증필요
			)

				/* 폼로그인 처리 */
				.formLogin(login -> login.loginPage("/view/login") // 커스텀 로그인 페이지 지정
						.loginProcessingUrl("/login-process") // submit 받을 url
						.usernameParameter("email") // submit할 아이디
						.passwordParameter("pw") // submit할 비밀번호
						.defaultSuccessUrl("/view/dashboard", true) // 성공 시 이동할 페이지
						.failureHandler(authenticationFailureHandler()) // 실패 핸들러 등록
						.permitAll())

				/* 폼 로그아웃 처리 */
				.logout(logout -> logout.logoutSuccessUrl("/login") // 로그아웃은 기본설정으로 (/logout으로 인증해제)
						.permitAll()
						.invalidateHttpSession(true)) // 로그아웃 후 세션 초기화 설정)

				/* OAuth 로그인 처리 */
				.oauth2Login() // OAuth2 로그인 기능에 대한 설정 진입점
				.userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
				.userService(customOAuth2UserServicer) // 소셜 로그인 성공시 처리를 담당할 서비스
				.and().loginPage("/view/login") // 커스텀 로그인 페이지 지정
				.defaultSuccessUrl("/view/dashboard", true) // 성공 시 이동할 url
				.failureUrl("/view/login?error") // 로그인 실패 시 이동할 페이지, 수정해야함.
				.and()

				/* OAuth 로그아웃 처리 */
				.logout(logout -> logout.logoutSuccessUrl("/login") // 로그아웃은 기본설정으로 (/logout으로 인증해제)
						.permitAll()
						.invalidateHttpSession(true)) // 로그아웃 후 세션 초기화 설정

				

				.exceptionHandling().accessDeniedPage("/view/login"); // accessDenied 처리
		;

		http.headers().frameOptions().disable(); // 마찬가지로 h2-console을 사용하기 위해. 배포할때 지우기

		return http.build();
	}

	/*
	 * BCrypt를 사용하기 때문에 쓸 필요가 없다.
	 * 
	 * @Bean PasswordEncoder passwordEncoder() { return new SimplePasswordEncoder();
	 * }
	 */
	
	/**
     * PasswordEncoder를 빈으로 등록합니다.
     *
     * @return BCryptPasswordEncoder 객체
     */
	@Bean
	PasswordEncoder passwordEncoder() {
		// 단방향 암호화가 아닌 BCrypt암호화 알고리즘을 사용하기 때문에
		// data.sql에 기본 데이터 비밀번호를 넣을 경우 암호화된 비밀번호를 사용하여야 한다.
		return new BCryptPasswordEncoder();
	}

}