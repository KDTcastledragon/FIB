package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.RecentView;
import com.fox.fib.repository.RecentViewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//@Transactional
@RequiredArgsConstructor
@Service
@Log4j2
public class RecentViewServiceImpl implements RecentViewService {
	private final RecentViewRepository repository;

	@Override
	public List<RecentView> selectListForUserId(String id) {
		return repository.selectListForUserId(id);
	}

	@Override
	public int save(RecentView entity) {
		repository.save(entity);                   // 저장 또는 수정
		return entity.getProduct_code();           // 저장후 key return
	}

	@Override
	public void deleteOldest(String id) {
		repository.deleteOldest(id);
	}

	@Override
	public int checkDuplicated(String id, int product_code) {
		Optional<RecentView> result = repository.checkDuplicated(id, product_code);
		if (result.isPresent())
			return 1;
		else
			return 0;
	}
}