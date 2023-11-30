package com.hi_e.posts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hi_e.posts.entity.Posts;

public interface PostsRepository extends JpaRepository<Posts, Long> {
    //글목록 내림차순으로 받기
	@Query("SELECT p FROM Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();
}
