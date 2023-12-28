package com.hi_e.vacation;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class Vacation {
	private int vacNum;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private LocalDate reqDate;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private LocalDate vacDate;
    private String reason;
    private float day;
    private float totalVac;
    private String id; // 사번
}
