import './RecentSideBarItem.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const RecentSideBarItem = (props) => {

    return (
        <div className='RecentSideBarItemContainer'>
            <div>
                <Link to={`/DetailPage/${props.pcode}`}>
                    <img src={`../img/${props.image}`} alt="image" className='RecentSideBarItemImage' />
                </Link>

            </div>

            <div className='recentSideBarTitlePrice'>
                <Link to={`/DetailPage/${props.pcode}`}>
                    <div className='basket_preview_item_title'>{props.title}</div>
                </Link>

                <span className='basket_preview_item_price'>{props.price.toLocaleString()} 원</span>
            </div>
        </div >
    );
};

export default RecentSideBarItem;