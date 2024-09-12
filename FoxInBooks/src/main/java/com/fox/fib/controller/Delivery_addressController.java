package com.fox.fib.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Delivery_address;
import com.fox.fib.entity.User;
import com.fox.fib.service.Delivery_addressService;
import com.fox.fib.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/address")
@AllArgsConstructor
public class Delivery_addressController {
	Delivery_addressService service;
	UserService uservice;

	@PostMapping("selectList")
	public ResponseEntity<List<Delivery_address>> selectAddressList(@RequestBody Delivery_address request) {
		return new ResponseEntity<> (service.selectAddressList(request.getUser_id()), HttpStatus.OK);			
		
	}
	
	@PostMapping("insert")
	public ResponseEntity<User> isnert(@RequestBody Delivery_address request) {
		if (service.dupCheck(request.getAddress_zip(), request.getAddress(), request.getAddress_detail()) != null) {
			return new ResponseEntity<> (HttpStatus.BAD_GATEWAY);
		} else {
			if (request.getBasic_address()) {
				
				User user = uservice.selectOne(request.getUser_id());
				user.setAddress_zip(request.getAddress_zip());
				user.setAddress(request.getAddress());
				user.setAddress_detail(request.getAddress_detail());
				uservice.register(user);
				
				if (service.basicSearch(request.getUser_id()) != null) {
					service.basicUpdate();
				}
			}
			service.register(request);
			return new ResponseEntity<> (uservice.selectOne(request.getUser_id()), HttpStatus.OK);			
		}
	}
	
	@PostMapping("delete")
	public ResponseEntity<String> delete(@RequestBody List<Integer> request) {
		for (int code : request) {
			service.delete(code);
		}
		return new ResponseEntity<> ("삭제 완료", HttpStatus.OK);			
	}
}
