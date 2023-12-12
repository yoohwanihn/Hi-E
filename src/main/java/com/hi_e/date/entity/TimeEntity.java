package com.hi_e.date.entity;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)	// 일반 Entity 어노테이션을 사용하면 @CreatedDate를 사용 못함
public abstract class TimeEntity {
	
	@Column(name = "created_date")
	@CreatedDate
	public String createdDate;
	
	@Column(name = "modified_date")
	@LastModifiedDate
	private String modifiedDate;
	
	//PrePersist : 해당 엔티티를 저장하기 이전에 실행된다.
	@PrePersist
	public void onPrePersist() {
		this.createdDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
		this.modifiedDate = this.createdDate;
	}
	
	//PreUpdate : 해당 엔티티를 업데이트 하기 이전에 실행된다.
	@PreUpdate
	public void onPreUpdate() {
		this.createdDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
	}
}
