package com.hi_e.springsecurity.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hi_e.springsecurity.model.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

@Service
public class MemberService {
    private final MemberRepository repository;

    @Autowired
    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public Optional<Member> findOne(String email) {
        return repository.findByEmail(email);
    }

    public boolean isValidMember(String email, String password) {
        Optional<Member> member = findOne(email);
        if (member.isPresent()) {
            return member.get().getPw().equals(password);
        }
        return false;
    }
}
