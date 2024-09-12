package com.fox.fib.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fox.fib.entity.Non_member;

public interface Non_memberRepository extends JpaRepository<Non_member, String> {

}
