<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>리뷰</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/kimTest.css">
</head>
<body>
	<table class="listTable">
		<tr>
			<th>리뷰코드</th>
			<th>제품코드</th>
			<th>아이디</th>
			<th>별점</th>
			<th>날짜</th>
			<th>리뷰내용</th>
			<th>리뷰이미지</th>
			<th>수정</th>
			<th>삭제</th>
		</tr>

		<c:if test="${not empty requestScope.reviewAll}">
			<c:forEach var="reviewVar" items="${requestScope.reviewAll}">
				<tr>
					<td>${reviewVar.review_code}</td>
					<td>${reviewVar.product_code}</td>
					<td>${reviewVar.id}</td>
					<td>${reviewVar.star_count}</td>
					<td>${reviewVar.regdate}</td>
					<td>${reviewVar.content}</td>
					<td>
						<c:if test="${not empty reviewVar.image}">
							<img src="/resources/uploadImages/${reviewVar.image}" class="listImage">
						</c:if>
					</td>
					<td>
						<a href="reviewUpdate?review_code=${reviewVar.review_code}">수정</a>
					</td>
					<td>
						<a href="reviewdelete?review_code=${reviewVar.review_code}">삭제</a>
					</td>
				</tr>
			</c:forEach>
		</c:if>
	</table>
	
	<a href="/review/reviewInsert">리뷰등록</a>
	
	<hr>
	
	<c:if test="${not empty requestScope.message}">
		${requestScope.message}
	</c:if>
	
</body>
</html>