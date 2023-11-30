package com.hi_e.posts.dto;

import com.hi_e.posts.entity.Posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor // 받을 인자가 없어서 NoArgs
public class PostsSaveRequestDto {
    private String title;
    private String content;
    private String author;
    
    @Builder
    public PostsSaveRequestDto(String title,String content,String author) {
        this.title=title;
        this.content=content;
        this.author=author;
    }
    
    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .author(author)
                .build();
    }
}
