import './ProductListItem.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from '../detailPage/review_star.svg';

const ProductListItem = (props) => {
  // =================================================================================================================
  const loginInfo = JSON.parse(sessionStorage.getItem('user'));
  const id = loginInfo ? loginInfo.id : null;

  const isLoggedIn = loginInfo; // 로그인 여부 확인

  const showWarning = () => {
    alert("로그인 후 이용 가능한 서비스입니다.");
  };

  const [proamount, setProamount] = useState(1);

  const loginID = sessionStorage.getItem("loginID");


  //====================================================================================================================

  function saveOnBookmark() {
    const savedDataOnBookmark = {
      product_code: props.product_code,
      id: loginID
    };

    axios
      .post(`/bookmark/bookmarkOnSaveAction`, savedDataOnBookmark)
      .then((response) => {
        console.log(`찜목록 성공 :`, response);
        console.log(`response.OK :`, response.status);
        console.log('========================================');
        alert(response.data);

      }).catch((err) => {
        alert(`담기 실패!! ${err.message}`);
      });

    setProamount(1);

  };
  //====================================================================================================================

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

  };

  const dataToPayment = [{
    product_code: props.product_code,
    title: props.title,
    image: props.image,
    price: props.price,
    proamount: proamount
  }]


  //====================================================================================================================


  return (
    <>
      {props.stack === 0 ? (
        <div className="productItemContainer productItemSoldOut">
          <div className="soldOutOverLayBox">
            <span>품절된 상품입니다</span>
          </div>

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

              <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className="productItemTranslator">{props.translator}역식자</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className='productItemWriterTranslatorPublisherhr'>|</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className="productItemPublisher">{props.publisher}</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className="productItemPublishDate">{props.publish_date}</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className='productItemWriterTranslatorPublisherhr'>|</span>&nbsp;&nbsp;&nbsp;&nbsp;

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



          {/* ======================productItemSelling=================================================== */}
          <div className="productItemSellingFunctions">

            <div className="seller_publisher_box">
              <span className="seller_publisher_name"></span>
              <span className="seller_publisher_date"></span>&nbsp;&nbsp;
              <span className='productItemSaveToBookmarkButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16" onClick={saveOnBookmark}>
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                </svg>
              </span>
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

            <div>
              <div className='productItemProamountController'>
                <button onClick={subtractProamount} className='productItemAddProamountButton' > - </button>
                <input type='number' value={proamount} name='proamount' id='proamount'
                  className='productItemInputProamount'
                  onChange={(e) => setProamount(e.target.value)} min={1}
                />
                <button onClick={addProamount} className='productItemSubtractProamountButton' > + </button>
              </div>

              <div>
                <div>
                  <button type='submit' onClick={saveOnCart} className='productItemSaveOnCartButton'>장바구니</button>
                </div>

                <div className='productItemOrderNowButton'>
                  <Link to={`/PaymentPage`}
                    state={{ order_data: dataToPayment }}
                    className='productItemOrderNowButton'>
                    바로구매
                  </Link>
                </div>
              </div>
            </div>



          </div>

        </div >)

        :

        (<div className="productItemContainer">

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
              <span className='productItemWriter'>{props.writer}</span>&nbsp;

              <span className="productItemTranslator">{props.translator ? ` / ${props.translator}` : ''}</span >&nbsp;&nbsp;&nbsp;

              <span className='productItemWriterTranslatorPublisherhr'>|</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className="productItemPublisher">{props.publisher}</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className='productItemWriterTranslatorPublisherhr'>/</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <span className="productItemPublishDate">{props.publish_date}</span>&nbsp;&nbsp;&nbsp;&nbsp;

              <div className='productItemStarGradeAvgReviewViewCountDiv'>
                <span><Star className='productItemStar' />&nbsp;</span>

                <span className='productItemGradeAvg'>{props.gradeavg.toFixed(1)}</span>&nbsp;&nbsp;&nbsp;&nbsp;

                <span className='productItemForReview'>리뷰 : </span>
                <span className='productItemViewCount'>{props.viewcount} </span>
                <span>건</span>
              </div>
            </div>


            <div className="productItemSummary">
              <Link to={`/DetailPage/${props.product_code}`}>{props.summary}</Link>
            </div>


          </div>



          {/* ======================productItemSelling=================================================== */}
          <div className="productItemSellingFunctions">

            <div className="seller_publisher_box">
              <span className="seller_publisher_name"></span>
              <span className="seller_publisher_date"></span>&nbsp;&nbsp;
              <span className='productItemSaveToBookmarkButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16" onClick={saveOnBookmark}>
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                </svg>
              </span>
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

            <div>
              <div className='productItemProamountController'>
                <button onClick={subtractProamount} className='productItemAddProamountButton' > - </button>
                <input type='number' value={proamount} name='proamount' id='proamount'
                  className='productItemInputProamount'
                  onChange={(e) => setProamount(e.target.value)} min={1}
                />
                <button onClick={addProamount} className='productItemSubtractProamountButton' > + </button>
              </div>

              {loginID ?
                <div>
                  <div>
                    <button type='submit' onClick={saveOnCart} className='productItemSaveOnCartButton'>장바구니</button>
                  </div>

                  <div className='productItemOrderNowButton'>
                    <Link to={`/PaymentPage`}
                      state={{ order_data: dataToPayment }}>
                      바로구매
                    </Link>
                  </div>
                </div>
                :
                <div>

                  <div className='productItemSaveOnCartButton' onClick={showWarning}>
                    <Link to={`/LogIn`}>
                      장바구니
                    </Link>
                  </div>

                  <div className='productItemOrderNowButton' onClick={showWarning}>
                    <Link to={`/LogIn`}>
                      바로구매
                    </Link>
                  </div>
                </div>}
            </div>

          </div>

        </div >)}

      <hr className='productItemSectioningHrLine' />

    </>
  );
};

export default ProductListItem;