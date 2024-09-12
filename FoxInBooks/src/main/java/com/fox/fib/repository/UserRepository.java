package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	@Query("update User u set u.point = :pointParam where u.id = :userId")
	User updateUserPoint(@Param("pointParam") int pointParam, @Param("userId") String userId);
	
	@Query(nativeQuery = true, value = "select id from user where name = :name and birthday = :birthday and phone_number = :phone_number")
	String findId(@Param("name") String name, @Param("birthday") String birthday, @Param("phone_number") String phone_number);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "update user set password =:password where id =:id")
	int passwordUpdate(@Param("password") String password, @Param("id") String id);
	
	@Query(nativeQuery = true, value = "select coupon_code from user_coupon where id =:id")
	List<Integer> userCouponCodeList(@Param("id") String id);
	
	@Query(nativeQuery = true, value = "select end from user_coupon where coupon_code =:code and id =:id")
	String endDate(@Param("code") int code, @Param("id") String id);
	
	@Query(nativeQuery = true, value = "select use_check from user_coupon where coupon_code =:code and id =:id")
	Boolean useCheck(@Param("code") int code, @Param("id") String id);
	
}