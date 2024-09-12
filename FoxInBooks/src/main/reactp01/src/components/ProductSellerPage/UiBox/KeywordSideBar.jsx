import './KeywordSideBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function KeywordSideBar({ searchByOption }) {

    return (
        <div className='KeywordSideBarContainer'>
            <div className='KeywordDomesticDiv'>
                <div className='KeywordDomesticStandard'>국가별</div>

                {/* <button onClick={searchByOption()}>국내도서</button>

                <button onClick={english}>영/미도서</button>

                <button onClick={france}>프랑스도서</button>

                <button onClick={germany}>독일도서</button> */}

            </div>

            <div className='KeywordCategoryDiv'>
                <div className='KeywordCategoryStandard'>카테고리</div>
                {/* <button onClick={novel}>소설</button>

                <button onClick={poem}>시</button>

                <button onClick={essay}>에세이</button>

                <button onClick={magazine}>잡지</button> */}
            </div>


            <div className='KeywordGenreDiv'>
                <div className='KeywordGenreStandard'>장르</div>
                {/* <button onClick={fantasy}>판타지</button>

                <button onClick={melo}>멜로</button>

                <button onClick={detective}>추리</button>

                <button onClick={sf}>공상과학</button> */}
            </div>



        </div>
    );
}
export default KeywordSideBar;