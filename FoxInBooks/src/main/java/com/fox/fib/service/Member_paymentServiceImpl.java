package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.domain.OrderSummaryDTO;
import com.fox.fib.entity.Member_payment;
import com.fox.fib.repository.Member_paymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Member_paymentServiceImpl implements Member_paymentService {

	private final Member_paymentRepository repository;

	// 주문정보 조회(내림차순 정렬)
	@Override
	public List<Member_payment> selectList() {
		return repository.findAllDesc();
	}

	// 주문정보 개별 조회
	@Override
	public Member_payment selectOne(Long member_payment_code) {
		Optional<Member_payment> result = repository.findById(member_payment_code);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	// 주문정보 등록, 삭제
	@Override
	public Long save(Member_payment entity) {
		repository.save(entity);
		return entity.getMember_payment_code();
	}

	// 주문정보 삭제
	@Override
	public int updateOne(Long member_payment_code) {
		return repository.updateOne(member_payment_code);
	}
	
	// 주문정보 삭제( 인스턴스 삭제 )
	@Override
	public void deleteById(Long member_payment_code) {
		repository.deleteById(member_payment_code);
	}

	// 관리자 페이지용 양세현=========================================================================
	@Override
	public List<OrderSummaryDTO> getDailyOrderSummary(String startDate, String endDate) {
		return repository.getDailyOrderSummary(startDate, endDate);
	}

}
