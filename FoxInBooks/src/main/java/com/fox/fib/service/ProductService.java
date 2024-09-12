package com.fox.fib.service;

import java.util.List;

import com.fox.fib.domain.PageRequestDTO;
import com.fox.fib.domain.PageResultDTO;
import com.fox.fib.entity.Product;

public interface ProductService {

	// [1] 관리자 페이지.==================================================================================

	public List<Product> selectList();

	public List<Product> selectAllList();

	PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO);

	// [2] 리액트 메소드.==================================================================================

	public List<Product> selectByOpt(String sortOpt, String domestic, String category, String genre, int minp, int maxp);

//	public List<Product> selectListSortOfTitle(String domestic, String category, String genre); // 1.제목순
//	public List<Product> selectListSortOfPriceAsc(String domestic, String category, String genre); // 2.최저가순
//	public List<Product> selectListSortOfPriceDesc(String domestic, String category, String genre); // 3.최고가순
//	public List<Product> selectListSortOfSellCount(String domestic, String category, String genre); // 4.판매량순
//	public List<Product> selectListSortOfGradeAvg(String domestic, String category, String genre); // 5.평점순
//	public List<Product> selectListSortOfViewCount(String domestic, String category, String genre); // 6.리뷰순
//	public List<Product> selectListLimitedPrice(String domestic, String category, String genre, int minprice, int maxprice); // 7.제한가격검색

	public List<Product> selectListBestSeller(); // 8. 베스트셀러


	// [3] 기본 메소드.============================================================================================
	public Product selectOne(int product_code);

	public int save(Product entity);

	public int delete(int product_code);




	// ============================================================================================



}