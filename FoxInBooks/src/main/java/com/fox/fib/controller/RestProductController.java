package com.fox.fib.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.entity.Product;
import com.fox.fib.entity.RecentView;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.RecentViewService;
import com.fox.fib.service.ReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/product")
@Log4j2
@AllArgsConstructor
public class RestProductController {
//////////////////20240810 방문한번 햇소
	ProductService productservice;
	RecentViewService recentviewservice;
	ReviewService reviewservice;

	// ==========================================================================================

	@GetMapping("/selectAllList")
	public ResponseEntity<?> selectAllList() {
		List<Product> selectedAllList = productservice.selectAllList();
		return ResponseEntity.ok(selectedAllList);
	}

	@GetMapping("/productSelectOne")
	public Product productSelectOne(@RequestParam(name = "productOneParam") String product_code, Product entity) {
		log.info(product_code);
		int pcode = Integer.parseInt(product_code);
		entity = productservice.selectOne(pcode);
		return entity;
	}


	// [1] 제목순. ========================================================================================
	@PostMapping("/selectListByOptions")
	public ResponseEntity<?> selectListByOptions(@RequestBody Map<String, String> data) {
		try {
			log.info("");
			log.info("옵션 상품 검색");
			log.info(data);
			log.info("");

			String sortOpt = data.get("sortOpt");
			String domestic = data.get("domestic");
			String category = data.get("category");
			String genre = data.get("genre");

			int minp = Integer.parseInt(data.get("minPrice"));
			int maxp = Integer.parseInt(data.get("maxPrice"));

//			log.info("data : {} {} {}", sortOpt, minp, maxp);

			List<Product> resultList = productservice.selectByOpt(sortOpt, domestic, category, genre, minp, maxp);
			log.info("옵션 상품 검색 결과 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 옵션 상품 검색 예외 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("productSelectedList2 오류");
		}
	}

	@GetMapping("/bestSeller")
	public ResponseEntity<?> bestSeller() {

		try {
			log.info("test_");
			log.info("test_");
			List<Product> resultList = productservice.selectListBestSeller();

			log.info("[203] bestSeller 확인 : " + resultList.toString());

			return ResponseEntity.ok(resultList);

		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("bestSeller 오류");

		}
	}

	// ======================================================================================================

	@GetMapping("/recentProduct")
	public ResponseEntity<?> recentProduct(@RequestParam(name = "id") String id, @RequestParam(name = "pcode") String pcode,
		Product pentity, RecentView rentity) {
		try {
			log.info("[153]최근방문 상품 확인 : " + id + " & " + pcode);

			if (id != null && !id.isEmpty()) {

				int product_code = Integer.parseInt(pcode);

				pentity = productservice.selectOne(product_code);

				if (recentviewservice.checkDuplicated(id, product_code) == 0) {

					List<RecentView> recentviewList = recentviewservice.selectListForUserId(id);

					if (recentviewList.size() >= 5) {
						recentviewservice.deleteOldest(id);
					}

					rentity.setId(id);
					rentity.setProduct_code(product_code);
					rentity.setProtype(pentity.getProtype());
					rentity.setTitle(pentity.getTitle());
					rentity.setImage(pentity.getImage());
					rentity.setPrice(pentity.getPrice());

					recentviewservice.save(rentity);

					log.info("새 최근본 상품 세이브!");

				} else if (recentviewservice.checkDuplicated(id, product_code) == 1) {

					log.info("중복 제품이라 안 들어감");
					return ResponseEntity.ok("중복 제품이라 안 들어감");

				} // else if

			} else {
				return ResponseEntity.ok("로그인 후 이용 가능");
			}

		} catch (Exception e) {
			log.error("최근방문상품 저장 실패요 : " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("최근방문 상품데이터 저장 실패");
		}
		return ResponseEntity.ok("예외없음");
	}

	// ======================================================================================================

	@GetMapping("/selectRecentProductList")
	public ResponseEntity<?> selectRecentProductList(@RequestParam(name = "id") String id, RecentView rentity) {

		try {
			if (id == null || id.isEmpty()) {
				return ResponseEntity.ok("로그인 후 확인하실 수 있습니다.");
			} else {
				List<RecentView> recentviewList = recentviewservice.selectListForUserId(id);
				return ResponseEntity.ok(recentviewList);
			}

		} catch (Exception e) {
			log.info("최근방문상품 실패요 : " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("최근방문상품출력 예외오류");
		}

	}
}