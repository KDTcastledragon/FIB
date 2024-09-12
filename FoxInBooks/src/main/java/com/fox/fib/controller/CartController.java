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

import com.fox.fib.domain.FromBookmarkDTO;
import com.fox.fib.domain.PIPDTO;
import com.fox.fib.entity.Cart;
import com.fox.fib.entity.Product;
import com.fox.fib.service.CartService;
import com.fox.fib.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/cart")
@Log4j2
@AllArgsConstructor
public class CartController {

	CartService cartservice;
	ProductService productservice;


	// ===============================================================================================================

	@GetMapping("/cartlist")
	public List<Cart> cartlist(HttpSession session, Model model, Cart entity) {
		String loginID = (String) session.getAttribute("loginID");
		log.info(loginID);
		List<Cart> cartList = cartservice.selectList(loginID);
		return cartList;
	}

	// ===============================================================================================================

	@GetMapping("/cartlistParam")
	public List<Cart> cartlistLoginID(HttpServletRequest request, Model model, Cart entity) {
		String loginID = request.getParameter("id");
		log.info(loginID);
		List<Cart> cartList = cartservice.selectList(loginID);
		return cartList;
	}



	// ===============================================================================================================

	@PostMapping(value = "/cartOnSaveAction")
	public ResponseEntity<?> cartOnSaveAction(@RequestBody PIPDTO savedDataOnCart, HttpSession session, Product pentity, Cart centity)
		throws IOException {
		try {
			String loginID = savedDataOnCart.getId();
			log.info("loginID가 잘 담겼나? " + loginID);
			log.info("savedDataOnCart(61) : " + savedDataOnCart);


			int pcode = savedDataOnCart.getProduct_code();
			int amount = savedDataOnCart.getProamount();

			if (cartservice.checkDuplicated(loginID, pcode) == 0) {
				pentity = productservice.selectOne(pcode);
				centity.setId(loginID);
				centity.setProduct_code(pentity.getProduct_code());
				centity.setProtype(pentity.getProtype());
				centity.setDomestic(pentity.getDomestic());
				centity.setTitle(pentity.getTitle());
				centity.setImage(pentity.getImage());
				centity.setProamount(amount);
				centity.setPrice(pentity.getPrice());
				cartservice.save(centity);

				log.info(" cartOnSave 성공");
				return ResponseEntity.ok("새 상품을 장바구니에 담았습니다.");

			} else if (cartservice.checkDuplicated(loginID, pcode) == 1) {
				cartservice.addDuplicated(loginID, pcode, amount);
				return ResponseEntity.ok("이미 장바구니에 상품이 존재하므로, 수량만 추가합니다.");

			} else {
				return ResponseEntity.ok("이미 장바구니에 상품이 존재하므로, 수량만 추가합니다.");
			}

		} catch (Exception e) {
			log.info("** insert Exception => " + e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("장바구니 오류");
		}

	}


	// ===============================================================================================================

	@PostMapping(value = "/cartOnSaveFromBookmark")
	public int cartOnSaveFromBookmark(@RequestBody List<FromBookmarkDTO> selectedItems, Product pentity, Cart centity) throws IOException {
		int uDNum = 999999999;
		try {
			log.info("");
			log.info("[115] selectedItems 배송확인 : {}", Arrays.toString(selectedItems.toArray()));

			for (FromBookmarkDTO data : selectedItems) {

				String loginID = data.getId();
				int pcode = data.getProduct_code();
				int amount = 1;
				int bcode = data.getBookmark_code();

				log.info("[124] ID & pcode & amount & bcode 대입 체크 : " + loginID + " & " + pcode + " & " + amount + " & " + bcode);

				log.info("[126] 중복체크 시작! 현재 상품 번호 : " + pcode);

				pentity = productservice.selectOne(pcode);

				if (cartservice.checkDuplicated(loginID, pcode) == 0) {

					centity.setId(loginID);
					centity.setProduct_code(pentity.getProduct_code());
					centity.setProtype(pentity.getProtype());
					centity.setDomestic(pentity.getDomestic());
					centity.setTitle(pentity.getTitle());
					centity.setImage(pentity.getImage());
					centity.setProamount(amount);
					centity.setPrice(pentity.getPrice());
					log.info(" centity에 잘 담겼니 : {}", centity);

					cartservice.save(centity);

					log.info("[148]신상품 카트save 성공 : {}", centity);
					log.info("");

					uDNum = centity.getProduct_code();

				} else if (cartservice.checkDuplicated(loginID, pcode) == 1) {
					cartservice.addDuplicated(loginID, pcode, amount);

					log.info(" 중복제품 카트save 성공 : {}", centity);
					log.info("");

					uDNum = 1004;

				}

			} // for

		} catch (Exception e) {
			log.info("** insert Exception => " + e.toString());

		}

		return uDNum;

	}

	// ==========================================================================================


	@PostMapping(value = "/cartProamountUpdateAction")
	public ResponseEntity<?> cartProamountUpdateAction(@RequestBody Cart UpdatedProamountData, Product pentity, Cart centity)
		throws IOException {
		try {
			log.info(UpdatedProamountData);

			int ccode = UpdatedProamountData.getCart_code();
			int amount = UpdatedProamountData.getProamount();

			cartservice.updateProamount(ccode, amount);
			return ResponseEntity.ok("업데이트 잘 들어갓슈");
		} catch (Exception e) {
			log.error("수량 업데이트 실패: " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수량 업데이트 실패");
		}
	}


	// ==========================================================================================


	@PostMapping(value = "/cartDeleteThisAction")
	public int cartDeleteThisAction(@RequestBody Cart DeleteThisProductData) {
		int deleteCode = -1;
		try {
			log.info(DeleteThisProductData);
			int ccode = DeleteThisProductData.getCart_code();
			deleteCode = cartservice.delete(ccode);
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
		}
		return deleteCode;
	}

	@PostMapping(value = "/cartDeleteSelectedAction")
	public void cartDeleteSelectedAction(@RequestBody List<Integer> selectedCartCodeArray, Cart entity) {
		try {
			log.info(Arrays.toString(selectedCartCodeArray.toArray()));
			for (Integer c : selectedCartCodeArray) {
				cartservice.delete(c);
			}
		} catch (Exception e) {
			log.info(" 삭제 실패 : " + e.toString());
		}
	}

}