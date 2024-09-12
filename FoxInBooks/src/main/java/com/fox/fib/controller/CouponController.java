package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.Coupon;
import com.fox.fib.entity.Faq;
import com.fox.fib.entity.Notice;
import com.fox.fib.service.CouponService;
import com.fox.fib.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Controller
@RequestMapping("/coupon")
@AllArgsConstructor
@Log4j2
public class CouponController {
	
	CouponService service;

	// ** couponList
	@GetMapping("/couponList")
	public void couponList(HttpServletRequest request, Model model, Coupon entity) {
		model.addAttribute("couponList", service.selectList());
	}
	
	// 쿠폰 등록하기 get
	@GetMapping(value="/couponRegister")
	public void couponRegister() {
	}
	
	// ** 쿠폰 등록하기 post
	@PostMapping("/couponRegister")
	public String couponRegister(HttpServletRequest request, Coupon entity, Model model)  throws IOException {
		String uri = "/coupon/couponRegister";
		
		// 프론트엔드 리액트 이미지폴더 주소
		String realPath = "C:\\Users\\yangs\\Desktop\\FOX\\FIB\\src\\main\\reactp01\\public\\img\\";
		String file1, file2= "";

		MultipartFile uploadfilef = entity.getUploadfilef();
		if ( uploadfilef!=null && !uploadfilef.isEmpty()) {
			// 프론트 이미지 경로
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 1.3.1) 물리적위치 저장 (file1)
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성 
			uploadfilef.transferTo(new File(file1)); //해당경로에 저장(붙여넣기)
			file2 = uploadfilef.getOriginalFilename();
		} // Image 선택한 경우
		
		// 1.4) 완성된 경로를 dto 에 set
		entity.setImage(file2);
	
		try {
			log.info("** insert 성공 쿠폰이름 => "+service.save(entity));
			model.addAttribute("message", "새 쿠폰이 등록되었습니다.");
			uri = "redirect:couponRegister";
		} catch (Exception e) {
			log.info("** insert Exception => "+e.toString());
			model.addAttribute("message", "쿠폰 등록에 실패했습니다.");
		}
		return uri;
	}
	
	// 쿠폰리스트 관리 페이지 get
	@GetMapping("/couponListAdmin")
	public void couponListAdmin(@RequestParam(name = "page", defaultValue = "0") int page,
			          			@RequestParam(name = "size", defaultValue = "10") int size,
			          			Model model) {
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Coupon> couponPageList = service.getPageCouponList(pageable);
		
		model.addAttribute("couponList", couponPageList.getContent());
		model.addAttribute("itemPage", couponPageList);
		model.addAttribute("currentPage", couponPageList.getNumber());
		model.addAttribute("totalPages", couponPageList.getTotalPages());
		model.addAttribute("totalItems", couponPageList.getTotalElements());
	}
		
	// 쿠폰 수정하기 get
	@GetMapping(value ="/couponEdit")
	public String couponEdit(HttpServletRequest request, Coupon entity, Model model) {
		model.addAttribute("couponList", service.selectOne(entity.getCoupon_code()));
		if ( "U".equals(request.getParameter("jCode")) )
			return "coupon/couponEditForm";
			else return "coupon/couponListAdmin";
	}
		
	// 쿠폰 수정하기 form
	@PostMapping("/couponEditForm")
	public String couponEditForm(HttpSession session, Coupon entity, Model model) throws IOException {
		// 수정 성공 -> couponList를 받아와야함 (selectList()) -> 그후 출력 요청해야함
		model.addAttribute("list", entity);
		String uri="coupon/couponListAdmin";
		
		MultipartFile uploadfilef = entity.getUploadfilef(); 
		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			String realPath = "C:\\Users\\yangs\\Desktop\\FOX\\FIB\\src\\main\\reactp01\\public\\img\\";
			String file1 = realPath + uploadfilef.getOriginalFilename(); 
			uploadfilef.transferTo(new File(file1)); // IO 발생: Checked Exception 처리  
			
			String file2= uploadfilef.getOriginalFilename();
			entity.setImage(file2);
		} // Image 선택 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
		// => Service 처리
		try {
			log.info("** update 성공 id => "+service.save(entity));
			session.setAttribute("title", entity.getTitle());
			model.addAttribute("message", "~~ 쿠폰 수정 성공 ~~");
		} catch (Exception e) {
			log.info("** update Exception => "+e.toString());
			model.addAttribute("message", "~~ 쿠폰 수정 실패 !! 다시 하세요 ~~");
			uri="coupon/couponEditForm";
		}
		return uri;
	}
	
	@DeleteMapping("/couponDelete/{coupon_code}")
	// 경로로 오는거니깐.. @pathvariable 사용
	public ResponseEntity<?> couponDelete(@PathVariable("coupon_code") int coupon_code, Coupon entity){
		entity.setCoupon_code(coupon_code);
		if(service.delete(coupon_code) > 0) {
			log.info("axidelete HttpStatus.OK = " + HttpStatus.OK);
			return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);		
		} else {
			log.info("axidelete HttpStatus.BAD_GATEWAY = " + HttpStatus.BAD_GATEWAY);
			return new ResponseEntity<String>("삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
		}
	}
	

	// 쿠폰 발급 성공 메시지
	@GetMapping("/couponIssue")
	public void couponIssue(Model model) {
		model.addAttribute("message", "쿠폰이 발급되었습니다.");
	}
	
}
