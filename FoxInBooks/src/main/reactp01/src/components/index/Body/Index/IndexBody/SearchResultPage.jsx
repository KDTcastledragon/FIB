// import './SearchResultPage.css'
// import axios from 'axios';
// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// function SearchResultPage({ search }) {
//     // Server에서 product 리스트 정보를 배열 형태로 받아오기
//     const [productList, setProductList] = useState([]);
//     const [filteredProduct, setFilteredProduct] = useState([]);
//     const [noResultMessage, setNoResultMessage] = useState('');

//     console.log("전달받은 값123 : " + search);
//     useEffect(() => {
//         axios
//             .get('/product/selectAllList')
//             .then((response) => {
//                 setProductList(response.data);  // 검색결과를 꺼내기위한 엄마데이터리스트
//                 setFilteredProduct(response.data) // 검색결과를 담아줄 바구니 

//                 console.log(`** checkdata 서버연결 성공 =>`, response.data);
//             }).catch((err) => {
//                 alert(`** checkdata 서버연결 실패 => ${err.message}`);
//             });
//     }, []); // useEffect

//     useEffect(() => {
//         filterProduct(search, productList);
//     }, [search, productList]);

//     const filterProduct = (search) => {
//         const lowerKeyword = search ? search.toLowerCase() : '';
//         const filtered = productList.filter((product) =>
//             product.title.toLowerCase().includes(lowerKeyword) ||
//             product.writer.toLowerCase().includes(lowerKeyword)
//         );

//         // 일치하는 내용들만 저장
//         setFilteredProduct(filtered);
//         console.log(`검색결과를 받았습니다 search : ${search}`);

//         if (filteredProduct.length === 0) {
//             setNoResultMessage('검색 결과가 없습니다.');
//         } else {
//             setNoResultMessage('');
//         }
//     };


//     return (
//         <div className="search_result_page">
//             <h2> "{search}" 검색 결과 : {filteredProduct.length}개</h2>
//             <hr />
//             {filteredProduct.length === 0 ? (
//                 <p className="not_found_search">"검색 결과를 찾을 수 없습니다"</p>
//             ) : (
//                 <ul className="search_result_list">
//                     {filteredProduct.map((result, index) => (
//                         <li key={index}>
//                             <div className="search_result_item">
//                                 <Link to={`/DetailPage/${result.product_code}`}>
//                                     <img className="search_result_image" src={result.image} alt={result.title} />
//                                     <div className="search_result_info_box">
//                                         <h3 className="search_result_title">{result.title}</h3>
//                                         <p className="search_result_price">
//                                             {result.price ? `${result.price.toLocaleString("ko")}원` : ''}
//                                         </p>
//                                         <p>
//                                             {result.writer ? `${result.writer}` : ''}
//                                         </p>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default SearchResultPage;


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './SearchResultPage.css'
import { Link, useSearchParams } from "react-router-dom";

function SearchResultPage() {
    const [searchParams] = useSearchParams();
    const [productList, setProductList] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [noResultMessage, setNoResultMessage] = useState('');
    const searchKeyword = searchParams.get("search");
    const searchResults = JSON.parse(localStorage.getItem("searchResults"));
    // 데이터 받아오기

    useEffect(() => {
        axios
            .get('/product/selectAllList')
            .then((response) => {
                setProductList(response.data);  // 검색결과를 꺼내기위한 엄마데이터리스트
                setFilteredProduct(response.data) // 검색결과를 담아줄 바구니 

                console.log(`** checkdata 서버연결 성공 =>`, response.data);
            }).catch((err) => {
                alert(`** checkdata 서버연결 실패 => ${err.message}`);
            });
    }, []); // useEffect

    useEffect(() => {
        filterProduct(searchKeyword, productList);
    }, [searchKeyword, productList]);

    const filterProduct = (searchKeyword) => {
        const lowerKeyword = searchKeyword ? searchKeyword.toLowerCase() : '';
        const filtered = productList.filter((productList) =>
            productList.title.toLowerCase().includes(lowerKeyword) ||
            productList.writer.toLowerCase().includes(lowerKeyword)
        );

        // 일치하는 내용들만 저장
        setFilteredProduct(filtered);
        console.log(`검색결과를 받았습니다 searchKeyword : ${searchKeyword}`);

        if (filteredProduct.length === 0) {
            setNoResultMessage('검색 결과가 없습니다.');
        } else {
            setNoResultMessage('');
        }
    };

    return (
        <div className="search_result_page">
            <h2> "{searchKeyword}" 검색 결과 : {filteredProduct.length}개</h2>
            <hr />
            {filteredProduct.length === 0 ? (
                <p className="not_found_search">"검색 결과를 찾을 수 없습니다"</p>
            ) : (
                <ul className="search_result_list">
                    {filteredProduct.map((result, index) => (
                        <li key={index}>
                            <div className="search_result_item">
                                <Link to={`/DetailPage/${result.product_code}`}>
                                    <img className="search_result_image" src={`../img/${result.image}`} alt={result.title} />
                                    <div className="search_result_info_box">
                                        <h3 className="search_result_title">{result.title}</h3>
                                        <p className="search_result_price"
                                            style={{ textDecoration: result.salePer ? 'line-through' : 'none' }}>
                                            {result.price ? `${result.price.toLocaleString("ko")}원` : ''}
                                            {/* price유무에 따라 노출 여부 결정 */}
                                        </p>
                                        <p>
                                            {result.writer ? `${result.writer}` : ''}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResultPage;

// import React from "react";
// import './SearchResultPage.css'
// import { Link, useSearchParams } from "react-router-dom";


// function SearchResultPage() {
//     const [searchParams] = useSearchParams();
//     const searchKeyword = searchParams.get("search");
//     const searchResults = JSON.parse(localStorage.getItem("searchResults"));
//     // 데이터 받아오기

//     return (
//         <div className="search_result_page">
//             <h2> "{searchKeyword}" 검색 결과 : {searchResults.length}개</h2>
//             <hr />
//             {searchResults.length === 0 ? (
//                 <p className="not_found_search">"검색 결과를 찾을 수 없습니다"</p>
//             ) : (
//                 <ul className="search_result_list">
//                     {searchResults.map((result, index) => (
//                         <li key={index}>
//                             <div className="search_result_item">
//                                 <Link to={`/DetailPage/${result.id}`}>
//                                     <img className="search_result_image" src={result.image} alt={result.title} />
//                                     <div className="search_result_info_box">
//                                         <h3 className="search_result_title">{result.title}</h3>
//                                         <p className="search_result_price"
//                                             style={{ textDecoration: result.salePer ? 'line-through' : 'none' }}>
//                                             {result.price ? `${result.price.toLocaleString("ko")}원` :''}
//                                             {/* price유무에 따라 노출 여부 결정 */}
//                                         </p>
//                                         <p className="search_result_discount">
//                                             {result.salePer ? `${result.salePer}% 할인` : ''}
//                                             {/* salePer유무에 따라 노출 여부 결정 */}
//                                         </p>
//                                         <p className="search_result_discount_price"
//                                             style={{ display: result.salePer ? 'block' : 'none' }}>
//                                             {/* salePer 유무에 따라 할인가격 노출 여부 결정 */}

//                                             {(result.price - (result.price * result.salePer) / 100).toLocaleString("ko")}원
//                                             {/* 할인율에 따른 가격변화를 위한 식 */}
//                                         </p>
//                                         <p>
//                                             {result.name ? `${result.name}` : ''}
//                                         </p>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default SearchResultPage;