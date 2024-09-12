package com.fox.fib.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

//** BaseEntity
//=> 많이 사용되는 자료 등록시간, 수정시간 등 자동으로 추가되고 변경되는 값들을 
//	 자동으로 처리하기위한 BaseEntity 클래스 
//=> 추상클래스로 작성     
//=> @MappedSuperclass: 테이블로 생성되지않음
//=> @EntityListeners : 엔티티객체의 변화를 감지하는 리스너설정 (AuditingEntityListener.class 가 담당)
//  AuditingEntityListener 를 활성화 시키기 위해서는 
//   DemoJpaApplication.java 에 @EnableJpaAuditing 설정추가해야함.
//=> @CreatedDate, @LastModifiedDate : 생성일자, 수정일자 자동등록시 사용

@MappedSuperclass
@EntityListeners(value={AuditingEntityListener.class})
@Getter
@Setter
abstract class BaseEntity {

	@CreatedDate
	@Column(name="regdate", updatable=false)
//	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate regdate;
	
	@LastModifiedDate
	@Column(name="moddate")
//	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate moddate;
}
