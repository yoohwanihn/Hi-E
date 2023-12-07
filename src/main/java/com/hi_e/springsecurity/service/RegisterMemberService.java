package com.hi_e.springsecurity.service;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hi_e.exception.DuplicateMemberException;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

/**
 * 회원 가입 서비스 클래스입니다.
 */
@Service
public class RegisterMemberService {
	private final PasswordEncoder passwordEncoder;
	private final MemberRepository repository;
	
	/**
     * 생성자로 PasswordEncoder와 MemberRepository를 주입받습니다.
     *
     * @param passwordEncoder 사용할 PasswordEncoder
     * @param repository      사용할 MemberRepository
     */
	public RegisterMemberService(PasswordEncoder passwordEncoder, MemberRepository repository) {
		this.passwordEncoder = passwordEncoder;
		this.repository = repository;
	}
	
	/**
     * 회원 가입을 처리하는 메서드입니다.
     *
     * @param email          이메일
     * @param ename          이름
     * @param pw             비밀번호
     * @param birth_day      생년월일
     * @param phone_number   전화번호
     * @param address        주소
     * @param street_address 도로명 주소
     * @param detail_address 상세 주소
     * @param picture        프로필 사진 경로
     * @return 가입된 회원의 ID
     */
	public Long join(String email, String ename, String pw, Date birth_day, String phone_number, String address,
			String street_address, String detail_address, String picture) {
		// PasswordEncoder의 encode 함수가 불려 비밀번호를 암호화한 후 DB에 넣도록 세팅.
		Member member = Member.createUser(email, ename, pw, birth_day, phone_number, address, street_address,
				detail_address, picture, passwordEncoder);
		validateDuplicateMember(member);
		repository.save(member);

		return member.getId();
	}
	
	/**
     * 회원 중복 체크를 수행하는 메서드입니다.
     *
     * @param member 체크할 회원
     * @throws DuplicateMemberException 이미 존재하는 회원일 경우 발생하는 예외
     */
	private void validateDuplicateMember(Member member) {
		repository.findByEmail(member.getEmail()).ifPresent(m -> {
			// throw new IllegalStateException("이미 존재하는 회원입니다.");
			throw new DuplicateMemberException("이미 존재하는 회원입니다.");
		});
	}
}
