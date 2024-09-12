package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fox.fib.entity.Inquiry;
import com.fox.fib.repository.InquiryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {
	
	private final InquiryRepository repository;

	// selectList
	@Override
    public List<Inquiry> selectList() {
    	return repository.findAll();
    }
	
	// selectOne
    @Override
    public Inquiry selectOne(int inquiry_code) {
    	Optional<Inquiry> result = repository.findById(inquiry_code);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    // insert / update
    @Override
	public String save(Inquiry entity) {
    	repository.save(entity); // 저장 또는 수정
    	return entity.getTitle(); // 저장 후 key return
    }
    
    // delete
	@Override
    public int delete(int inquiry_code) {
    	repository.deleteById(inquiry_code);
    	return inquiry_code; // 삭제 후 key return
    }
	
	// 내 문의내역 보기
	@Override
    public Page<Inquiry> getInquiryList(String id, Pageable pageable) {
    	return repository.getInquiryList(id, pageable);
    }
	
	// 관리자페이지 홈화면에서 보이는
	@Override
    public List<Inquiry> getMInquiryList(boolean answer_check) {
    	return repository.getMInquiryList(answer_check);
    }
	
	//  모든 문의내역 보기(페이지네이션 적용) 관리자
	@Override
	public Page<Inquiry> getPageInquiryList(Pageable pageable) {
	    return repository.getPageInquiryList(pageable);
	}

//  내 문의내역 보기(페이지네이션 적용) 관리자
	@Override
	public Page<Inquiry> getUnanswerInquiryList(Boolean answer_check, Pageable pageable) {
	    return repository.getUnanswerInquiryList(answer_check, pageable);
	}
}