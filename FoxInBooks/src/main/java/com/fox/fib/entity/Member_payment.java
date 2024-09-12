package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member_payment {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long member_payment_code;
   private String id;
   private String payment_date;
   private String payment_option;
   private String payment_option_detail;
   private int product_amount;
   private int origin_price;
   private Long coupon_code;
   private int discount_coupon;
   private int discount_point;
   private int final_price;
   private String recipient;
   private String recipient_phone_number;
   private String address_zip;
   private String address;
   private String address_detail;
   private String delivery_state;
   private String arrive_date;
   private int payment_cancel;
}