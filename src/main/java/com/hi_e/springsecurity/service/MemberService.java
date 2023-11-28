package com.hi_e.springsecurity.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hi_e.springsecurity.model.Member;
import com.hi_e.springsecurity.repository.MemberRepository;

@Service
public class MemberService {
    private final MemberRepository repository;

    
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
    
    public boolean memberEmailCheck(String email, String name) {
        Optional<Member> Member = repository.findByEmail(email);
        
        // 같은 멤버가 존재하는지 체크
        if (Member.isPresent() && Member.get().getEname().equals(name)) {
            return true;
        } else {
            return false;
        }
    }
    
}
