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

/**
 * 웹 레이어의 인덱스 컨트롤러 클래스입니다.
 * Controller 어노테이션을 사용하여 해당 클래스가 컨트롤러임을 명시합니다.
 */
@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;
    private final MemberService memberService;

    /**
     * "/test12" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다.
     * 모든 게시글을 조회하고 뷰에 전달한 후, "board/index" 뷰를 반환합니다.
     *
     * @param model Spring MVC 모델
     * @return "board/index" 뷰
     */
    @GetMapping("/test12")
    public String index(Model model) {
        model.addAttribute("posts", postsService.findAllDesc());
        
        return "board/index";
    }

    /**
     * "/posts/save" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다.
     * 현재 로그인한 회원의 정보를 세션에 저장하고, "board/posts-save" 뷰를 반환합니다.
     *
     * @param session HttpSession 객체
     * @return "board/posts-save" 뷰
     */
    @GetMapping("/posts/save")
    public String postsSave(HttpSession session) {
        Member loggedInMember = memberService.getCurrentLoggedInMember();
        session.setAttribute("author", loggedInMember.getEname());
        return "board/posts-save";
    }

    /**
     * "/posts/update/{id}" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다.
     * 주어진 ID에 해당하는 게시글을 조회하고, 해당 게시글의 정보를 모델에 추가한 후 "board/posts-update" 뷰를 반환합니다.
     *
     * @param id     조회할 게시글의 ID
     * @param model  Spring MVC 모델
     * @param session HttpSession 객체
     * @return "board/posts-update" 뷰
     */
    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id, Model model, HttpSession session) {
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("postId", dto.getId());
        model.addAttribute("author", dto.getAuthor());
        return "board/posts-update";
    }

    /**
     * "/posts/show/{id}" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다.
     * 주어진 ID에 해당하는 게시글을 조회하고, 해당 게시글의 정보를 모델에 추가한 후 "board/posts-show" 뷰를 반환합니다.
     *
     * @param id    조회할 게시글의 ID
     * @param model Spring MVC 모델
     * @return "board/posts-show" 뷰
     */
    @GetMapping("/posts/show/{id}")
    public String showPost(@PathVariable Long id, Model model) {
        postsService.updateView(id);
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post", dto);
        
        return "board/posts-show";
    }

    /**
     * "/posts/search" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다.
     * 쿼리 파라미터로 전달된 검색어를 이용하여 게시글을 검색하고, 검색 결과를 모델에 추가한 후 "board/index" 뷰를 반환합니다.
     *
     * @param query 검색어
     * @param model Spring MVC 모델
     * @return "board/index" 뷰
     */
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