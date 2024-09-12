package com.fox.fib.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.fox.fib.domain.User_couponId;
import com.fox.fib.entity.User_coupon;

public interface User_couponRepository extends JpaRepository<User_coupon, User_couponId> {

//	@Transactional
//	@Query("select u from User_coupon u ORDER BY u.user_coupon_code DESC")
//	Page<User_coupon> getUser_couponList(Pageable pageable);

//	// 로그인한 유저가 쿠폰받기를 눌렀을때 id, coupon_code를 전달받는다
//	@Transactional
//	boolean existsByCouponCodeAndUserId(int getCouponCode, String getUserId);

	
//	@Query("select u from User_coupon u WHERE id=:id and coupon_code=:coupon_code")
//	Optional<User_coupon> existsBySelectOneCouponCodeAndUserId(@Param("id") String id, @Param("coupon_code") int coupon_code);
//	@Query("select u from User_coupon u WHERE id=:id and coupon_code=:coupon_code")
//	Optional<User_coupon> existsBySelectOneCouponCodeAndUserId(User_couponId user_couponId);
	
//	@Modifying
//	@Transactional
//	@Query("select u from User_coupon u WHERE id=:id and coupon_code=:coupon_code")
//	int existsByDeleteCouponCodeAndUserId(@Param("id") String id, @Param("coupon_code") int coupon_code);
//	@Modifying
//	@Transactional
//	@Query("select u from User_coupon u WHERE id=:id and coupon_code=:coupon_code")
//	int existsByDeleteCouponCodeAndUserId(User_couponId user_couponId);

}
