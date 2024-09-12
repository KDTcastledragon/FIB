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
      <tr>
         <th>작가코드</th>
         <th>작가명</th>
         <th>생년월일</th>
         <th>대표작</th>
         <th>작가설명</th>
         <th>수정</th>
         <th>삭제</th>
      </tr>

      <c:if test="${not empty requestScope.writerAll}">
         <c:forEach var="w" items="${requestScope.writerAll}">
            <tr>
               <td>
               		<a href="/writer/writerone?writer_code=${w.writer_code}">${w.writer_code}</a>
               </td>
               <td>${w.writer}</td>
               <td>${w.birthday}</td>
               <td>${w.major_work}</td>
               <td>${w.introduction}</td>
               <td></td>
               <td></td>
            </tr>
         </c:forEach>
      </c:if>
   </table>
   
   <a href="/writer/writerinsert">작가등록</a>
</body>
</html>