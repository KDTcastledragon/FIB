package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Coupon;
import com.fox.fib.entity.User;

public interface UserService {
	// ** 로그인 / 회원가입 / 회원정보
	
	String register(User entity);
	User selectOne(String id);
	
	// ** 관리자 기능
	List<User> selectList();
	String delete(String id);
	
	public User updateUserPoint(int pointParam, String userId);
	public String findId(String name, String birthday, String phone_number);
	public int passwordUpdate(String password, String id);
	public List<Integer> userCouponCodeList(String id);
	public Coupon userCoupon(int code);
	public String endDate(int code, String id);
	public Boolean useCheck(int code, String id);
}
