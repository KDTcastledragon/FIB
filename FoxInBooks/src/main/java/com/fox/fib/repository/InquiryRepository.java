package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Inquiry;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {

	// 내 문의내역(페이지네이션) 사용자
	@Transactional
	@Query("select i from Inquiry i where i.id = :id ORDER BY i.inquiry_code DESC")
	Page<Inquiry> getInquiryList(@Param("id") String id, Pageable pageable);
	
	// 모든 문의내역(페이지네이션) 관리자
	@Transactional
	@Query("select i from Inquiry i ORDER BY i.inquiry_code DESC")
	Page<Inquiry> getPageInquiryList(Pageable pageable);
	
	// 홈 화면(페이지네이션) 관리자
	@Transactional
	@Query("select i from Inquiry i where i.answer_check=:answer_check ORDER BY i.inquiry_code DESC")
	List<Inquiry> getMInquiryList(@Param("answer_check") boolean answer_check);

	// 답변안된 문의내역(페이지네이션) 관리자
	@Transactional
	@Query("select i from Inquiry i where i.answer_check=:answer_check ORDER BY i.inquiry_code DESC")
	Page<Inquiry> getUnanswerInquiryList(@Param("answer_check") boolean answer_check, Pageable pageable);
}

