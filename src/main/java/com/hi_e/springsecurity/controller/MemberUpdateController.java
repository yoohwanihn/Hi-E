package com.hi_e.springsecurity.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hi_e.springsecurity.dto.ChangePasswordRequestDto;
import com.hi_e.springsecurity.service.MemberService;


/**
 * Member의 정보를 수정하는 API들을 담당하는 컨트롤러입니다.
 * 
 */
@RestController
@RequestMapping("/api")
public class MemberUpdateController {

	private final MemberService memberService;

	public MemberUpdateController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	/**
     * 비밀번호 변경 API
     *
     * @param requestDto ChangePasswordRequestDto: 비밀번호 변경 정보 DTO
     * @return ResponseEntity<String>: 변경 성공 여부에 따른 응답 상태
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
     * 프로필 사진 변경 API
     *
     * @param profileImage MultipartFile: 사진 정보
     * @return ResponseEntity<String>: 변경 성공 여부에 따른 응답 상태
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
	
	/**
	 * 이메일을 기반으로 사용자를 삭제하기 위한 HTTP POST 요청을 처리합니다.
	 *
	 * @param email     삭제할 사용자의 이메일입니다.
	 * @param model     뷰에 데이터를 전달하기 위한 Spring MVC 모델입니다.
	 * @param principal 현재 인증된 사용자를 나타냅니다.
	 * @return 삭제 프로세스의 결과를 나타내는 문자열이거나 해당하지 않는 경우 null을 반환합니다.
	 */
	@PostMapping("/delete/{email}")
	public String deleteById(@PathVariable String email, Model model, Principal principal) {
		// 각종 정보 삭제 로직 만들어야함
		
		return null;
	}
}
