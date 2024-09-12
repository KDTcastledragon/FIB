import './ItemSlide.css';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { book_list_context } from '../../../../Data/ProductOriginData_context'

// BestSeller
function SlideItemBestSeller() {
    const [bestSellerList, setBestSellerList] = useState([]);

    useEffect(() => {
        axios
            .get('/product/bestSeller')
            .then((response) => {
                setBestSellerList(response.data.slice(0, 5));
                console.log(`서버연결 성공 =>`, response.data);
            })
            .catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, []);

    const Best_item = ({ image, title, price, product_code }) => {
        return (
            <div className='slide_list_container'>
                <ul className="index_slide_table01_list_size">
                    <li>
                        <div className="item_info">
                            <span>
                                <Link to={`/DetailPage/${product_code}`}>
                                    <img className="item_info_img" src={`../img/${image}`} alt={title} />
                                </Link>
                            </span>
                            <span className="item_info_box">
                                <div className="item_info_box_name">
                                    <Link to={{
                                        pathname: `/DetailPage/${product_code}`,
                                        key: product_code
                                        // state: { productData: product_data }
                                    }}>
                                        <h3>{title}</h3>
                                    </Link>
                                </div>
                                <p className="item_info_box_price">
                                    {price ? `${price.toLocaleString("ko")}원` : ''}
                                </p>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="index_main_section">
            <div className="slide_item">
                {bestSellerList.map((product_data, index) => (
                    <Best_item
                        key={index}
                        product_code={product_data.product_code}
                        image={product_data.image}
                        title={product_data.title}
                        price={product_data.price}
                    />
                ))}
            </div>
        </div>
    );
}

// 모든 리스트 보기
function SlideAllItem() {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios
            .get('/product/selectAllList')
            .then((response) => {
                setProductList(response.data.slice(0, 20));
                console.log(`서버연결 성공 =>`, response.data);
            })
            .catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, []);

    const All_item = ({ image, title, price, product_code }) => {
        return (
            <div className='slide_list_container'>
                <ul className="index_slide_table01_list_size">
                    <li>
                        <div className="item_info">
                            <span>
                                <Link to={`/DetailPage/${product_code}`}>
                                    <img className="item_info_img" src={`../img/${image}`} alt={title} />
                                </Link>
                            </span>
                            <span className="item_info_box">
                                <div className="item_info_box_name">
                                    <Link to={{
                                        pathname: `/DetailPage/${product_code}`,
                                        key: product_code
                                        // state: { productData: product_data }
                                    }}>
                                        <h3>{title}</h3>
                                    </Link>
                                </div>
                                <p className="item_info_box_price">
                                    {price ? `${price.toLocaleString("ko")}원` : ''}
                                </p>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="index_main_section">
            <div className="slide_item">
                {productList.map((product_data, index) => (
                    <All_item
                        key={index}
                        product_code={product_data.product_code}
                        image={product_data.image}
                        title={product_data.title}
                        price={product_data.price}
                    />
                ))}
            </div>
        </div>
    );
}



// 도서용품
function BookItem() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios
            .get('/product/selectAllList')
            .then((response) => {
                setProductList(response.data);
                console.log(`서버연결 성공 =>`, response.data);
            })
            .catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, []);

    const Book_item = ({ product_code, product_protype, image, title, price }) => {
        return (
            <>
                {product_protype == 2 &&
                    <div className='slide_list_container'>
                        <ul className="index_slide_table01_list_size">
                            <li>
                                <div className="item_info">
                                    <span>
                                        <Link to={`/DetailPage/${product_code}`}>
                                            <img className="item_info_img" src={`../img/${image}`} alt={title} />
                                        </Link>
                                    </span>
                                    <span className="item_info_box">
                                        <div className="item_info_box_name">
                                            <Link to={{
                                                pathname: `/DetailPage/${product_code}`,
                                                key: product_code
                                                // state: { productData: product_data }
                                            }}>
                                                <h3>{title}</h3>
                                            </Link>
                                        </div>
                                        <p className="item_info_box_price">
                                            {price ? `${price.toLocaleString("ko")}원` : ''}
                                        </p>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                }
            </>
        )
    }

    return (
        <div className="index_main_section">
            <div className='book_item'>
                <span className='book_item_title'>도서용품</span>
            </div>
            <hr className='book_item_title_hr' />
            <div className="slide_item">
                {productList.map((product_data, index) => (
                    <Book_item
                        key={index}
                        product_code={product_data.product_code}
                        product_protype={product_data.protype}
                        image={product_data.image}
                        title={product_data.title}
                        price={product_data.price}
                    />
                ))}
            </div>
        </div>
    );
}

export { SlideItemBestSeller, SlideAllItem, BookItem };

// import './ItemSlide.css';
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { book_list_context } from '../../../../Data/ProductOriginData_context'

// // BestSeller
// function SlideItemBestSeller() {
//     const book_data = useContext(book_list_context);
//     // ProductOriginData_context 파일에서 export된 변수 const List_context = createContext(book_list)를
//     // ItemSlide.jsx에서 book_data에 할당함.

