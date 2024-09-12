package com.fox.fib.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.entity.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {

	@Query("SELECT c FROM Bookmark c WHERE c.id = :id")
	List<Bookmark> findListByLoginID(@Param("id") String loginID);


	@Query("SELECT c FROM Bookmark c WHERE c.id = :id AND c.product_code = :product_code")
	Optional<Bookmark> checkByIdPcode(@Param("id") String loginID, @Param("product_code") int product_code);


	@Modifying
	@Transactional
	@Query("delete FROM Bookmark b WHERE b.id = :id AND b.product_code = :product_code")
	void deleteByProductCode(@Param("id") String loginID, @Param("product_code") int product_code);


}