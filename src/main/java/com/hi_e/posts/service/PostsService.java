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

@RequiredArgsConstructor
@Service
public class PostsService {
    public final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto)
    {
        return postsRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto){

        System.out.println("업데이트 확인 1차");
        Posts posts = postsRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다 id=" + id));

        System.out.println("업데이트 확인 2차");
        posts.update(requestDto.getTitle(), requestDto.getContent());
        System.out.println("업데이트 확인 3차");
        return id;
    }

    @Transactional
    public void delete(Long id) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));
        postsRepository.delete(posts);
    }

    @Transactional
    public PostsResponseDto findById(Long id){
        Posts entity = postsRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다 id=" + id));
        return new PostsResponseDto(entity);
    }

    @Transactional
    public List<PostsListResponseDto> findAllDesc() {
        return postsRepository.findAllDesc().stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public List<PostsListResponseDto> searchByTitle(String title) {
        return postsRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }
}

