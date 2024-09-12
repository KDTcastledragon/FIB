package com.fox.fib.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.fox.fib.domain.User_couponId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(User_couponId.class)
public class User_coupon implements Serializable {

	@Id
	private String id;
	
	@Id
	private int coupon_code;
	
	private String start;
	
	private String end;
	
	private boolean use_check;
	
	// LocalDate를 String타입의 컬럼에 저장하기 위한 메서드 ==========================================================
	public void setStart(LocalDate startDate) {
	    // LocalDate가 null인 경우에 대한 예외 처리 추가
	    if (startDate != null) {
	        // LocalDate를 String으로 변환하여 저장
	        this.start = startDate.format(DateTimeFormatter.ISO_DATE);
	    }
	}
	
	public void setEnd(LocalDate endDate) {
	    // LocalDate가 null인 경우에 대한 예외 처리 추가
	    if (endDate != null) {
	        // LocalDate를 String으로 변환하여 저장
	        this.end = endDate.format(DateTimeFormatter.ISO_DATE);
	    }
	}
	
	public LocalDate getStartDate() {
	    // String을 LocalDate로 변환하여 반환
	    return this.start != null ? LocalDate.parse(this.start, DateTimeFormatter.ISO_DATE) : null;
	}

	public LocalDate getEndDate() {
	    // String을 LocalDate로 변환하여 반환
	    return this.end != null ? LocalDate.parse(this.end, DateTimeFormatter.ISO_DATE) : null;
	}
	// ====================================================================================================
}
