package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
public class Non_member_payment {
   @Id
   @GeneratedValue
   private int non_member_payment_code;
   private String phone_number;
   private String payment_date;
   private String payment_option;
   private int product_amount;
   private int origin_price;
   private int final_price;
   private String recipient;
   private String recipient_phone_number;
   private String address_zip;
   private String address;
   private String address_detail;
   private String delivery_state;
   private String arrive_date;

}