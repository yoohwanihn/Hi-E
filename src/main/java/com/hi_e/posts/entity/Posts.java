package com.hi_e.posts.entity;

import com.hi_e.date.entity.TimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 게시글 엔티티 클래스
 */
@Getter
@NoArgsConstructor
@Entity
@Table(name="posts")
public class Posts extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)	// 글번호 용
    private long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;
    
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

    @Builder
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }
    
    /**
     * 게시글 정보 업데이트
     * @param title 새로운 제목
     * @param content 새로운 내용
     * @param createdDate 새로운 생성 날짜
     */
    public void update(String title, String content){
        this.title=title;
        this.content=content;
    }
}