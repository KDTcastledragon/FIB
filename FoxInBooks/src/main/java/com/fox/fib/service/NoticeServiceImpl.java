package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fox.fib.entity.Notice;
import com.fox.fib.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
	
	private final NoticeRepository repository;
	
	// selectList
	@Override
    public List<Notice> selectList() {
    	return repository.findAll();
    }
	
	// selectOne
    @Override
    public Notice selectOne(int notice_code) {
    	Optional<Notice> result = repository.findById(notice_code);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    	
    // 조회수 업데이트를 위한 update 
 	public void update(int notice_code) {
 		repository.update(notice_code);
 	}
    
    // insert / update
    @Override
	public int save(Notice entity) {
    	repository.save(entity); // 저장 또는 수정
    	return entity.getNotice_code(); // 저장 후 key return
    }
    
    // delete
	@Override
    public int delete(int notice_code) {
    	repository.deleteById(notice_code);
    	return notice_code; // 삭제 후 key return
    }

	// 공지사항 리스트(페이지네이션 적용)
	@Override
	public Page<Notice> getNoticeList(Pageable pageable) {
	    return repository.getNoticeList(pageable);
	}
	
	@Override
	public Page<Notice> getPageNoticeList(String category, Pageable pageable) {
	    return repository.getPageNoticeList(category, pageable);
	}
	

}