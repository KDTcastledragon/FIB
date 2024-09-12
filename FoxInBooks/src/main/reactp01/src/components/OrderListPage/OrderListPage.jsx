import './OrderListPage.css';
import OrderListDateSelect from './OrderListDateSelect';
import OrderListDelProCau from './OrderListDelProCau';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OrderListPage() {

  const loginID = sessionStorage.getItem("loginID");

  const [detailData, setDetailData] = useState([]);
  const [fromYear, setFromYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [fromDay, setFromDay] = useState('');

  const [toYear, setToYear] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [toDay, setToDay] = useState('');

  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');

  useEffect(() => {
    axios
      .get(`/mpdetail/mpdList?id=${loginID}`)
      .then((response) => {
        setDetailData(response.data);
        console.log(`주문상세 성공 : `, response.data);
      }).catch((e) => {
        console.log(`주문상세 실패 : `, e.messege);
        alert(`주문상세 실패`);
      })
  }, []);
  //==========================================================================================================================

  const searchDataForDate = () => {
    axios
      .get(`/mpdetail/searchDate?fromDate=${fromYear}-${fromMonth}-${fromDay}&toDate=${toYear}-${toMonth}-${toDay}`)
      .then((response) => {
        console.log(`서치성공 : `, response.data);
        alert(`서치데이타 success : `, response.data);
        setDetailData(response.data);
      }).catch((error) => {
        console.log(`서치데이터 문제 발생 : `, error.messege);
        alert(`서치데이터를 실패햇넹 : `, error.messege);
      })
  };
  //==========================================================================================================================
  const cancelOrder = (member_payment_code) => {
    axios
      .get(`/mpdetail/cancelOrder?paycode=${member_payment_code}&id=${loginID}`)
      .then((response) => {
        console.log(response.data);
        alert(`주문취소요청이 완료되었습니다.`);
      }).catch((e) => {
        console.log(e.messege);
      })

    window.location.reload();
  };
  //==========================================================================================================================
  const groupedData = {};

  detailData.forEach((d) => {
    if (!groupedData[d.member_payment_code]) {
      groupedData[d.member_payment_code] = [];
    }
    groupedData[d.member_payment_code].push(d);
  });

  const rows = [];

  Object.values(groupedData).forEach((group) => {
    group.forEach((d, rowIndex) => {
      const isCancelled = d.payment_cancel === 1;

      rows.push(
        <tr key={rowIndex} className='orderDetailItem'>
          {rowIndex == 0 && (
            <>
              <td className='orderDetailDataPmCodeTd' rowSpan={group.length}>
                <div className='orderDetailData'>{d.payment_date}</div>
                <div className='orderDetailPmCode'>{`[ ${d.member_payment_code} ]`}</div>
              </td>
            </>
          )}
          <td className='orderDetailItemInfomationTd'>
            <div className='orderDetailImageTitleDomesticProtype'>
              <div>
                <img src={`../img/${d.image}`} className='orderListItemImg' alt='Product Image'></img>
              </div>
              <div>
                <span className='orderDetailTitle'>{d.title}</span>
                <span className='orderDetailDomesticProtype'>
                  {d.domestic == 1 ? '국내' :
                    d.domestic == 2 ? '영미' :
                      d.domestic == 3 ? '프랑스' :
                        d.domestic == 4 ? '독일' : '기타'}{d.protype == 1 ? '도서' : '제품'}
                </span>

                <div className='orderDetailToReviewPage'>
                  <Link to={`/DetailPage/${d.product_code}`}>리뷰작성</Link>
                </div>

              </div>
            </div>
          </td>
          <td className='orderDetailPriceProamountTd'>
            {/* <span className='orderDetailPriceUnit'>&#8361;</span> */}
            <span className='orderDetailPrice'>&#8361;</span>&nbsp;
            <span className='orderDetailPrice'>{d.price ? d.price.toLocaleString() : 0}</span>

            &nbsp;&nbsp;
            <span>/</span>
            &nbsp;&nbsp;

            <span className='orderDetailProamountUnit'>수량 : </span>&nbsp;
            <span className='orderDetailProamount'>{d.proamount}</span>
            <div>
              <span className='orderDetailEqualUnit'>=</span>&nbsp;&nbsp;
              <span className='orderDetailMultiPlyPP'>
                {d.price && d.proamount ? (d.price * d.proamount).toLocaleString() : 0}
              </span>
              <span className='orderDetailPriceUnit'>원</span>
            </div>
          </td>

          {rowIndex == 0 && (
            <>
              <td className='orderDetailFinalPriceTd' rowSpan={group.length}>
                <div>
                  <span className='orderDetailFinalPrice'>{d.final_price ? d.final_price.toLocaleString() : 0}</span>&nbsp;
                  <span className='orderDetailFinalPriceUnit'>원</span>
                </div>
              </td>
            </>
          )}

          {rowIndex == 0 && (
            <>
              <td className='orderDetailItemStateTd' rowSpan={group.length}>
                <span className='orderDetailItemState'>상품 준비중</span>
              </td>
            </>
          )}

          {rowIndex == 0 && (
            <td className='orderDetailItemDeleteTd' rowSpan={group.length}>
              <button
                className={`orderDetailItemDeleteButton_${isCancelled ? 'canceledOrder' : ''}`}
                onClick={() => isCancelled ? null : cancelOrder(d.member_payment_code)}
                disabled={isCancelled}
              >
                주문 취소 {isCancelled && '완료'}
              </button>
            </td>
          )}
        </tr>
      );
    });
  });


  //==========================================================================================================================

  return (
    <div className='orderListPageContainer' >
      <div>
        <div className="orderdelivery-title">주문/배송조회</div>
        <div className='orderlist_sub_title'>고객님께서 구매하셨던 상품목록들을 확인하실 수 있는 페이지입니다.</div>


      </div>

      {/* 주문상세 테이블 =========================================================================== */}
      <table className="orderListPageTable">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>주문일자 / 주문번호</th>
            <th style={{ width: '37%' }}>상품정보</th>
            <th style={{ width: '13%' }}>가격 / 수량</th>
            <th style={{ width: '12%' }}>총 결제금액</th>
            <th style={{ width: '10%' }}>배송상태</th>
            <th style={{ width: '12%' }}>주문 취소</th>
          </tr>
        </thead>
        <tbody>
          {detailData.length === 0 ? (
            <tr className='orderDetailDataIsVacant'>
              <td colSpan='5'>아직 주문한 상품이 없습니다.</td>
            </tr>
          ) : rows}
        </tbody>
      </table>

      <OrderListDelProCau />
    </div >
  );
}

export default OrderListPage;