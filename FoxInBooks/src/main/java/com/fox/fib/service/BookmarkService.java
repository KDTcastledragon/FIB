package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Bookmark;

public interface BookmarkService {
	public List<Bookmark> selectList(String loginID);

	public int checkDuplicated(String loginID, int product_code);

	// ============================================================================================

	public Bookmark selectOne(int bookmark_code);

	public int save(Bookmark entity);

	public int delete(int bookmark_code);


}