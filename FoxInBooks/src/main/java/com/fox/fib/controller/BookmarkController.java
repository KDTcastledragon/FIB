package com.fox.fib.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fox.fib.domain.PIPDTO;
import com.fox.fib.entity.Bookmark;
import com.fox.fib.entity.Product;
import com.fox.fib.service.BookmarkService;
import com.fox.fib.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/bookmark")
@Log4j2
@AllArgsConstructor
public class BookmarkController {

	BookmarkService bookmarkservice;
	ProductService productservice;

	// ===============================================================================================================

	// @GetMapping("/bookmarklist")
	// public List<Bookmark> bookmarklist(HttpSession session, Model model, Bookmark entity) {
	// String loginID = (String) session.getAttribute("loginID");
	// log.info(loginID);
	// List<Bookmark> bookmarkList = bookmarkservice.selectList(loginID);
	// return bookmarkList;
	// }

	// ===============================================================================================================

	@GetMapping("/bookmarklistParam")
	public List<Bookmark> bookmarklistLoginID(HttpServletRequest request, Model model, Bookmark entity) {
		String loginID = request.getParameter("id");

		log.info(loginID);

		List<Bookmark> bookmarkList = bookmarkservice.selectList(loginID);
		return bookmarkList;
	}

	// ===============================================================================================================

	@PostMapping(value = "/bookmarkOnSaveAction")
	public ResponseEntity<?> bookmarkOnSaveAction(@RequestBody PIPDTO savedDataOnBookmark, HttpSession session, Product pentity,
		Bookmark bentity) throws IOException {
		try {
			String loginID = savedDataOnBookmark.getId();

			log.info("loginID가 잘 담겼나? " + loginID);
			log.info("[69]savedDataOnBookmark : " + savedDataOnBookmark);

			int pcode = savedDataOnBookmark.getProduct_code();

			if (bookmarkservice.checkDuplicated(loginID, pcode) == 0) {
				pentity = productservice.selectOne(pcode);
				bentity.setId(loginID);
				bentity.setProduct_code(pentity.getProduct_code());
				bentity.setProtype(pentity.getProtype());
				bentity.setDomestic(pentity.getDomestic());
				bentity.setTitle(pentity.getTitle());
				bentity.setImage(pentity.getImage());
				bentity.setPrice(pentity.getPrice());
				bookmarkservice.save(bentity);

				log.info(" bookmarkOnSave 성공");
				return ResponseEntity.ok("새 상품을 찜목록에 담았어요");

			} else {
				return ResponseEntity.ok("이미 찜목록에 상품을 담았어요");
			}

		} catch (Exception e) {
			log.info("** insert Exception => " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("북마크 오류");
		}
	}


	// ==========================================================================================


	@PostMapping(value = "/bookmarkDeleteThisAction")
	public int bookmarkDeleteThisAction(@RequestBody Bookmark DeleteThisProductData) {
		int deleteCode = -11;
		try {
			log.info(DeleteThisProductData);

			int ccode = DeleteThisProductData.getBookmark_code();
			deleteCode = bookmarkservice.delete(ccode);
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
		}
		return deleteCode;
	}


	@PostMapping(value = "/bookmarkDeleteSelectedAction")
	public void bookmarkDeleteSelectedAction(@RequestBody List<Integer> selectedCartCodeArray) {
		try {
			log.info(Arrays.toString(selectedCartCodeArray.toArray()));
			for (Integer c : selectedCartCodeArray) {
				bookmarkservice.delete(c);
			}
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
		}
	}

	// ==========================================================================================

}