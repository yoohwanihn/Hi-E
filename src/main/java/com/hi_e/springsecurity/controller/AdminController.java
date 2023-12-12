package com.hi_e.springsecurity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hi_e.springsecurity.dto.MemberJoinDto;
import com.hi_e.springsecurity.service.MemberService;

@Controller
public class AdminController {

    private final MemberService memberService;

    @Autowired
    public AdminController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/admin/members")
    public String showMembers(Model model, @PageableDefault(page = 1) Pageable pageable) {
    	Page<MemberJoinDto> members = memberService.getAllMembers(pageable);
    	
    	int blockLimit = 7;
    	int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
    	int endPage = Math.min((startPage + blockLimit - 1), members.getTotalPages());
    	
    	
    	model.addAttribute("membersPages", members);
	    model.addAttribute("startPage", startPage);
	    model.addAttribute("endPage", endPage);
	    model.addAttribute("totalMembers", members.getTotalElements());
        return "admin/role-mng";
    }
//    @GetMapping("/test12")
//	public String index(Model model, @PageableDefault(page = 1) Pageable pageable) {
//		Page<PostsResponseDto> postsPages = postsService.paging(pageable);
//
//		/**
//		 * blockLimit : page 개수 설정 현재 사용자가 선택한 페이지 앞 뒤로 3페이지씩만 보여준다. ex : 현재 사용자가 4페이지라면
//		 * 2, 3, (4), 5, 6
//		 */
//		int blockLimit = 7;
//		int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
//		int endPage = Math.min((startPage + blockLimit - 1), postsPages.getTotalPages());
//
//		model.addAttribute("postsPages", postsPages);
//		model.addAttribute("startPage", startPage);
//		model.addAttribute("endPage", endPage);
//		return "board/index";
//	}

}