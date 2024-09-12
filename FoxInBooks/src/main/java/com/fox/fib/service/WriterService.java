package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Writer;

public interface WriterService {

   // 작가 정보 전체 조회
   List<Writer> selectList();
   
   // 작가 정보 개별 조회
  Writer selectOne(int writer_code);

}