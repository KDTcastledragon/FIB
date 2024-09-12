package com.fox.fib.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fox.fib.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	@Override
	Page<Product> findAll(Pageable pageable);

	@Query("select p from Product p")
	List<Product> selectAllList();

	// [2] 리액트 메소드. ==================================================================================================================
	@Query("SELECT p FROM Product p WHERE (p.protype=1) and (:domestic = 'all' OR p.domestic = :domestic)"
		+ "AND (:category = 'all' OR p.category = :category) AND (:genre = 'all' OR p.genre = :genre) order by p.title asc")
	List<Product> selectListSortOfTitle(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 1.제목순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and (:domestic = 'all' OR p.domestic = :domestic) "
		+ "AND (:category = 'all' OR p.category = :category) AND (:genre = 'all' OR p.genre = :genre) ORDER BY p.price ASC")
	List<Product> selectListSortOfPriceAsc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 2.최저가순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = 'all' OR p.domestic = :domestic) "
		+ "AND (:category = 'all' OR p.category = :category) " + "AND (:genre = 'all' OR p.genre = :genre) order by p.price desc")
	List<Product> selectListSortOfPriceDesc(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 3.최고가순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = 'all' OR p.domestic = :domestic) "
		+ "AND (:category = 'all' OR p.category = :category) " + "AND (:genre = 'all' OR p.genre = :genre) order by p.sellcount desc")
	List<Product> selectListSortOfSellCount(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 4.판매량순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = 'all' OR p.domestic = :domestic) "
		+ "AND (:category = 'all' OR p.category = :category) " + "AND (:genre = 'all' OR p.genre = :genre) order by p.gradeavg desc")
	List<Product> selectListSortOfGradeAvg(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 5.평점순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and  (:domestic = 'all' OR p.domestic = :domestic) "
		+ "AND (:category = 'all' OR p.category = :category) " + "AND (:genre = 'all' OR p.genre = :genre) order by p.viewcount desc")
	List<Product> selectListSortOfViewCount(@Param("domestic") String domestic, @Param("category") String category,
		@Param("genre") String genre); // 6.리뷰순


	@Query("SELECT p FROM Product p WHERE (p.protype=1) and (:domestic = 'all' OR p.domestic = :domestic) "
		+ "AND (:category = 'all' OR p.category = :category) AND (:genre = 'all' OR p.genre = :genre) and (p.price between :minprice and :maxprice) order by p.price asc")
	List<Product> selectRangedPrice(@Param("domestic") String domestic, @Param("category") String category, @Param("genre") String genre,
		@Param("minprice") int minprice, @Param("maxprice") int maxprice); // 7.제한가격검색


	@Query(value = "SELECT * FROM product p WHERE p.protype = 1 ORDER BY p.sellcount DESC LIMIT 20", nativeQuery = true)
	List<Product> selectListBestSeller();


//	@Query("SELECT p FROM Product p " + "WHERE (p.protype = 1) AND " + "(:domestic = 'all' OR p.domestic = :domestic) AND "
//		+ "(:category = 'all' OR p.category = :category) AND " + "(:genre = 'all' OR p.genre = :genre) " + "ORDER BY CASE "
//		+ "            WHEN :sortOpt = 'title' THEN p.title " + "            WHEN :sortOpt = 'ascPrice' THEN p.price ASC "
//		+ "            WHEN :sortOpt = 'descPrice' THEN p.price DESC " + "            WHEN :sortOpt = 'sellCount' THEN p.sellcount "
//		+ "            WHEN :sortOpt = 'gradeAvg' THEN p.gradeavg " + "            WHEN :sortOpt = 'review' THEN p.review "
//		+ "            ELSE p.title " + "          END")
//	List<Product> selectByOpt(@Param("sortOpt") String sortOpt, @Param("domestic") String domestic, @Param("category") String category,
//		@Param("genre") String genre);

}