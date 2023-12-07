package com.hi_e.exception;

/**
 * 중복 회원 예외를 나타내는 사용자 정의 예외 클래스
 */
public class DuplicateMemberException extends RuntimeException {
	
	/**
     * 기본 생성자
     */
    public DuplicateMemberException() {
        super();
    }
    
    /**
     * 메시지 및 원인을 포함한 생성자
     * 
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public DuplicateMemberException(String message, Throwable cause) {
        super(message, cause);
    }
    
    /**
     * 메시지를 포함한 생성자
     * 
     * @param message 예외 메시지
     */
    public DuplicateMemberException(String message) {
        super(message);
    }

    /**
     * 원인을 포함한 생성자
     * 
     * @param cause 예외 원인
     */
    public DuplicateMemberException(Throwable cause) {
        super(cause);
    }
}
