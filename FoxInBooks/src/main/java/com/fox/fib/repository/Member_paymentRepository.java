package com.fox.fib.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.domain.OrderSummaryDTO;
import com.fox.fib.entity.Member_payment;

public interface Member_paymentRepository extends JpaRepository<Member_payment, Long> {

	// 주문내역 조회(내림차순 정렬)
	@Query("select m from Member_payment m order by member_payment_code desc")
	List<Member_payment> findAllDesc();
	
	// 주문내역 취소
	@Transactional
	@Modifying
	@Query(nativeQuery = true ,value = "update member_payment set payment_cancel = 1 where member_payment_code = :member_payment_code")
	int updateOne(@Param("member_payment_code") Long member_payment_code);

	// 관리자 페이지용 양세현=========================================================================
    @Query("SELECT new com.fox.fib.domain.OrderSummaryDTO(m.payment_date, COUNT(m), SUM(m.final_price)) " +
            "FROM Member_payment m WHERE m.payment_date BETWEEN :startDate AND :endDate GROUP BY m.payment_date")
    List<OrderSummaryDTO> getDailyOrderSummary(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
