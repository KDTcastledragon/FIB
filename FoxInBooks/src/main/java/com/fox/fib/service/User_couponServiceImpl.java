package com.fox.fib.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fox.fib.domain.User_couponId;
import com.fox.fib.entity.Faq;
import com.fox.fib.entity.User_coupon;
import com.fox.fib.repository.User_couponRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class User_couponServiceImpl implements User_couponService {
	
	private final User_couponRepository repository;

	// selectList
	@Override
    public List<User_coupon> selectList() {
    	return repository.findAll();
    }
	
	// selectOne
    @Override
    public User_coupon selectOne(User_couponId user_couponId) {
    	Optional<User_coupon> result = repository.findById(user_couponId);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    // insert / update
    // 수정시 수정성공한 시간으로 modDate 업데이트 되게.
    @Override
	public int save(User_coupon entity) {
//    	if (entity != null) {
//    		entity.setModDate(LocalDateTime.now());
//        }
    	repository.save(entity); // 저장 또는 수정
    	return entity.getCoupon_code(); // 저장 후 key return
    }
    
    // delete
	@Override
    public int delete(User_couponId user_couponId) {
		repository.deleteById(user_couponId);
		return 1;
    }
	
	// 유저쿠폰리스트(페이지네이션 적용)
//	@Override
//	public Page<User_coupon> getUser_couponList(Pageable pageable) {
//	    return repository.getUser_couponList(pageable);
//	}
//	
	// user_id와 coupon_code가 같이 포함되어있는 데이터를 찾기위해
//    @Override
//    public boolean existsByCouponCodeAndUserId(int getCouponCode, String getUserId) {
//        return repository.existsByCouponCodeAndUserId(getCouponCode, getUserId);
//    }
}