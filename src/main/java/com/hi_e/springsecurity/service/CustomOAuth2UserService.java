package com.hi_e.springsecurity.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.hi_e.springsecurity.dto.OAuthAttributes;
import com.hi_e.springsecurity.dto.SessionMember;
import com.hi_e.springsecurity.entity.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final MemberRepository memberRepository;
	private final HttpSession httpSession;
	private final PasswordEncoder passwordEncoder;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);

		// 현재 진행중인 서비스를 구분하기 위해 문자열로 받음.
		// oAuth2UserRequest.getClientRegistration().getRegistrationId()에 값이 들어있다.
		// {registrationId='naver'} 이런식으로
		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		// OAuth2 로그인 시 키 값이 된다. 구글은 키 값이 "sub"이고, 네이버는 "response"이고, 카카오는 "id"이다. 각각
		// 다르므로 이렇게 따로 변수로 받아서 넣어줘야함.
		String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint()
				.getUserNameAttributeName();

		// OAuth2 로그인을 통해 가져온 OAuth2User의 attribute를 담아주는 of 메소드.
		OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,
				oAuth2User.getAttributes());

		Member member = saveOrUpdate(attributes);

		/* 세션 정보를 저장하는 직렬화된 dto 클래스 */
		httpSession.setAttribute("user", new SessionMember(member));

		return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(member.getRoleKey())),
				attributes.getAttributes(), attributes.getNameAttributeKey());
	}

//	private Member saveOrUpdate(OAuthAttributes attributes) {
//		Member member = memberRepository.findByEmail(attributes.getEmail());
//		if (member != null) {
//			Member mem = memberRepository.findByEmail(attributes.getEmail())
//           .map(entity -> entity.update( 
//                 attributes.getName(), 
//                 attributes.getPicture())
//           .orElse(attributes.toEntity());
//
//           return memberRepository.save(mem);
//		} else {
//
//			Member mem = memberRepository.findByEmail(attributes.getEmail())
//					.map(entity -> entity.createMember2(attributes.getNickname(), attributes.getNameAttributeKey(),
//						attributes.getEmail(), attributes.getPhone(), attributes.getPicture(), passwordEncoder))
//					.orElse(attributes.toEntity());
//
//			return memberRepository.save(mem);
//		}
//	}

	/* 소셜로그인시 기존 회원이 존재하면 수정날짜 정보만 업데이트해 기존의 데이터는 그대로 보존 
	 * 리팩토링 하였고 기존의 코드는 주석처리 하였음
	 */
//	private Member saveOrUpdate(OAuthAttributes attributes) {
//		Optional<Member> member = memberRepository.findByEmail(attributes.getEmail());
//		if (member.isPresent()) {
//			// 기존 회원이 존재할 경우 업데이트
//			Member updateMember = member.get().update(attributes.getEmail(), attributes.getName(),
//					attributes.getNameAttributeKey(), attributes.getPicture(), passwordEncoder);
//
//			return memberRepository.save(updateMember);
//		} else {
//			// 기존 회원이 없을 경우 새로 생성하기
//
//			Member newMember = memberRepository.findByEmail(attributes.getEmail())
//					.map(entity -> entity.update(attributes.getEmail(), 
//							attributes.getName(),
//							attributes.getNameAttributeKey(), 
//							attributes.getPicture(), 
//							passwordEncoder))
//					.orElse(attributes.toEntity());
//
//			return memberRepository.save(newMember);
//		}
//	}
	
	private Member saveOrUpdate(OAuthAttributes attributes) {
	    // 이메일을 기반으로 기존 멤버를 조회
	    return memberRepository.findByEmail(attributes.getEmail())
	            // 기존 멤버가 존재하는 경우 업데이트 수행
	            .map(existingMember -> updateExistingMember(existingMember, attributes))
	            // 기존 멤버가 없는 경우 새로운 멤버 생성
	            .orElse(createNewMember(attributes));
	}

	/* 기존 멤버를 업데이트하는 메서드 */
	private Member updateExistingMember(Member existingMember, OAuthAttributes attributes) {
	    return existingMember.update(attributes.getEmail(), attributes.getName(),
	            attributes.getNameAttributeKey(), attributes.getPicture(), passwordEncoder);
	}

	/* 새로운 멤버를 생성하는 메서드 */
	private Member createNewMember(OAuthAttributes attributes) {
	    return attributes.toEntity();
	}

}
