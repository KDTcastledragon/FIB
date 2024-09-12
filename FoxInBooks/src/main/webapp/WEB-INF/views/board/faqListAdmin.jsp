<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/board.js"></script>
<title>1:1문의 관리</title>
</head>
<body>
    <h2>FAQ 관리</h2>
    <div class="faq_register_search">
		<span class="faq_register" onclick="faqRegister()">등록하기</span>
		<div class="faq_search">
			<select class="faq_category" name="category" id="category" onchange="faqSortSelectOptions()">
				<c:forEach var="category" items="${fn:split('전체,일반,로그인/회원가입,제품,주문/결제,배송,반품/환불/취소,이벤트,쿠폰', ',')}">
               		<option value="${category}" ${param.category == category ? "selected" : ""}>${category}</option>
           		</c:forEach>
			</select> 
			<input class="faq_search_input" type="text"></input>
			<button class="searchBtn" type="button">검색</button>
		</div>
	</div>
	<div class="underline"></div>
	<table class="faqTable" id="faqTable"  border="1">
		<tr>		
			<th style="width: 2%;">FAQ CODE</th>
			<th style="width: 5%;">분류</th>
			<th style="width: 25%;">제목</th>
			<th style="width: 25%;">내용</th>
			<th style="width: 10%;"colspan="2">관리하기</th>
		</tr>
		<c:if test="${!empty requestScope.faqList}">
			<c:forEach var="s" items="${requestScope.faqList}">
				<tr style="text-align:center">
					<td>${s.faq_code}</td>
					<td>${s.category}</td>
					<td>${s.title}</td>
					<td>${s.content}</td>	
					<td class="textlink" onclick="faqEditForm('${s.faq_code}')">수정</td>					
					<td class="textlink" onclick="faqDelete('${s.faq_code}')">삭제</td>					
				</tr>
			</c:forEach>
		</c:if>
	 	<c:if test="${empty requestScope.faqList}">
	 		<tr>
	 			<td colspan="7">출력할 데이터 없음</td>
	 		</tr>
	 	</c:if>
	</table>
    <c:if test="${not empty requestScope.itemPage}">
   		<div class="pagination_wrap">
	        <c:forEach var="pageNumber" begin="0" end="${requestScope.totalPages == 0 ? requestScope.totalPages : requestScope.totalPages - 1}">
	     	<span onclick="faqManagementPage(`${pageNumber}`)"
	                class="${pageNumber == requestScope.itemPage.number ? 'currentPage' : ''}">
	              ${pageNumber + 1}
	     	</span>
	        </c:forEach>
		</div>
    </c:if>
</body>
</html>