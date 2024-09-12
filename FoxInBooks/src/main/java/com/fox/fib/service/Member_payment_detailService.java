package com.fox.fib.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Member_payment_detail;

public interface Member_payment_detailService {

	// 주문상세 Select
	List<Member_payment_detail> selectList(String id);

	// 특정 주문코드를 가진 주문상세 select
	List<Member_payment_detail> selectPaymentCode(Long member_payment_code);

	// 주문코드 MAX 값 Select
	Long findMaxByMember_payment_code();

	// 주문상세 등록
	int insertPaymentDetail(Long payment_code, String userId, int product_code, int proamount, String payment_date, int origin_price,
	int final_price, String delivery_state, String arrive_date, String protype, String domestic, String title, String image, int price);
	
	// 주문상세 취소( 인스턴스 삭제 )
	void deleteList(Long member_payment_code);
	
	// 리뷰 등록 시 상품 구매 확인
	int selectOne(String id, int product_code);

	// 주문상세 수정
//	Long save(Member_payment_detail entity);

	// castledragon====================================

	int updatePaymentCancel(Long payment_code);

}
