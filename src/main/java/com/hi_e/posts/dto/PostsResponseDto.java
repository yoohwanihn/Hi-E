package com.hi_e.posts.dto;

import com.hi_e.posts.entity.Posts;

import lombok.Getter;

@Getter
public class PostsResponseDto {

    private Long id;
    private String title;
    private String author;
    private String content;
    
    // RequiredArgs로 데이터를 받는것 보다 수동 생성자로 객체를 받는게 좋음
    public PostsResponseDto(Posts entity){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.content = entity.getContent();
    }
}
