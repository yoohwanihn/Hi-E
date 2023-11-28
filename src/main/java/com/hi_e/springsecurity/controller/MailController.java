package com.hi_e.springsecurity.controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hi_e.springsecurity.dto.MailDto;
import com.hi_e.springsecurity.model.Member;
import com.hi_e.springsecurity.service.SendEmailService;

//Ajax 비동기 처리를 통해 JSON 데이터를 보내기 때문에 일반 컨트롤러가 아닌 RestController 사용
@RestController
public class MailController {

	@Autowired
	private SendEmailService sendEmailService;

//    @PostMapping("/sendEmail")
//    public String sendEmail(@RequestParam("email") String memberEmail,
//                            @RequestParam("ename") String memberName) {
//        try {
//           //메일을 생성하고 임시 비밀번호를 이메일로 전송
//            MailDto mailDto = sendEmailService.createMailAndChangePassword(memberEmail, memberName);
//            sendEmailService.mailSend(mailDto);
//
//            //메일 전송 성공
//            return "redirect:/send_email";
//        } catch (NoSuchElementException e) {
//            // 해당 email이 없는 경우 
//            return "이메일과 이름이 일치하지 않거나 해당 이메일이 존재하지 않습니다.";
//        } catch (Exception e) {
//            // 그 외 예외 발생 시 예외 페이지로 리다이렉트
//            return "redirect:/exception_page";
//        }
//    }
    
//    @PostMapping("/send_email")
//    public String email_success(){
//    	return "send_email";
//    }

//	@PostMapping("/sendEmail")
//	public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> requestData) {	
//		//JSON 값이기 때문에 Map으로 받음. 키와 벨류(속성 값 쌍)
//	    try {
//	        // 메일을 생성하고 임시 비밀번호를 이메일로 전송
//	        String memberEmail = requestData.get("email");
//	        String memberName = requestData.get("ename");
//
//	        MailDto mailDto = sendEmailService.createMailAndChangePassword(memberEmail, memberName);
//	        sendEmailService.mailSend(mailDto);
//	        
//	        System.out.println(memberEmail);
//	        System.out.println(memberName);
//
//	        // 메일 전송 성공
//	        return ResponseEntity.ok("success");
//	    } catch (NoSuchElementException e) {
//	        // 해당 email이 없는 경우
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일과 이름이 일치하지 않거나 해당 이메일이 존재하지 않습니다.");
//	    } catch (Exception e) {
//	        // 그 외 예외 발생 시 예외 페이지로 리다이렉트
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
//	    }
//	}
	
//	@PostMapping("/sendEmail")
//    public ResponseEntity<String> sendEmail(@RequestBody Member member) {
//        try {
//            // 메일을 생성하고 임시 비밀번호를 이메일로 전송
//            String email = member.getEmail();
//            String name = member.getEname();
//
//            System.out.println(email);
//            System.out.println(name);
//
//            MailDto newMailDto = sendEmailService.createMailAndChangePassword(email, name);
//            sendEmailService.mailSend(newMailDto);
//
//            // 메일 전송 성공
//            return ResponseEntity.ok("success");
//        } catch (NoSuchElementException e) {
//            // 해당 email이 없는 경우
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일과 이름이 일치하지 않거나 해당 이메일이 존재하지 않습니다.");
//        } catch (Exception e) {
//            // 그 외 예외 발생 시 예외 페이지로 리다이렉트
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
//        }
//    }
	
	@PostMapping("/sendEmail")
	public ResponseEntity<String> sendEmail(@RequestBody Member member) {
	    try {
	        // member 객체에서 필요한 데이터 추출
	        String email = member.getEmail();
	        String ename = member.getEname();

	        MailDto newMailDto = sendEmailService.createMailAndChangePassword(email, ename);
	        sendEmailService.mailSend(newMailDto);

	        // 메일 전송 성공
	        return ResponseEntity.ok("success");
	    } catch (NoSuchElementException e) {
	        // 해당 email이 없는 경우
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일과 이름이 일치하지 않거나 해당 이메일이 존재하지 않습니다.");
	    } catch (Exception e) {
	        // 그 외 예외 발생 시 예외 페이지로 리다이렉트
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
	    }
	}
}