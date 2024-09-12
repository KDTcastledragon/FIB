package com.fox.fib.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	// 리뷰 조회(내림차순 정렬)
	@Query("select r from Review r order by review_code desc")
	List<Review> findAllDesc();


	// castleDragon======================================================

	@Transactional
	@Modifying
	@Query(value = "UPDATE Product p SET p.gradeavg = COALESCE((SELECT AVG(r.star_count) FROM Review r WHERE r.product_code = :pcode), 0) WHERE p.product_code = :pcode")
	void calculateAvg(@Param("pcode") int product_code);

//	@Transactional
//	@Modifying
//	@Query(value = "UPDATE Product p SET p.gradeavg = (SELECT AVG(r.star_count) FROM Review r WHERE r.product_code = :pcode) WHERE p.product_code = :pcode")
//	void calculateAvg(@Param("pcode") int product_code);


	@Transactional
	@Query(value = "SELECT COALESCE(COUNT(r), 0) FROM Review r WHERE r.product_code = :pcode")
	int calculateViewCount(@Param("pcode") int product_code);

//	@Transactional
//	@Query(value = "SELECT COUNT(r) FROM Review r WHERE r.product_code = :pcode")
//	int calculateViewCount(@Param("pcode") int product_code);

	@Transactional
	@Modifying
	@Query("UPDATE Product p SET p.viewcount = :caledvc WHERE p.product_code = :pcode")
	void updateViewCount(@Param("pcode") int product_code, @Param("caledvc") int calculatedViewCount);



	// ===== 멍같이 유기 ===================================================================================================
	@Transactional
	@Modifying
	@Query("UPDATE Product p SET p.viewcount = p.viewcount+1 WHERE p.product_code = :pcode")
	void addViewCount(@Param("pcode") int product_code);


	@Transactional
	@Modifying
	@Query("UPDATE Product p SET p.viewcount = p.viewcount-1 WHERE p.product_code = :pcode")
	void subtractViewCount(@Param("pcode") int product_code);

//	@Transactional
//	@Modifying
//	@Query(value = "SELECT AVG(r.star_count) FROM Review r WHERE r.product_code = :pcode")
//	double calculateAvg(@Param("pcode") int product_code);


//	@Transactional
//	@Modifying
//	@Query("UPDATE Product p SET p.gradeavg = :caledavg WHERE p.product_code = :pcode")
//	void updateGradeAvg(@Param("pcode") int product_code, @Param("caledavg") double calculatedAvg);



}