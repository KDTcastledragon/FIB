package com.fox.fib.domain;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fox.fib.entity.Member_payment;
import com.fox.fib.entity.Member_payment_detail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member_paymentDTO {
	
	private String id;
	private String payment_date;
	private String payment_option;
	private String payment_option_detail;
	private int product_amount;
	private int origin_price;
	private int discount_coupon;
	private int discount_event;
	private int final_price;
	private String recipient;
	private String recipient_phone_number;
	private String address_zip;
	private String address;
	private String address_detail;
	private String delivery_state;
	private String arrive_date;
	
	private List<Member_payment_detail> paymentDetailData;

}