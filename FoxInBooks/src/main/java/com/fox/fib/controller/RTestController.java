package com.fox.fib.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.User;
import com.fox.fib.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/rest")
@AllArgsConstructor
@CrossOrigin
public class RTestController {
	UserService service;
	
	@GetMapping("/login")
	public String login(Model model, User entity, HttpServletRequest request) {
				
		return "/user/login";
	}
}
