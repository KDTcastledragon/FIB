package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.domain.User_couponId;
import com.fox.fib.entity.Coupon;
import com.fox.fib.entity.Faq;
import com.fox.fib.entity.Inquiry;
import com.fox.fib.entity.Notice;
import com.fox.fib.entity.Product;
import com.fox.fib.entity.User;
import com.fox.fib.entity.User_coupon;
import com.fox.fib.repository.FaqRepository;
import com.fox.fib.repository.User_couponRepository;
import com.fox.fib.service.CouponService;
import com.fox.fib.service.FaqService;
import com.fox.fib.service.InquiryService;
import com.fox.fib.service.NoticeService;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.User_couponService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/test")
@Log4j2
@AllArgsConstructor
public class TestController {
	
	CouponService couponService;
	User_couponService userCouponService;
	NoticeService noticeService;
	FaqService faqService;
	InquiryService inquiryService;
	ProductService productService;	
	
//	private User_couponRepository user_couponRepository;
	
	
	// ****** Server에서 React(Front) Project로 전달================================================================================= 	
	// 쿠폰 리스트
	@GetMapping("/couponList")
	public List<Coupon> couponList() {
		return couponService.selectList();
	} 
	
	// 공지사항 리스트
	@GetMapping("/noticeList")
	public List<Notice> noticeList() {
		return noticeService.selectList();
	} 
	
	// FAQ 리스트
	@GetMapping("/faqList")
	public List<Faq> faqList() {
		return faqService.selectList();
	} 
	
	// 제품 리스트
	@GetMapping("/productlist")
	public List<Product> productList() {
		return productService.selectList();
	} 

	
	// ****** React(Front) Project에서 Server로 전달================================================================================= 	
	// 유저가 쿠폰 받기
	@PostMapping("/userCouponGet")
	public ResponseEntity<String> userCouponGet(@RequestBody User_coupon entity, Model model)  throws IOException {
			log.info("쿠폰 코드 : " + entity.getCoupon_code());
			log.info("로그인 ID : " + entity.getId());
		try {
			int getCode = entity.getCoupon_code();
			String getId = entity.getId();
			User_couponId id = new User_couponId(getId, getCode);
			
			LocalDate currentTime = LocalDate.now();
			LocalDate endDate = currentTime.plusDays(7);
			log.info("currentTime: " + currentTime);
			log.info("endDate: " + endDate);
			
			// 설정 전에 날짜를 출력하여 확인
			log.info("시작 날짜 설정 전: " + entity.getStartDate());
			log.info("종료 날짜 설정 전: " + entity.getEndDate());

			entity.setStart(currentTime);
			entity.setEnd(endDate);

			// 설정 후에 날짜를 출력하여 확인
			log.info("시작 날짜 설정 후: " + entity.getStartDate());
			log.info("종료 날짜 설정 후: " + entity.getEndDate());

			if(userCouponService.selectOne(id) == null && userCouponService.save(entity) > 0) {
				
				log.info("쿠폰발급 성공!");
				return ResponseEntity.ok("쿠폰을 성공적으로 발급하였습니다.");
	        }else {
	        	log.info("이미 발급받은 쿠폰입니다.");
	        	return ResponseEntity.ok("이미 발급 받은 쿠폰입니다.");
	        }
		} catch (Exception e) {
			if(entity.getId() == null) {
				log.info("로그인이 필요한 서비스입니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그인 후 발급받을 수 있습니다.");
	        }else {
	        	log.info("** 쿠폰 받기 실패 exception => "+e.toString());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("쿠폰 발급 중에 오류가 발생했습니다.");
	        }	
		}
	}
	
	// 현주 coupon 발급 참조
//	try {
//        
//        System.out.println(entity);
//        
//        UserCouponId id = new UserCouponId(entity.getCoupon_id(), entity.getUser_id());
//	
//        if(couListService.selectDetail(id) == null && couListService.save(entity) > 0) {
//           return "발급완료";
//        }else {
//           return "기발급쿠폰";
//        }
//     } catch (Exception e) {
//        log.info("** User CouponDownload Exception => " + e.toString());
//        
//        return "에러";
//     }
	