//     const best_filter = book_data.filter((book) => {
//         return book.type == 'best';
//     })

//     const Slide_item = ({ image, title, price, salePer, id }) => {
//         return (
//             <div className='slide_list_container'>
//                 <ul className="index_slide_table01_list_size">
//                     <li>
//                         <div className="item_info">
//                             <span>
//                                 <Link to={`/DetailPage/${id}`}>
//                                     <img className="item_info_img" src={image} alt={title} />
//                                 </Link>
//                             </span>
//                             <span className="item_info_box">
//                                 <div className="item_info_box_name">
//                                     <Link to={{
//                                         pathname: `/DetailPage/${id}`,
//                                         key: book_data.id,
//                                         state: { productData: book_data }
//                                     }}>
//                                         <h3>{title}</h3>
//                                     </Link>
//                                 </div>
//                                 <p className="item_info_box_price"
//                                     style={{ textDecoration: salePer ? 'line-through' : 'none' }}>
//                                     {/* salePer 유무에 따라 라인쓰루 여부 결정 */}
//                                     {price ? `${price.toLocaleString("ko")}원` : ''}
//                                 </p>
//                                 <p className="item_info_box_discount">{salePer ? `${salePer}% 할인` : ''}</p>
//                                 {/* salePer 유무에 따라 할인율 노출 여부 결정 */}

//                                 <p className="item_info_box_discount_price"
//                                     style={{ display: salePer ? 'block' : 'none' }}>
//                                     {/* salePer 유무에 따라 할인가격 노출 여부 결정 */}

//                                     {(price - (price * salePer) / 100).toLocaleString("ko")}원
//                                     {/* 할인율에 따른 가격변화를 위한 식 */}
//                                 </p>
//                             </span>
//                         </div>
//                     </li>
//                 </ul>

//                 {/* 여기에 conText를 사용해야할까요.. */}
//                 {/* <Routes>
//                     <Route path='/DetailPageBook/:id' element={<DetailPage />}></Route>
//                 </Routes> */}


//             </div>
//         )
//     }

//     return (
//         <div className="index_main_section">
//             <div className="slide_item">
//                 {best_filter.map((book_data, index) => (
//                     <Slide_item
//                         key={index}
//                         id={book_data.id}
//                         image={book_data.image}
//                         title={book_data.title}
//                         price={book_data.price}
//                         salePer={book_data.salePer}
//                     />
//                 ))}
//                 {/* book_data에 할당된 useContext(List_context)를 map()메서드로 하나씩 꺼내서 새 배열로 정의
//                     새 배열의 객체는 key, image, title, price, salePer */}
//             </div>
//         </div>
//     );
// }

// // SteadySeller
// function SlideItemSteadySeller() {
//     const book_data = useContext(book_list_context);
//     // ProductOriginData_context 파일에서 export된 변수 const List_context = createContext(book_list)를
//     // ItemSlide.jsx에서 book_data에 할당함.

//     const steady_filter = book_data.filter((book) => {
//         return book.type == 'steady';
//     })

//     const Slide_item = ({ image, title, price, salePer, id }) => {
//         return (
//             <div className='slide_list_container'>
//                 <ul className="index_slide_table01_list_size">
//                     <li>
//                         <div className="item_info">
//                             <span>
//                                 <Link to={`/DetailPage/${id}`}>
//                                     <img className="item_info_img" src={image} alt={title} />
//                                 </Link>
//                             </span>
//                             <span className="item_info_box">
//                                 <div className="item_info_box_name">
//                                     <Link to='/'>
//                                         <h3>{title}</h3>
//                                     </Link>
//                                 </div>
//                                 <p className="item_info_box_price"
//                                     style={{ textDecoration: salePer ? 'line-through' : 'none' }}>
//                                     {/* salePer 유무에 따라 라인쓰루 여부 결정 */}
//                                     {price ? `${price.toLocaleString("ko")}원` : ''}
//                                 </p>
//                                 <p className="item_info_box_discount">{salePer ? `${salePer}% 할인` : ''}</p>
//                                 {/* salePer 유무에 따라 할인율 노출 여부 결정 */}

//                                 <p className="item_info_box_discount_price"
//                                     style={{ display: salePer ? 'block' : 'none' }}>
//                                     {/* salePer 유무에 따라 할인가격 노출 여부 결정 */}

//                                     {(price - (price * salePer) / 100).toLocaleString("ko")}원
//                                     {/* 할인율에 따른 가격변화를 위한 식 */}
//                                 </p>
//                             </span>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         )
//     }

//     return (
//         <div className="index_main_section">
//             <div className="slide_item">
//                 {steady_filter.map((book_data, index) => (
//                     <Slide_item
//                         key={index}
//                         id={book_data.id}
//                         image={book_data.image}
//                         title={book_data.title}
//                         price={book_data.price}
//                         salePer={book_data.salePer}
//                     />
//                 ))}
//                 {/* book_data에 할당된 useContext(List_context)를 map()메서드로 하나씩 꺼내서 새 배열로 정의
//                     새 배열의 객체는 key, image, title, price, salePer */}
//             </div>
//         </div>
//     );
// }

