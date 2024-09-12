package com.fox.fib.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fox.fib.entity.Product;
import com.fox.fib.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/products")
@Log4j2
@AllArgsConstructor
public class ProductController {

	ProductService productservice;

	@GetMapping("/productlists")
	public void productlists(Model model) {
		model.addAttribute("adminProductList", productservice.selectAllList());
	}

	// ==========================================================================================

//	@GetMapping("/productlists")
//	public void productlists(Model model, @RequestParam(defaultValue = "1") String page, @RequestParam(defaultValue = "20") String size) {
//		int pageNum = Integer.parseInt(page);
//		int sizeNum = Integer.parseInt(size);
//
//		PageRequestDTO requestDTO = PageRequestDTO.builder().page(pageNum).size(sizeNum).build();
//
//		PageResultDTO<Product> resultDTO = productservice.selectListPageNation(requestDTO);
//
//		System.out.println("[46]리스트" + resultDTO.getEntityList());
//
//		model.addAttribute("adminProductList", resultDTO);
//
//	}

	// ==========================================================================================

	@GetMapping(value = "/productinsert")
	public void productinsert(Model model) {
	}

	@PostMapping(value = "/productInsertAction")
	public String productInsertAction(HttpServletRequest request, Product entity, Model model) throws IOException {
		String uri = "redirect:productlists";
		String realPath = "D:\\FIB\\src\\main\\webapp\\resources\\uploadImages\\";


		String saveOnDisk, saveOnTable = "";      // default

		MultipartFile productImage = entity.getUploadfilef();            // 저장경로 완성
		if (productImage != null && !productImage.isEmpty()) {           // image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)

			saveOnDisk = realPath + productImage.getOriginalFilename();      // 물리적위치 저장 (file1) : 저장경로 완성
			productImage.transferTo(new File(saveOnDisk));                   // 해당경로에 저장(붙여넣기)

			saveOnTable = productImage.getOriginalFilename();   // 1.3.2) Table 저장경로 완성 (file2)
		}
		entity.setImage(saveOnTable);

		try {
			log.info(" ENTITY : " + entity);
			log.info(" insert 성공 : " + productservice.save(entity));      // 왜냐하면, 이미 여기서 save 실행을 하거든요
			model.addAttribute("insertActionMsg", entity.getProduct_code());      // 이건 필요 읍서요
		} catch (Exception e) {
			log.info("** insert Exception => " + e.toString());
			model.addAttribute("insertActionMsg", e.toString());
			uri = "redirect:productinsert";
		}

		return uri;

	}


	// ==========================================================================================

	@GetMapping(value = "/productupdate")
	public void productupdate(Model model, Product entity) {
		try {
			log.info(" ENTITY : " + entity);
			// log.info("** product_code를 이용하여 selectOne 실행 : " + service.selectOne(entity.getProduct_code())); // 이건 잘못됐다. 왜? 실행'만' 하고 담질 않아서.
			log.info("** product_code를 이용하여 selectOne 실행후 담을 겁니다.");
			entity = productservice.selectOne(entity.getProduct_code());          // 반드시 채워줘야 한다!!
			model.addAttribute("pcode", entity);
		} catch (Exception e) {
			log.info("** update Exception => " + e.toString());
		}

	}

	@PostMapping(value = "/productUpdateAction")
	public String productUpdate(HttpSession session, Product entity, Model model) throws IOException {

		String uri = "redirect:productlists";

		try {
			log.info(" ENTITY : " + entity);
			log.info(" update 성공 : " + productservice.save(entity));
		} catch (Exception e) {
			log.info("** update Exception => " + e.toString());
			model.addAttribute("updateActionMsg", e.toString());
			uri = "redirect:productupdate";
		}

		return uri;
	}


	// ==============================================================================================================


	@GetMapping(value = "/productDeleteAction")
	public String productDelete(HttpSession session, Product entity, RedirectAttributes rttr) {
		String uri = "redirect:productlists";
		try {
			log.info(" ENTITY : " + entity);
			log.info(" delete 성공 : " + productservice.delete(entity.getProduct_code()));
			rttr.addFlashAttribute("deleteActionMsg", entity.getProduct_code());
		} catch (Exception e) {
			log.info("** delete Exception => " + e.toString());
			rttr.addFlashAttribute("deleteActionMsg", e.toString());
		}
		return uri;
	}

	// ===============================================================================================================





}