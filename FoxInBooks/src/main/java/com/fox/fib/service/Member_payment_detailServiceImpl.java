package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.controller.Member_payment_detailController;
import com.fox.fib.entity.Member_payment_detail;
import com.fox.fib.repository.Member_payment_detailRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
public class Member_payment_detailServiceImpl implements Member_payment_detailService {

	private final Member_payment_detailRepository repository;

	// 주문상세 Select
	@Override
	public List<Member_payment_detail> selectList(String id) {
		return repository.selectList(id);
	}

	// 특정 주문코드를 가진 주문상세 select
	@Override
	public List<Member_payment_detail> selectPaymentCode(Long member_payment_code) {
		return repository.findByPaymentCode(member_payment_code);
	}

	// 주문코드 MAX 값 Select
	@Override
	public Long findMaxByMember_payment_code() {
		Optional<Long> result = repository.findMaxByMember_payment_code();

		if (result.isPresent()) {
			return result.get();
		} else {
			return (long) 0;
		}
	}

	// 주문상세 등록
	@Override
	public int insertPaymentDetail(Long payment_code, String userId, int product_code, int proamount, String payment_date, int origin_price,
		int final_price, String delivery_state, String arrive_date, String protype, String domestic, String title, String image,
		int price) {
		return repository.insertPaymentDetail(payment_code, userId, product_code, proamount, payment_date, origin_price, final_price,
			delivery_state, arrive_date, protype, domestic, title, image, price);
	}

	@Override
	public int updatePaymentCancel(Long payment_code) {
		return repository.updatePaymentCancel(payment_code);
	}
	
	// 주문상세 취소( 인스턴스 삭제 )
	@Override
	public void deleteList(Long member_payment_code) {
		repository.deleteList(member_payment_code);
	}

	// 리뷰 등록 시 상품 구매 확인
	@Override
	public int selectOne(String id, int product_code) {
		Optional<Member_payment_detail> result = repository.selectOne(id, product_code);

		if (result.isPresent()) {
			return 0;
		} else {
			return 1;
		}
	}

	// 주문상세 수정
//	@Override
//	public Long save(Member_payment_detail entity) {
//		repository.save(entity);
//		return entity.getMember_payment_code();
//	}

}
