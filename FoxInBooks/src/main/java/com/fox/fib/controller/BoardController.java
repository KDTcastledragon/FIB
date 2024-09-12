package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fox.fib.entity.Faq;
import com.fox.fib.entity.Inquiry;
import com.fox.fib.entity.Notice;
import com.fox.fib.repository.FaqRepository;
import com.fox.fib.repository.InquiryRepository;
import com.fox.fib.repository.NoticeRepository;
import com.fox.fib.service.FaqService;
import com.fox.fib.service.InquiryService;
import com.fox.fib.service.NoticeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/board")
@AllArgsConstructor
@Log4j2
public class BoardController {
	
	NoticeService notice_service;
	FaqService faq_service;
	InquiryService inquiry_service;

	// (관리자) 공지사항 리스트 + 페이지네이션, 내림차순 정렬
	@GetMapping("/noticeListAdmin")
	public void noticeListAdmin(@RequestParam(name = "category", defaultValue = "") String category,
					            @RequestParam(name = "page", defaultValue = "0") int page,
					            @RequestParam(name = "size", defaultValue = "10") int size,
					            Model model) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Notice> noticePageList = notice_service.getNoticeList(pageable);
		
		model.addAttribute("noticeList", noticePageList.getContent());
	    model.addAttribute("itemPage", noticePageList);
	    model.addAttribute("currentPage", noticePageList.getNumber());
	    model.addAttribute("totalPages", noticePageList.getTotalPages());
	    model.addAttribute("totalItems", noticePageList.getTotalElements());
	}
	
	@GetMapping("/pageNoticeListAdmin")
	public String pageNoticeListAdmin(@RequestParam(name = "category", defaultValue = "") String category,
					                 @RequestParam(name = "page", defaultValue = "0") int page,
					                 @RequestParam(name = "size", defaultValue = "10") int size,
					                 Model model) {
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Notice> noticePageList = notice_service.getPageNoticeList(category, pageable);
		
		model.addAttribute("noticeList", noticePageList.getContent());
	    model.addAttribute("itemPage", noticePageList);
	    model.addAttribute("currentPage", noticePageList.getNumber());
	    model.addAttribute("totalPages", noticePageList.getTotalPages());
	    model.addAttribute("totalItems", noticePageList.getTotalElements());
	    
	    return "board/noticeListAdmin";
	}

	// notice 등록하기 get
	@GetMapping(value="/noticeRegister")
	public void noticeRegister() {
	}
	
	// notice 등록하기 post
	@PostMapping("/noticeRegister")
	public String noticeRegister(HttpServletRequest request, Notice entity, Model model)  throws IOException {
		String uri = "board/noticeRegister";
			
		String realPath = "C:\\Users\\yangs\\Desktop\\pp\\pjt\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
		String file1, file2="";
			
		MultipartFile uploadfilef = entity.getUploadfilef();
		if ( uploadfilef!=null && !uploadfilef.isEmpty()) {
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 1.3.1) 물리적위치 저장 (file1)
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성 
			uploadfilef.transferTo(new File(file1)); //해당경로에 저장(붙여넣기)
			file2 = "/resources/uploadImages/" + uploadfilef.getOriginalFilename();
		} // Image 선택한 경우
			
		// 1.4) 완성된 경로를 dto 에 set
		entity.setImage(file2);
		
		try {
			log.info("** insert 성공 id => "+ notice_service.save(entity));
			model.addAttribute("message", "새 공지사항이 등록되었습니다.");
			uri = "redirect:noticeRegister";
		} catch (Exception e) {
			log.info("** insert Exception => "+e.toString());
			model.addAttribute("message", "공지사항 등록에 실패했습니다.");
		}
		return uri;
	}
	
	// 공지사항 수정하기 get
	@GetMapping(value ="/noticeEdit")
	public String noticeEdit(HttpServletRequest request, Notice entity, Model model) {
		model.addAttribute("noticeList", notice_service.selectOne(entity.getNotice_code()));
		return "board/noticeEditForm";
	}
			
	// 공지사항 수정하기 form
	@PostMapping("/noticeEditForm")
	public String noticeEditForm(HttpSession session, Notice entity, Model model) throws IOException {
		// 수정 성공 -> noticeList를 받아와야함 (selectList()) -> 그후 출력 요청해야함
		model.addAttribute("noticeList", notice_service.selectList());
//		model.addAttribute("list", entity);
		String uri="board/noticeListAdmin";
			
		MultipartFile uploadfilef = entity.getUploadfilef(); 
		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			String realPath = "C:\\Users\\yangs\\Desktop\\pp\\pjt\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";
			String file1 = realPath + uploadfilef.getOriginalFilename(); 
			uploadfilef.transferTo(new File(file1)); // IO 발생: Checked Exception 처리  
				
			String file2="resources/uploadImages/" + uploadfilef.getOriginalFilename();
			entity.setImage(file2);
		}
			
		// => Service 처리
		try {
			log.info("** update 성공 id => "+ notice_service.save(entity));
			session.setAttribute("title", entity.getTitle());
			model.addAttribute("message", "공지사항을 수정했습니다.");
		} catch (Exception e) {
			log.info("** update Exception => "+e.toString());
			model.addAttribute("message", "공지사항 수정에 실패했습니다.");
			uri="board/noticeEditForm";
		}
		return uri;
	}
	
	// 공지사항 삭제
	@DeleteMapping("/noticeDelete/{notice_code}")
	public ResponseEntity<?> noticeDelete(@PathVariable("notice_code") int notice_code, Notice entity){
		entity.setNotice_code(notice_code);
		if(notice_service.delete(notice_code) > 0) {
			log.info("axidelete HttpStatus.OK = " + HttpStatus.OK);
			return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);		
		} else {
			log.info("axidelete HttpStatus.BAD_GATEWAY = " + HttpStatus.BAD_GATEWAY);
			return new ResponseEntity<String>("삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
		}
	}

	// ==================================================================================================================
	// FAQ
	
	// faqList
