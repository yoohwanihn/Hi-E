package com.hi_e.springsecurity.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.MemberService;

/**
 * 뷰 관련 엔드포인트 및 사용자 인터페이스 상호작용을 처리하는 컨트롤러 클래스입니다.
 */
@Controller
@RequestMapping("/view")
public class ViewController {

	private final MemberService memberService;

	@Autowired
	public ViewController(MemberService memberService) {
		this.memberService = memberService;
	}

	/**
	 * 로그인 페이지를 표시합니다.
	 *
	 * @return 로그인 페이지 뷰 이름.
	 */
	@GetMapping("/login")
	public String loginPage() {
		return "account/login";
	}

	/**
	 * 서비스 동의 페이지를 표시합니다.
	 *
	 * @return 서비스 동의 페이지 뷰 이름.
	 */
	@GetMapping("/service-agree")
	public String serviceAgree() {
		return "account/service-agree";
	}

	/**
	 * 회원가입 페이지를 표시합니다.
	 *
	 * @return 회원가입 페이지 뷰 이름.
	 */
	@GetMapping("/join")
	public String joinPage() {
		return "account/join";
	}

	/**
	 * 비밀번호 찾기 페이지를 표시합니다.
	 *
	 * @return 비밀번호 찾기 페이지 뷰 이름.
	 */
	@GetMapping("/forgot-password")
	public String forgot_passWordPage() {
		return "account/forgot-password";
	}

	/**
	 * 대시보드 페이지를 표시합니다.
	 *
	 * @param principal 현재 사용자의 인증 주체.
	 * @param model     Thymeleaf 뷰를 렌더링하기 위한 모델.
	 * @return 대시보드 페이지 뷰 이름.
	 */
	@GetMapping("/dashboard")
	public String dashboardPage(@AuthenticationPrincipal Object principal, Model model) {
		if (principal instanceof User) {
			// Form Login을 할 시 User 타입을 받게 됨.
			User user = (User) principal;
			model.addAttribute("loginEmail", user.getUsername());
			model.addAttribute("loginRoles", user.getAuthorities());
		} else if (principal instanceof OAuth2User) {
			// OAuth2.0 Login을 할 시 OAuth2User 타입을 받게 됨
			OAuth2User oauth2User = (OAuth2User) principal;
			String loginEmail = oauth2User.getAttribute("email");
			Collection<? extends GrantedAuthority> loginRoles = oauth2User.getAuthorities();

			model.addAttribute("loginEmail", loginEmail);
			model.addAttribute("loginRoles", loginRoles);
		}
		return "dashboard";
	}

	/**
	 * 관리자 설정 페이지를 표시합니다.
	 *
	 * @return 관리자 설정 페이지 뷰 이름.
	 */
	@GetMapping("/setting/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminSettingPage() {
		return "admin_setting";
	}

	/**
	 * 사용자 설정 페이지를 표시합니다.
	 *
	 * @return 사용자 설정 페이지 뷰 이름.
	 */
	@GetMapping("/setting/user")
	@PreAuthorize("hasRole('USER')")
	public String userSettingPage() {
		return "user_setting";
	}

	/**
	 * 비밀번호 변경 페이지를 표시합니다.
	 *
	 * @return 비밀번호 변경 페이지 뷰 이름.
	 */
	@GetMapping("/change-password")
	public String change_passWordPage() {
		return "account/change-password";
	}

	/**
	 * 프로필 변경 페이지를 표시합니다.
	 *
	 * @return 프로필 변경 페이지 뷰 이름.
	 */
	@GetMapping("/change-profile")
	public String change_profilePage() {
		return "account/change-profile";
	}
	
	@GetMapping("/nav")
	public String nav() {
		return "nav";
	}
	
	@GetMapping("/nav2")
	public String nav2() {
		return "nav2";
	}
	
	@GetMapping("/remove")
	public String remove(){
		return "account/remove/remove";
	}
	
	@GetMapping("/survey")
	public String survey(Model model){
		Member member = memberService.getCurrentLoggedInMember();
		model.addAttribute("member",member);
		
		return "account/remove/survey";
	}
}