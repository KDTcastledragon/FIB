<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/coupon.js"></script>
<title>쿠폰 리스트</title>
    <!-- 팝업 창을 위한 스타일 및 스크립트 추가 -->
</head>
<body>
    <h2>쿠폰 리스트</h2>
    <div class="coupon_register_search">
		<span class="coupon_register" onclick="couponRegister()"> 등록하기</span>
		<div class="coupon_search">
			<input type="checkbox">시작일</input>
			<input type="checkbox">할인율</input>
			<input type="checkbox">최대 할인금액</input>
			<input class="coupon_search_input" type="text"></input>
			<button class="searchBtn" type="button">검색</button>
		</div>
	</div>
	<div class="underline"></div>
	<table class="couponTable" id="couponTable" border="1">
		<tr>		
			<th style="width: 2%;">쿠폰 CODE</th>
			<th style="width: 10%;">분류</th>
			<th style="width: 15%;">쿠폰 이름</th>
			<th style="width: 5%;">할인율</th>
			<th style="width: 11%;">최대 할인금액</th>
			<th style="width: 7%;">쿠폰 이미지</th>
			<th style="width: 10%;">시작일</th>
			<th style="width: 10%;">종료일</th>
			<th style="width: 10%;">쿠폰 등록일</th>
			<th style="width: 10%;">수정된 날짜</th>
			<th style="width: 10%;" colspan="2">관리하기</th>
		</tr>
		<c:if test="${!empty requestScope.couponList}">
			<c:forEach var="s" items="${requestScope.couponList}">
				<tr style="text-align:center">
					<td>${s.coupon_code}</td>
					<td>${s.category}</td>
					<td>${s.title}</td>
					<td>${s.discount_rate}%</td>
					<td>${s.max}원</td>
					<td>
						<img alt="${s.title}" src=resources/img/${s.image} width="120" height="80">
					</td>
					<td>${s.start}</td>
					<td>${s.end}</td>
					<td>${s.regdate}</td>
					<c:if test="${!empty s.moddate}">
						<td>${s.moddate}</td>	
					</c:if>
					<td class="textlink" onclick="couponEditForm('${s.coupon_code}')">수정</td>					
					<td class="couponDeleteClick" class="textlink" onclick="couponDelete('${s.coupon_code}')">삭제</td>					
				</tr>
			</c:forEach>
		</c:if>
	 	<c:if test="${empty requestScope.couponList}">
	 		<tr>
	 			<td colspan="10">출력할 데이터 없음</td>
	 		</tr>
	 	</c:if>
	</table>
	<div class="pagination_wrap">
	    <c:if test="${not empty requestScope.itemPage}">
	    	<!-- 최초에 리스트를 불러올때, 데이터가 0이라면 totalPage가 0미만이되는 사태가발생해서, 삼항식으로 조건을 줌. -->
	        <c:forEach var="pageNumber" begin="0" end="${requestScope.totalPages == 0 ? requestScope.totalPages : requestScope.totalPages - 1}">
		     	<span onclick="couponManagementPage(${pageNumber})"
		                class="${pageNumber == requestScope.itemPage.number ? 'currentPage' : ''}">
		              ${pageNumber + 1}
		     	</span>
	        </c:forEach>
	    </c:if>
	</div>
</body>
</html>