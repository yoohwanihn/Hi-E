package com.hi_e.springsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hi_e.posts.entity.Posts;
import com.hi_e.posts.service.PostsService;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.MemberService;

import jakarta.servlet.http.HttpSession;

/**
 * 뷰 관련 엔드포인트 및 사용자 인터페이스 상호작용을 처리하는 컨트롤러 클래스입니다.
 */
@Controller
public class MypageController {

	private final MemberService memberService;
	private final PostsService postsService;
	
	@Autowired
	public MypageController(MemberService memberService, PostsService postsService) {
		this.memberService = memberService;
		this.postsService = postsService;
	}

	/**
	 * 사용자 개인 페이지를 표시합니다.
	 *
	 * @param model   Thymeleaf 뷰를 렌더링하기 위한 모델.
	 * @param session 추가 속성을 저장하기 위한 HTTP 세션.
	 * @return 사용자 개인 페이지 뷰 이름.
	 */
	@GetMapping("/mypage")
    public String myPage(Model model, HttpSession session) {
        // 현재 로그인 중인 사용자의 Member 엔티티를 가져옴
		Member member = memberService.getCurrentLoggedInMember();
		if(member!=null) {
			String ename = member.getEname();
			List<Posts> myPosts = postsService.getMyPosts(ename);
			System.out.println(model.getAttribute("member"));
			

			model.addAttribute("member", member);
			model.addAttribute("mypost", myPosts);
			
	        return "mypage";
		}
    	return "account/login";
    }
	
}