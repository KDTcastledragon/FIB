package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Delivery_address;

public interface Delivery_addressRepository extends JpaRepository<Delivery_address, Integer> {
	@Query(nativeQuery = true, value="select * from delivery_address where user_id = :user_id order by basic_address DESC, address_code desc")
	List<Delivery_address> selectAddressList(@Param("user_id") String id);
	
	@Query(nativeQuery = true, value="select * from delivery_address where address_zip =:address_zip and address =:address and address_detail =:address_detail")
	Delivery_address dupCheck(@Param("address_zip") String address_zip, @Param("address") String address, @Param("address_detail") String address_detail);
	
	@Query(nativeQuery = true, value="select * from delivery_address where basic_address = true and user_id =:id")
	Delivery_address basicSearch(@Param("id") String id);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value="update delivery_address set basic_address = false where basic_address = true")
	int basicUpdate();
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value="delete from delivery_address where user_id= :user_id")
	int deleteIdAddress(@Param("user_id") String id);
}
