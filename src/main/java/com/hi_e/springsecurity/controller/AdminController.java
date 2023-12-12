package com.hi_e.springsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.hi_e.posts.dto.PostsResponseDto;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.MemberService;

@Controller
public class AdminController {

    private final MemberService memberService;

    @Autowired
    public AdminController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/admin/members")
    public String showMembers(@RequestParam(name = "search", required = false) String search, Model model, @PageableDefault(page = 1) Pageable pageable) {
        List<Member> members = memberService.getAllMembers();
        model.addAttribute("members", members);
        return "admin/role-mng";
    }
    
//    public String searchPosts(@RequestParam(name = "query", required = false) String query, Model model, @PageableDefault(page = 1) Pageable pageable) {
//		// 검색어에 따라 페이징된 결과 가져오기
//	    Page<PostsResponseDto> postsPages = postsService.searchByTitleContainingIgnoreCase(query, pageable);
//
//	    
//	    int blockLimit = 7;
//	    int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
//	    int endPage = Math.min((startPage + blockLimit - 1), postsPages.getTotalPages());
//	    
//	    model.addAttribute("postsPages", postsPages);
//	    model.addAttribute("startPage", startPage);
//	    model.addAttribute("endPage", endPage);
//	    model.addAttribute("query", query); // 추가: 검색어도 모델에 추가
//	    
//	    return "board/index";
//	}

    // 추가로 정지 여부를 업데이트하는 핸들러 등을 추가할 수 있습니다.
}