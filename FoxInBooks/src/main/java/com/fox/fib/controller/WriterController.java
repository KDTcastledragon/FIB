package com.fox.fib.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fox.fib.entity.Writer;
import com.fox.fib.service.WriterService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/writer")
@AllArgsConstructor
public class WriterController {
   
   WriterService service;
   
   // 작가 정보 전체 조회
   @GetMapping("/writerList")
   public void writerList(Model model) {
      model.addAttribute("writerAll", service.selectList());
   }
   
   // 작가 정보 개별 조회
   @GetMapping("/writerone")
   public String writerone(Model model, Writer writer) {
	   model.addAttribute("wrtierOne", service.selectOne(writer.getWriter_code()));
	   return "writer/writerListOne";
   }
   
}