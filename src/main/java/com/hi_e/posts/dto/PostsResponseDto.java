package com.hi_e.posts.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.hi_e.posts.entity.Posts;

import lombok.Getter;

/**
 * 게시글 정보를 전송하기 위한 DTO (Data Transfer Object) 클래스입니다.
 */
@Getter
public class PostsResponseDto {

    private Long id;
    private String title;
    private String author;
    private String content;
    private String created_date;
    private int view;
    
    /**
     * 게시글 엔티티를 기반으로하는 수동 생성자입니다.
     *
     * @param entity 게시글 엔티티 객체
     */
    public PostsResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.content = entity.getContent();
        this.created_date = entity.getCreatedDate();
        this.view = entity.getView();
    }
}