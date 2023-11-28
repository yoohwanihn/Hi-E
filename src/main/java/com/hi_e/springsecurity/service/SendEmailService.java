package com.hi_e.springsecurity.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hi_e.springsecurity.dto.MailDto;
import com.hi_e.springsecurity.model.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SendEmailService {

	@Autowired
	MemberRepository repository;

	private JavaMailSender mailSender;
	private static final String FROM_ADDRESS = "Hi-E";
	private PasswordEncoder passwordEncoder;

	public MailDto createMailAndChangePassword(String email, String ename) {
        String newPassword = getTempPassword();
        MailDto dto = new MailDto();
        dto.setAddress(email);
        dto.setTitle(ename + "님의 Hi-E 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. Hi-E 임시비밀번호 안내 관련 이메일 입니다. [" + ename + "] "
                + "님의 임시 비밀번호는 " + newPassword + " 입니다. 로그인 이후 꼭 비밀번호를 변경해주시기 바랍니다.");

        // 비밀번호 업데이트
        updatePassword(newPassword, email, ename);

        return dto;
    }

//	public void updatePassword(String newPassword, String userEmail) {
//        Optional<Member> optionalMember = repository.findByEmail(userEmail);
//
//        if (optionalMember.isPresent()) {
//            Member member = optionalMember.get();
//            member.update(newPassword, passwordEncoder);
//            repository.save(member);
//        } else {
//            // 해당 email이 없을 경우 예외 처리 로직 추가하기
//            System.out.println("해당 email이 없습니다."); // sysout보단 로깅을 통해 확인하는게 좋다. log4j와 같은 것 나중에 꼭 공부하자
//            throw new NoSuchElementException("해당 email이 없습니다.");
//        }
//    }
	
	public void updatePassword(String newPassword, String userEmail, String userName) {
	    Optional<Member> optionalMember = repository.findByEmailAndEname(userEmail, userName);

	    if (optionalMember.isPresent()) {
	        Member member = optionalMember.get();
	        member.update(newPassword, passwordEncoder);
	        repository.save(member);
	    } else {
	        // 해당 email과 이름이 일치하는 회원이 없을 경우 예외 처리 로직 추가
	        System.out.println("해당 email과 이름이 일치하는 회원이 없습니다."); 
	        throw new NoSuchElementException("해당 email과 이름이 일치하는 회원이 없습니다.");
	    }
	}
	
	//11자리의 랜덤난수를 생성하는 메소드
	public String getTempPassword() {
	    char[] charSet = new char[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
	            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', '|',
	            ':', ';', '<', '>', ',', '.', '?'};

	    StringBuilder password = new StringBuilder();

	    // 최소 1개의 특수문자와 1개의 문자, 1개의 숫자를 갖는 11자리 랜덤 문자열 생성
	    password.append(charSet[(int) (charSet.length * Math.random())]); // 특수문자
	    password.append(charSet[10 + (int) (26 * Math.random())]); // 문자
	    password.append(charSet[0 + (int) (10 * Math.random())]); // 숫자

	    // 나머지 8개의 문자는 랜덤으로 선택
	    for (int i = 2; i < 10; i++) {
	        password.append(charSet[(int) (charSet.length * Math.random())]);
	    }

	    return password.toString();
	}
	
	public void mailSend(MailDto mailDto){
        System.out.println("이메일 전송 완료");	//테스트 후 지움. 해당 email이 없는데 이게 왜 뜨지 예외처리 해야할듯
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setFrom(SendEmailService.FROM_ADDRESS);
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());

        mailSender.send(message);
    }
}