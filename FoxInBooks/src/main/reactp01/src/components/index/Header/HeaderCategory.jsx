import { Link, useNavigate } from "react-router-dom";


function HeaderCategory() {
    const nav = useNavigate();

    return (
        <div className="headerCategory">
            <button onClick={() => nav('/ProductListPage')}>도서판매</button>
            <button onClick={() => nav('/BestSellerPage')}>베스트셀러</button>
            <button onClick={() => nav('/ItemPage')}>도서용품</button>
            <button onClick={() => nav('/CouponPage')}>쿠폰</button>
        </div>
    );
}

export default HeaderCategory;

{/* <ul className="header_maincategory_list">
                    <li className="header_maincategory_menu_category">
                        <Link to="/ProductListPage">도서판매</Link>
                    </li>
                    <li className="header_maincategory_menu_category">
                        <Link to='/BestSellerPage'>베스트 셀러</Link>
                    </li>
                    <li className="header_maincategory_menu_category">
                        <Link to='/ItemPage'>도서용품</Link>
                    </li>
                    <li className="header_maincategory_menu_category">
                        <Link to='/CouponPage'>쿠폰</Link>
                    </li>
                </ul> */}