package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fox.fib.domain.PageRequestDTO;
import com.fox.fib.domain.PageResultDTO;
import com.fox.fib.entity.Product;
import com.fox.fib.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RequiredArgsConstructor
@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

	private final ProductRepository repository;

	// [1] 관리자 페이지.=========================================================================================
	@Override
	public List<Product> selectList() {
		return repository.findAll();
	}

	@Override
	public List<Product> selectAllList() {
		return repository.selectAllList();
	}

	@Override
	public PageResultDTO<Product> selectListPageNation(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable(Sort.by("title").ascending());
		Page<Product> result = repository.findAll(pageable);
		return new PageResultDTO<>(result);
	}


	// [2] 리액트 메소드.==============================================================================
	@Override
	public List<Product> selectByOpt(String sortOpt, String domestic, String category, String genre, int minp, int maxp) {
		switch (sortOpt) {
		case "title":
			return repository.selectListSortOfTitle(domestic, category, genre);

		case "ascPrice":
			return repository.selectListSortOfPriceAsc(domestic, category, genre);

		case "descPrice":
			return repository.selectListSortOfPriceDesc(domestic, category, genre);

		case "sellCount":
			return repository.selectListSortOfSellCount(domestic, category, genre);

		case "gradeAvg":
			return repository.selectListSortOfGradeAvg(domestic, category, genre);

		case "review":
			return repository.selectListSortOfViewCount(domestic, category, genre);

		case "rangedPrice":
			return repository.selectRangedPrice(domestic, category, genre, minp, maxp);

		default:
			return null;
		}

	}

	@Override // 2.베스트셀러
	public List<Product> selectListBestSeller() {
		return repository.selectListBestSeller();
	}

	// [3] 기본 내장 메소드.=============================================================================================
	@Override
	public Product selectOne(int product_code) {
		Optional<Product> result = repository.findById(product_code);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	@Override
	public int save(Product entity) {
		repository.save(entity);                             // 저장 또는 수정
		return entity.getProduct_code();           // 저장후 key return
	}

	@Override
	public int delete(int product_code) {
		repository.deleteById(product_code);
		return product_code;
	}

	// =============================================================================================끝



}