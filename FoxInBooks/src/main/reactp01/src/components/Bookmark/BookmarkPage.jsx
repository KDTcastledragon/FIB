import './BookmarkPage.css';
import { useState, useEffect } from 'react';
import BookmarkItem from './BookmarkItem';
import { Link } from 'react-router-dom';
// import BasketEtcBox from './BasketEtcBox';
// import CategoryMiniBox from './CategoryMiniBox';
import axios from 'axios';

const BookmarkPage = () => {
  //=======================================================================================================
  const [bookmarkData, setBookmarkData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [totalPrice,setTotalPrice] = useState(0);
  // const [selectAllCartList, setSelectAllCartList] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(0);
  const [theNewCartList, setTheNewCartList] = useState([]);

  const loginID = sessionStorage.getItem("loginID");

  useEffect(() => {
    const data = { id: loginID }

    axios
      .post(`/bookmark/bookmarkList`, data)
      .then((response) => {
        console.log(`response 성공 :`, response);
        // console.log(`response.data[0] : `, response.data[0]);
        // console.log(`response.data[1] : `, response.data[1]);
        console.log('========================================');

        setBookmarkData(response.data);

      }).catch((err) => {
        alert(`서버연결 실패 => ${err.message}`);
      });
  }, []);


  //=====================================================================================================================
  return (
    <div className='BookmarkPageContainer'>
      <div className='BookmarkPageTitleSubtitle'>
        <span className='BookmarkPageTitle'>나의 찜목록</span>&nbsp;&nbsp;
        <span className='BookmarkPageSubtitle'>마음에 드는 상품들을 담을 수 있는 페이지입니다.</span>
      </div>


      <div className={bookmarkData.length === 0 ? 'noContentInBookMark' : 'BookmarkPageGridCover'}>
        {bookmarkData.length === 0 ?
          <span>찜목록 상품이 없습니다.</span>
          :
          bookmarkData.map((d, i) => (
            <BookmarkItem
              key={i}
              bookmark_code={d.bookmark_code}
              id={loginID}
              product_code={d.product_code}
              protype={d.protype}
              domestic={d.domestic}
              title={d.title}
              image={d.image}
              price={d.price}
            />
          ))
        }
      </div>


      <div className='basket_total_sum_container'>


        <div className='CartPageMoveToOtherPageButton'>

          <Link to='/'><button className='CartPageToHome'>계속 쇼핑하기</button></Link>

          <div className='CartPageToPaymentFromBookmark'>
            <Link to={`/CartPage`}>장바구니바로가기</Link>
          </div>
        </div>

      </div>

      {/* <div className='CartPageMoveToOtherPageButton'>
        <div className='CartPageToHome'>

          <Link to='/'><button className='basket_final_product_order_btn_1'>계속 쇼핑하기</button></Link>

          <div className='CartPageToPayment'>
            <Link to={`/CartPage`}>장바구니바로가기</Link>
          </div>
        </div>

      </div> */}
    </div>
  );
};


export default BookmarkPage;