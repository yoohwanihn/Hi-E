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

// Web Layer
// Controller와 JSP 등 뷰 템플릿 영역
// 이외에서 필터, 인터셉터, 컨트롤러 어드바이스 등 외부 요청과 응답에 대한 영역을 의미
@RequiredArgsConstructor
// Controller은 토스해주는 역할
@RestController
public class PostsApiController {
    private final PostsService postsService;

    // PostMapping으로 숨김
    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postsService.save(requestDto);
    }

    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto){
        return postsService.update(id, requestDto);
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id){
        return postsService.findById(id);
    }

    @DeleteMapping("/api/v1/posts/{id}")
    public Long delete(@PathVariable Long id){
        postsService.delete(id);
        System.out.println("삭제 확인");
        return id;
    }
}