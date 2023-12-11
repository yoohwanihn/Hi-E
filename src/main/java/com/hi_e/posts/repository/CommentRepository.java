package com.hi_e.posts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hi_e.posts.entity.Comments;

public interface CommentRepository extends JpaRepository<Comments, Long> {
	List<Comments> findByPostsId(Long postId);
}

