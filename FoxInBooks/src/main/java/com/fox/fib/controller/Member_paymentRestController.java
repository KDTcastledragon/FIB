package com.fox.fib.controller;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.domain.User_couponId;
import com.fox.fib.entity.Member_payment;
import com.fox.fib.entity.Product;
import com.fox.fib.entity.User;
import com.fox.fib.entity.User_coupon;
import com.fox.fib.service.CartService;
import com.fox.fib.service.Member_paymentService;
import com.fox.fib.service.Member_payment_detailService;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.UserService;
import com.fox.fib.service.User_couponService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/restmemberpayment")
@Log4j2
@AllArgsConstructor
public class Member_paymentRestController {
	
	Member_paymentService member_paymentService;
	Member_payment_detailService member_payment_detailService;
	UserService userService;
	ProductService productService;
	CartService cartService;
	User_couponService  userCouponService;
	
	// 회원정보 배송지 가져오기
	@PostMapping("userAddress")
	public List<User> userAddress() {
		return userService.selectList();
	}

	//주문정보, 주문상세 등록 및 회원포인트, 회원쿠폰 수정
	@SuppressWarnings("unchecked")
	@PostMapping("memberpaymentinsert")
	public ResponseEntity<?> memberpaymentinsert(@RequestBody HashMap<String, Object> payment_formData, Member_payment entity, User_couponId dto) throws IOException {

		Gson gson = new Gson();
		
        Type listType1 = new TypeToken<List<Map<String, Object>>>() {}.getType();
        List<Map<String, Object>> paymentDetailList = gson.fromJson((String) payment_formData.get("paymentDetailData"), listType1);
        log.info(payment_formData);
		
		try {
			entity.setId((String)payment_formData.get("id"));
			entity.setPayment_date((String)payment_formData.get("payment_date"));
			entity.setPayment_option((String)payment_formData.get("payment_option"));
			entity.setPayment_option_detail((String)payment_formData.get("payment_option_detail"));
			entity.setProduct_amount(Integer.parseInt((String)payment_formData.get("product_amount")));
			entity.setOrigin_price(Integer.parseInt((String)payment_formData.get("origin_price")));
			entity.setCoupon_code(Long.parseLong((String)payment_formData.get("coupon_code")));
			entity.setDiscount_coupon(Integer.parseInt((String)payment_formData.get("discount_coupon")));
			entity.setDiscount_point(Integer.parseInt((String)((List<Object>) payment_formData.get("discount_point")).get(0)));
			entity.setFinal_price(Integer.parseInt((String)payment_formData.get("final_price")));
			entity.setRecipient((String)payment_formData.get("recipient"));
			entity.setRecipient_phone_number((String)payment_formData.get("recipient_phone_number"));
			entity.setAddress_zip((String)payment_formData.get("address_zip"));
			entity.setAddress((String)payment_formData.get("address"));
			entity.setAddress_detail((String)payment_formData.get("address_detail"));
			entity.setDelivery_state((String)payment_formData.get("delivery_state"));
			entity.setArrive_date((String)payment_formData.get("arrive_date"));

			// 주문정보 등록
			member_paymentService.save(entity);
			
			// 주문코드 MAX 값
			Long maxPaymentCode = member_payment_detailService.findMaxByMember_payment_code();

			for(int i = 0; i < paymentDetailList.size(); i++) {
				Long payment_code = maxPaymentCode;
				String userId = (String)payment_formData.get("id");
				int product_code = (int)((double)paymentDetailList.get(i).get("product_code"));
				int proamount = (int)((double)paymentDetailList.get(i).get("proamount"));
				
				// 상품정보 조회
				Product productOne = productService.selectOne(product_code);
				
				// 주문상세 등록
				member_payment_detailService.insertPaymentDetail(payment_code, userId, product_code, proamount,
						(String)payment_formData.get("payment_date"),
						Integer.parseInt((String)payment_formData.get("origin_price")),
						Integer.parseInt((String)payment_formData.get("final_price")),
						(String)payment_formData.get("delivery_state"),
						(String)payment_formData.get("arrive_date"),
						productOne.getProtype(),
						productOne.getDomestic(),
						productOne.getTitle(),
						productOne.getImage(),
						productOne.getPrice());
				
				// 재고수량 감소, 판매량 증가
				int stack = productOne.getStack() - proamount;
				int sellCount = productOne.getSellcount() + proamount;
				
				productOne.setStack(stack);
				productOne.setSellcount(sellCount);
				
				productService.save(productOne);
			
				// 장바구니 내역 삭제
				cartService.deleteCartAfterOrder(userId, product_code);
			}

			// 쿠폰 사용
			if(Integer.parseInt((String)payment_formData.get("coupon_code")) > 0) {
			dto.setCoupon_code(Integer.parseInt((String)payment_formData.get("coupon_code")));
			dto.setId((String)payment_formData.get("id"));
			
			User_coupon userCouponOne = userCouponService.selectOne(dto);
			userCouponOne.setUse_check(true);
			}

			// 회원포인트 적립 & 사용한 포인트 차감
			User userOne =  userService.selectOne((String)payment_formData.get("id"));

			int pointUpdate = (int) (userOne.getPoint() + 
					(Integer.parseInt((String)payment_formData.get("origin_price"))) * 0.05) -
					Integer.parseInt((String)((List<Object>) payment_formData.get("discount_point")).get(0));
			
			userOne.setPoint(pointUpdate);

			userService.register(userOne);

			System.out.println("333333333333333333333");
			return ResponseEntity.ok("주문정보 등록 성공");
		} catch (Exception e) {
			System.out.println("주문정보 등록 실패 : " + e.toString());

			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("주문정보 등록 실패 : " + e.toString());
		}
		
	}
	
}