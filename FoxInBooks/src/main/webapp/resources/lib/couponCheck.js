"use strict"

// 1) Coupon Title
function titleCheck() {
  let title=document.getElementById('title').value;
  if (title.length<4 || title.length>10) { 
     document.getElementById('iMessage').innerHTML='쿠폰 이름은 4 ~ 10 글자이여야 합니다.';
     return false;
  }else {
     document.getElementById('iMessage').innerHTML='' ;
     return true;
  } //if
}

