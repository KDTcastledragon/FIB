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
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery_address {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int address_code;
	
	private String user_id;
	private String name;
	private String address_zip;
	private String address;
	private String address_detail;
	private String address_as;
	private Boolean basic_address;
	private String phone_number;
}
