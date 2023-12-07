package com.hi_e.exception;

/**
 * 회원을 찾을 수 없는 경우 발생하는 사용자 정의 예외 클래스
 */
public class NotFoundMemberException extends RuntimeException {

    /**
     * 기본 생성자
     */
    public NotFoundMemberException() {
        super();
    }

    /**
     * 메시지 및 원인을 포함한 생성자
     * 
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public NotFoundMemberException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * 메시지를 포함한 생성자
     * 
     * @param message 예외 메시지
     */
    public NotFoundMemberException(String message) {
        super(message);
    }

    /**
     * 원인을 포함한 생성자
     * 
     * @param cause 예외 원인
     */
    public NotFoundMemberException(Throwable cause) {
        super(cause);
    }
}