package com.hi_e.posts.entity;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)	// 글번호 용
    private long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;
    
    @CreatedDate // Entity가 생성되어 저장될 때 시간 자동 저장
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Builder
    public Posts(String title, String content, String author, LocalDateTime createdDate){
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdDate = createdDate;
    }
    
    /**
     * 게시글 정보 업데이트
     * @param title 새로운 제목
     * @param content 새로운 내용
     * @param createdDate 새로운 생성 날짜
     */
    public void update(String title, String content, LocalDateTime createdDate){
        this.title=title;
        this.content=content;
        this.createdDate=createdDate;
    }
}