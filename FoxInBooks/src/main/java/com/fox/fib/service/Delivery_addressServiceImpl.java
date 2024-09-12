package com.fox.fib.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.fox.fib.entity.Delivery_address;
import com.fox.fib.repository.Delivery_addressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Delivery_addressServiceImpl implements Delivery_addressService {
	private final Delivery_addressRepository repository;
	
	@Override
	public int register(Delivery_address entity) {
		repository.save(entity);
		return entity.getAddress_code();
	}
	
	@Override
	public Delivery_address dupCheck(String address_zip, String address, String address_detail) {
		return repository.dupCheck(address_zip, address, address_detail);
	}
	
	@Override
	public Delivery_address basicSearch(String id) {
		return repository.basicSearch(id);
	}
	
	@Override
	public int basicUpdate() {
		return repository.basicUpdate();
	}

	@Override
	public List<Delivery_address> selectAddressList(String user_id) {
		return repository.selectAddressList(user_id);
	}

	@Override
	public int delete(int address_code) {
		repository.deleteById(address_code);
		return address_code;
	}
	
	@Override
	public int deleteIdAddress(String id) {
		repository.deleteIdAddress(id);
		return 0;
	}

}
