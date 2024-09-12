package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fox.fib.entity.Cart;
import com.fox.fib.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService {


	private final CartRepository repository;

	@Override
	public List<Cart> selectList(String loginID) {
		return repository.findListByLoginID(loginID);
	}

	@Override
	public int checkDuplicated(String loginID, int product_code) {
		Optional<Cart> result = repository.checkByIdPcode(loginID, product_code);
		if (result.isPresent())
			return 1;
		else
			return 0;
	}

	@Override
	public int addDuplicated(String loginID, int product_code, int proamount) {
		repository.addDuplicated(loginID, product_code, proamount);
		return product_code;
	}

	@Override
	public int updateProamount(int cart_code, int proamount) {
		repository.updateProamount(cart_code, proamount);
		return cart_code;
	}

	// =========================================================================

	// 결제 후 장바구니 내역 삭제
	@Override
	public int deleteCartAfterOrder(String userId, int product_code) {
		return repository.deleteCartAfterOrder(userId, product_code);
	}

	// =========================================================================

	@Override
	public Cart selectOne(int cart_code) {
		Optional<Cart> result = repository.findById(cart_code);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	@Override
	public int save(Cart entity) {
		repository.save(entity);                             // 저장 또는 수정
		return entity.getProduct_code();                     // 저장후 key return
	}

	@Override
	public int delete(int cart_code) {
		int deleteCode = cart_code;
		repository.deleteById(cart_code);
		return deleteCode;
	}

} // class