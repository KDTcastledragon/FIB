package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
//public class RecentView extends BaseEntity {
public class RecentView extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rvcode;        // 1. rv코드

	private String id;         // 2. 아이디

	private int product_code;  // 3. 제품코드

	private String protype;    // 4. 제품분류코드 (책 or 도서제품)

	private String title;      // 5. 제품명

	private String image;      // 6. 메인이미지

	private int price;         // 7. 제품가격

}