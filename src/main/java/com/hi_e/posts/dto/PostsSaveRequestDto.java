package com.hi_e.posts.dto;

import java.time.LocalDateTime;

import com.hi_e.posts.entity.Posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 게시글 등록을 위한 DTO (Data Transfer Object) 클래스입니다.
 */
@Getter
@NoArgsConstructor 
public class PostsSaveRequestDto {
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdDate;

    /**
     * 빌더 패턴을 활용한 생성자입니다.
     *
     * @param title       게시글 제목
     * @param content     게시글 내용
     * @param author      게시글 작성자
     * @param createdDate 게시글 작성일
     */
    @Builder
    public PostsSaveRequestDto(String title, String content, String author, LocalDateTime createdDate) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdDate = createdDate;
    }

    /**
     * Posts 엔티티로 변환하는 메서드입니다.
     *
     * @return Posts 엔티티 객체
     */
    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .author(author)
                .createdDate(createdDate)
                .build();
    }
}