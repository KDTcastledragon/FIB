package com.fox.fib.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Writer {
   @Id
   @GeneratedValue
   private int writer_code; // 작가코드
   private String writer; // 작가명
   private String birthday; // 생년월
   private String major_work; // 대표작
   private String introduction; // 작가설명
}