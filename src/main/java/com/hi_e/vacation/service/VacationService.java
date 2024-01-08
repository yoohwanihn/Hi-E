package com.hi_e.vacation.service;

import org.springframework.stereotype.Service;

import com.hi_e.vacation.entity.Vacation;
import com.hi_e.vacation.repository.VacationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacationService {
	
	private final VacationRepository vacationRepository;
	
	public void insertVacation(Vacation vacation) {
		vacationRepository.save(vacation);
	}
}
