package com.hi_e.springsecurity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.hi_e.role.Role;
import com.hi_e.springsecurity.dto.MemberJoinDto;
import com.hi_e.springsecurity.service.MemberService;

@Controller
public class AdminController {

    private final MemberService memberService;

    @Autowired
    public AdminController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/members")
    public String showMembers(Model model, @PageableDefault(page = 1) Pageable pageable) {
    	Page<MemberJoinDto> members = memberService.getAllMembers(pageable);
    	
    	int blockLimit = 7;
    	int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
    	int endPage = Math.min((startPage + blockLimit - 1), members.getTotalPages());
    	
    	
    	model.addAttribute("membersPages", members);
	    model.addAttribute("startPage", startPage);
	    model.addAttribute("endPage", endPage);
	    model.addAttribute("totalMembers", members.getTotalElements());
        return "admin/role-mng";
    }
    
	@GetMapping("/admin/members/search")
	public String searchShowMembers(@RequestParam(name = "roleFilter", required = false) String roleFilter, 
									@RequestParam(name = "nameFilter", required = false) String nameFilter, 
									@RequestParam(name = "search", required = false) String search, Model model, 
									@PageableDefault(page = 1) Pageable pageable) {
		Page<MemberJoinDto> members ;
		if(nameFilter.equals("사번")) {
			//사번 검색
			members = memberService.getMembersById(Long.parseLong(search), roleFilter, pageable);
		}
		else {
			//사번 검색이 아니면 이름 검색 밖에 없음
			members = memberService.getMembersByName(search, roleFilter, pageable);
		}
    	int blockLimit = 7;
    	int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
    	int endPage = Math.min((startPage + blockLimit - 1), members.getTotalPages());
    	
    	model.addAttribute("membersPages", members);
	    model.addAttribute("startPage", startPage);
	    model.addAttribute("endPage", endPage);
	    model.addAttribute("totalMembers", members.getTotalElements());
        return "admin/role-mng";
	}
    
    @PostMapping("/admin/update")
    public String updateMemberRole(@RequestParam("memberId") Long memberId, @RequestParam("action") String action) {
        if ("관리자 등록".equals(action)) {
            memberService.updateMemberRole(memberId, Role.ADMIN);
        } else if ("정지시키기".equals(action)) {
            memberService.updateMemberRole(memberId, Role.BANNED);
        } 

        return "redirect:/admin/members";
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/groups")
    public String showGroups() {
    	return "admin/group-mng";
    }

}