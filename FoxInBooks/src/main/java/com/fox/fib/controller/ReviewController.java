package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.Review;
import com.fox.fib.service.ProductService;
import com.fox.fib.service.ReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

//@RestController
@Controller
@RequestMapping("/review")
@Log4j2
@AllArgsConstructor
public class ReviewController {
   
   ReviewService service;
   ProductService productService;
   
   // 전체 리뷰 조회
   @GetMapping("/reviewList")
   public void reviewList(Model model) {
      model.addAttribute("reviewAll", service.findAllDesc());
   }
   
   // 리뷰 등록
   @GetMapping("/reviewInsert")
   public void reviewInsert() {
      
   }
   
   // 리뷰 등록 service 처리
   @PostMapping("/reviewinsert")
   public String reviewinsert(Model model, Review entity) throws IOException {
      String uri = "redirect:/review/reviewList";
      model.addAttribute("reviewAll", service.findAllDesc());
      
      String realPath = "C:\\MyTest_git\\Project\\FIB\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
      String StorageTable = "";
      
      MultipartFile reviewImageFile = entity.getReviewImageUploadfile();
      
      if(reviewImageFile != null && !reviewImageFile.isEmpty()) {
         /*
             < getOriginalFilename() >
                - MultipartFile 객체에서 업로드된 파일의 원본 파일명을 반환하는 메서드
                             
             < transferTo() >
                - MultipartFile의 내용을 파일 시스템의 파일이나 다른 출력 스트림으로 복사하는 데 사용.
                  주로 업로드된 파일을 서버의 특정 위치에 저장할 때 사용.
                  
                  이 메서드는 IOException을 던질 수 있으므로 try-catch 블록으로 에러 처리를 해줘야 함.
                       
             < new File() >
                - Java에서 파일을 나타내는 객체를 생성하는 데 사용. 
                  이 객체는 파일이나 디렉토리의 경로를 나타내며, 파일을 생성하거나 파일에 접근하는 데 사용.
                  생성된 파일 객체를 통해 파일의 존재 여부 확인, 읽기/쓰기, 삭제 등의 작업을 할 수 있음.
          */
         // 이미지를 물리적으로 저장
         String StorageFile = realPath + reviewImageFile.getOriginalFilename(); // 저장 경로
         reviewImageFile.transferTo(new File(StorageFile));
         
         // 이미지가 저장된 경로를 테이블에 저장
         StorageTable = reviewImageFile.getOriginalFilename(); // 저장 경로
      }
      
      entity.setImage(StorageTable); 
      
      try {
         service.save(entity);
         model.addAttribute("message", "리뷰 등록 성공");
      } catch(Exception e) {
         model.addAttribute("message", "리뷰 등록 실패");
         uri = "review/reviewInsert";
      }
      
      return uri;
      
   }
   
   // 리뷰 수정
   @GetMapping("/reviewUpdate")
   public String reviewUpdate(Model model, Review entity) {
      model.addAttribute("reviewOne", service.selectOne(entity.getReview_code()));
      return "review/reviewUpdate";
   }
   
   // 리뷰 수정 service 처리
   @PostMapping("/reviewupdate")
   public String reviewupdate(Model model, Review entity) throws IOException {
      
      String uri = "redirect:/review/reviewList";
      
      String realPath = "C:\\MyTest_git\\Project\\FIB\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
      String StorageTable = "";
      
      MultipartFile reviewImageFile = entity.getReviewImageUploadfile();
      
      if(reviewImageFile != null && !reviewImageFile.isEmpty()) {
         String StorageFile = realPath + reviewImageFile.getOriginalFilename();
         reviewImageFile.transferTo(new File(StorageFile));

         StorageTable = reviewImageFile.getOriginalFilename();
      } else {
         StorageTable= entity.getImage();
      }
      
      entity.setImage(StorageTable); 
      
      try {
         service.save(entity);
         
         model.addAttribute("reviewAll", service.findAllDesc());
         
         model.addAttribute("message", "리뷰 수정 성공");
      } catch(Exception e) {
         uri = "/review/reviewUpdate";
         model.addAttribute("reviewOne", service.selectOne(entity.getReview_code()));
         
         log.info(e.toString());
         model.addAttribute("message", "리뷰 수정 실패");
      }
      
      return uri;
   }

   // 리뷰 삭제
   @GetMapping("/reviewdelete")
   public String reviewdelete(Model model, Review entity) {
      String uri = "redirect:/review/reviewList";
      model.addAttribute("reviewAll", service.findAllDesc());
      
      try {
         service.delete(entity.getReview_code());
         model.addAttribute("message", "리뷰 삭제 성공");
      } catch(Exception e) {
         model.addAttribute("message", "리뷰 삭제 실패");
      }
      
      return uri;
      
   }
   
}