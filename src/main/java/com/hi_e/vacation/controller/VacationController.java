package com.hi_e.vacation.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hi_e.vacation.entity.Vacation;
import com.hi_e.vacation.service.VacationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VacationController {
	
	private final VacationService vacationService;
	
	@PostMapping("/api/vacation")
	public String CreateVacation(Vacation vacation) {
		vacationService.insertVacation(vacation);
		
		System.out.println(vacation);
		return "성공";
	}
}
