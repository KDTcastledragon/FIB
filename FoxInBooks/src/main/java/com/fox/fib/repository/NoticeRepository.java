package com.fox.fib.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
	// 쿼리문을 만들때 db table이름이 아니라 entity이름으로
	// jpql문으로 하게되면
	@Transactional
	@Query("select n from Notice n order by n.notice_code desc")
	Page<Notice> getNoticeList(Pageable pageable);
	
	@Transactional
	@Query("select n from Notice n where n.category=:category order by n.notice_code desc")
	Page<Notice> getPageNoticeList(@Param("category") String category, Pageable pageable);
	
	@Modifying
	@Transactional
	@Query("update Notice set view = view + 1 where notice_code = :notice_code")
	void update(@Param("notice_code") int notice_code);
}

