package com.hi_e.posts.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.hi_e.posts.dto.PostsResponseDto;
import com.hi_e.posts.service.PostsService;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class IndexController {
    private final PostsService postsService;
    private final MemberService memberService;

    @GetMapping("/test12")
    public String index(Model model) {
        model.addAttribute("posts", postsService.findAllDesc());
        return "board/index";
    }

    @GetMapping("/posts/save")
    public String postsSave(HttpSession session) {
    	Member loggedInMember = memberService.getCurrentLoggedInMember();
    	session.setAttribute("author", loggedInMember.getEname());
        return "board/posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id, Model model, HttpSession session) {
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("postId", dto.getId());
        model.addAttribute("author", dto.getAuthor());
        return "board/posts-update";
    }
    
 
    @GetMapping("/posts/show/{id}")
    public String showPost(@PathVariable Long id, Model model) {
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post", dto);
        
        return "board/posts-show";
    }
    
    @GetMapping("/posts/search")
    public String searchPosts(@RequestParam(name = "query", required = false) String query, Model model) {
        if (query == null) {
            model.addAttribute("posts", postsService.findAllDesc());
        } else {
            model.addAttribute("posts", postsService.searchByTitle(query));
        }
        return "board/index";
    }

}