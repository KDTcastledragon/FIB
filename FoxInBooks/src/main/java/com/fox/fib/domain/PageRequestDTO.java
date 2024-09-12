package com.fox.fib.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class PageRequestDTO {

	private int page;             // 요청받은 PageNo
	private int size;             // 1페이지당 출력 row 갯수
	private String searchType;
	private String keyword;

	public PageRequestDTO() {
		this.page = 1;
		this.size = 3;
	}

	public Pageable getPageable(Sort sort) {
		return PageRequest.of(page - 1, size, sort);
	}

} //class