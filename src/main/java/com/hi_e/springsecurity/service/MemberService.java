package com.hi_e.springsecurity.service;

import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hi_e.springsecurity.dto.ChangePasswordRequestDto;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

import jakarta.transaction.Transactional;

/**
 * 회원과 관련된 비즈니스 로직을 처리하는 서비스 클래스입니다.
 */
@Service
public class MemberService {

	private final MemberRepository repository;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public MemberService(MemberRepository repository, PasswordEncoder passwordEncoder) {
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
	}

	/**
     * 이메일에 해당하는 멤버 정보를 찾는 메서드입니다.
     *
     * @param email 찾을 멤버의 이메일
     * @return 찾은 멤버의 Optional
     */
	public Optional<Member> findOne(String email) {
		return repository.findByEmail(email);
	}

	/**
     * 입력받은 이메일을 가진 멤버의 이름과 입력받은 이름이 일치하는지 체크하는 메서드입니다.
     *
     * @param email 이메일
     * @param name  이름
     * @return 일치 여부
     */
	public boolean memberEmailCheck(String email, String name) {
		return findOne(email).filter(member -> member.getEname().equals(name)) 
				.isPresent(); // 그리고 해당 DB가 존재하는지 체크
	}

	/**
     * 현재 로그인한 멤버의 정보를 가져오는 메서드입니다.
     *
     * @return 현재 로그인한 멤버
     */
	public Member getCurrentLoggedInMember() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// Spring Security의 SecurityContextHolder를 사용하여 현재 로그인 중인 사용자의 Principal을 가져옴

		if (authentication == null || !authentication.isAuthenticated()) {
			// 사용자가 로그인하지 않은 경우 또는 인증되지 않은 경우
			return null;
		}

		try {
			// Principal에서 사용자의 이름(email)을 가져옴
			String userEmail = extractUserEmail(authentication.getPrincipal());
			// 이메일을 사용하여 Member 엔티티를 찾음
			return repository.findByEmail(userEmail).orElse(null);
		} catch (RuntimeException e) {
			// 예외가 발생한 경우 처리
			e.printStackTrace(); // 예외 처리 추가하기
			return null;
		}
	}

	/**
	 * 로그인 종류에 따라 Email을 추출하는 메서드입니다.
	 *
	 * @param principal 현재 로그인한 사용자의 Principal
	 * @return 추출된 이메일
	 */
	private String extractUserEmail(Object principal) {
		try {
			if (principal instanceof OAuth2User) {
				// OAuth Login을 할 시 OAuth2User 타입을 받게 됨
				return ((OAuth2User) principal).getAttribute("email");
			} else if (principal instanceof UserDetails) {
				// 다른 형태의 사용자 로그인을 처리하는 경우 UserDetails 타입을 받게 됨
				return ((UserDetails) principal).getUsername();
			} else {
				// 기타
				return null;
			}
		} catch (RuntimeException e) {
			// 예외가 발생한 경우 처리
			e.printStackTrace(); // 예외 처리 추가하기
			return null;
		}
	}
	
	/**
	 * 마이페이지에서 비밀번호를 수정하는 메서드입니다.
	 *
	 * @param requestDto 수정할 비밀번호 정보가 담긴 DTO
	 */
	@Transactional
    public void changePassword(ChangePasswordRequestDto requestDto) {
        // 로그인중인지 확인
        //String db_email = SecurityContextHolder.getContext().getAuthentication().getName();
		Member member = getCurrentLoggedInMember();

        if (!passwordEncoder.matches(requestDto.getExPassword(), member.getPw()) || member == null) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호와 확인 비밀번호 일치 여부 확인
        if (!requestDto.getNewPassword().equals(requestDto.getNewPasswordChk())) {
            throw new IllegalArgumentException("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호로 업데이트
        repository.updateUserPassword(member.getEmail(), passwordEncoder.encode(requestDto.getNewPassword()));
    }
	
	/**
	 * 회원의 프로필 이미지를 변경하는 메서드입니다.
	 *
	 * @param uploadFile 변경할 프로필 이미지 파일
	 */
	@Transactional
	public void changeProfileImage(MultipartFile uploadFile) {
	    try {
	        Member member = getCurrentLoggedInMember();
	        String newPicture = saveProfileImage(uploadFile);
	        repository.updateUserProfile(member.getEmail(), newPicture);
	    } catch (Exception e) {
	        e.printStackTrace();
	        // 예외 처리 로직 추가
	    }
	}
	
	/**
	 * 프로필 이미지를 저장하고 해당 경로를 반환하는 메서드입니다.
	 *
	 * @param uploadFile 저장할 이미지 파일
	 * @return 저장된 이미지의 경로
	 */
	@Transactional
	private String saveProfileImage(MultipartFile uploadFile) {
	    // 기존의 이미지 저장 로직을 분리하여 메서드로 만듭니다.
	    // 이 메서드에서 발생한 예외는 상위 메서드로 전파됩니다.

	    String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\img\\";
	    //String fileName = UUID.randomUUID().toString() + "_" + uploadFile.getOriginalFilename();
	    String fileName = UUID.randomUUID().toString() + uploadFile.getOriginalFilename();
	    File saveFile = new File(projectPath, fileName);
	    saveFile.mkdirs(); //관련된 폴더가 없다면 만들어줌
	    try {
			uploadFile.transferTo(saveFile);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    System.out.println("저장 경로: " + saveFile.getAbsolutePath());
	    return "/img/" +fileName;
	}
	
	
	/**
	 * 회원을 삭제하는 메서드입니다. (아직 사용되지 않음)
	 *
	 * @param member 삭제할 회원
	 */
	public void deletemember(Member member) {
		repository.delete(member);
	}
	
	/**
	 * ID를 기반으로 회원 정보를 가져오는 메서드입니다.
	 *
	 * @param id 조회할 회원의 ID
	 * @return 조회된 회원
	 */
	public Member getMemberById(Long id) {
		return repository.findById(id).orElse(null);
	}

}