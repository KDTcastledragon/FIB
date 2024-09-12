package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.Review;
import com.fox.fib.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository repository;

	// 전체 리뷰 조회
	@Override
	public List<Review> findAllDesc() {
		return repository.findAllDesc();
	}

	// 개별 리뷰 조회
	@Override
	public Review selectOne(Long review_code) {
		/*
		  < Optional >
		     - 값이 존재할 수도 있고 없을 수도 있는 상황을 다루는 데 사용.
		       이 클래스는 명시적으로 값이 없음을 표현하고, 값이 없을 때 발생할 수 있는
		       null을 방지하면서 코드를 더 명확하고 안전하게 만들어 줌.
		       
		  < isPresent() >
		     - Optional 객체 안에 값이 존재하는지 여부를 확인하여 true나 false를 반환/
		 */
		Optional<Review> result = repository.findById(review_code);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	// 리뷰 등록, 수정
	@Override
	public Long save(Review entity) {
		repository.save(entity);
		return entity.getReview_code();
	}

	// 리뷰 삭제
	@Override
	public Long delete(Long review_code) {
		repository.deleteById(review_code);
		return review_code;
	}

	// CastleDragon=====================================================================

	@Override
	public void calculateAvg(int product_code) {
		repository.calculateAvg(product_code);
	}


	@Override
	public int calculateViewCount(int product_code) {
		return repository.calculateViewCount(product_code);
	}

	@Override
	public void updateViewCount(int product_code, int calculatedViewCount) {
		repository.updateViewCount(product_code, calculatedViewCount);
	}


	// =====멍같이 유기 =============================================================

//	@Override
//	public int updateGradAvg(int product_code, double calculatedAvg) {
//		repository.updateGradeAvg(product_code, calculatedAvg);
//		return 1004;
//	}

	@Override
	public int addViewCount(int product_code) {
		repository.addViewCount(product_code);
		return 10044;
	}

	@Override
	public int subtractViewCount(int product_code) {
		repository.subtractViewCount(product_code);
		return 10005;
	}



}