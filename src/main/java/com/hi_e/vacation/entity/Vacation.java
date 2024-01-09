package com.hi_e.vacation.entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vacation")
public class Vacation {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int holiday_no;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(pattern="yyyy-MM-dd", timezone="Asia/Seoul")
	private LocalDate reqDate;
	
	private String ename; 
	
	private String dept_name; //소속 부서
	
	@Column(name="vacation_type")
	private String vacation_type; 
	
	@Column(name="holiday_start")
	private String holiday_start;
	
	private String holiday_end; 
	
	@Column(length = 500, nullable = false)
	private String reason;
}