// // 추천도서
// function RecommendBook() {
//     const book_data = useContext(book_list_context);
//     // ProductOriginData_context 파일에서 export된 변수 const List_context = createContext(book_list)를
//     // ItemSlide.jsx에서 book_data에 할당함.

//     const recommend_filter = book_data.filter((book) => {
//         return book.type == 'recommend';
//     })

//     const Slide_item = ({ image, title, price, salePer, id }) => {
//         return (
//             <div className='slide_list_container'>
//                 <ul className="index_slide_table01_list_size">
//                     <li>
//                         <div className="item_info">
//                             <span>
//                                 <Link to={`/DetailPage/${id}`}>
//                                     <img className="item_info_img" src={image} alt={title} />
//                                 </Link>
//                             </span>
//                             <span className="item_info_box">
//                                 <div className="item_info_box_name">
//                                     <Link to='/'>
//                                         <h3>{title}</h3>
//                                     </Link>
//                                 </div>
//                                 <p className="item_info_box_price"
//                                     style={{ textDecoration: salePer ? 'line-through' : 'none' }}>
//                                     {/* salePer 유무에 따라 라인쓰루 여부 결정 */}
//                                     {price ? `${price.toLocaleString("ko")}원` : ''}
//                                 </p>
//                                 <p className="item_info_box_discount">{salePer ? `${salePer}% 할인` : ''}</p>
//                                 {/* salePer 유무에 따라 할인율 노출 여부 결정 */}

//                                 <p className="item_info_box_discount_price"
//                                     style={{ display: salePer ? 'block' : 'none' }}>
//                                     {/* salePer 유무에 따라 할인가격 노출 여부 결정 */}

//                                     {(price - (price * salePer) / 100).toLocaleString("ko")}원
//                                     {/* 할인율에 따른 가격변화를 위한 식 */}
//                                 </p>
//                             </span>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         )
//     }

//     return (
//         <div className="index_main_section">
//             <div className="slide_item">
//                 {recommend_filter.map((book_data, index) => (
//                     <Slide_item
//                         key={index}
//                         id={book_data.id}
//                         image={book_data.image}
//                         title={book_data.title}
//                         price={book_data.price}
//                         salePer={book_data.salePer}
//                     />
//                 ))}
//                 {/* book_data에 할당된 useContext(List_context)를 map()메서드로 하나씩 꺼내서 새 배열로 정의
//                     새 배열의 객체는 key, image, title, price, salePer */}
//             </div>
//         </div>
//     );
// }

// // 도서용품
// function BookItem() {
//     const book_item_data = useContext(book_list_context);
//     const book_item_filter = book_item_data.filter((item) => {
//         return item.type == 'item';
//     })

//     const Slide_item = ({ image, title, price, salePer, id }) => {
//         return (
//             <div className='slide_list_container'>
//                 <ul className="index_slide_table01_list_size">
//                     <li>
//                         <div className="item_info">
//                             <span>
//                                 <Link to={`/DetailPage/${id}`}>
//                                     <img className="item_info_img" src={image} alt={title} />
//                                 </Link>
//                             </span>
//                             <span className="item_info_box">
//                                 <div className="item_info_box_name">
//                                     <Link to='/'>
//                                         <h3>{title}</h3>
//                                     </Link>
//                                 </div>
//                                 <p className="item_info_box_price"
//                                     style={{ textDecoration: salePer ? 'line-through' : 'none' }}>
//                                     {/* salePer 유무에 따라 라인쓰루 여부 결정 */}
//                                     {price.toLocaleString("ko")}원
//                                 </p>
//                                 <p className="item_info_box_discount">{salePer ? `${salePer}% 할인` : ''}</p>
//                                 {/* salePer 유무에 따라 할인율 노출 여부 결정 */}

//                                 <p className="item_info_box_discount_price"
//                                     style={{ display: salePer ? 'block' : 'none' }}>
//                                     {/* salePer 유무에 따라 할인가격 노출 여부 결정 */}

//                                     {(price - (price * salePer) / 100).toLocaleString("ko")}원
//                                     {/* 할인율에 따른 가격변화를 위한 식 */}
//                                 </p>
//                             </span>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         )
//     }

//     return (
//         <div className="index_main_section">
//             <div className='book_item'>
//                 <span className='book_item_title'>도서용품</span>
//             </div>
//             <hr className='book_item_title_hr' />
//             <div className="slide_item">
//                 {book_item_filter.map((book_item_data, index) => (
//                     <Slide_item
//                         key={index}
//                         id={book_item_data.id}
//                         image={book_item_data.image}
//                         title={book_item_data.title}
//                         price={book_item_data.price}
//                         salePer={book_item_data.salePer}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export { SlideItemBestSeller, SlideItemSteadySeller, RecommendBook, BookItem };