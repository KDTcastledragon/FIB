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
@Data  // @Getter : 이런이런,,,,,,,, setter가 없잖아....하아..........2023-11-27 월요일
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bookmark_code; // 1. 카트코드 (primary key , auto_inc)

	private String id; // 2. 유저아이디

	private int product_code; // 3. 제품코드
	private String protype; // 4. 제품타입
	private String domestic; // 5. 국내 / 해외

	private String title; // 6. 타이틀

	private String image; // 7. 이미지

	private int price; // 8. 가격

}

