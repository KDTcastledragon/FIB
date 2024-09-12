package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Review;

public interface ReviewService {

	// 전체 리뷰 조회
	List<Review> findAllDesc();

	// 개별 리뷰 조회
	Review selectOne(Long review_code);

	// 리뷰 등록, 수정
	Long save(Review entity);

	// 리뷰 삭제
	Long delete(Long review_code);

	// castledragon=====================================================

	void calculateAvg(int product_code);

	int calculateViewCount(int product_code);

	void updateViewCount(int product_code, int calculatedViewCount);

	// 멍같이 유기 ============================================================================

	int addViewCount(int product_code);

	int subtractViewCount(int product_code);


//	int updateGradAvg(int product_code, double calculatedAvg);


}