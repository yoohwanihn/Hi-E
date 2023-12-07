package com.hi_e.springsecurity.controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hi_e.springsecurity.dto.MailDto;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.SendEmailService;

/**
 * Ajax 비동기 처리를 통해 JSON 데이터를 보내기 때문에 일반 컨트롤러가 아닌 RestController를 사용합니다.
 * 이메일 전송에 관련된 기능을 담당하는 컨트롤러입니다.
 */
@RestController
public class MailController {

    @Autowired
    private SendEmailService sendEmailService;

    /**
     * POST 요청을 통해 회원 정보를 받아 이메일을 전송하는 메서드입니다.
     *
     * @param member 전송할 이메일 및 관련 정보가 담긴 Member 객체
     * @return ResponseEntity<String> 메일 전송 결과에 대한 응답
     */
    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody Member member) {
        try {
            // member 객체에서 필요한 데이터 추출
            String email = member.getEmail();
            String ename = member.getEname();

            // 이메일 및 비밀번호 초기화 링크 생성
            MailDto newMailDto = sendEmailService.createMailAndChangePassword(email, ename);

            // 생성된 링크를 사용하여 이메일 전송
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