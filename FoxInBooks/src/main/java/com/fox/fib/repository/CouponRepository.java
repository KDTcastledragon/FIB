package com.fox.fib.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
	
	@Transactional
	@Query("select c from Coupon c ORDER BY c.coupon_code DESC")
	Page<Coupon> getPageCouponList(Pageable pageable);
	
	@Query(nativeQuery = true, value = "select * from coupon where coupon_code =:code")
	Coupon userCoupon(@Param("code") int code);
}

