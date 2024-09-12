package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fox.fib.entity.Coupon;
import com.fox.fib.repository.CouponRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {
	
	private final CouponRepository repository;

	// selectList
	@Override
    public List<Coupon> selectList() {
    	return repository.findAll();
    }
	
	// selectOne
    @Override
    public Coupon selectOne(int coupon_code) {
    	Optional<Coupon> result = repository.findById(coupon_code);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    // insert / update
    // 수정시 수정성공한 시간으로 modDate 업데이트 되게.
    @Override
	public int save(Coupon entity) {
//    	if (entity != null) {
//    		entity.setModDate(LocalDateTime.now());
//        }
    	repository.save(entity); // 저장 또는 수정
    	return entity.getCoupon_code(); // 저장 후 key return
    }
    
    // delete
	@Override
    public int delete(int coupon_code) {
    	repository.deleteById(coupon_code);
    	return coupon_code; // 삭제 후 key return
    }
	
	// Coupon 보기(페이지네이션 적용)
	@Override
	public Page<Coupon> getPageCouponList(Pageable pageable) {
	    return repository.getPageCouponList(pageable);
	}
}