	// FAQ category에 따라 출력
	@GetMapping("/faqList/{category}")
	public ResponseEntity<List<Faq>> faqList(@PathVariable("category") String category) {
		// 리액트에서 넘어온 notice_code 정보 확인
		log.info("전달받은 category : " + category);
			
		try {
			// 쿼리문의 return값들의 리스트에 
			List<Faq> getFaqList = faqService.selectList();
			
			List<Faq> filteredList = getFaqList.stream()
		                .filter(faq -> faq.getCategory() != null)
		                .collect(Collectors.toList());
			
			return ResponseEntity.ok(filteredList);

		} catch (Exception e) {
			log.error("회원 문의내역 조회 중 오류 발생: " + e.getMessage(), e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	// 리액트 페이지네이션관련 트라이
//	@GetMapping("/faqList/{category}")
//	public ResponseEntity<Page<Faq>> faqList(@PathVariable("category") String category) {
//		// 페이지 네이션을 위한 변수선언
//		int page = 0; // 시작 페이지번호
//		int size = 10; // 페이지당 보여지는 컨텐츠 갯수
//		
//		Pageable pageable = PageRequest.of(page, size);
//		
//		// 리액트에서 넘어온 notice_code 정보 확인
//		log.info("전달받은 category : " + category);
//			
//		try {
//			// 쿼리문의 return값들의 리스트에 
//			Page<Faq> getFaqList = faqService.getFaqList(pageable);
//			
//			Page<Faq> filteredPage = new PageImpl<>(getFaqList.getContent().stream()
//		            .filter(faq -> faq.getCategory() != null)
//		            .collect(Collectors.toList()), pageable, getFaqList.getTotalElements());
//			
//			return ResponseEntity.ok(filteredPage);
////			return ResponseEntity.ok(getFaqList);
//
//		} catch (Exception e) {
//			log.error("회원 문의내역 조회 중 오류 발생: " + e.getMessage(), e);
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}

	// 유저 1:1문의 내역 보기위한 React에서 서버로 id 전달
	@GetMapping("/inquiryList")
	public ResponseEntity<Page<Inquiry>> getInquiryList(@RequestParam(name = "id") String id,
													 	@RequestParam(name = "page", defaultValue = "0") int page,
													 	@RequestParam(name = "size", defaultValue = "10") int size,
													 	Model model)  throws IOException {
			// 리액트에서 넘어온 notice_code 정보 확인
			log.info(id);
			Pageable pageable = PageRequest.of(page, size);
			Page<Inquiry> getInquiryList = inquiryService.getInquiryList(id, pageable);
		try {

			log.info("getInquiryList.getNumber : " + getInquiryList.getNumber());
			log.info("getInquiryList.getTotalPages() : " + getInquiryList.getTotalPages());
			log.info("getInquiryList.getTotalElements() : " + getInquiryList.getTotalElements());
			return ResponseEntity.ok(getInquiryList);

		} catch (Exception e) {
			log.info("회원 문의내역 조회 실패 exception => " + e.toString());
			model.addAttribute("message", "회원 문의내역 조회에 실패했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// 유저가 1:1문의 등록
	@PostMapping("/userInquiryRegister")
	public ResponseEntity<?> userInquiryRegister(Inquiry entity)  throws IOException {
		
		MultipartFile check = entity.getInquiry_upload_file();
		
		String realPath = "C:\\Users\\yangs\\Desktop\\pp\\pjt\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
		String inquiry_file, inquiry_file_upload="";
		
		if (check != null && !check.isEmpty()) {
		   inquiry_file = realPath + check.getOriginalFilename(); // 저장 경로
		   check.transferTo(new File(inquiry_file));

		   inquiry_file_upload = check.getOriginalFilename(); // 저장 경로
		}

		entity.setAttached_data(inquiry_file_upload);

		try {
	        
	        log.info("*********" + entity);
			log.info("** 1:1문의 등록 성공 => "+inquiryService.save(entity));
			return ResponseEntity.ok("1:1문의를 등록했습니다.");
		} catch (Exception e) {
			log.info("** 1:1문의 등록 실패 exception => "+e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(":1문의 등록에 실패했습니다. : " + e.toString());
		}
	}
	
	// 조회수 증가
	// https://ssdragon.tistory.com/122 쿠키값으로 조회수 증가 결정 관련 글
	@GetMapping("/increaseView/{notice_code}")
	public int increaseView(@PathVariable("notice_code") int notice_code, Notice notice, User user, Model model)  throws IOException {
			// 리액트에서 넘어온 notice_code 정보 확인
			log.info(notice_code);
		try {
			// 전달받은 notice_code에 맞는 정보를 update
			noticeService.update(notice_code);
			
			// 요청받은 notice_code의 정보를 notice에 저장
			notice = noticeService.selectOne(notice_code);
			
	        // 요청받은 정보에서 현재 조회수를 조회
			log.info("현재 공지사항 번호 : " + notice.getNotice_code());
			log.info("현재 공지사항 조회수 : " + notice.getView());
	        return notice.getView();

		} catch (Exception e) {
			log.info("조회수 증가 실패 exception => "+e.toString());
			model.addAttribute("message", "조회수 증가에 실패했습니다.");
			return 0;
		}
	}
	
}


