package com.fox.fib.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fox.fib.entity.Faq;


public interface FaqService {
	
	// ** selectList
	List<Faq> selectList();

	// ** selectOne
	Faq selectOne(int faq_code);

	// ** insert / update
	String save(Faq entity);

	// ** delete
	int delete(int faq_code);
	
	Page<Faq> getPageFaqListAll(Pageable pageable);
	
	Page<Faq> getPageFaqList(String category, Pageable pageable);


}