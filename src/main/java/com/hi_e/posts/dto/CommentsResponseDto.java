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
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//@Getter
//public class CommentsResponseDto {
//	private Long id;
//	private String comment;
//	private String created_date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
//	private String modified_date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
//	private String ename;
//	private Long postId;
//	
//	/* Entity -> Dto */
//	public CommentsResponseDto(Comments comments) {
//		this.id = comments.getId();
//		this.comment = comments.getComment();
//		this.created_date = comments.getCreated_date();
//		this.modified_date = comments.getModified_date();
//		this.ename = comments.getMember().getUsername();
//		this.postId = comments.getPosts().getId();
//	}
//}