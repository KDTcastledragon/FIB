package com.fox.fib.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fox.fib.service.User_couponService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/userCoupon")
@AllArgsConstructor
public class User_couponController {
	
	User_couponService service;
	
	// userCouponList 
	@GetMapping("/userCouponList")
	public void userCouponList(Model model) {
		model.addAttribute("userCouponList", service.selectList());
	}

}
