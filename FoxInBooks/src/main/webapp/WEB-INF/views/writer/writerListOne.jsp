<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>작가정보</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/kimTest.css">
</head>
<body>
	<table class="listTable">
		<c:if test="${not empty requestScope.wrtierOne}">
			<tr>
			   <th>작가코드</th>
			   <td>${requestScope.wrtierOne.writer_code}</td>
			</tr>
			<tr>
			   <th>작가명</th>
			   <td>${requestScope.wrtierOne.writer}</td>
			</tr>
			<tr>
			   <th>생년월일</th>
			   <td>${requestScope.wrtierOne.birthday}</td>
			</tr>
			<tr>
			   <th>대표작</th>
			   <td>${requestScope.wrtierOne.major_work}</td>
			</tr>
			<tr>
			   <th>작가설명</th>
			   <td>${requestScope.wrtierOne.introduction}</td>
			</tr>
		</c:if>
   </table>
   
   <a>수정</a>
   <a>삭제</a>
</body>
</html>