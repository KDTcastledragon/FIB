package com.fox.fib.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fox.fib.entity.RecentView;

public interface RecentViewRepository extends JpaRepository<RecentView, Integer> {

	@Query("SELECT rv FROM RecentView rv WHERE rv.id = :id")
	public List<RecentView> selectListForUserId(@Param("id") String id);


	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM RecentView r WHERE r.id = :id ORDER BY r.regdate ASC LIMIT 1")
	void deleteOldest(@Param("id") String id);


	@Query("SELECT c FROM RecentView c WHERE c.id = :id AND c.product_code = :pcode")
	Optional<RecentView> checkDuplicated(@Param("id") String id, @Param("pcode") int product_code);

}