package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.domain.PasswordUpdateDTO;
import com.fox.fib.entity.Coupon;
import com.fox.fib.entity.Delivery_address;
import com.fox.fib.entity.User;
import com.fox.fib.service.CouponService;
import com.fox.fib.service.Delivery_addressService;
import com.fox.fib.service.UserService;
import com.fox.fib.util.RandomPasswordCreator;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	UserService service;
	Delivery_addressService dservice;
	CouponService cservice;
	PasswordEncoder passwordEncoder;
//	------------------------------
//	// ** 로그인
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User request) {
		String id = request.getId();
		String password = request.getPassword();	
		
		User entity = service.selectOne(id);
		
		if (entity != null && passwordEncoder.matches(password, entity.getPassword())) {
			return new ResponseEntity<>(entity, HttpStatus.OK);
		} else if (entity == null) {
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
//	-----------------------------------
	// ** 회원가입
	
	@PostMapping("join")
	public ResponseEntity<String> join(@RequestBody User request) {
		
		request.setPassword(passwordEncoder.encode(request.getPassword()));
		
		if (!request.getAddress_zip().equals("") && !request.getAddress().equals("") && !request.getAddress_detail().equals("")) {
			Delivery_address delivery = new Delivery_address();
			delivery.setUser_id(request.getId());
			delivery.setName(request.getName());
			delivery.setAddress_zip(request.getAddress_zip());
			delivery.setAddress(request.getAddress());
			delivery.setAddress_detail(request.getAddress_detail());
			delivery.setAddress_as("기본 배송지");
			delivery.setBasic_address(true);
			delivery.setPhone_number(request.getPhone_number());
			
			dservice.register(delivery);
		}
		
		if (service.selectOne(request.getId()) == null) {
			service.register(request);
			return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("이미 존재하는 아이디입니다.", HttpStatus.UNAUTHORIZED);
		}
	}
	
	// ** 아이디 중복 체크
	@PostMapping("/idDupCheck")
	public ResponseEntity<String> idDupCheck(@RequestBody User request) {
		User check = service.selectOne(request.getId());
		
		if (check != null) {
			return new ResponseEntity<> ("중복 아이디입니다.", HttpStatus.BAD_GATEWAY);
		} else {
			return new ResponseEntity<> ("사용 가능한 아이디입니다.", HttpStatus.OK);
		}
	}
	
//	---------------------------------
	// ** 회원정보 수정
	
	@PostMapping("/update")
	public ResponseEntity<User> memberUpdate(
            @RequestParam(value="uploadfilef", required=false) MultipartFile uploadfilef,
            @RequestParam("password") String password,
            @ModelAttribute User user
    ) throws IOException {
		String realPath = "D:\\JinHyuk_Ahn\\finalProject\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
		String file1, file2="resources/uploadImages/basicman4.png";
		// => new Image 를 선택한 경우에만 처리하면 됨 
		if ( uploadfilef != null && !uploadfilef.isEmpty() ) {
			
			// => 물리적위치에 저장 (file1)
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성
			uploadfilef.transferTo(new File(file1)); // IO 발생: Checked Exception 처리  
			
			// => Table 저장경로 완성 (file2)
			file2="resources/uploadImages/" + uploadfilef.getOriginalFilename();
			user.setProfile_image(file2);
		} else {
			user.setProfile_image(service.selectOne(user.getId()).getProfile_image());
		}
		
		if (passwordEncoder.matches(password, service.selectOne(user.getId()).getPassword())) {				
			try {
				service.register(user);
				return new ResponseEntity<> (service.selectOne(user.getId()), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
		} else {
			return new ResponseEntity<> (HttpStatus.BAD_GATEWAY);
		}
	}
	
//	-----------------------
	// ** 쿠폰 리스트 출력
	@PostMapping("/userCouponList")
	public ResponseEntity<List<Coupon>> userCouponList(@RequestBody User request) {
		List<Integer> codes = service.userCouponCodeList(request.getId());		
		List<Coupon> userCoupon = new ArrayList<>();
		
		for (int i: codes) {
			Coupon coupon = service.userCoupon(i);
			coupon.setEnd(service.endDate(i, request.getId()));
			
			if (!service.useCheck(i, request.getId())) {				
				userCoupon.add(coupon);
			}
		}	
		return new ResponseEntity<> (userCoupon, HttpStatus.OK);
	}

//	-----------------------
	// ** 아이디 찾기
	@PostMapping("/findId")
	public ResponseEntity<String> findId(@RequestBody User request) {
		String res = service.findId(request.getName(), request.getBirthday(), request.getPhone_number());
		if (res != null) {
			return new ResponseEntity<> (res, HttpStatus.OK);
		} else {
			return new ResponseEntity<> ("입력하신 정보가 일치하지 않습니다.", HttpStatus.BAD_GATEWAY);
		}
	}
	
//	-----------------------
	// ** 비밀번호 찾기(재설정)
	@Autowired
	private JavaMailSender emailSender;
	
	@PostMapping("findPassword")
	public ResponseEntity<String> findPassword(@RequestBody User request) {
		User user = service.selectOne(request.getId());
		
		if (user.getId().equals(request.getId()) 
				&& user.getName().equals(request.getName())
				&& user.getBirthday().equals(request.getBirthday())
				&& user.getPhone_number().equals(request.getPhone_number())) {
			
			String randomPassword = RandomPasswordCreator.generateRandomPassword(8);
			
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setFrom("ajh975@naver.com");
	        message.setTo(request.getId());
	        message.setSubject(request.getName() + "님의 임시 비밀번호입니다.");
	        message.setText(randomPassword);
	        emailSender.send(message);
	        
	        System.out.println(randomPassword);
	        
	        service.passwordUpdate(passwordEncoder.encode(randomPassword), request.getId());

	        return new ResponseEntity<>("아이디(메일)로 임시 비밀번호가 발급되었습니다.", HttpStatus.OK);
		} else {			
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	    
	}
	
//	----------------------
	// ** 비밀번호 변경
	@PostMapping("/passwordUpdate")
	public ResponseEntity<String> passwordUpdate(@RequestBody PasswordUpdateDTO request) {
		if (passwordEncoder.matches(request.getPassword(), service.selectOne(request.getId()).getPassword())) {
			service.passwordUpdate(passwordEncoder.encode(request.getNewPassword()), request.getId());
			return new ResponseEntity<> ("비밀번호가 변경되었습니다.", HttpStatus.OK);
		} else {			
			return new ResponseEntity<> ("비밀번호가 다릅니다.", HttpStatus.BAD_GATEWAY);
		}
	}
	
//	-----------------------
	// ** 회원 탈퇴
	@PostMapping("/delete")
	public ResponseEntity<String> delete(@RequestBody User request) {

		if (passwordEncoder.matches(request.getPassword(), service.selectOne(request.getId()).getPassword())) {
			dservice.deleteIdAddress(request.getId());
			service.delete(request.getId());
			return new ResponseEntity<> ("탈퇴되었습니다", HttpStatus.OK);
		} else {
			return new ResponseEntity<String> ("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_GATEWAY);
		}
	}
}
