package com.hi_e.springsecurity.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

@Service
public class MemberService {

	private final MemberRepository repository;

	// 생성자를 통해 의존성 주입
	@Autowired
	public MemberService(MemberRepository repository) {
		this.repository = repository;
	}

	// 이메일에 해당하는 멤버 정보 보내기
	public Optional<Member> findOne(String email) {
		return repository.findByEmail(email);
	}

//    //해당 멤버의 비밀번호가 일치하는지 체크하기(로그인) 시큐리티 사용하고선 쓸 일 없음
//    public boolean isValidMember(String email, String password) {
//        Optional<Member> member = findOne(email);
//        if (member.isPresent()) {
//            return member.get().getPw().equals(password);
//        }
//        return false;
//    }
	
	// PW찾기를 수행해줄 메서드
	public boolean memberEmailCheck(String email, String name) {
		return findOne(email)
				.filter(member -> member.getEname().equals(name))	//입력받은 email을 갖고 있는 DB정보의 이름과 입력받은 이름이 같은지
				.isPresent();	// 그리고 해당 DB가 존재하는지 체크
	}

	// 현재 로그인한 멤버의 Repository 정보
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
			System.out.println(repository.findByEmail(userEmail));
			return repository.findByEmail(userEmail).orElse(null);
		} catch (RuntimeException e) {
			// 예외가 발생한 경우 처리
			e.printStackTrace(); // 예외 처리 추가하기
			return null;
		}
	}

	// 로그인 종류에 따른 Email 추출 메서드
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

}