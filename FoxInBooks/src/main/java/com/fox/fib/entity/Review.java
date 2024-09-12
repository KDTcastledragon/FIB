package com.fox.fib.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long review_code; // 리뷰코드
   private int product_code; // 제품코드
   private String id; // 회원 아이디
   private int star_count; // 별점
   private String regdate; // 작성일
   private String content; // 내용
   @Column(nullable = false)
   private String image; // 이미지
   
   
   /*
       < @Transient >
          - JPA(Java Persistence API)에서 엔티티 클래스의 필드를 매핑하지 않도록 지정하는 어노테이션.
           당 필드의 값은 데이터베이스에 저장되지 않고, JPA에서는 해당 필드를 무시.

       < MultipartFile >
          - Spring에서 파일 업로드를 처리하기 위한 인터페이스.
            클라이언트로부터 전송된 파일을 다루기 위해 사용.
            이를 통해 파일 업로드를 처리하는 데 필요한 다양한 기능을 제공.
    */
   @Transient
   private MultipartFile reviewImageUploadfile;
   
}
