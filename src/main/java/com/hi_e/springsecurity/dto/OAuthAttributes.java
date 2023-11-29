package com.hi_e.springsecurity.dto;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.hi_e.role.Role;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.service.SendEmailService;

import lombok.Builder;
import lombok.Getter;
// 처음 가입할 때
@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;
    private String phone;
    private PasswordEncoder passwordEncoder;

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
    
    //네이버 카카오 구글마다 지원하는 API Attribute들이 다름. registrationId로 해당하는 API 메서드를 호출하는 방식으로 하였음.
    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes)
    {
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
                                           Map<String, Object> attributes)
    {
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
