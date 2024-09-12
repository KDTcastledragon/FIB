import { Link } from 'react-router-dom';
import './BookmarkItem.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookmarkItem = (props) => {
  //===============================================================================================================
  const { isAllChecked } = props;

  const [isChecked, setIsChecked] = useState(0);

  const loginID = sessionStorage.getItem("loginID");

  function saveOnCart() {
    const savedDataOnCart = {
      bookmark_code: props.bookmark_code,
      product_code: props.product_code,
      id: loginID,
      proamount: 1
    };

    const DeleteThisProductData = {
      product_code: props.product_code,
      bookmark_code: props.bookmark_code
    };


    axios
      .post(`/cart/cartOnSaveAction`, savedDataOnCart)
      .then((response) => {
        console.log(`장바구니 담았어요 :`, response);
        console.log(`response.OK :`, response.status);
        console.log('========================================');
        alert(`장바구니 담았어요 : ${response.data}`);

      }).catch((err) => {
        alert(`담기 실패!! ${err.message}`);
      });

    axios
      .post(`/bookmark/bookmarkDeleteThisAction`, DeleteThisProductData)
      .then((response) => {
        console.log(`장바구니 담기  : `, response.data);
        console.log('========================================');
        alert(`나의 찜목록에서 자동으로 삭제해요. `, response.data);

      }).catch((err) => {
        alert(`카트목록 삭제 실패!! ${err.message}`);
        console.log(props.cart_code);
      });

    window.location.reload();
  };

  //===============================================================================================================

  function DeleteThisProduct() {

    const DeleteThisProductData = {
      product_code: props.product_code,
      bookmark_code: props.bookmark_code
    };

    axios
      .post(`/bookmark/bookmarkDeleteThisAction`, DeleteThisProductData)
      .then((response) => {
        console.log(`찜목록에서 제거  : `, response.data);
        console.log('========================================');
        alert(`나의 찜목록에서 제거했어요 `, response.data);

      }).catch((err) => {
        alert(`카트목록 삭제 실패!! ${err.message}`);
        console.log(props.cart_code);
      });

    window.location.reload();

  };


  //=====================================================================================================

  // 부모 컴포넌트로 선택된 상태와 함께 cart_code 전달
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    props.onSelectItem(
      props.bookmark_code,
      props.product_code,
      props.protype,
      props.domestic,
      props.title,
      props.image,
      props.price,
      !isChecked);

    console.log(`개당체크 : `, isChecked);


  };


  useEffect(() => {
    setIsChecked(isAllChecked);
  }, [isAllChecked]);

  console.log(`isChecked[Item](${props.bookmark_code}) & ${isChecked} ======Item 절취선======Item 절취선======`);
  // console.log(`selectAllCartList[Item](102) : ` , selectAllCartList);

  {/* <div className='cart_keywords'>
        <span className='cart_domestic'> {props.domestic == 1 ? '국내도서' :
          props.domestic == 2 ? '영미도서' :
            props.domestic == 3 ? '프랑스도서' :
              props.domestic == 4 ? '독일도서' : '기타도서'}</span>
        <span className='cart_category'>{props.category == 'novel' ? '소설' :
          props.category == 'poem' ? '시' :
            props.category == 'essay' ? '에세이' :
              props.category == 'magazine' ? '잡지' : '기타'}</span>
      </div> */}


  //=====================================================================================================
  return (
    <div className="bookmarkGridItemTopLevelContainer">
      <div className='bookmarkItemImageCartDeleteDiv'>
        <div className='bookmarkItemImageDiv'>
          <img src={`../img/${props.image}`} alt="" className='bookmarkItemImage' />
        </div>
        <div className='bookmarkItemCartDeleteDiv'>
          <div className='bookmarkItemCart' onClick={saveOnCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
          <div className='bookmarkItemDelete' onClick={DeleteThisProduct}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className='bookmarkItemTitleProtypeDomesticPriceDiv'>
        <span className='bookmarkItemTitle'>{props.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <div className='bookmarkItemProtypeDomesticDiv'>
          <span className='bookmarkItemProtypeDomestic'>
            {props.domestic == 1 ? '국내' :
              props.domestic == 2 ? '영미' :
                props.domestic == 3 ? '프랑스' :
                  props.domestic == 4 ? '독일' : '기타'}{props.protype == 1 ? '도서' : '제품'}</span>
        </div>
        <div className='bookmarkItemPriceDiv'>
          <span className='bookmarkItemPrice'>{props.price ? props.price.toLocaleString() : 0}</span>&nbsp;
          <span className='bookmarkItemPriceUnit'>원</span>
        </div>
      </div>


    </div>
  );

}



export default BookmarkItem;