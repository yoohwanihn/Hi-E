package com.hi_e.posts.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
