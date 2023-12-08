//package com.hi_e.posts.dto;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//
//import org.springframework.security.core.userdetails.User;
//
//import com.hi_e.posts.entity.Comments;
//import com.hi_e.posts.entity.Posts;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class CommentsRequestDto {
//	private Long id;
//	private String comment;
//	private String created_date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
//	private String modified_date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
//	private User member;
//	private Posts posts;
//	
//	/* Dto -> Entity */
//	public Comments toEntity() {
//		Comments comments = Comments.builder()
//				.id(id)
//				.comment(comment)
//				.created_date(created_date)
//				.modified_date(modified_date)
//				.member(member)
//				.posts(posts)
//				.build();
//		return comments;
//	}
//}