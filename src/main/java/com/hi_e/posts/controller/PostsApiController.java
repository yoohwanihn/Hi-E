package com.hi_e.posts.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hi_e.posts.dto.PostsResponseDto;
import com.hi_e.posts.dto.PostsSaveRequestDto;
import com.hi_e.posts.dto.PostsUpdateRequestDto;
import com.hi_e.posts.service.PostsService;

import lombok.RequiredArgsConstructor;

/**
 * 웹 레이어의 컨트롤러 클래스입니다. 컨트롤러는 클라이언트의 요청을 처리하고 응답을 반환하는 역할을 수행합니다. PostMapping,
 * PutMapping, GetMapping, DeleteMapping 어노테이션을 사용하여 각각의 HTTP 메서드에 대한 매핑을 정의합니다.
 */
@RequiredArgsConstructor
@RestController
public class PostsApiController {

	private final PostsService postsService;

	/**
	 * 새로운 게시글을 등록하는 메서드입니다.
	 *
	 * @param requestDto 등록할 게시글 정보를 담은 DTO
	 * @return 등록된 게시글의 ID
	 */
	@PostMapping("/api/v1/posts")
	public Long save(@RequestBody PostsSaveRequestDto requestDto) {
		return postsService.save(requestDto);
	}

	/**
	 * 주어진 ID의 게시글을 수정하는 메서드입니다.
	 *
	 * @param id         수정할 게시글의 ID
	 * @param requestDto 수정할 내용을 담은 DTO
	 * @return 수정된 게시글의 ID
	 */
	@PutMapping("/api/v1/posts/{id}")
	public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
		return postsService.update(id, requestDto);
	}

	/**
	 * 주어진 ID의 게시글을 조회하는 메서드입니다.
	 *
	 * @param id 조회할 게시글의 ID
	 * @return 조회된 게시글 정보를 담은 DTO
	 */
    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        return postsService.findById(id);
    }

	/**
	 * 주어진 ID의 게시글을 삭제하는 메서드입니다.
	 *
	 * @param id 삭제할 게시글의 ID
	 * @return 삭제된 게시글의 ID
	 */
	@DeleteMapping("/api/v1/posts/{id}")
	public Long delete(@PathVariable Long id) {
		postsService.delete(id);
		return id;
	}
}