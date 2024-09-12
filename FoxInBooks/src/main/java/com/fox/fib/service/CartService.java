package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Cart;

public interface CartService {
	public List<Cart> selectList(String loginID);

	public int checkDuplicated(String loginID, int product_code);

	public int addDuplicated(String loginID, int product_code, int proamount);

	public int updateProamount(int cart_code, int proamount);

	// ============================================================================================

	// 결제 후 장바구니 내역 삭제
	public int deleteCartAfterOrder(String userId, int product_code);

	// ============================================================================================

	public Cart selectOne(int cart_code);

	public int save(Cart entity);

	public int delete(int cart_code);


}