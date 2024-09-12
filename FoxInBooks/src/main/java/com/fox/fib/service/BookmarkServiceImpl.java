package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.Bookmark;
import com.fox.fib.repository.BookmarkRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookmarkServiceImpl implements BookmarkService {


	private final BookmarkRepository repository;

	@Override
	public List<Bookmark> selectList(String loginID) {
		return repository.findListByLoginID(loginID);
	}

	@Override
	public int checkDuplicated(String loginID, int product_code) {
		Optional<Bookmark> result = repository.checkByIdPcode(loginID, product_code);
		if (result.isPresent())
			return 1;
		else
			return 0;
	}

	@Override
	public Bookmark selectOne(int product_code) {
		Optional<Bookmark> result = repository.findById(product_code);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	@Override
	public int save(Bookmark entity) {
		repository.save(entity);                             // 저장 또는 수정
		return entity.getProduct_code();                     // 저장후 key return
	}

	@Override
	public int delete(int bookmark_code) {
		int deleteCode = bookmark_code;
		repository.deleteById(bookmark_code);
		return deleteCode;
	}


} // class