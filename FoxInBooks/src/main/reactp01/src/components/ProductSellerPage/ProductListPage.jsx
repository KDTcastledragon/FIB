import './ProductListPage.css';
import { useState, useEffect } from 'react';
import SideButton from '../SideButton';
import ProductListItem from './ProductListItem';
import RecentSideBar from './UiBox/RecentSideBar';
import KeywordSideBar from './UiBox/KeywordSideBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './ProductPagination';
const ProductListPage = () => {
  const loginID = sessionStorage.getItem("loginID");
  const selectedOptSessionStorage = sessionStorage.getItem("selectedOpt");
  const navigator = useNavigate();
  const [productData, setProductData] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState(selectedOptSessionStorage);

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
  useEffect(() => {
    axios
      .get('/product/selectAllList')
      .then((r) => {
        setProductData(r.data);

        const data = { id: loginID }

        axios
          .post(`/bookmark/bookmarkList`, data)
          .then((response) => {
            setBookmarkData(response.data);

          }).catch((err) => {
            alert(`서버연결 실패 => ${err.message}`);
          });
      }).catch((e) => {
        console.log(`초기 책 목록 실패 : ${e.messege}`);
      })

  }, []);


  //===========================================================================================================================
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState(
    {
      domestic: 'all',
      category: 'all',
      genre: 'all',
    });

  const handleKeywordChange = (option, optValue) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: prevOptions[option] === optValue ? 'all' : optValue,
    }));
  };

  // ======[옵션 선택]===================================================================================================
  function searchByOption(sortBy) {


    const data = {
      sortOpt: sortBy,
      ...selectedOptions,
      minPrice: minPrice,
      maxPrice: maxPrice
    }

    if (sortBy === 'price' && minPrice >= maxPrice) {
      alert(`가격범위를 다시 선택해주세요`);

    } else {
      axios
        .post(`/product/selectListByOptions`, data)
        .then((r) => {
          // console.log(`옵션검색 성공. post의 객체 : ${JSON.stringify(data)}`);
          setProductData(r.data);
          // console.log(`옵션검색 성공 현재 선택 옵션 : ${JSON.stringify(selectedOptions)}`);
        }).catch((e) => {
          // console.log(`옵션검색 실패 : ${e.messege}`);
          // console.log(`현재 선택 옵션 : ${selectedOptions}`);
          alert(`옵션검색 실패`);
        })
    }
  }

  //============================================================================================================================
  const [page, setPage] = useState(1); // 페이지 수
  const [size, setSize] = useState(5); // 한 페이지에 보여줄 목록 개수

  const indexOfLastItem = page * size;                                      // 현재 페이지에서 보여줄 첫번째 목록 index
  const indexOfFirstItem = indexOfLastItem - size;                          // 현재 페이지에서 보여줄 마지막 목록 index

  const viewedList = productData.slice(indexOfFirstItem, indexOfLastItem);  // 현재 페이지에서 보여줄 List들.

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productData.length / size); i++) {
    pageNumbers.push(i);
  }


  //============================================================================================================================
  return (
    <div className='productListPageContainer'>
      <div className='productListPageDisplayContentContainer'>
        <div className='seller_product_page_titlebox'>
          <div className='ProductListPageKeywordCheckBoxWrapper'>
            <div className='productListPageCategoryCheckBox'>
              <span className='productListPageCategoryCheckBoxLabel'>국가 : </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="checkbox" id='domestic1' name='domestic' value='1'
                checked={selectedOptions.domestic.includes('1')}
                onChange={() => handleKeywordChange('domestic', '1')} />국내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='domestic2' name='domestic' value='2'
                checked={selectedOptions.domestic.includes('2')}
                onChange={() => handleKeywordChange('domestic', '2')} />영미&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='domestic3' name='domestic' value='3'
                checked={selectedOptions.domestic.includes('3')}
                onChange={() => handleKeywordChange('domestic', '3')} />프랑스&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='domestic4' name='domestic' value='4'
                checked={selectedOptions.domestic.includes('4')}
                onChange={() => handleKeywordChange('domestic', '4')} />독일&nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div className='productListPageCategoryCheckBox'>
              <span className='productListPageCategoryCheckBoxLabel'>카테고리 : </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="checkbox" id='category1' name='category' value='novel'
                checked={selectedOptions.category.includes('novel')}
                onChange={() => handleKeywordChange('category', 'novel')} />소설&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='category2' name='category' value='poem'
                checked={selectedOptions.category.includes('poem')}
                onChange={() => handleKeywordChange('category', 'poem')} />시&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='category3' name='category' value='essay'
                checked={selectedOptions.category.includes('essay')}
                onChange={() => handleKeywordChange('category', 'essay')} />에세이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='category4' name='category' value='magazine'
                checked={selectedOptions.category.includes('magazine')}
                onChange={() => handleKeywordChange('category', 'magazine')} />잡지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div className='productListPageCategoryCheckBox'>
              <span className='productListPageCategoryCheckBoxLabel'>장르 : </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="checkbox" id='genre1' value='fantasy'
                checked={selectedOptions.genre.includes('fantasy')}
                onChange={() => handleKeywordChange('genre', 'fantasy')} />판타지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='genre2' value='melo'
                checked={selectedOptions.genre.includes('melo')}
                onChange={() => handleKeywordChange('genre', 'melo')} />멜로&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='genre3' value='detective'
                checked={selectedOptions.genre.includes('detective')}
                onChange={() => handleKeywordChange('genre', 'detective')} />추리&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <input type="checkbox" id='genre4' name='genre' value='sf'
                checked={selectedOptions.genre.includes('sf')}
                onChange={() => handleKeywordChange('genre', 'sf')} />공상과학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>

          <div className='ProductListPage_SortOption'>
            <button
              className={selectedOpt === 'title' ? 'selectedButton' : ''}
              onClick={() => {
                setSelectedOpt('title');
                searchByOption('title');
              }}
            >
              제목순
            </button>

            <button
              className={selectedOpt === 'ascPrice' ? 'selectedButton' : ''}
              onClick={() => {
                setSelectedOpt('ascPrice');
                searchByOption('ascPrice');
              }}
            >
              최저가순
            </button>

            <button
              className={selectedOpt === 'descPrice' ? 'selectedButton' : ''}
              onClick={() => {
                setSelectedOpt('descPrice');
                searchByOption('descPrice');
              }}
            >
              최고가순
            </button>

            <button
              className={selectedOpt === 'sellCount' ? 'selectedButton' : ''}
              onClick={() => {
                setSelectedOpt('sellCount');
                searchByOption('sellCount');
              }}
            >
              판매량순
            </button>

            <button
              className={selectedOpt === 'gradeAvg' ? 'selectedButton' : ''}
              onClick={() => {
                setSelectedOpt('gradeAvg');
                searchByOption('gradeAvg');
              }}
            >
              평점순
            </button>

            <button
              className={selectedOpt === 'review' ? 'selectedButton' : ''}
              onClick={() => {
                setSelectedOpt('review');
                searchByOption('review');
              }}
            >
              리뷰순
            </button>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <input text='number' size={7} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <span>~</span>
            <input text='number' size={7} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />&nbsp;&nbsp;
            <button onClick={() => searchByOption('rangedPrice')}>가격검색</button>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <select onChange={handlePageSizeChange} value={size} className='ProductListPageHandleSize'>
              <option value="3">3개씩 보기</option>
              <option value="5">5개씩 보기</option>
              <option value="7">7개씩 보기</option>
              <option value="10">10개씩 보기</option>
              <option value="20">20개씩 보기</option>
            </select>
          </div>
        </div>

        <hr className='ProductListPageCurrentKeywordTitleHrLine' />

        <div className='productListItemMapedArea'>

          {viewedList.length === 0 ? (
            <div className='productListNoContentBox'>
              <span>해당하는 상품이 없습니다.</span>
            </div>
          ) : (
            viewedList.map((d, i) => {
              const isMarked = bookmarkData.some(
                (bookmark) => bookmark.product_code === d.product_code
              );

              return (
                <ProductListItem
                  key={i}
                  product_code={d.product_code}
                  domestic={d.domestic}
                  protype={d.protype}
                  writer={d.writer}
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
                  isMarked={isMarked}
                />
              );
            })
          )}
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

export default ProductListPage;