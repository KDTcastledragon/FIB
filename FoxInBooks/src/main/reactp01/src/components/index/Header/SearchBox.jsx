import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    // 엔터키를 눌렀을때, handleSearch() 함수 실행되게 설정
    const enter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    // 데이터배열에서 title, writer, compiler, type중에
    //  setSearch(e.target.value) (검색어) 일치하는 내용을 찾는다.
    const handleSearch = () => {
        if (search.trim() !== '') {
            navigate(`/SearchResultPage?search=${encodeURIComponent(search)}`);
        }
        console.log("검색시 검색어 : " + search);
    }

    return (
        <div className="header_searchbox">
            <input className="book_searchBox"
                type="text"
                placeholder="검색어를 입력해주세요"
                value={search}
                onChange={changeSearch}
                onKeyDown={enter} />
            <img className="search_img"
                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
                alt="검색하기"
                onClick={handleSearch} />
        </div>
    );
}

export default SearchBox;


// import React, { useContext, useState } from "react";
// import { book_list_context } from "../../Data/ProductOriginData_context";
// import { useNavigate } from "react-router-dom";

// function SearchBox() {
//     const search_list = useContext(book_list_context);
//     const navigate = useNavigate();
//     const [search, setSearch] = useState('');

//     const changeSearch = (e) => {
//         setSearch(e.target.value);
//     }

//     // 엔터키를 눌렀을때, handleSearch() 함수 실행되게 설정
//     const enter = (e) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     }
//     // 데이터배열에서 title, writer, compiler, type중에
//     //  setSearch(e.target.value) (검색어) 일치하는 내용을 찾는다.
//     const handleSearch = () => {
//         const searchResults = search_list.filter((item) =>
//             (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
//             (item.writer && item.writer.toLowerCase().includes(search.toLowerCase())) ||
//             (item.compiler && item.compiler.toLowerCase().includes(search.toLowerCase())) ||
//             (item.type && item.type.toLowerCase().includes(search.toLowerCase())) ||
//             (item.name && item.name.toLowerCase().includes(search.toLowerCase()))
//         )
//             .map((item) => ({
//                 id: item.id,
//                 title: item.title,
//                 writer: item.writer,
//                 image: item.image,
//                 price: item.price,
//                 salePer: item.salePer,
//                 name: item.name
//             }));

//             console.log(searchResults);
        
//             localStorage.setItem("searchResults", JSON.stringify(searchResults));
//         // 로컬스토리지 사용방법.
//         // localStorage.setItem("키(네이밍)", 값) = 공식
//         navigate(`/SearchResultPage?search=${encodeURIComponent(search)}`);
//         // console.log('현재 서치박스 페이지' + searchResults[0]);
//     }

//     return (
//         <div className="header_searchbox">
//             <input className="book_searchBox"
//                 type="text"
//                 placeholder="검색어를 입력해주세요"
//                 value={search}
//                 onChange={changeSearch}
//                 onKeyDown={enter} />
//             <img className="search_img"
//                 src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
//                 alt="검색하기"
//                 onClick={handleSearch} />
//         </div>
//     );
// }

// export default SearchBox;