<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품정보</title>
<link rel="stylesheet" type="text/css" href="/resources/lib/product.css">
</head>
<body>
<h2> 상품 목록 : administrator</h2>
	  <span>삭제실행시에 메시지를 출력했었었습니다..</span>
	  &nbsp;&nbsp;&nbsp;<a href="/products/productinsert">신규 상품 등록</a>&nbsp;
	  
	  <hr>	
      
   <table border="1" style="width:95%">
	<tr bgcolor="Orange">
         <th>1. pcode</th>
         <th>2. protype </th>
         <th>3. domestic</th>
         <th>4. writer </th>
         <th>5. title</th>
         <th>6. translator</th>
         <th>7. publisher</th>
         <th>8. publish_date</th>
         <th>9. category</th>
         <th>10. genre</th>
         <th>11. summary</th>
         <th>12. image</th>
         <th>13. intro_image</th>
         <th>14. content</th>
         <th>15. price</th>
         <th>16. stack</th>
         <th>17. sellcount</th>
         <th>18. gradeavg</th>
         <th>19. viewcount</th>
         <th>20. regdate</th>
         <th>21. moddate</th>
         <th>상품정보수정</th>
         <th>삭제하기^-^</th>
      </tr>
 		<%-- <c:forEach var="s" items="${requestScope.adminProductList.entityList}"> --%>
 		<c:forEach var="s" items="${requestScope.adminProductList}">
        	<tr>
               <td>${s.product_code}</td>
               <td>${s.protype}</td>
               <td>${s.domestic}</td>
               <td>${s.writer}</td>
               <td>${s.title}</td>
               <td>${s.translator}</td>
               <td>${s.publisher}</td>
               <td>${s.publish_date}</td>
               <td>${s.category}</td>
               <td>${s.genre}</td>
               <td>${s.summary}</td>
               <td><img src="/resources/uploadImages/${s.image}" width="150px" height="70px"></td>
               <td>${s.intro_image}</td>
               <td>${s.content}</td>
               <td>${s.price}</td>
               <td>${s.stack}</td>
               <td>${s.sellcount}</td>
               <td>${s.gradeavg}</td>
               <td>${s.viewcount}</td>
               <td>${s.regdate}</td>
               <td>${s.moddate}</td>
               
               <td><a href="productupdate?product_code=${s.product_code}">정보 수정</a></td>
               
               <td><a href="productDeleteAction?product_code=${s.product_code}">삭제</a></td>
            </tr>
         </c:forEach>
   </table>
   
   <hr>
   <hr>
   
   <div class="productListPageNavigation">
   
   <a href="/products/productlists?page=${requestScope.adminProductList.prev}">이전페이지로</a>
   &nbsp;&nbsp;&nbsp;&nbsp;
   
   <a href="/products/productlists?page=${requestScope.adminProductList.start}&size=${requestScope.adminProductList.size}">
   ${requestScope.adminProductList.start} : 시작 번호</a>&nbsp;&nbsp;&nbsp;&nbsp;
   
   <a href="/products/productlists?page=2&size=${requestScope.adminProductList.size}">2</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=3&size=${requestScope.adminProductList.size}">3</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=4&size=${requestScope.adminProductList.size}">4</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=5&size=${requestScope.adminProductList.size}">5</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=6&size=${requestScope.adminProductList.size}">6</a>&nbsp;&nbsp;&nbsp;&nbsp;
   
   <a href="/products/productlists?page=${requestScope.adminProductList.end}&size=${requestScope.adminProductList.size}">
   ${requestScope.adminProductList.end} : 끝 번호</a>
   
   &nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=${requestScope.adminProductList.next}&size=${requestScope.adminProductList.size}">
   다음페이지로</a>
   
   <hr>
   
   <div>
   <a href="/products/productlists?page=${requestScope.adminProductList.page}&size=1000">전체보기</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=${requestScope.adminProductList.page}&size=5">5개씩 보기</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=${requestScope.adminProductList.page}&size=7">7개씩 보기</a>&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="/products/productlists?page=${requestScope.adminProductList.page}&size=10">10개씩 보기</a>&nbsp;&nbsp;&nbsp;&nbsp;
   </div>
   
   </div>
   
</body>
</html>