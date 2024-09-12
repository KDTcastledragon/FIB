<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>재고상품수정</title>
<link rel="stylesheet" type="text/css" href="/resources/lib/product.css">
</head>
<body>

<h3> 재고 내 상품 정보 수정 : administrator</h3>

<form action="productUpdateAction" method="Post" enctype="multipart/form-data" id="productUpdateAction">

<hr>
<table border="1" class="productInsertTable">

	<tr>
         <th bgcolor="deeppink">01. product_code</th>
         <td><input type="text" name="product_code" id="product_code" size="40" value="${requestScope.pcode.product_code}" readonly></td>
         <td>product_code. readonly</td>
    </tr>
	<tr>
         <th bgcolor="deeppink" >02. protype </th>
         <td><select name="protype">
    			<option value="1" ${requestScope.pcode.protype == 1 ? 'selected' : ''}>1(도서)</option>
    			<option value="2" ${requestScope.pcode.protype == 2 ? 'selected' : ''}>2(도서제품)</option>
			</select>
		</td>
         <td>제품의 타입. not null.  1 : 도서 , 2 : 도서제품 </td>
    </tr>
    <tr>
         <th bgcolor="deeppink">03. domestic</th>
         <td><select name="domestic">
   				<option value="1" ${requestScope.pcode.domestic == 1 ? 'selected' : ''}>1(국내)</option>
          	 	<option value="2" ${requestScope.pcode.domestic == 2 ? 'selected' : ''}>2(영/미)</option>
           	 	<option value="3" ${requestScope.pcode.domestic == 3 ? 'selected' : ''}>3(프랑스)</option>
         	  	<option value="4" ${requestScope.pcode.domestic == 4 ? 'selected' : ''}>4(독일)</option>
			</select>
		</td>
         <td>제조국가. not null.  1: 국내 , 2:영/미 , 3:프랑스 , 4:독일</td>
    </tr>
	<tr>
         <th bgcolor="deeppink">04. writer </th>
         <td><input type="text" name="writer" id="writer" size="40" value="${requestScope.pcode.writer}"></td>
         <td>작가 이름. null 가능.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">05. title</th>
         <td><input type="text" name="title" id="title" size="40" value="${requestScope.pcode.title}"></td>
         <td>타이틀. not null.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">06. translator</th>
         <td><input type="text" name="translator" id="translator" size="40" value="${requestScope.pcode.translator}"></td>
         <td>역식자 null 가능.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">07. publisher</th>
         <td><input type="text" name="publisher" id="publisher" size="40" value="${requestScope.pcode.publisher}"></td>
         <td>출판사 / 제조사. not null.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">08. publish_date</th>
         <td><input type="date" name="publish_date" id="publish_date" size="40" value="${requestScope.pcode.publish_date}"></td>
         <td>출판 일자 / 제조 일자. not null.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">09. category</th>
         <td><select name="category">
    			<option value="novel" ${requestScope.pcode.category == 'novel' ? 'selected' : ''}>novel(소설)</option>
            	<option value="poem" ${requestScope.pcode.category == 'poem' ? 'selected' : ''}>poem(시)</option>
            	<option value="essay" ${requestScope.pcode.category == 'essay' ? 'selected' : ''}>essay(수필)</option>
            	<option value="magazine" ${requestScope.pcode.category == 'magazine' ? 'selected' : ''}>magazine(잡지)</option>
			</select>
		</td>
         <td>카테고리. null 가능</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">10. genre</th>
         <td><select name="genre">
    			<option value="fantasy" ${requestScope.pcode.genre == 'fantasy' ? 'selected' : ''}>fantasy(판타지)</option>
            	<option value="melo" ${requestScope.pcode.genre == 'melo' ? 'selected' : ''}>melo(멜로)</option>
            	<option value="detective" ${requestScope.pcode.genre == 'detective' ? 'selected' : ''}>detective(추리)</option>
            	<option value="sf" ${requestScope.pcode.genre == 'sf' ? 'selected' : ''}>sf(공상과학)</option>
			</select>
		</td>
         <td>장르. null 가능 </td>
    </tr>
    <tr>
         <th bgcolor="deeppink">11. summary</th>
         <td><textarea class="form-control" name="summary" style="width:98%; height: 100px; resize: none;" 
         placeholder="내용을 입력해 주세요.">${requestScope.pcode.summary}</textarea></td>
         <td>상품목록에 출력되는 간단한 요약내용</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">12. image</th>
         <td><img src="${requestScope.pcode.image}" class="select_img"><br>
			<input type="file" name="uploadfilef" id="uploadfilef" size="40" border="1px solid green" ></td>
			<input type="hidden" name="image" size="40" border="1px solid green" value="${requestScope.pcode.image}" ></td>
			<td>대표 상품 표지</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">13. intro_image</th>
         <td><img src="${requestScope.pcode.intro_image}" class="select_img"><br>
			<input type="file" name="uploadfilef" id="uploadfilef" size="40" border="1px solid green" ></td>
			<input type="hidden" name="intro_image" size="40" border="1px solid green" value="${requestScope.pcode.intro_image}" ></td>
         <td>상세페이지 사용 이미지</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">14. content</th>
         <td><textarea class="form-control" name="content" style="width:98%; height: 100px; resize: none;" 
         placeholder="내용을 입력해 주세요.">${requestScope.pcode.content}</textarea></td>
         <td>상품에 대한 자세한 내용</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">15. price</th>
         <td><input type="number" name="price" id="price" size="40" value="${requestScope.pcode.price}"></td>
         <td>가격. not null.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">16. stack</th>
         <td><input type="number" name="stack" id="stack" size="40" value="${requestScope.pcode.stack}"></td>
         <td>현재 상품 재고수량</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">17. sell_count</th>
         <td><input type="number" name="sellcount" id="sellcount"  size="40" value="${requestScope.pcode.sellcount}"></td>
         <td>현재 상품 누적 판매량. not null.독자들에 의해 업데이트 되는 항목. 관리자가 입력하지 않음.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">18. gradeavg</th>
         <td><input type="number" name="gradeavg" id="gradeavg"  size="40" value="${requestScope.pcode.gradeavg}" readonly></td>
         <td>독자들에 의해 업데이트 되는 항목. 관리자가 입력하지 않음.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">19. viewcount</th>
         <td><input type="number" name="viewcount" id="viewcount"  size="40" value="${requestScope.pcode.viewcount}" readonly></td>
         <td>독자들에 의해 업데이트 되는 항목. 관리자가 입력하지 않음.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">20. regdate</th>
         <td><input type="date" name="regdate" id="regdate"  size="40" value="${requestScope.pcode.regdate}" readonly></td>
         <td>독자들에 의해 업데이트 되는 항목. 관리자가 입력하지 않음.</td>
    </tr>
    <tr>
         <th bgcolor="deeppink">21. moddate</th>
         <td><input type="date" name="moddate" id="moddate"  size="40" value="${requestScope.pcode.moddate}" readonly></td>
         <td>독자들에 의해 업데이트 되는 항목. 관리자가 입력하지 않음.</td>
    </tr>
    
    <tr>
    	<td>실패시 메시지출력 : </td>
    	<td>${requestScope.insertActionMsg}</td>
    </tr>
    
   </table>
   
   <hr>
   
   <div class="productInsertSubmitButton">
   	<span><button type="submit"/>상품수정</span>
   </div>
   
   <div class="productInsertGoHome">
   	<span><a href="/products/productlists">상품리스트</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   	<span><a href="/">홈으로</a></span>
   </div>
   

</form>

<script>
		
	window.document.getElementById('uploadfilef').onchange=function(e){

		if(this.files && this.files[0]) {
			let reader = new FileReader;
			reader.readAsDataURL(this.files[0]);
 			reader.onload = function(e) {
					$(".select_img").attr("src", e.target.result)
									.width(70).height(90); 
				} 
 		}
	};
	</script>
</body>
</html>