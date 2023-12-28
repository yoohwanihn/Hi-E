package com.hi_e.schedule;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Event {
	private String title;
	private LocalDate date;
}
