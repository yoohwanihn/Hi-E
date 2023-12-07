package com.hi_e.springsecurity.dto;

import java.util.Map;

import com.hi_e.role.Role;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.SendEmailService;

import lombok.Builder;
import lombok.Getter;

/**
 * OAuth2 인증 정보를 담기 위한 DTO (Data Transfer Object) 클래스입니다.
 */
@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;
    private String phone;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey,
                           String name,
                           String email,
                           String phone,
                           String picture){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.picture = picture;
    }
    
    /**
     * OAuth2 인증 제공자별로 인증 정보를 생성합니다.
     *
     * @param registrationId       인증 제공자의 등록 ID
     * @param userNameAttributeName 사용자 이름 속성의 이름
     * @param attributes           인증 정보 맵
     * @return 생성된 OAuthAttributes 객체
     */
    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes){
    	//네이버 카카오 구글마다 지원하는 API Attribute들이 다름. registrationId로 해당하는 API 메서드를 호출하는 방식으로 하였음.
        if("naver".equals(registrationId)) {
            return ofNaver("id", attributes);
        } else if ("kakao".equals(registrationId)) {
            return ofKakao("id", attributes);
        }



        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName,
                                            Map<String, Object> attributes){
    	
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName,
                                           Map<String, Object> attributes){
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .phone((String) attributes.get("phone"))
                .picture((String) response.get("profile_image"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String,Object> properties = (Map<String, Object>) attributes.get("properties");
        Map<String, Object> kakaoAccount  = (Map<String, Object>) attributes.get("kakao_account");
        
        System.out.println(properties);
        System.out.println(kakaoAccount);

        System.out.println(kakaoAccount);
        return OAuthAttributes.builder()
                .email((String) kakaoAccount.get("email"))
                .name((String) properties.get("nickname"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }
    
    /**
     * OAuthAttributes 객체를 Member 엔티티로 변환합니다.
     *
     * @return 변환된 Member 엔티티 객체
     */
    public Member toEntity() {
    	return Member.builder()
                .email(email)
                .pw(SendEmailService.getTempPassword())	// 난수화 했던 것 사용
    			.ename(name)
    			.phoneNumber(phone)
                .picture(picture)
                .roles(Role.USER) // 신규가입은 무조건 USER
                .build();
	}
}
