package com.hi_e.attendance;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.Locale;

import com.hi_e.springsecurity.entity.Member;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "att_id")
    private Long attID;

    private LocalDate attDate;
    private LocalTime attOnTime;
    private LocalTime attOffTime;
    @Enumerated(EnumType.STRING)
    private AttendanceStatus attStatus;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name="emp_id")
    private Member member;

    public void changeAttOnTime(LocalTime attOnTime) {
        this.attOnTime = attOnTime;
    }

    public void changeAttOffTime(LocalTime attOffTime) {this.attOffTime = attOffTime; }

    public void changeAttStatus(AttendanceStatus attStatus) {
        this.attStatus = attStatus;
    }

    @Builder
    public Attendance(LocalDate attDate, LocalTime attOnTime, LocalTime attOffTime, AttendanceStatus attStatus, Member member){
        this.attDate = attDate;
        this.attOnTime = attOnTime;
        this.attOffTime = attOffTime;
        this.attStatus = attStatus;
        this.member = member;
    }

    public AttendanceDTO.Index entityToIndex(){
        return AttendanceDTO.Index.builder()
            .attDate(getAttDate())
            .dayOfWeek(getAttDate().getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN))
            .ename(getMember().getEname())
            //.deptName(getMember().getDepartment().getDeptName())
            //.empPosition(getMember().getEmpPosition().getPosition())
            .attOnTime(getAttOnTime())
            .attOffTime(getAttOffTime())
            .attStatus(getAttStatus())
            .build();
    }
}
