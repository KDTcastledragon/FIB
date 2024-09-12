package com.fox.fib.domain;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.Data;

@Data
public class PageResultDTO<EN> {

	private List<EN> entityList;

	private int totalPage;      // 총 페이지 번호
	private int page;           // 현재 페이지 번호
	private int size;           // 목록 사이즈

	private int start, end;             // 시작 페이지 번호, 끝 페이지 번호
	private boolean prev, next;         // 이전, 다음
	private List<Integer> pageList;     // 페이지 번호 목록


	public PageResultDTO(Page<EN> result) {

		entityList = result.getContent();      // select 결과 List return
		totalPage = result.getTotalPages();    // 총 페이지의 갯수.
		makePageList(result.getPageable());

	}


	private void makePageList(Pageable pageable) {

		this.page = pageable.getPageNumber() + 1;
		this.size = pageable.getPageSize();


		int tempEnd = (int) (Math.ceil(page / 10.0)) * 10;     // 페이지 그룹을 10으로 묶어서 보여주기 위함이오. 그렇소.

		start = tempEnd - 9;
		end = totalPage > tempEnd ? tempEnd : totalPage;

		prev = start > 1;
		next = totalPage > tempEnd;

		pageList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

		//=> IntStream : 기본자료형 int 형식의 연산에 최적화되어 있는 스트림 인터페이스
		//=> rangeClosed() : start ~ end 까지 즉, 종료값 포함 return
		//=> boxed() : 숫자(int) 스트림을 일반스트림(객체형) 으로 변환
	}

} //class
