<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/board.js"></script>
<title>공지사항 관리</title>
</head>
<body>
    <h2>공지사항 관리</h2>
    <div onclick="noticeRegister()">등록하기</div>
	<table border="1" style="width: 90%;">
		<tr bgcolor="Lime">		
			<th>공지사항 CODE</th>
			<th>분류</th>
			<th>제목</th>
			<th>내용</th>
			<th>이미지</th>
			<th>등록일</th>
			<th>조회수</th>
			<th>수정일</th>
			<th colspan="2">관리하기</th>
		</tr>
		<c:if test="${!empty requestScope.noticeList}">
			<c:forEach var="s" items="${requestScope.noticeList}">
				<tr style="text-align:center">
					<td>${s.notice_code}</td>
					<td>${s.category}</td>
					<td>${s.title}</td>
					<td>${s.content}</td>
					<td>
						<img alt="${s.title}" src="${s.image}" width="120" height="80">
					</td>
					<td>${s.regdate}</td>
					<td>${s.view}</td>
					<td>${s.moddate}</td>				
					<td class="textlink" onclick="noticeEditForm('${s.notice_code}')">수정</td>					
					<td class="textlink" onclick="noticeDelete('${s.notice_code}')">삭제하기</td>					
				</tr>
			</c:forEach>
		</c:if>
	 	<c:if test="${empty requestScope.noticeList}">
	 		<tr>
	 			<td colspan="7">출력할 데이터 없음</td>
	 		</tr>
	 	</c:if>
	</table>
</body>
</html>