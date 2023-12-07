package com.hi_e.posts.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 게시글 수정 요청을 위한 DTO 클래스
 */
@Getter
@NoArgsConstructor
public class PostsUpdateRequestDto {
    private String title;
    private String content;
    private LocalDateTime createdDate;
    
    @Builder
    public PostsUpdateRequestDto(String title, String content, LocalDateTime createdDate){
        this.title=title;
        this.content=content;
        this.createdDate=createdDate;
    }
}
