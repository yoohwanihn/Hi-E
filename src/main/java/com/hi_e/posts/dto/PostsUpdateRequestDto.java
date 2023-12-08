package com.hi_e.posts.dto;

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
    private String modified_date;
    
    @Builder
    public PostsUpdateRequestDto(String title, String content, String modified_date){
        this.title=title;
        this.content=content;
        this.modified_date=modified_date;
    }
}
