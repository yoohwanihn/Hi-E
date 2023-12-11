package com.hi_e.posts.dto;

import com.hi_e.posts.entity.Comments;

import lombok.Getter;

@Getter
public class CommentsResponseDto {
	private String writer;
    private String content;


    public CommentsResponseDto(Comments comments) {
        this.writer = comments.getComment_writer();
        this.content = comments.getComment_contents();
    }
}