//	@GetMapping("/faqListAdmin")
//	public void faqListAdmin(Model model) {
//		model.addAttribute("faqList", faq_service.selectList());
//	}
	
//	@GetMapping("/faqListAdmin")
//	public void faqListAdmin(@RequestParam(name = "category", defaultValue = "") String category, Model model) {
//		// 페이지 네이션을 위한 변수선언
//		int page = 0; // 시작 페이지번호
//		int size = 2; // 페이지당 보여지는 컨텐츠 갯수
//		
//		Pageable pageable = PageRequest.of(page, size);
//		Page<Faq> faqPageList = faq_service.getFaqList(category, pageable);		
//		
//		model.addAttribute("faqList", faqPageList.getContent());
//		// 페이지 관련 정보를 모델에 추가
//		model.addAttribute("itemPage", faqPageList);
//		model.addAttribute("currentPage", faqPageList.getNumber());
//		model.addAttribute("totalPages", faqPageList.getTotalPages());
//		model.addAttribute("totalItems", faqPageList.getTotalElements());
//		
//		log.info("faq_service.selectList() : " + faq_service.selectList());
//		log.info("faq_service.getFaqList(category, pageable) : " + faq_service.getFaqList(category, pageable));
//		log.info("faqPageList.getContent() : " + faqPageList.getContent());
//		log.info("faqPageList : " + faqPageList);
//		log.info("faqPageList.getNumber() : " + faqPageList.getNumber());
//		log.info("faqPageList.getTotalElements() : " + faqPageList.getTotalElements());
//	}
//	
	// (관리자) FAQ 리스트 + 페이지네이션, 내림차순 정렬
