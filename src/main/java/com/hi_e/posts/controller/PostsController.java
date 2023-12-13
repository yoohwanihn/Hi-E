package com.hi_e.posts.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.hi_e.posts.dto.CommentsRequestDto;
import com.hi_e.posts.dto.PostsResponseDto;
import com.hi_e.posts.entity.Comments;
import com.hi_e.posts.entity.Posts;
import com.hi_e.posts.service.CommentsService;
import com.hi_e.posts.service.PostsService;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

/**
 * 웹 레이어의 인덱스 컨트롤러 클래스입니다. Controller 어노테이션을 사용하여 해당 클래스가 컨트롤러임을 명시합니다.
 */
@RequiredArgsConstructor
@Controller
public class PostsController {

	private final PostsService postsService;
    private final CommentsService commentsService;
	private final MemberService memberService;

	/**
	 * "/test12" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다. 모든 게시글을 조회하고 뷰에 전달한 후, "board/index"
	 * 뷰를 반환합니다.
	 *
	 * @param model Spring MVC 모델
	 * @return "board/index" 뷰
	 */
	@GetMapping("/test12")
	public String index(Model model, @PageableDefault(page = 1) Pageable pageable) {
		Page<PostsResponseDto> postsPages = postsService.paging(pageable);

		/**
		 * blockLimit : page 개수 설정 현재 사용자가 선택한 페이지 앞 뒤로 3페이지씩만 보여준다. ex : 현재 사용자가 4페이지라면
		 * 2, 3, (4), 5, 6
		 */
		int blockLimit = 7;
		int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
		int endPage = Math.min((startPage + blockLimit - 1), postsPages.getTotalPages());

		model.addAttribute("postsPages", postsPages);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		return "board/index";
	}

	/**
	 * "/posts/save" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다. 현재 로그인한 회원의 정보를 세션에 저장하고,
	 * "board/posts-save" 뷰를 반환합니다.
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
	 * "/posts/update/{id}" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다. 주어진 ID에 해당하는 게시글을 조회하고,
	 * 해당 게시글의 정보를 모델에 추가한 후 "board/posts-update" 뷰를 반환합니다.
	 *
	 * @param id      조회할 게시글의 ID
	 * @param model   Spring MVC 모델
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
	 * @param id       조회할 게시글의 ID
	 * @param model    Spring MVC 모델
	 * @param request  HTTP 요청 객체
	 * @param response HTTP 응답 객체
	 * @return "board/posts-show" 뷰
	 */
	@GetMapping("/posts/show/{id}")
	public String showPost(@PathVariable Long id, Model model, HttpServletRequest request, HttpServletResponse response) {
	    // 이전에 생성한 쿠키를 확인하고, 중복 조회를 방지하기 위해 업데이트합니다.
	    Cookie oldCookie = null;
	    Cookie[] cookies = request.getCookies();
	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            if (cookie.getName().equals("postView")) {
	                oldCookie = cookie;
	            }
	        }
	    }
	    if (oldCookie != null) {
	        if (!oldCookie.getValue().contains("["+ id +"]")) {
	            // 중복 조회가 아닌 경우 조회 수 업데이트
	            postsService.updateView(id);
	            oldCookie.setValue(oldCookie.getValue() + "_[" + id + "]");
	            oldCookie.setPath("/");
	            oldCookie.setMaxAge(60 * 60 * 24);
	            response.addCookie(oldCookie);
	        }
	    } else {
	        // 기존 쿠키가 없는 경우 조회 수 업데이트
	        postsService.updateView(id);
	        Cookie newCookie = new Cookie("postView", "[" + id + "]");
	        newCookie.setPath("/");
	        newCookie.setMaxAge(60 * 60 * 24);
	        response.addCookie(newCookie);
	        System.out.println(newCookie);
	    }
	    
	    // 현재 로그인한 회원 정보 가져오기
	    Member loggedInMember = memberService.getCurrentLoggedInMember();
	    
	    // 조회한 게시글과 댓글 목록을 모델에 추가
	    PostsResponseDto dto = postsService.findById(id);
	    List<Comments> comments = commentsService.getCommentsByPostId(id);
	    
	    model.addAttribute("post", dto);
	    model.addAttribute("comments", comments);
	    
	    // 로그인한 회원의 이름을 모델에 추가
	    model.addAttribute("ename", loggedInMember.getEname());

	    return "board/posts-show";
	}

	/**
	 * "/posts/search" 경로로 GET 요청이 들어왔을 때의 처리 메서드입니다. 쿼리 파라미터로 전달된 검색어를 이용하여 게시글을
	 * 검색하고, 검색 결과를 모델에 추가한 후 "board/index" 뷰를 반환합니다.
	 *
	 * @param query 검색어
	 * @param model Spring MVC 모델
	 * @return "board/index" 뷰
	 */
	@GetMapping("/posts/search")
	public String searchPosts(@RequestParam(name = "query", required = false) String query, Model model, @PageableDefault(page = 1) Pageable pageable) {
		// 검색어에 따라 페이징된 결과 가져오기
	    Page<PostsResponseDto> postsPages = postsService.searchByTitleContainingIgnoreCase(query, pageable);

	    
	    int blockLimit = 7;
	    int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
	    int endPage = Math.min((startPage + blockLimit - 1), postsPages.getTotalPages());
	    
	    model.addAttribute("postsPages", postsPages);
	    model.addAttribute("startPage", startPage);
	    model.addAttribute("endPage", endPage);
	    model.addAttribute("query", query); 
	    
	    return "board/index";
	}
	
	/**
	 * 댓글을 추가하는 메서드입니다.
	 *
	 * @param postId       댓글이 속한 게시물의 ID
	 * @param requestDto   댓글 내용과 작성자 정보가 담긴 DTO (Data Transfer Object)
	 * @return             댓글이 추가된 후 해당 게시물 페이지로의 리다이렉션을 반환합니다.
	 */
	@PostMapping("/api/add-comment")
	public String addComment(@RequestParam("postId") Long postId, @ModelAttribute CommentsRequestDto requestDto) {
		Posts post = postsService.findByPostId(postId);
	    commentsService.saveComment(post, requestDto);

	    return "redirect:/posts/show/" + postId;
	}
}