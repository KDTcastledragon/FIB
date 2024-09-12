package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.Writer;
import com.fox.fib.repository.WriterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WriterServiceImpl implements WriterService {
   
   private final WriterRepository repository;

   // 작가 정보 전체 조회
   @Override
   public List<Writer> selectList() {
      return repository.findAll();
   }
   
   // 작가 정보 개별 조회
   @Override
   public Writer selectOne(int writer_code) {
	   Optional<Writer> result = repository.findById(writer_code);
	   
	   if(result.isPresent()) {
		   return result.get();
	   } else {
		   return null;
	   }
   }

}