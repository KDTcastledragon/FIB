package com.fox.fib.domain;

import java.io.Serializable;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User_couponId implements Serializable {
	
	private static final long serialVersionUID =1L;

	private String id;

	private int coupon_code;

}
