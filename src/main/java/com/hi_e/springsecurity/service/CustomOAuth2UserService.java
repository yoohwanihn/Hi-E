package com.hi_e.springsecurity.service;

import java.util.Collections;

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

/**
 * OAuth2 로그인 시 사용되는 커스텀한 OAuth2UserService 구현 클래스입니다.
 */
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final MemberRepository memberRepository;
	private final HttpSession httpSession;
	private final PasswordEncoder passwordEncoder;
	
	/**
     * OAuth2 로그인 사용자 정보를 로드하는 메서드입니다.
     *
     * @param userRequest OAuth2 로그인 요청 정보
     * @return OAuth2User 인터페이스를 구현한 객체
     * @throws OAuth2AuthenticationException OAuth2 로그인 인증 예외
     */
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

	/**
     * 소셜 로그인 시 기존 회원이 존재하면 정보를 업데이트하고, 존재하지 않으면 신규 회원으로 등록합니다.
     *
     * @param attributes OAuth 로그인 정보를 담은 객체
     * @return 업데이트 또는 신규 등록된 Member 객체
     */
	private Member saveOrUpdate(OAuthAttributes attributes) {
	    // 이메일을 기반으로 기존 멤버를 조회
		Member member = memberRepository.findByEmail(attributes.getEmail())
				//존재할경우 키,값으로 값을 관리하는 OAuth에 맞춰 업데이트 수행
				.map(entity -> entity.update(
							attributes.getEmail(),
							attributes.getName(),
							attributes.getNameAttributeKey(),
							passwordEncoder))
				//존재하지 않는 신규 로그인일 경우 OAuthAttribute의 toEntity 메서드 활용
				.orElse(attributes.toEntity());
		
		//그렇게 처리한 데이터를 리포지토리 저장
		return memberRepository.save(member);
	}

}
