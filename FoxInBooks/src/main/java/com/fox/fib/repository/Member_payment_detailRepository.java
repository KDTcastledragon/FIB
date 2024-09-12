package com.fox.fib.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.entity.Member_payment_detail;

public interface Member_payment_detailRepository extends JpaRepository<Member_payment_detail, Long> {

	// 주문상세 Select
	@Query("select m from Member_payment_detail m where m.id = :userId")
	List<Member_payment_detail> selectList(@Param("userId") String id);

	// 특정 주문코드를 가진 주문상세 select
	@Query("select m from Member_payment_detail m where member_payment_code = :member_payment_code")
	List<Member_payment_detail> findByPaymentCode(@Param("member_payment_code") Long member_payment_code);

	// 주문코드 MAX 값 Select
	@Query("select max(m.member_payment_code) from Member_payment m")
	Optional<Long> findMaxByMember_payment_code();

	// 주문상세 등록
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "insert into member_payment_detail (member_payment_code, id, product_code, proamount, "
		+ "payment_date, origin_price, final_price, delivery_state, arrive_date, " + "protype, domestic, title, image, price) "
		+ "values (:payment_code, :userId, :product_code, :proamount,"
		+ ":payment_date, :origin_price, :final_price, :delivery_state, :arrive_date," + ":protype, :domestic, :title, :image, :price)")
	int insertPaymentDetail(@Param("payment_code") Long payment_code, @Param("userId") String userId,
		@Param("product_code") int product_code, @Param("proamount") int proamount, @Param("payment_date") String payment_date,
		@Param("origin_price") int origin_price, @Param("final_price") int final_price, @Param("delivery_state") String delivery_state,
		@Param("arrive_date") String arrive_date, @Param("protype") String protype, @Param("domestic") String domestic,
		@Param("title") String title, @Param("image") String image, @Param("price") int price);

	// 주문상세 삭제( 인스턴스 삭제 )
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value="delete from member_payment_detail where member_payment_code = :member_payment_code")
	void deleteList(@Param("member_payment_code") Long member_payment_code);
	
	// 리뷰 등록 시 상품 구매 확인
	@Query("select m from Member_payment_detail m where m.id = :id and m.product_code = :product_code")
	Optional<Member_payment_detail> selectOne(@Param("id") String id, @Param("product_code") int product_code); 

	// ============caslte dragon===========================================
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "update member_payment_detail set payment_cancel = 1 where member_payment_code = :paycode")
	int updatePaymentCancel(@Param("paycode") Long payment_code);

}