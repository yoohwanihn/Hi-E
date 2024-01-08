package com.hi_e.vacation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hi_e.vacation.entity.Vacation;

public interface VacationRepository extends JpaRepository<Vacation, Integer> {
	
}
