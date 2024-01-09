package com.hi_e.springsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hi_e.posts.service.PostsService;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.MemberService;

import jakarta.servlet.http.HttpSession;

@Controller
public class IndexController {
	private final MemberService memberService;
	
	@Autowired
	public IndexController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	
	@GetMapping("/index")
	public String index(Model model, HttpSession session) {
		
		Member member = memberService.getCurrentLoggedInMember();
		
		if(member!=null) {
			model.addAttribute("member", member);
			List<Member> januaryBirthday = memberService.getMembersWithJanuaryBirthDay();
			model.addAttribute("januaryBirthdays", januaryBirthday);
	        return "index";
		}
		
		return "/account/login";
	}
	
//	@GetMapping("/mypage")
//    public String myPage(Model model, HttpSession session) {
//        // 현재 로그인 중인 사용자의 Member 엔티티를 가져옴
//		Member member = memberService.getCurrentLoggedInMember();
//		if(member!=null) {
//			String ename = member.getEname();
//			List<Posts> myPosts = postsService.getMyPosts(ename);
//			System.out.println(model.getAttribute("member"));
//			
//
//			model.addAttribute("member", member);
//			model.addAttribute("mypost", myPosts);
//			
//	        return "mypage";
//		}
//    	return "account/login";
//    }
	
}
