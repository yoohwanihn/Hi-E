package com.hi_e.posts.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "comments")
public class Comments{
    // 댓글번호, 작성자, 내용, 원글
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private Long id;    
    
    
    @Column
    private String comment_writer;
    
    @Column
    private String comment_contents;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posts_id") // 부모테이블(참조하고자 하는 테이블)의 pk 컬럼 이름을 작성한다.
    private Posts posts; // 참조하고자 하는 테이블을 관리하는 Entity
    
    /* 상속 고려 하기 */
    
    @Column(name = "created_date")
	@CreatedDate
	private String created_date;
	
	@Column(name = "modified_date")
	@LastModifiedDate
	private String modified_date;
}
