import './BestSellerPage.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import BestSellerItem from './BestSellerItem';
import RecentSideBar from './UiBox/RecentSideBar';
import KeywordSideBar from './UiBox/KeywordSideBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './ProductPagination';
const BestSellerPage = () => {
  // =================================================================================================================
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //==========================================================================================================================
  const [urlString, setUrlString] = useState(useLocation());
  const urlNavigate = useNavigate();
  const urlParams = new URLSearchParams(urlString.search);

  const [productData, setProductData] = useState([]);
  // const [bestData, setBestData] = useState([]);

  const loginID = sessionStorage.getItem("loginID");

  //==========================================================================================================================
  const requestToServer = (initRequestURL) => {
    axios
      .get(`${initRequestURL}`)
      .then((response) => {
        console.log(`response 성공 :`, response.data);

        if (response.data && response.data.length > 0) {
          setProductData(response.data);

        } else {
          console.log(`requestToServer : 조건에 해당하는 도서가 없습니다.`);
          console.log(`resposne data : `, response.data);
          alert(`requestToServer : 조건에 해당하는 도서가 없습니다.`);
        }
      }).catch((err) => {
        alert(`requestToServer 서버연결 실패 => ${err.message}`);
      });
  };

  useEffect(() => {

    urlNavigate
      (`/BestSellerPage`);

    requestToServer
      (`/product/bestSeller`)

  }, []);

  // useEffect(() => {
  //   // productData가 변경될 때만 실행되도록 조건 추가
  //   if (productData.length > 0) {
  //     const slicedData = productData.slice(0, 20);
  //     setBestData(slicedData);
  //   }
  // }, [productData]);
  //============================================================================================================================
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5); // 한 페이지에 보여질 아이템 수

  // productData를 현재 페이지에 따라 슬라이스하여 보여줍니다.

  const indexOfLastItem = page * size;               // 현재 페이지에서 보여줄 첫번째 아이템의 index
  const indexOfFirstItem = indexOfLastItem - size;   // 현재 페이지에서 보여줄 마지막 아이템의 index
  const viewedList = productData.slice(indexOfFirstItem, indexOfLastItem);  // 현재 페이지에서 보여줄 List들.

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // 페이지 번호를 생성합니다.
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productData.length / size); i++) {
    pageNumbers.push(i);
  }

  //============================================================================================================================

  return (
    <div className='BestSellerPageContainer'>
      <div className='BestSellerDisplayContentContainer'>
        <div className='seller_product_page_titlebox'>
          <div className='ProductListPageTitleAndSize'>
            <span className='BestSellerPageTitle'>베스트셀러</span>&nbsp;&nbsp;
            <span className='BestSellerPageSubtitle'>가장 많은 독자분들에게 팔린 책 목록입니다.</span>
            <select onChange={handlePageSizeChange} value={size} className='ProductListPageHandleSizeBs'>
              <option value="5">5개씩 보기</option>
              <option value="10">10개씩 보기</option>
            </select>
          </div>

        </div>

        <hr className='ProductListPageCurrentKeywordTitleHrLine' />

        <div className='productListItemMapedArea'>

          {viewedList.map((d, i) => (
            <BestSellerItem
              key={i}
              rank={indexOfFirstItem + i + 1}
              product_code={d.product_code}
              domestic={d.domestic}
              protype={d.protype}
              writer={d.writer_code}
              title={d.title}
              translator={d.translator}
              publisher={d.publisher}
              publish_date={d.publish_date}
              category={d.category}
              genre={d.genre}
              summary={d.summary}
              image={d.image}
              intro_image={d.intro_image}
              content={d.content}
              price={d.price}
              stack={d.stack}
              sellcount={d.sellcount}
              gradeavg={d.gradeavg}
              viewcount={d.viewcount}
              regdate={d.regdate}
              urlNavigate={urlNavigate}
            />
          ))}
        </div>

        <div className='productListPage_pageNationButton'>
          <ProductPagination
            pageNumbers={pageNumbers}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>

      </div>

      <div className='RecentSideBar' style={{ transform: `translateY(${scrollY}px)` }}>
        <RecentSideBar />
      </div>

      <SideButton />
    </div>

  );
};
export default BestSellerPage;