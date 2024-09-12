package com.fox.fib.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fox.fib.entity.Coupon;
import com.fox.fib.entity.Faq;

public interface CouponService {

	// ** selectList
	List<Coupon> selectList();

	// ** selectOne
	Coupon selectOne(int coupon_code);

	// ** insert / update
//	String save(Coupon dto);
	int save(Coupon entity);

	// ** delete
//	int delete(Coupon coupon_code);
	int delete(int coupon_code);

	Page<Coupon> getPageCouponList(Pageable pageable);
}