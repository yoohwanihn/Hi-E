package com.hi_e.attendance;

import java.time.LocalTime;

public enum AttendanceTime {
	ON_TIME(LocalTime.of(9, 0 ,0)),
	OFF_TIME(LocalTime.of(18, 0, 0));
	
	LocalTime localTime;

	private AttendanceTime(LocalTime localTime) {
		this.localTime = localTime;
	}
	
	public LocalTime getLocalTime() {
		return localTime;
	}
}
