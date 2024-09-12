package com.fox.fib.service;

import java.util.List;

import com.fox.fib.entity.Delivery_address;

public interface Delivery_addressService {
	int register(Delivery_address entity);
	int delete(int address_code);
	int deleteIdAddress(String id);
	public List<Delivery_address> selectAddressList(String user_id);
	Delivery_address dupCheck(String address_zip, String address, String address_detail);
	Delivery_address basicSearch(String id);
	int basicUpdate();
}
