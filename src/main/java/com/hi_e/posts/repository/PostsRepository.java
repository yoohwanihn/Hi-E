package com.hi_e.posts.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hi_e.posts.entity.Posts;

/**
 * 게시글 정보를 다루는 Repository 인터페이스입니다.
 */
public interface PostsRepository extends JpaRepository<Posts, Long> {
    
	/**
     * 모든 글을 내림차순으로 조회하는 쿼리입니다.
     *
     * @return 내림차순으로 정렬된 모든 글 목록
     */
	@Query("SELECT p FROM Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();
	
	/**
     * 제목에 특정 단어를 포함하는 글을 대소문자 구분 없이 조회하는 쿼리입니다.
     *
     * @param title 제목에 포함된 단어
     * @return 대소문자 구분 없이 제목에 특정 단어를 포함하는 글 목록
     */
	@Query("SELECT p FROM Posts p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))")
	Page<Posts> findByTitleContainingIgnoreCase(@Param("title") String title, Pageable pageable);
	//List<Posts> findByTitleContainingIgnoreCase(@Param("title") String title);
	
	
	/**
     * 조회수 올려주는 쿼리
     *
     * @param id 게시글 번호
     * @return 대소문자 구분 없이 제목에 특정 단어를 포함하는 글 목록
     */
	@Modifying
	@Query("update Posts p set p.view = p.view + 1 where p.id = :id")
	int updateView(@Param("id") Long id);
}
