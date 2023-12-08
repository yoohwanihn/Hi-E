package com.hi_e.posts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hi_e.posts.entity.Comments;

public interface CommentRepository extends JpaRepository<Comments, Long> {
	
}

