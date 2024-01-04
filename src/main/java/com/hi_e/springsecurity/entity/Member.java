package com.hi_e.springsecurity.entity;

import java.util.Date;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hi_e.role.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 회원 정보를 나타내는 엔티티 클래스입니다.
 */
@Entity	// DB 테이블과 1:1 매핑
@Data	// Getter, Setter 자동으로 만듬, 추가적으로 RequiredArgsConstructor도
@NoArgsConstructor	// 인자 없는 생성자 만듬
@DynamicInsert // null 제외 쿼리 실행, 쿼리문 성능 향상
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)	//자동 생성 id
    private Long id;

    @Column(unique = true)	// id unique
    private String email;

    @Column(name = "ename")
    private String ename;
    
    @Column(nullable=false)
    private String pw;
    
    @Enumerated(EnumType.STRING)
    private Role roles;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "birth_day")
    private Date birth_day;

    @Column(name = "phone_number")
    private String phone_number;
    
    private String address;				// 우편 번호
    
    private String street_address;		// 지번 주소
	
    private String detail_address;		// 상세 주소
    
    @Column(name = "FILEPATH")
    private String filepath;
    
    @Column(columnDefinition = "varchar(1000) default '/img/undraw_profile_1.svg'")
    private String picture;

    @Builder// 빌더 패턴을 클래스에 추가하여 객체 생성 간소화
    private Member(Long id, String email, String ename, String pw, Role roles, Date birthDay, String phoneNumber, String address, String street_address, String detail_address, String picture) {
        this.id = id;
        this.email = email;
        this.ename = ename;
        this.pw = pw;
        this.roles = roles;
        this.birth_day = birthDay;
        this.phone_number = phoneNumber;
        this.address = address;
        this.street_address = street_address;
        this.detail_address = detail_address;
        this.picture = picture;
    }
    
    /**
     * 회원 정보를 생성하는 정적 팩토리 메서드입니다.
     *
     * @param email             이메일
     * @param ename             사용자 이름
     * @param pw                비밀번호
     * @param birthDay          생년월일
     * @param phoneNumber       전화번호
     * @param address           주소
     * @param street_address    도로명 주소
     * @param detail_address    상세 주소
     * @param picture           프로필 사진 경로
     * @param passwordEncoder   비밀번호 암호화를 위한 PasswordEncoder
     * @return 생성된 Member 객체
     */
    public static Member createUser(String email, String ename, String pw, Date birthDay, String phoneNumber, String address, String street_address, String detail_address, String picture, PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .ename(ename)
                .pw(passwordEncoder.encode(pw)) //암호화한 pw를 pw로 사용
                .roles(Role.USER)	//회원가입은 무조건 USER 계정만 만들어짐. 관리자는 따로 권한 부여해야함.
                .birthDay(birthDay)
                .phoneNumber(phoneNumber)
                .address(address)
                .street_address(street_address)
                .detail_address(detail_address)
                .picture(picture)	// 여기 기본이미지 지정하면 됨
                .build();
    }
    
    /**
     * OAuth2 프로필 정보를 기반으로 하는 회원 정보를 생성하는 정적 팩토리 메서드입니다.
     *
     * @param email             이메일
     * @param ename             사용자 이름
     * @param password          비밀번호
     * @param picture           프로필 사진 경로
     * @param passwordEncoder   비밀번호 암호화를 위한 PasswordEncoder
     * @return 생성된 Member 객체
     */
    public static Member createUser(String email, String ename, String password, String picture, PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .ename(ename)
                .pw(passwordEncoder.encode(password)) //암호화한 pw를 pw로 사용
                .roles(Role.USER)	//회원가입은 무조건 USER 계정만 만들어짐. 관리자는 따로 권한 부여해야함.
                .picture(picture)	//OAuth2 프로필 이미지
                .build();
    }
    
    /**
     * 회원의 권한(Role)을 통해 역할의 키를 반환합니다.
     *
     * @return 권한의 키
     */
    public String getRoleKey() {
        return this.roles.getKey();
    }
    
    /**
     * OAuth 중복 가입 시 데이터 업데이트를 수행하는 메서드입니다.
     *
     * @param email             이메일
     * @param ename             사용자 이름
     * @param password          비밀번호
     * @param picture           프로필 사진 경로
     * @param passwordEncoder   비밀번호 암호화를 위한 PasswordEncoder
     * @return 업데이트된 Member 객체
     */
    public Member update(String email, String ename, String password, PasswordEncoder passwordEncoder){
    	this.email = email;
        this.ename = ename;
        this.pw = passwordEncoder.encode(password);

        return this;
    }
    
    /**
     * 비밀번호를 변경하는 메서드입니다.
     *
     * @param password          새로운 비밀번호
     * @param passwordEncoder   비밀번호 암호화를 위한 PasswordEncoder
     */
    public void update(String password, PasswordEncoder passwordEncoder){
        this.pw = passwordEncoder.encode(password);
    }
    
}