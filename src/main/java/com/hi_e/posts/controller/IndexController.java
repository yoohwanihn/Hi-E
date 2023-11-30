package com.hi_e.posts.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hi_e.posts.dto.PostsResponseDto;
import com.hi_e.posts.service.PostsService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class IndexController {
    private final PostsService postsService;
    @GetMapping("/test12")
    public String index(Model model)
    {
        model.addAttribute("posts", postsService.findAllDesc());
        return "board/index";
    }

    @GetMapping("/posts/save")
    public String postsSave()
    {
        return "board/posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id, Model model) {
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post", dto);
        return "board/posts-update";
    }

}