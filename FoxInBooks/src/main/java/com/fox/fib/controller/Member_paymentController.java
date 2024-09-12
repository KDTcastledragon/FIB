package com.fox.fib.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fox.fib.domain.Payment_cancelDTO;
import com.fox.fib.domain.User_couponId;
import com.fox.fib.entity.Member_payment;
import com.fox.fib.entity.Member_payment_detail;
import com.fox.fib.entity.Product;
import com.fox.fib.entity.User;
import com.fox.fib.entity.User_coupon;
import com.fox.fib.service.Member_paymentService;
import com.fox.fib.service.Member_payment_detailService;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.UserService;
import com.fox.fib.service.User_couponService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/memberPayment")
@Log4j2
@AllArgsConstructor
public class Member_paymentController {

	Member_paymentService member_paymentService;
	Member_payment_detailService member_payment_detailService;
	ProductService productService;
	UserService userService;
	User_couponService userCouonService;

	// 주문정보 조회(내림차순 정렬)
	@GetMapping("/memberPaymentList")
	public void memberPaymentList(@RequestParam("orderParam") String orderParam, Model model) {

		List<Member_payment> orderList = new ArrayList<Member_payment>();

		if (orderParam.equals("all")) {
			orderList.addAll(member_paymentService.selectList());
		} else if (orderParam.equals("order")) {
			for (int i = 0; i < member_paymentService.selectList().size(); i++) {
				if (member_paymentService.selectList().get(i).getPayment_cancel() == 0) {
					orderList.add(member_paymentService.selectList().get(i));
				}
			}
		} else {
			for (int i = 0; i < member_paymentService.selectList().size(); i++) {
				if (member_paymentService.selectList().get(i).getPayment_cancel() == 1) {
					orderList.add(member_paymentService.selectList().get(i));
				}
			}
		}
		model.addAttribute("memberPaymentData", orderList);
		model.addAttribute("orderParam", orderParam);
	}

	// 주문내역 취소
	@PostMapping("/memberPaymentCancel")
	public ResponseEntity<String> memberPaymentCancel(@RequestBody Payment_cancelDTO dto, User_couponId userCouponDto, Model model) {

		// 재고수량 증가, 판매량 감소
		List<Member_payment_detail> dtoList = member_payment_detailService.selectPaymentCode(Long.parseLong(dto.getMember_payment_code()));

		for (int i = 0; i < dto.getProduct_amount(); i++) {

			int product_code = dtoList.get(i).getProduct_code();

			Product productOne = productService.selectOne(product_code);

			int stack = productOne.getStack() + dtoList.get(i).getProamount();
			int sell_count = productOne.getSellcount() - dtoList.get(i).getProamount();

			productOne.setStack(stack);
			productOne.setSellcount(sell_count);

			productService.save(productOne);
		}


		// 회원포인트 감소( 적립 포인트 회수 )
		User userOne = userService.selectOne(dto.getId());
		int pointUpdate = (int) (userOne.getPoint() - ((dto.getOrigin_price()) * 0.05));
		userOne.setPoint(pointUpdate);
		userService.register(userOne);
		
		// 회원포인트 증가( 사용한 포인트 반환 )
		userOne = userService.selectOne(dto.getId());
		int usedPoint = member_paymentService.selectOne(Long.parseLong(dto.getMember_payment_code())).getDiscount_point();
		pointUpdate = (int) (userOne.getPoint() + usedPoint);
		userOne.setPoint(pointUpdate);
		userService.register(userOne);
		
		// 사용한 쿠폰 반환
		userCouponDto.setCoupon_code(dto.getCoupon_code());
		userCouponDto.setId(dto.getId());
		User_coupon userCouponOne = userCouonService.selectOne(userCouponDto);
		userCouponOne.setUse_check(false);
		
		// 취소
		member_paymentService.deleteById(Long.parseLong(dto.getMember_payment_code()));
		member_payment_detailService.deleteList(Long.parseLong(dto.getMember_payment_code()));

		try {
			return ResponseEntity.ok("주문내역이 취소되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문정보 취소 실패 : " + e.toString());
		}
	}
}