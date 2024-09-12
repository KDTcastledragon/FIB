package com.fox.fib.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Member_payment;
import com.fox.fib.entity.Member_payment_detail;
import com.fox.fib.service.Member_paymentService;
import com.fox.fib.service.Member_payment_detailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/mpdetail")
@Log4j2
@AllArgsConstructor
public class Member_payment_detailController {

	Member_payment_detailService member_payment_detailService;
	Member_paymentService member_paymentService;

	// 주문상세 Select
	@GetMapping("/mpdList")
	public ResponseEntity<?> selectlist(String id) {

		try {
			List<Member_payment_detail> mpdList = member_payment_detailService.selectList(id);

			return ResponseEntity.ok(mpdList);
		} catch (Exception e) {
			System.out.println("주문상세 조회 실패 : " + e.toString());

			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문상세 조회 실패 : " + e.toString());
		}
	}

	@GetMapping("/cancelOrder")
	public ResponseEntity<?> cancelOrder(@RequestParam("paycode") String paycode, @RequestParam("id") String id) {
		try {
			Long payment_code = Long.parseLong(paycode);

			member_paymentService.updateOne(payment_code);
			member_payment_detailService.updatePaymentCancel(payment_code);

			return ResponseEntity.ok("주문취소요청 굿");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문cancel failed : " + e.toString());
		}
	}

	// 리뷰 등록 시 상품 주문 여부 확인
	@GetMapping("/mpordercheck")
	public ResponseEntity<?> orderCheck(@RequestParam("id") String id, @RequestParam("product_code") String product_code) {
		try {
			int mpd = member_payment_detailService.selectOne((String)id, Integer.parseInt(product_code));

			return ResponseEntity.ok(mpd);
		} catch (Exception e) {
			System.out.println("허ㅏㄱㄴㅇ러미나ㅓ린머리ㅏㅣ;ㅓㄱ디" +e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문상세 조회 실패 : " + e.toString());
		}
	}

}