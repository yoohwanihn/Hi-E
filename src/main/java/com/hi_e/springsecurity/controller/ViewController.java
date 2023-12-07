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

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/view")

public class ViewController {
	
	private final MemberService memberService;

    @Autowired
    public ViewController(MemberService memberService) {
        this.memberService = memberService;
    }
	
	@GetMapping("/login")
	public String loginPage() {
		return "account/login";
	}

	@GetMapping("/mypage")
    public String myPage(Model model, HttpSession session) {
        // 현재 로그인 중인 사용자의 Member 엔티티를 가져옴
        Member loggedInMember = memberService.getCurrentLoggedInMember();

        if (loggedInMember != null) {
            // Member 엔티티에서 필요한 정보 추출하여 Thymeleaf 모델에 추가
        	session.setAttribute("good", loggedInMember.getEname());
            model.addAttribute("ename", loggedInMember.getEname());
            model.addAttribute("email", loggedInMember.getEmail());
            model.addAttribute("birth_day", loggedInMember.getBirth_day() != null ? loggedInMember.getBirth_day() : "생년월일 없음");
            model.addAttribute("phone_number", loggedInMember.getPhone_number() != null ? loggedInMember.getPhone_number() : "핸드폰 번호 없음");
            model.addAttribute("address", loggedInMember.getAddress() != null ? loggedInMember.getAddress() : "우편번호 없음");
            model.addAttribute("street_address", loggedInMember.getStreet_address() != null ? loggedInMember.getStreet_address() : "주소 없음");
            model.addAttribute("detail_address", loggedInMember.getDetail_address() != null ? loggedInMember.getDetail_address() : "상세주소 없음");
            //session.setAttribute("profileImage1", loggedInMember.getPicture());
            model.addAttribute("profileImage", loggedInMember.getPicture() != null ? loggedInMember.getPicture() : "/img/undraw_profile_1.svg");
        } else {
            // 로그인 안됐을때 로그인 페이지로 이동시키기
        	return "account/login";
        }

        return "mypage";
    }

	@GetMapping("/service-agree")
	public String serviceAgree() {
		return "account/service-agree";
	}

	@GetMapping("/join")
	public String joinPage() {
		return "account/join";
	}

	@GetMapping("/forgot-password")
	public String forgot_passWordPage() {
		return "account/forgot-password";
	}

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

	@GetMapping("/setting/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminSettingPage() {
		return "admin_setting";
	}

	@GetMapping("/setting/user")
	@PreAuthorize("hasRole('USER')")
	public String userSettingPage() {
		return "user_setting";
	}

	@GetMapping("/change-password")
	public String change_passWordPage() {
		return "account/change-password";
	}
	
	@GetMapping("/change-profile")
	public String change_profilePage() {
		return "account/change-profile";
	}
	
	@GetMapping("/test123123")
	public String test123123(HttpSession session, Model model) {
		System.out.println(session);
		Long loginedMemberId = (Long) session.getAttribute("loginedMemberId");
		System.out.println(loginedMemberId);
//		if(loginedMemberId == null) {
//			return "account/login";
//		}
		
		Member loginedMember = memberService.getMemberById(loginedMemberId);
        model.addAttribute("loginedMember", loginedMember);
		
		return "account/test";
	}
}