package com.fox.fib.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fox.fib.domain.User_couponId;
import com.fox.fib.entity.Faq;
import com.fox.fib.entity.User_coupon;

public interface User_couponService {

	// ** selectList
	List<User_coupon> selectList();

	// ** selectOne
	User_coupon selectOne(User_couponId user_couponId);

	// ** insert / update
//	String save(Coupon dto);
	int save(User_coupon entity);

	// ** delete
	int delete(User_couponId user_couponId);

	// 유저쿠폰 페이지 네이션
//	Page<User_coupon> getUser_couponList(Pageable pageable);

	// user_id와 coupon_code가 같이 포함되어있는 데이터를 찾기위해
//	boolean existsByCouponCodeAndUserId(int getCouponCode, String getUserId);

}