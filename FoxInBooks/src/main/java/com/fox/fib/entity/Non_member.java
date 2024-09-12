package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Non_member {
	@Id
	private String phone_number;
	
	private String name;
	private String address_zip;
	private String address;
	private String address_detail;
	private int password;
}
