package com.fox.fib.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fox.fib.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

}

