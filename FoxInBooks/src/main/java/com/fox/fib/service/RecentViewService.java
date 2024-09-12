package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.RecentView;

public interface RecentViewService {
	public List<RecentView> selectListForUserId(String id);

	public int save(RecentView entity);

	public void deleteOldest(String id);

	public int checkDuplicated(String id, int product_code);

}







