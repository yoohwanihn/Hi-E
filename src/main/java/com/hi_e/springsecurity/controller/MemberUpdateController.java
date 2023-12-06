package com.hi_e.springsecurity.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hi_e.springsecurity.dto.ChangePasswordRequestDto;
import com.hi_e.springsecurity.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberUpdateController {

	private final MemberService memberService;

	public MemberUpdateController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	/**
     * 비밀번호 변경
     * @param ChangePasswordRequestDTO 비밀번호 변경 정보
     * @return 변경 응답 상태
     */
	@PostMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequestDto requestDto) {
		try {
			memberService.changePassword(requestDto);
			return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	/**
     * 프로필 사진 등록
     * @param ProfileImage 사진 정보
     * @return 응답 상태
     */
	@PostMapping("/change-profile")
	public ResponseEntity<String> changeProfile(@RequestParam("profileImage") MultipartFile profileImage) {
	    try {
	        memberService.changeProfileImage(profileImage);
	        return ResponseEntity.ok("프로필 이미지가 성공적으로 변경되었습니다.");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 이미지 변경 중에 오류가 발생했습니다.");
	    }
	}
	
	@PostMapping("/delete/{email}")
	public String deleteById(@PathVariable String email, Model model, Principal principal) {
		// 각종 정보 삭제 로직 만들어야함
		
		return null;
	}

}
