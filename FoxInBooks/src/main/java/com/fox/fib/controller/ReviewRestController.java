package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.Review;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.ReviewService;
import com.fox.fib.service.WriterService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/restreview")
@Log4j2
@AllArgsConstructor
@CrossOrigin
public class ReviewRestController {

	ProductService productService;
	WriterService writerService;
	ReviewService reviewService;

	// 리뷰 전체 정보
	@PostMapping("/reviewList")
	public List<Review> reviewList() {
		return reviewService.findAllDesc();
	}

	// 리뷰 등록
	@PostMapping("/reviewinsert")
	public ResponseEntity<?> reviewinsert(Review entity) throws IOException {

		String realPath = "C:\\MyTest_git\\Project\\finalProject\\FIB\\src\\main\\reactp01\\public\\img";
		String StorageTable = "";

		MultipartFile reviewImageFile = entity.getReviewImageUploadfile();

		if (reviewImageFile != null && !reviewImageFile.isEmpty()) {
			/*
			 * < getOriginalFilename() > - MultipartFile 객체에서 업로드된 파일의 원본 파일명을 반환하는 메서드
			 * 
			 * < transferTo() > - MultipartFile의 내용을 파일 시스템의 파일이나 다른 출력 스트림으로 복사하는 데 사용. 주로
			 * 업로드된 파일을 서버의 특정 위치에 저장할 때 사용.
			 * 
			 * 이 메서드는 IOException을 던질 수 있으므로 try-catch 블록으로 에러 처리를 해줘야 함.
			 * 
			 * < new File() > - Java에서 파일을 나타내는 객체를 생성하는 데 사용. 이 객체는 파일이나 디렉토리의 경로를 나타내며,
			 * 파일을 생성하거나 파일에 접근하는 데 사용. 생성된 파일 객체를 통해 파일의 존재 여부 확인, 읽기/쓰기, 삭제 등의 작업을 할 수 있음.
			 */
			// 이미지를 물리적으로 저장
			String StorageFile = realPath + reviewImageFile.getOriginalFilename(); // 저장 경로
			reviewImageFile.transferTo(new File(StorageFile));

			// 이미지가 저장된 경로를 테이블에 저장
			StorageTable = reviewImageFile.getOriginalFilename(); // 저장 경로
		}

		entity.setImage(StorageTable);

		try {
			System.out.println("[121] 등록할 리뷰의 상품코드 : " + entity.getProduct_code());

			int pcode = entity.getProduct_code();

			reviewService.save(entity); // 1. 리뷰 등록

			reviewService.calculateAvg(pcode); // 2. 평균값계산후 업데이트.

			int calculatedViewCount = reviewService.calculateViewCount(pcode); // 3. 리뷰수 계산

			reviewService.updateViewCount(pcode, calculatedViewCount); // 4. 계산된 리뷰수로 업데이트

			return ResponseEntity.ok("리뷰 등록 성공");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("리뷰 등록 실패 : " + e.toString());
		}
	}

	// 리뷰 수정 service 처리
//	@PostMapping("/reviewupdate")
//	public ResponseEntity<?> reviewupdate(Review entity) throws IOException {
//
//	   String realPath = "C:\\MyTest_git\\Project\\FIB\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
//	   String StorageTable = "";
//
//	   MultipartFile reviewImageFile = entity.getReviewImageUploadfile();
//
//	   if(reviewImageFile != null && !reviewImageFile.isEmpty()) {
//	      String StorageFile = realPath + reviewImageFile.getOriginalFilename();
//	      reviewImageFile.transferTo(new File(StorageFile));
//
//	      StorageTable = reviewImageFile.getOriginalFilename();
//	   } else {
//	      StorageTable= entity.getImage();
//	   }
//
//	   entity.setImage(StorageTable);
//
//	   try {
//		   reviewService.save(entity);
//		   return ResponseEntity.ok("리뷰 등록 성공");
//	   } catch(Exception e) {
//		   return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("리뷰 등록 실패 : " + e.toString());
//	   }
//	}

	// 리뷰 삭제
	@PostMapping("/reviewdelete")
	public ResponseEntity<?> reviewdelete(@RequestBody Review entity) {
		System.out.println("[121] 삭제할 리뷰의 상품코드 : " + entity.getProduct_code());

		try {
			int pcode = entity.getProduct_code();

			log.info(entity);

			reviewService.delete(entity.getReview_code()); // 1. 리뷰 삭제

			reviewService.calculateAvg(pcode); // 2. 평균값계산후 업데이트.

			int calculatedViewCount = reviewService.calculateViewCount(pcode); // 3. 리뷰수 계산

			reviewService.updateViewCount(pcode, calculatedViewCount); // 4. 계산된 리뷰수로 업데이트

			return ResponseEntity.ok("리뷰 삭제 성공");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("리뷰 삭제 실패 : " + e.toString());
		}
	}

}