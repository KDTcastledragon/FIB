package com.fox.fib.domain;

import lombok.Data;

@Data
public class ProductReviewDTO {
	private int product_code; // 1. 제품코드 (primary key)

	private String protype; // 2. 제품분류코드 (책 or 도서제품)
	private String domestic; // 3. 해외 or 국내

	private String writer;  // 4. 작가명 (null 가능)

	private String title; // 5. 제품명

	private String translator; // 6. 역식자

	private String publisher; // 7. 출판사 or 제조사

	private String publish_date; // 8. 출판일 or 제조일

	private String category; // 9. 카테고리 (소설 , 시 , 에세이 , 잡지, ...)

	private String genre; // 10. 장르 (판타지 , 멜로 , 호러, ...)

	private String summary; // 11. 제품설명요약 (성룡에게 필요)

	private String image; // 12. 메인이미지

	private String intro_image; // 13. 상세이미지

	private String content; // 14. 컨텐츠

	private int price; // 15. 제품가격

	private int stack; // 16. 제품 재고수량

	private int sellcount; // 17. 판매량 =========== 여기까지 Product Entity.

	private double ratingavg; // 18. 평점평균

	private int reviewcount; // 19. 리뷰 숫자

}
