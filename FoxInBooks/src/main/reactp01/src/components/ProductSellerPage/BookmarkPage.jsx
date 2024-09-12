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
    axios
      .get(`/bookmark/bookmarklistParam?id=${loginID}`)
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


  //=========================================================================================================================
  // function saveOnCartSelecedItems() {

  //   axios
  //     .post(`/cart/cartOnSaveFromBookmark`, selectedItems)
  //     .then((response) => {
  //       console.log(`카트담기 성공 :`, response);
  //       console.log(`response.OK :`, response.status);
  //       console.log('========================================');
  //       alert(`카트담기 성공 : ${response.status}`);

  //     }).catch((err) => {
  //       alert(`담기 실패!! ${err.message}`);
  //     });

  // };
  //=========================================================================================================================
  // const handleSelectItem = (bookmark_code, product_code, protype, domestic, title, image, price, isChecked) => {
  //   setSelectedItems((prevSelectedItems) => {
  //     if (isChecked == true) {
  //       // 선택된 아이템 추가
  //       return [
  //         ...prevSelectedItems,
  //         {
  //           id: loginID,
  //           bookmark_code: bookmark_code,
  //           product_code: product_code,
  //           protype: protype,
  //           domestic: domestic,
  //           title: title,
  //           image: image,
  //           price: price,
  //         }
  //       ];
  //     } else {
  //       return prevSelectedItems.filter((item) => item.bookmark_code !== bookmark_code);
  //     }

  //   });
  // };

  //=========================================================================================================================

  // const handleAllSelectBookmarkLists = (e) => {
  //   setIsAllChecked(e);

  //   if (e == 1) {
  //     setSelectedItems(bookmarkData);
  //   }

  //   else {
  //     setSelectedItems([]);
  //   }

  //   console.log(`e : `, e);

  // };

  //=========================================================================================================================

  // const handleDeleteSelected = () => {
  //   const selectedCartCodeArray = selectedItems.map((item) => item.bookmark_code);

  //   console.log(`selectdCartCodeArray : `, selectedCartCodeArray);

  //   axios
  //     .post(`/Bookmark/BookmarkDeleteSelectedAction`, selectedCartCodeArray)
  //     .then((response) => {
  //       console.log(`선택목록 삭제 성공:`, response.data);
  //       console.log('========================================');
  //       alert(`선택목록 삭제 성공`, response.data);

  //       axios
  //         .get(`/bookmark/bookmarklistParam?id=${loginID}`)
  //         .then((response) => {
  //           console.log(`response 성공 :`, response);
  //           // console.log(`response.data[0] : `, response.data[0]);
  //           // console.log(`response.data[1] : `, response.data[1]);
  //           // console.log('========================================');
  //           setBookmarkData(response.data);

  //         }).catch((err) => {
  //           alert(`서버연결 실패 => ${err.message}`);
  //         });


  //     }).catch((err) => {
  //       alert(`선택목록 삭제 실패!! ${err.message}`);
  //     });

  //   window.location.reload(); // 일단 그냥 새로고침 ㄱㄱ.

  // };


  //====================================================================================================================



  // console.log(`selectedItems(BookMark)[Page] : `, selectedItems);
  // console.log(`totalPrice[Page](147) : ` , totalPrice);
  // console.log(`isAllChecked[Page](151) : `, isAllChecked);
  // console.log(`======Page 분단======Page 분단======Page 분단======Page 분단======Page 분단======`);

  //====================================================================================================================

  // {bookmarkData.length === 0 ?
  //   <tr className='cartDataIsVacant'>
  //     <td colSpan='4'>찜목록에 추가한 상품이 없습니다.</td>
  //   </tr>
  //   :
  // bookmarkData.map((d, i) => (
  //   <BookmarkItem
  //     key={i}
  //     bookmark_code={d.bookmark_code}
  //     id={loginID}
  //     product_code={d.product_code}
  //     protype={d.protype}
  //     domestic={d.domestic}
  //     title={d.title}
  //     image={d.image}
  //     price={d.price}
  //     onSelectItem={handleSelectItem}
  //     // onUpdateCart={handleUpdateCart}
  //     onDeleteSelected={handleDeleteSelected}
  //     onSelectAllItems={handleAllSelectBookmarkLists}
  //     isAllChecked={isAllChecked}
  //   />
  // ))}

  // <div className="grid-container">
  //   {bookmarkData.map((item) => (
  //     <div key={item} className="grid-item">
  //       Item {item}
  //     </div>
  //   ))}
  // </div>



  //=====================================================================================================================
  return (
    <div className='BookmarkPageContainer'>
      <div className='BookmarkPageTitleSubtitle'>
        <span className='BookmarkPageTitle'>나의 찜목록</span>&nbsp;&nbsp;
        <span className='BookmarkPageSubtitle'>마음에 드는 상품들을 담을 수 있는 페이지입니다.</span>
      </div>


      <div className="BookmarkPageGridCover">
        {bookmarkData.map((d, i) => (
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
        ))}
      </div>


      <div className='basket_total_sum_container'>


        <div className='CartPageMoveToOtherPageButton'>

          <Link to='/'><button className='CartPageToHome'>계속 쇼핑하기</button></Link>

          <div className='CartPageToPayment'>
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