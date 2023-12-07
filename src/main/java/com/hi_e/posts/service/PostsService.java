package com.hi_e.posts.service;

import java.util.List;
import java.util.stream.Collectors;

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
     * @param id          수정할 게시글의 ID
     * @param requestDto  수정할 게시글 정보가 담긴 DTO
     * @return 수정된 게시글의 ID
     * @throws IllegalArgumentException 해당 ID에 대한 게시글이 없을 경우 발생
     */
    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        posts.update(requestDto.getTitle(), requestDto.getContent(), requestDto.getCreatedDate());

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
    public PostsResponseDto findById(Long id){
        Posts entity = postsRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다 id=" + id));
        return new PostsResponseDto(entity);
    }

    /**
     * 글 정보를 내림차순으로 조회하여 반환하는 메서드.
     *
     * @return 글 정보들을 내림차순으로 정렬한 List 형태로 반환
     */
    @Transactional
    public List<PostsListResponseDto> findAllDesc() {
        return postsRepository.findAllDesc().stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }
    
    
    /**
     * @param String title 검색할 제목을 받음.
     * @return 제목에 해당하는 글 정보를 내림차순으로 반환
     */
    @Transactional
    public List<PostsListResponseDto> searchByTitle(String title) {
        return postsRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }
}

