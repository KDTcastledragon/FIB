package com.fox.fib.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	@PostMapping(value = "/bookmarkList")
	public List<Bookmark> bookmarklistLoginID(@RequestBody Map<String, String> data) {
		String loginID = data.get("id");

		log.info(loginID);

		List<Bookmark> bookmarkList = bookmarkservice.selectList(loginID);
		return bookmarkList;
	}

	// ===============================================================================================================

	@PostMapping(value = "/saveBookMark")
	public ResponseEntity<?> saveBookMark(@RequestBody PIPDTO savedDataOnBookmark, HttpSession session, Product pentity, Bookmark bentity) {
		try {
			String loginID = savedDataOnBookmark.getId();
			String opt = savedDataOnBookmark.getOpt();

			log.info("북마크Handle : " + savedDataOnBookmark);

			int pcode = savedDataOnBookmark.getProduct_code();

			if (opt.equals("save")) {
				boolean dupl = bookmarkservice.isDuplicated(loginID, pcode);
				if (dupl == false) {
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
					return ResponseEntity.ok("뭐냐?");
				}
			} // save
			else if (opt.equals("remove")) {
				bookmarkservice.deleteByProductCode(loginID, pcode);
				log.info("북마크 삭제");
				return ResponseEntity.ok("찜목록에서 삭제 하였습니다.");
			} // remove

			else {
				log.info("opt 오류");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("opt 오류");
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