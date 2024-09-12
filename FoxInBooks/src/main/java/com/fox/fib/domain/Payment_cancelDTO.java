package com.fox.fib.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment_cancelDTO {
	
	private String orderParam;
	private String member_payment_code;
	private String id;
	private int product_amount;
	private int origin_price;
	private int coupon_code;

}