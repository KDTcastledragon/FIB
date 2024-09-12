package com.fox.fib.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fox.fib.entity.Writer;

public interface WriterRepository extends JpaRepository<Writer, Integer> {
	
}