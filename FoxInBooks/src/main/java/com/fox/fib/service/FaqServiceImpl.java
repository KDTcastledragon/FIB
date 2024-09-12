package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fox.fib.entity.Faq;
import com.fox.fib.repository.FaqRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FaqServiceImpl implements FaqService {
	
	private final FaqRepository repository;
	
	// selectList
	@Override
    public List<Faq> selectList() {
    	return repository.findAll();
    }
	
	// selectOne
    @Override
    public Faq selectOne(int faq_code) {
    	Optional<Faq> result = repository.findById(faq_code);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    // insert / update
    @Override
	public String save(Faq entity) {
    	repository.save(entity); // 저장 또는 수정
    	return entity.getTitle(); // 저장 후 key return
    }
    
    // delete
	@Override
    public int delete(int faq_code) {
    	repository.deleteById(faq_code);
    	return faq_code; // 삭제 후 key return
    }
	
	// 분류별 faq 보기
//	@Override
//	public Page<Faq> getFaqList(String category){
//		return repository.getFaqList(category);
//	}
	
	// faq 보기(페이지네이션 적용)
	@Override
	public Page<Faq> getPageFaqListAll(Pageable pageable) {
	    return repository.getPageFaqListAll(pageable);
	}
	
	// 분류별 faq 보기(페이지네이션 적용)
	@Override
	public Page<Faq> getPageFaqList(String category, Pageable pageable) {
	    return repository.getPageFaqList(category, pageable);
	}
		

}