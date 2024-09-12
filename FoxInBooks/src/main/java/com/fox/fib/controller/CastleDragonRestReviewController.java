//package com.fox.fib.controller;
//
//import java.util.List;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.fox.fib.entity.Review;
//import com.fox.fib.service.ProductService;
//import com.fox.fib.service.ReviewService;
//import com.fox.fib.service.WriterService;
//
//import lombok.AllArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@RestController
//@RequestMapping("/cd")
//@Log4j2
//@AllArgsConstructor
//@CrossOrigin
//public class CastleDragonRestReviewController {
//
//	ProductService productService;
//	WriterService writerService;
//	ReviewService reviewService;
//
//	// 리뷰 전체 정보
//	@PostMapping("/reviewList")
//	public List<Review> reviewList() {
//		return reviewService.findAllDesc();
//	}
//
////	// 리뷰 등록
////	@PostMapping("/reviewinsert")
////	public ResponseEntity<?> reviewinsert(@RequestParam("pcode") String product_code, Review entity) throws IOException {
////
////
////		try {
////
////			entity.setImage("abcd");
////
////			reviewService.save(entity);             // 1번. 리뷰 저장.
////
////			double calculatedAvg = reviewService.calculateAvg(pcode); // 2번. 평균값계산.
////
////			reviewService.updateGradAvg(pcode, calculatedAvg); // 3번.
////
////			reviewService.addViewCount(pcode);
////
////
////
////			return ResponseEntity.ok("리뷰 등록 성공");
////		} catch (Exception e) {
////			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("리뷰 등록 실패 : " + e.toString());
////		}
////	}
//
//	// 리뷰 삭제
//	@PostMapping("/reviewdelete")
//	public ResponseEntity<?> reviewdelete(@RequestParam("pcode") String product_code, @RequestBody Review entity) {
//		try {
//			int pcode = Integer.parseInt(product_code);
//
//			reviewService.delete(entity.getReview_code());      // 1. 삭제
//
//			double calculatedAvg = reviewService.calculateAvg(pcode); // 2번. 평균값계산.
//
//			reviewService.updateGradAvg(pcode, calculatedAvg); // 3번.
//
//			reviewService.subtractViewCount(pcode);
//
//			return ResponseEntity.ok("리뷰 삭제 성공");
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("리뷰 삭제 실패 : " + e.toString());
//		}
//	}
//
//}
//
////log.info(entity);