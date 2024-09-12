import './ProductListItem.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from '../detailPage/review_star.svg';

const ProductListItem = (props) => {
  const loginID = sessionStorage.getItem("loginID");
  const navigator = useNavigate();
  console.log(`p_code : ${props.product_code} , props.isMarked : ${props.isMarked}`);
  const [isMarked, setIsMarked] = useState(props.isMarked);
  console.log(`p_code : ${props.product_code} , isMarked : ${isMarked}`);
  console.log(``);
  const [proamount, setProamount] = useState(1);

  useEffect(() => {
    setIsMarked(props.isMarked);
  }, [props.isMarked]);


  //====[북마크 저장]========================================================================================================
  function saveOnBookmark(opt) {

    const savedDataOnBookmark = {
      product_code: props.product_code,
      id: loginID,
      opt: opt
    };

    if (loginID === null) {
      alert(`로그인 후 이용해주세요.`);
      navigator('/LogIn');

    } else {
      axios
        .post(`/bookmark/saveBookMark`, savedDataOnBookmark)
        .then((response) => {
          console.log(`찜목록 성공 :`, response);
          console.log(`response.OK :`, response.status);
          console.log('========================================');
          alert(response.data);

          if (opt === 'save') {
            setIsMarked(true);
          } else if (opt === 'remove') {
            setIsMarked(false);
          }

        }).catch((err) => {
          alert(`담기 실패!! ${err.message}`);
        });

      setProamount(1);
    }

  };


  //=====[수량 조절]===================================================================================================
  const addProamount = () => {
    setProamount(proamount + 1);
  }
  const subtractProamount = () => {
    setProamount(proamount - 1);
    if (proamount <= 1) {
      setProamount(1);
    }
  }

  //====================================================================================================================
  function saveOnCart() {
    const savedDataOnCart = {
      product_code: props.product_code,
      proamount: proamount,
      id: loginID
    };

    if (loginID === null) {
      alert(`로그인 후 이용해주세요.`);
      navigator('/LogIn');

    } else {
      axios
        .post(`/cart/cartOnSaveAction`, savedDataOnCart)
        .then((response) => {
          console.log(`카트담기 성공 :`, response);
          console.log(`response.OK :`, response.status);
          console.log('========================================');
          alert(response.data);

        }).catch((err) => {
          alert(`담기 실패!! ${err.message}`);
        });
    }

  };

  //====================================================================================================================
  function purchaseProduct() {
    const dataToPayment = [{
      product_code: props.product_code,
      title: props.title,
      image: props.image,
      price: props.price,
      proamount: proamount
    }]

    if (loginID === null) {
      alert(`로그인 후 이용해주세요.`);
      navigator('/LogIn');

    } else {
      navigator('/PaymentPage', { state: { order_data: dataToPayment } });
    }
  }


  //====================================================================================================================


  return (
    <>
      <div className={props.stack === 0 ? "productItemContainer productItemSoldOut" : "productItemContainer"}>
        {props.stack === 0 ?
          <div className="soldOutOverLayBox">
            <span>품절된 상품입니다</span>
          </div>
          : null}


        <div className='productItemImage'>
          <Link to={`/DetailPage/${props.product_code}`}><img src={`../img/${props.image}`} alt="이미지" /></Link>
        </div>



        {/* ======================productItemInfomation=================================================== */}
        <div className="productItemInfomation">
          <Link to={`/DetailPage/${props.product_code}`}><span className="productItemTitle">{props.title}</span></Link>
          <div className='productItemKeywordWrap'>
            <div className="productItemDomestic">
              {props.domestic == 1 ? '국내도서' :
                props.domestic == 2 ? '영미도서' :
                  props.domestic == 3 ? '프랑스도서' :
                    props.domestic == 4 ? '독일도서' : '기타도서'}
            </div>

            <div className="productItemCategory" >
              {props.category == 'novel' ? '소설' :
                props.category == 'poem' ? '시' :
                  props.category == 'essay' ? '에세이' :
                    props.category == 'magazine' ? '잡지' : '기타 카테고리'}
            </div>

            <div className="productItemGenre" >
              {props.genre == 'fantasy' ? '판타지' :
                props.genre == 'melo' ? '멜로' :
                  props.genre == 'detective' ? '추리' :
                    props.genre == 'sf' ? '공상과학'
                      : '기타 장르'}
            </div>
          </div>

          <div className='productItemWriterTranslatorPublisher'>
            <span className='productItemWriter'>{props.writer}작가명</span>&nbsp;&nbsp;&nbsp;&nbsp;
            {props.translator !== null ?
              <>
                <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="productItemTranslator">{props.translator}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              </>
              : null
            }

            <span className='productItemWriterTranslatorPublisherhr'>|</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="productItemPublisher">{props.publisher}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="productItemPublishDate">{props.publish_date}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>

          <div>
            <span><Star className='productItemStar' />&nbsp;</span>
            <span className='productItemGradeAvg'>{props.gradeavg.toFixed(1)}</span>&nbsp;&nbsp;&nbsp;&nbsp;

            <span className='productItemForReview'>리뷰 : </span>
            <span className='productItemViewCount'>{props.viewcount} </span>
            <span>건</span>
          </div>

          <div className="productItemSummary">
            <Link to={`/DetailPage/${props.product_code}`}>{props.summary}</Link>
          </div>
        </div>

        <div className="productItemSellingFunctions">

          <div className="seller_publisher_box">
            <span className="seller_publisher_name"></span>
            <span className="seller_publisher_date"></span>&nbsp;&nbsp;
            {isMarked === true ?
              <span className='removeToBookmarkButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16" onClick={() => saveOnBookmark('remove')}>
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                </svg>
              </span>

              : isMarked === false ?
                <span className='saveToBookmarkButton'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" onClick={() => saveOnBookmark('save')}>
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                </span>

                : <span>error</span>
            }
          </div>


          <div className='productItemPriceDiv'>
            <span className='productItemPrice'>{props.price ? props.price.toLocaleString() : '0'}</span>
            <span> 원</span>
          </div>

          <div className='productItemSellCountDiv'>
            <span className='productItemSellCountLabel'>누적 판매량 : </span>
            <span className='productItemSellCount'>{props.sellcount}</span>
            <span className='productItemSellCountLabelUnit'> 권</span>
          </div>

          <div className='productItemProamountController'>
            <button onClick={subtractProamount} className='productItemAddProamountButton' > - </button>
            <input type='number' value={proamount} name='proamount' id='proamount'
              className='productItemInputProamount'
              onChange={(e) => setProamount(e.target.value)} min={1}
            />
            <button onClick={addProamount} className='productItemSubtractProamountButton' > + </button>
          </div>

          <div className='cartPurchaseButton'>
            <button onClick={saveOnCart}>장바구니</button>
            <button onClick={purchaseProduct}>바로구매</button>
          </div>

        </div>

      </div >

      <hr className='productItemSectioningHrLine' />
    </>
  );
};

export default ProductListItem;