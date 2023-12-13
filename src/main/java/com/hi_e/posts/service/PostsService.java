package com.hi_e.posts.service;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.hi_e.posts.dto.PostsListResponseDto;
import com.hi_e.posts.dto.PostsResponseDto;
import com.hi_e.posts.dto.PostsSaveRequestDto;
import com.hi_e.posts.dto.PostsUpdateRequestDto;
import com.hi_e.posts.entity.Posts;
import com.hi_e.posts.repository.PostsRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * 게시글 서비스 클래스.
 */
@RequiredArgsConstructor
@Service
public class PostsService {
	public final PostsRepository postsRepository;

	/**
	 * 게시글을 저장하는 메서드.
	 *
	 * @param requestDto 저장할 게시글 정보가 담긴 DTO
	 * @return 저장된 게시글의 ID
	 */
	@Transactional
	public Long save(PostsSaveRequestDto requestDto) {
		return postsRepository.save(requestDto.toEntity()).getId();
	}

	/**
	 * 게시글을 수정하는 메서드.
	 *
	 * @param id         수정할 게시글의 ID
	 * @param requestDto 수정할 게시글 정보가 담긴 DTO
	 * @return 수정된 게시글의 ID
	 * @throws IllegalArgumentException 해당 ID에 대한 게시글이 없을 경우 발생
	 */
	@Transactional
	public Long update(Long id, PostsUpdateRequestDto requestDto) {
		Posts posts = postsRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

		posts.update(requestDto.getTitle(), requestDto.getContent());

		return id;
	}

	/**
	 * 글을 삭제하는 메서드.
	 *
	 * @param id 삭제할 글의 식별자
	 * @throws IllegalArgumentException 주어진 id에 해당하는 게시글이 없을 경우 발생
	 */
	@Transactional
	public void delete(Long id) {
		Posts posts = postsRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));
		postsRepository.delete(posts);
	}

	/**
	 * 주어진 ID를 기반으로 게시글을 조회하여 해당 정보를 반환합니다.
	 *
	 * @param id 조회할 게시글의 ID
	 * @return 조회된 게시글 정보를 담은 PostsResponseDto
	 * @throws IllegalArgumentException 해당 ID에 해당하는 게시글이 없는 경우 발생하는 예외
	 */
	@Transactional
	public PostsResponseDto findById(Long id) {
		Posts entity = postsRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다 id=" + id));
		return new PostsResponseDto(entity);
	}
	
	@Transactional
	public Posts findByPostId(Long id) {
        return postsRepository.findById(id).orElse(null);
    }

	/**
	 * 글 정보를 내림차순으로 조회하여 반환하는 메서드.
	 *
	 * @return 글 정보들을 내림차순으로 정렬한 List 형태로 반환
	 */
	@Transactional
	public List<PostsListResponseDto> findAllDesc() {
		return postsRepository.findAllDesc().stream().map(PostsListResponseDto::new).collect(Collectors.toList());
	}

	/**
	 * @param Long id 게시글 번호를 받음
	 * @return 해당하는 글 조회수 리턴
	 */
	@Transactional
	public int updateView(Long id) {
		return postsRepository.updateView(id);
	}

	/**
	 * 페이지 목록을 반환하는 메서드
	 * @param pageable 페이지 및 정렬 정보를 담은 Pageable 객체
	 * @return Page<Posts> 형태의 페이지 목록
	 */
	public Page<PostsResponseDto> paging(Pageable pageable) {
        int page = pageable.getPageNumber() - 1; // page 위치에 있는 값은 0부터 시작한다.
        int pageLimit = 5; // 한페이지에 보여줄 글 개수
 
        // 한 페이지당 5개식 글을 보여주고 정렬 기준은 ID기준으로 내림차순
        Page<Posts> postsPages = postsRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Direction.DESC, "id")));
 
        // 목록 : id, title, content, author, created_date, view
        Page<PostsResponseDto> postsResponseDto = postsPages.map(
                postPage -> new PostsResponseDto(postPage));
 
        return postsResponseDto;
    }
	
	public Page<PostsResponseDto> searchByTitleContainingIgnoreCase(String query, Pageable pageable) {
		int page = pageable.getPageNumber() - 1; // page 위치에 있는 값은 0부터 시작한다.
        int pageLimit = 5; // 한페이지에 보여줄 글 개수
 
        // 한 페이지당 5개식 글을 보여주고 정렬 기준은 ID기준으로 내림차순
        Page<Posts> postsPages = postsRepository.findByTitleContainingIgnoreCase(query, PageRequest.of(page, pageLimit, Sort.by(Direction.DESC, "id")));
	
       
        // 목록 : id, title, content, author, created_date, view
        Page<PostsResponseDto> postsResponseDto = postsPages.map(
                postPage -> new PostsResponseDto(postPage));

        return postsResponseDto;
    }
	
	/* MyPage의 내가 작성한 글을 위한 서비스. ename과 author가 일치. */
	public List<Posts> getMyPosts(String ename) {
		List<Posts> posts = postsRepository.findByAuthor(ename);
		return posts;
	}
}
