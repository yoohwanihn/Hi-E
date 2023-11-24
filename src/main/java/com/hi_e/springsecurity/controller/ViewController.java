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

//    @GetMapping("/dashboard")
//    public String dashboardPage(Model model) {
//        return "dashboard";
//    }
    
    @GetMapping("/dashboard")
    public String dashboardPage(@AuthenticationPrincipal Object principal, Model model) {
        if (principal instanceof User) {
        	//Form Login을 할 시 User 타입을 받게 됨.
            User user = (User) principal;
            model.addAttribute("loginEmail", user.getUsername());
            model.addAttribute("loginRoles", user.getAuthorities());
        } else if (principal instanceof OAuth2User) {
        	//OAuth2.0 Login을 할 시 OAuth2User 타입을 받게 됨
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