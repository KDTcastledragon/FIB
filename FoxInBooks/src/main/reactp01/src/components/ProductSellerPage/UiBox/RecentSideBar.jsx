import './RecentSideBar.css';
import { Link } from 'react-router-dom'
import RecentSideBarItem from './RecentSideBarItem';
import { useEffect, useState } from 'react';
import axios from 'axios';


const RecentSideBar = () => {

  const loginID = sessionStorage.getItem("loginID");


  const [recentData, setRecentData] = useState([]);

  useEffect(() => {
    axios
      .get(`/product/selectRecentProductList?id=${loginID}`)
      .then((response) => {
        // alert(`최근본상품 목록 불러오기 성공 ^~^ : `,response.data);
        if (response.data) {
          setRecentData(response.data);
        }
      }).catch((e) => {
        console.log(`최근본상품목록이 없음`);
      })
  }, [])

  const recentList = loginID ? recentData.map((d, i) => (
    <RecentSideBarItem
      key={i}
      pcode={d.product_code}
      title={d.title}
      image={d.image}
      price={d.price}

    />
  )) : <div className='recentDataBeforeLoginID'>로그인 후 이용가능합니다.</div>

  const showWarning = () => {
    window.alert("로그인 후 이용가능합니다.");
  };

  //=====================================================================================bi bi-suit-heart-fill

  return (
    <div className='RecentSideBar'>
      {/* 찜목록.========================================================================================= */}

      {loginID ?
        <div className='RecentSideBarBookmarkPageLinkWrapper'>
          <Link to='/BookmarkPage' className='RecentSideBarBookmarkPageLink'>
            나의 찜목록
            <span className='RecentSideBarHeart' >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="RecentSideBarHeart" viewBox="0 0 16 16">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </span>
          </Link>
        </div>
        :
        <div className='RecentSideBarBookmarkPageLinkWrapper'>
          <Link to='/LogIn' className='RecentSideBarBookmarkPageLink'
            onClick={showWarning}> 나의 찜목록
            <span className='RecentSideBarHeart' >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="RecentSideBarHeart" viewBox="0 0 16 16">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </span>
          </Link>
        </div>}





      {/* 장바구니.========================================================================================= */}
      {loginID ?
        <Link to='/CartPage' className='RecentSideBarCartPageLink'>
          나의 장바구니 목록
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
              className="RecentSideBarCartIcon" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </span>
        </Link>
        :
        <Link to='/LogIn' className='RecentSideBarCartPageLink'
          onClick={showWarning}>나의 장바구니 목록
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
              className="RecentSideBarCartIcon" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </span>
        </Link>}


      {/* 최근 본 상품.========================================================================================= */}
      <div className='recentBarProductListLabel'>
        <span>최근 본 상품 목록</span>
      </div>

      <div>
        {recentList}
      </div>

    </div>
  );
};

export default RecentSideBar;