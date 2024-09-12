<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>제품 개별 정보 + 작가 정보</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/kimTest.css">
</head>
<body>
	<table class="listTable">
		<tr>
			<th>작가코드</th>
			<th>제품코드</th>
			<th>아이디</th>
			<th>별점</th>

		</tr>

		<c:if test="${not empty requestScope.test}">
			<tr>
				<td>${requestScope.test.writer_code}</td>
				<td>${requestScope.test.product_code}</td>
				<td>${requestScope.test.title}</td>
				<td>${revierequestScope.testwVar.category}</td>
			</tr>
		</c:if>
	</table>
	
	<hr>
	
</body>
</html>