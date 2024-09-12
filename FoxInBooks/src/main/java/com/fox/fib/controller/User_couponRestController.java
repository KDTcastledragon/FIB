package com.fox.fib.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.User_coupon;
import com.fox.fib.service.User_couponService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/restuserCoupon")
@AllArgsConstructor
public class User_couponRestController {
	
	User_couponService service;
	
	// userCouponList 
	@GetMapping("/userCouponList")
	public List<User_coupon> userCouponList() {
		return service.selectList();
	}

}
