package com.hi_e.springsecurity.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hi_e.exception.DuplicateMemberException;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

@Service
public class RegisterMemberService {
	private final PasswordEncoder passwordEncoder;
	private final MemberRepository repository;

	public RegisterMemberService(PasswordEncoder passwordEncoder, MemberRepository repository) {
		this.passwordEncoder = passwordEncoder;
		this.repository = repository;
	}

	public Long join(String email, String ename, String pw, Date birth_day, String phone_number, String address,
			String street_address, String detail_address, String picture) {
		// PasswordEncoder의 encode 함수가 불려 비밀번호를 암호화한 후 DB에 넣도록 세팅.
		Member member = Member.createUser(email, ename, pw, birth_day, phone_number, address, street_address,
				detail_address, picture, passwordEncoder);
		validateDuplicateMember(member);
		repository.save(member);

		return member.getId();
	}

	private void validateDuplicateMember(Member member) {
		repository.findByEmail(member.getEmail()).ifPresent(m -> {
			// throw new IllegalStateException("이미 존재하는 회원입니다.");
			throw new DuplicateMemberException("이미 존재하는 회원입니다.");
		});
	}
}
