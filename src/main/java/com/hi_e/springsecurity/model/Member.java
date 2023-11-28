package com.hi_e.springsecurity.model;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.hi_e.role.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data	// Getter, Setter 자동으로 만듬, 추가적으로 RequiredArgsConstructor도
@NoArgsConstructor	// 인자 없는 생성자 만듬
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
    
    private String picture;

    @Builder// 빌더 패턴을 클래스에 추가하여 객체 생성 간소화 용이
    private Member(Long id, String email, String ename, String pw, Role roles, Date birthDay, String phoneNumber, String address, String street_address, String detail_address, String picture) {
        this.id = id;
        this.email = email;
        this.ename = ename;
        this.pw = pw;
        this.roles = roles;
        //this.roles = Role.USER;
        this.birth_day = birthDay;
        this.phone_number = phoneNumber;
        this.address = address;
        this.street_address = street_address;
        this.detail_address = detail_address;
        this.picture = picture;
    }
    
    
    public static Member createUser(String email, String ename, String pw, Date birthDay, String phoneNumber, String address, String street_address, String detail_address, PasswordEncoder passwordEncoder) {
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
                .picture("a")	// 여기 기본이미지 지정하면 됨
                .build();
      //객체로 보내는게 나을거 같은데 귀찮다. 그러면 빌더 패턴을 수정해야하나?
    }
    
    public static Member createUser2(String email, String ename, String password, String picture, PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .ename(ename)
                .pw(passwordEncoder.encode(password)) //암호화한 pw를 pw로 사용
                .roles(Role.USER)	//회원가입은 무조건 USER 계정만 만들어짐. 관리자는 따로 권한 부여해야함.
                .picture(picture)	//OAuth2 프로필 이미지
                .build();
    }
	
//	Member mem = memberRepository.findByEmails(attributes.getEmail())
//			.map(entity -> entity.createMember2(attributes.getNickname(), attributes.getNameAttributeKey(),
//					attributes.getEmail(), attributes.getPhone(), attributes.getPicture(), passwordEncoder))
//			.orElse(attributes.toEntity());
//
//	return memberRepository.save(mem);
    
    public String getRoleKey() {
        return this.roles.getKey();
    }
    
    //OAuth 중복 가입시 데이터 업데이트 수행용 메서드
    public Member update(String email, String ename, String password, String picture, PasswordEncoder passwordEncoder){
    	this.email = email;
        this.ename = ename;
        this.pw = passwordEncoder.encode(password);
        this.picture = picture;

        return this;
    }
    
    //비밀번호 변경용 메서드
    public void update(String password, PasswordEncoder passwordEncoder){
        this.pw = passwordEncoder.encode(password);

    }
    
}


