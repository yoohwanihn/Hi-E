package com.hi_e.attendance;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class AttendanceDTO {
	
	@Builder
	@Getter @Setter
	public static class Index{
		private LocalDate attDate;
        private LocalTime attOnTime;
        private LocalTime attOffTime;
        private AttendanceStatus attStatus;
        private String ename;
        private String empPosition;
        private String deptName;
        private String dayOfWeek;
	}
	
	@Builder
    @Getter @Setter
    public static class Status {
        private int onCnt;
        private int offCnt;
        private int absenceCnt;
        private int lateCnt;
        private int vacationCnt;
        private int sickCnt;
    }

    @Getter @Setter
    public static class StatusAndIndexWithPage {
        private AttendanceDTO.Status status;
        private List<Index> attendanceList;
    }
}
