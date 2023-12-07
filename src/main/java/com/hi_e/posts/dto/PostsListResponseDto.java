package com.hi_e.posts.dto;

import java.time.LocalDateTime;

import com.hi_e.posts.entity.Posts;

import lombok.Getter;

/**
 * 게시글 목록 조회를 위한 응답 DTO (Data Transfer Object) 클래스입니다.
 */
@Getter
public class PostsListResponseDto {
    private Long id;
    private String title;
    private String author;
    private LocalDateTime createdDate;

    /**
     * 게시글 엔티티를 기반으로하는 수동 생성자입니다.
     *
     * @param entity 게시글 엔티티 객체
     */
    public PostsListResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.createdDate = entity.getCreatedDate();
    }
}