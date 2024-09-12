package com.fox.fib.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Integer> {
		
	@Transactional
	@Query("SELECT f FROM Faq f ORDER BY f.faq_code DESC")
	Page<Faq> getPageFaqListAll(Pageable pageable);
	
	@Transactional
    @Query("SELECT f FROM Faq f WHERE f.category=:category ORDER BY f.faq_code DESC")
	Page<Faq> getPageFaqList(@Param("category") String category, Pageable pageable);
}


