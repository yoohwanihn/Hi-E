package com.hi_e.springsecurity.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.hi_e.springsecurity.service.CustomOAuth2UserService;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity	//스프링 security 지원
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class WebSecurityConfig {

	private final CustomOAuth2UserService customOAuth2UserService;
	
	//RequiredArgs로 생성자를 초기화하면 순환 참조 에러로 실행이 안됨.
	//Lazy로 실제 실행할때 생성자를 만들도록
	@Autowired
	public WebSecurityConfig(@Lazy CustomOAuth2UserService customOAuth2UserService) {	
		this.customOAuth2UserService = customOAuth2UserService;
	}
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable() //  csrf와 cors를 disable
                .authorizeHttpRequests(request -> request
                	.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                	.requestMatchers("/status", "/images/**", "/view/login", "/view/service-agree", "/view/join", "/auth/join",
                			"/css/**", "/js/**", "vendor/**", "/h2-console/**").permitAll() // 인증 필요없이 나올 사이트
                	// 테스트를 위해 h2-console도 열어두자. 배포할때 지우기!
                	//이미지 폴더의 이미지와 회원가입 페이지는 로그인 전에도 접근할 수 있어야 하기 때문이다.
                	//.requestMatchers("/view/setting/admin").hasRole("ADMIN")	// ADMIN 권한만 접근 가능하도록 Url Path 설정
                    //.requestMatchers("/view/setting/user", "h2-console").hasRole("USER")	// User 권한이 접근 가능하도록 Url Path 설정
                	//requestMatchers로 url path 설정 대신 컨트롤러에서 지정하는게 더 좋은것 같다고 생각이 들어 주석처리하였음.
                	.anyRequest().authenticated()	// 그 외의 모든 사이트는 어떠한 요청이라도 인증필요
                )
                
                /*폼로그인 처리 */
                .formLogin(login -> login
                        .loginPage("/view/login")	// 커스텀 로그인 페이지 지정
                        .loginProcessingUrl("/login-process")	// submit 받을 url
                        .usernameParameter("email")	// submit할 아이디
                        .passwordParameter("pw")	// submit할 비밀번호
                        .defaultSuccessUrl("/view/dashboard", true)	// 성공 시 이동할 페이지
                        .permitAll()
                )
                
                /*폼 로그아웃 처리 */
                .logout(logout -> logout
                        .logoutSuccessUrl("/login")  // 로그아웃은 기본설정으로 (/logout으로 인증해제)
                        .permitAll())
                
                /* OAuth 로그인 처리 */
                .oauth2Login()	//OAuth2 로그인 기능에 대한 설정 진입점
	                .userInfoEndpoint()	// OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
	                .userService(customOAuth2UserService) //소셜 로그인 성공시 처리를 담당할 서비스
                .and()
	                .loginPage("/view/login")	//커스텀 로그인 페이지 지정
	                .defaultSuccessUrl("/view/dashboard", true) // 성공 시 이동할 url
	                .failureUrl("/view/login?error") //로그인 실패 시 이동할 페이지, 수정해야함.
	            .and()
	            
	            /* OAuth 로그아웃 처리 */
	            .logout(logout -> logout
                        .logoutSuccessUrl("/login")  // 로그아웃은 기본설정으로 (/logout으로 인증해제)
                        .permitAll())
                ;	
        
        http.headers().frameOptions().disable();	// 마찬가지로 h2-console을 사용하기 위해. 배포할때 지우기
        		
        return http.build();
    }
    
    /*
    BCrypt를 사용하기 때문에 쓸 필요가 없다.
    @Bean
    PasswordEncoder passwordEncoder() {
        return new SimplePasswordEncoder();
    }
    */
    
    @Bean
    PasswordEncoder passwordEncoder() {
    	// 단방향 암호화가 아닌 BCrypt암호화 알고리즘을 사용하기 때문에 
    	// data.sql에 기본 데이터 비밀번호를 넣을 경우 암호화된 비밀번호를 사용하여야 한다.
        return new BCryptPasswordEncoder();
    }
    
}