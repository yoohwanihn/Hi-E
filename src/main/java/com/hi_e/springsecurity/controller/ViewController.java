package com.hi_e.springsecurity.controller;

import java.util.Collection;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.hi_e.springsecurity.model.Member;
import com.hi_e.springsecurity.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/view")
public class ViewController {
	
	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}

	@GetMapping("/mypage")
	public String testPage(Model model) {
		// 인증된 사용자의 정보를 ename으로 사용 이메일로는 쉬운데 이름으로 어떻게 하지
		model.addAttribute("ename", SecurityContextHolder.getContext().getAuthentication().getAuthorities());
		return "mypage";
	}

	@GetMapping("/service-agree")
	public String serviceAgree() {
		return "service-agree";
	}

	@GetMapping("/join")
	public String joinPage() {
		return "join";
	}

	@GetMapping("/forgot-password")
	public String forgot_passWordPage() {
		return "forgot-password";
	}

	@GetMapping("/test11")
	public String test11() {
		return "test11";
	}

//    // 이메일 보내기
//    @Transactional
//    @PostMapping("/sendEmail")
//    public String sendEmail(@RequestParam("memberEmail") String memberEmail){
//        MailDto dto = ms.createMailAndChangePassword(memberEmail);
//        ms.mailSend(dto);
//
//        return "/member/login";
//    }

	@GetMapping("/test22")
	public String test1() {
		return "test22";
	}
	
	@GetMapping("/test33")
	public String test31() {
		return "test33";
	}

//	// Email과 name의 일치여부를 check하는 컨트롤러
//	@GetMapping("/findPw")
//    public @ResponseBody Map<String, Boolean> pwFind(String email, String ename) {
//		MemberService memberService = null;
//        Map<String, Boolean> json = new HashMap<>();
//        boolean pwFindCheck = memberService.memberEmailCheck(email, ename);
//
//        System.out.println(pwFindCheck);
//        json.put("check", pwFindCheck);
//        return json;
//    }
//
//	// 등록된 이메일로 임시비밀번호를 발송하고 발송된 임시비밀번호로 사용자의 pw를 변경하는 컨트롤러
//	@PostMapping("/findPw/sendEmail")
//	public @ResponseBody void sendEmail(String userEmail, String userName) {
//		SendEmailService sendEmailService = null;
//		MailDto dto = sendEmailService.createMailAndChangePassword(userEmail, userName);
//		sendEmailService.mailSend(dto);
//
//	}

//    @GetMapping("/pwd_result")
//    public String findPwdCheck(HttpServletRequest request, Model model,
//			@RequestParam String id, @RequestParam String ename,@RequestParam String email, 
//			Member dto) {
//		try {
//			MemberService ms;
//			dto.setEname(ename);
//			dto.setEmail(email);
//			int search = ms.pwdCheck(dto);
//
//			if(search == 0) {
//				model.addAttribute("msg", "기입된 정보가 잘못되었습니다. 다시 입력해주세요.");
//			}
//
//			String newPwd = RandomStringUtils.randomAlphanumeric(10);
//			dto.setPwd(newPwd);
//			ms.pwdUpdate(dto);
//			model.addAttribute("newPwd", newPwd);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			model.addAttribute("msg", "오류가 발생되었습니다.");
//		}
//		return "member/findPwdResult";
//	}
	
//    @GetMapping("/dashboard")
//    public String dashboardPage(Model model) {
//        return "dashboard";
//    }

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
}