//	@GetMapping("/faqListAdmin")
//	public void faqListAdmin(@RequestParam(name = "category", defaultValue = "") String category,
//	                         @RequestParam(name = "page", defaultValue = "0") int page,
//	                         @RequestParam(name = "size", defaultValue = "10") int size,
//	                         Model model) {
//		log.info("Received request with category: " + category);
//		
//	    Pageable pageable = PageRequest.of(page, size);
//	    Page<Faq> faqPageList = faq_service.getFaqList(pageable);
//
//	    model.addAttribute("faqList", faqPageList.getContent());
//	    model.addAttribute("itemPage", faqPageList);
//	    model.addAttribute("currentPage", faqPageList.getNumber());
//	    model.addAttribute("totalPages", faqPageList.getTotalPages());
//	    model.addAttribute("totalItems", faqPageList.getTotalElements());
//	    
//		log.info("faq_service.getFaqList(category, pageable) : " + faq_service.getFaqList(pageable));
//		log.info("faqPageList.getContent() : " + faqPageList.getContent());
//		log.info("faqPageList : " + faqPageList);
//		log.info("faqPageList.getNumber() : " + faqPageList.getNumber());
//		log.info("faqPageList.getTotalElements() : " + faqPageList.getTotalElements());
//	}
	@GetMapping("/faqListAdmin")
	public String faqListAdmin(@RequestParam(name = "category", defaultValue = "all") String category,
							   @RequestParam(name = "page", defaultValue = "0") int page,
	                           @RequestParam(name = "size", defaultValue = "5") int size,
	                           Model model) {
		log.info("Received request with category: " + category);
		
		if(category == "all") {
			category = "";
		}
	    Pageable pageable = PageRequest.of(page, size);
	    
	    Page<Faq> faqPageList;
	    
	    if(category.equals("all")) {
	    	faqPageList = faq_service.getPageFaqListAll(pageable);
	    } else {
	    	faqPageList = faq_service.getPageFaqList(category, pageable);
	    }

	    model.addAttribute("faqList", faqPageList.getContent());
	    model.addAttribute("itemPage", faqPageList);
	    model.addAttribute("currentPage", faqPageList.getNumber());
	    model.addAttribute("totalPages", faqPageList.getTotalPages());
	    model.addAttribute("totalItems", faqPageList.getTotalElements());
	    
	    log.info("faqPageList : " + faqPageList);
		log.info("faqPageList.getContent() : " + faqPageList.getContent());
		log.info("faqPageList.getNumber() : " + faqPageList.getNumber());
		log.info("faqPageList.getTotalElements() : " + faqPageList.getTotalElements());
		
		return "board/faqListAdmin";
	}
	
	@GetMapping("/pageFaqListAdmin")
	public String pageFaqListAdmin(@RequestParam(name = "category") String category,
	                        	   @RequestParam(name = "page", defaultValue = "0") int page,
	                        	   @RequestParam(name = "size", defaultValue = "10") int size,
	                        	   Model model) {
		
		log.info("파라미터Received request with category: " + category);
	    Pageable pageable = PageRequest.of(page, size);
	    Page<Faq> faqPageList = faq_service.getPageFaqList(category, pageable);
   
	    model.addAttribute("itemPage", faqPageList);	
	    model.addAttribute("faqList", faqPageList.getContent());
	    model.addAttribute("currentPage", faqPageList.getNumber());
	    model.addAttribute("totalPages", faqPageList.getTotalPages());
	    model.addAttribute("totalItems", faqPageList.getTotalElements());
	    
	    log.info("파라미터itemPage : " + faqPageList);
		log.info("파라미터faqPageList.getContent() : " + faqPageList.getContent());
		log.info("파라미터faqPageList.getNumber() : " + faqPageList.getNumber());
		log.info("파라미터faqPageList.getTotalElements() : " + faqPageList.getTotalElements());
		
		return "board/faqListAdmin";
	}
	
	// faq 등록하기 get
	@GetMapping(value="/faqRegister")
	public void faqRegister() {
	}
	
	// faq 등록하기 post
	@PostMapping("/faqRegister")
	public String faqRegister(HttpServletRequest request, Faq entity, Model model)  throws IOException {
		String uri = "board/faqRegister";
				
		try {
			log.info("** faq 등록 성공 id => "+ faq_service.save(entity));
			model.addAttribute("message", "새 FAQ가 등록되었습니다.");
			uri = "redirect:faqRegister";
		} catch (Exception e) {
			log.info("** faq 등록 Exception => "+e.toString());
			model.addAttribute("message", "FAQ 등록에 실패했습니다.");
		}
		return uri;
	}
	
	// faq 수정하기 get
	@GetMapping(value ="/faqEdit")
	public String faqEdit(HttpServletRequest request, Faq entity, Model model) {
		model.addAttribute("faqList", faq_service.selectOne(entity.getFaq_code()));
		return "board/faqEditForm";
	}
			
	// faq 수정하기 form
	@PostMapping("/faqEditForm")
	public String faqEditForm(HttpSession session, Faq entity, Model model) throws IOException {
		// 수정 성공 -> noticeList를 받아와야함 (selectList()) -> 그후 출력 요청해야함
		model.addAttribute("faqList", faq_service.selectList());
//		model.addAttribute("list", entity);
			
		return "board/faqListAdmin";
	}
	
	// faq 삭제
	@DeleteMapping("/faqDelete/{faq_code}")
	public ResponseEntity<?> faqDelete(@PathVariable("faq_code") int faq_code, Faq entity){
		entity.setFaq_code(faq_code);
		if(faq_service.delete(faq_code) > 0) {
			log.info("axidelete HttpStatus.OK = " + HttpStatus.OK);
			return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);		
		} else {
			log.info("axidelete HttpStatus.BAD_GATEWAY = " + HttpStatus.BAD_GATEWAY);
			return new ResponseEntity<String>("삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
		}
	}
	
	// ==================================================================================================================
	// 1:1문의 (inquiry)
	
	// (관리자) 1:1문의 리스트 + 페이지네이션, 내림차순 정렬
	@GetMapping("/inquiryListAdmin")
	public String inquiryListAdmin(@RequestParam(name = "page", defaultValue = "0") int page,
					               @RequestParam(name = "size", defaultValue = "10") int size,
					               Model model) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Inquiry> inquiryPageList = inquiry_service.getPageInquiryList(pageable);
		
		model.addAttribute("inquiryList", inquiryPageList.getContent());
	    model.addAttribute("itemPage", inquiryPageList);
	    model.addAttribute("currentPage", inquiryPageList.getNumber());
	    model.addAttribute("totalPages", inquiryPageList.getTotalPages());
	    model.addAttribute("totalItems", inquiryPageList.getTotalElements());
	    
	    return "board/inquiryListAdmin";
	}
	
	@GetMapping("/pageInquiryListAdmin")
	public String pageInquiryListAdmin(@RequestParam(name = "answer_check") boolean answer_check,
								 	  @RequestParam(name = "page", defaultValue = "0") int page,
								 	  @RequestParam(name = "size", defaultValue = "10") int size,
								 	  Model model) {
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Inquiry> inquiryPageList = inquiry_service.getUnanswerInquiryList(answer_check, pageable);
		
		model.addAttribute("itemPage", inquiryPageList);
		model.addAttribute("inquiryList", inquiryPageList.getContent());
	    model.addAttribute("currentPage", inquiryPageList.getNumber());
	    model.addAttribute("totalPages", inquiryPageList.getTotalPages());
	    model.addAttribute("totalItems", inquiryPageList.getTotalElements());
	    log.info("파라미터itemPage : " + inquiryPageList);
		log.info("파라미터inquiryPageList.getContent() : " + inquiryPageList.getContent());
		log.info("파라미터inquiryPageList.getNumber() : " + inquiryPageList.getNumber());
		log.info("파라미터inquiryPageList.getTotalElements() : " + inquiryPageList.getTotalElements());
		
		return "board/inquiryListAdmin";
	}
	
	// 1:1문의 답변달기 get
	@GetMapping(value ="/inquiryAnswer")
	public String inquiryAnswer(HttpServletRequest request, Inquiry entity, Model model) {
		model.addAttribute("inquiryList", inquiry_service.selectOne(entity.getInquiry_code()));
		return "board/inquiryAnswerForm";
	}
			
	// 1:1문의 답변달기 form
	@PostMapping("/inquiryAnswerForm")
	public String inquiryAnswerForm(HttpSession session, Inquiry entity, Model model) throws IOException {
		// 답변달기 성공하면 answer_check가 true로 변경.
		// 변경된 entity값을 service 처리
		entity.setAnswer_check(true);
		inquiry_service.save(entity);
		
		model.addAttribute("inquiryList", inquiry_service.selectList());
			
		return "board/inquiryListAdmin";
	}
}