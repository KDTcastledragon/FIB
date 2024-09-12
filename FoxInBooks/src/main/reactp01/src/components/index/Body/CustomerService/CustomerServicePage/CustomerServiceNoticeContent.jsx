import './CustomerServiceNotice.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Index/IndexBody/Pagination';

function CustomerServiceNoticeContent({ search }) {

    // Server에서 공지사항 리스트 정보를 배열 형태로 받아오기
    const [noticeList, setNoticeList] = useState([]);
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [noResultMessage, setNoResultMessage] = useState('');

    // 페이지네이션
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit; // 데이터 시작 번호

    useEffect(() => {
        axios
            .get('/test/noticeList')
            .then((response) => {
                setNoticeList(response.data);  // 검색결과를 꺼내기위한 엄마데이터리스트
                setFilteredNotices(response.data) // 검색결과를 담아줄 바구니 

                // 내림차순 정렬
                response.data.sort((a, b) => b.notice_code - a.notice_code);

                // 단, 공지사항 화면 랜더링시 모든 리스트가 보여야 하므로 response.data를 담아줌
                console.log(`** checkdata 서버연결 성공 =>`, response.data);
            }).catch((err) => {
                alert(`** checkdata 서버연결 실패 => ${err.message}`);
            });
    }, []); // useEffect

    useEffect(() => {
        filterNotices(search, noticeList);
    }, [search, noticeList]);

    // 검색어와 일치하는 내용 filter
    const filterNotices = (search) => {
        const lowerKeyword = search ? search.toLowerCase() : '';
        const filtered = noticeList.filter((notice) =>
            notice.title.toLowerCase().includes(lowerKeyword) ||
            notice.content.toLowerCase().includes(lowerKeyword)
        );

        // 일치하는 내용들만 저장
        setFilteredNotices(filtered);
        console.log(`검색결과를 받았습니다 search : ${search}`);

        if (filtered.length === 0) {
            setNoResultMessage('검색 결과가 없습니다.');
        } else {
            setNoResultMessage('');
        }
    };

    // Server에서 받아온 배열형태의 정보를 객체 하나씩 꺼내기
    const Notice_item = ({ num, notice_code, category, title, content, view, regdate }) => {

        const handleView = () => {
            console.log('조회수) 공지사항 코드' + notice_code);
            console.log('조회수) 공지사항 조회수' + view);

            // 조회수 증가를 위해
            // 공지사항 디테일 이동 성공시 서버로 notice_code 요청 보내기
            axios.get(`/test/increaseView/${notice_code}`)
                .then(response => {
                    console.log('공지사항 정보 전달 성공! notice_code : ' + response.data);
                })
                .catch(error => {
                    console.error('공지사항 정보 전달 실패ㅠ.ㅠ :', error);
                });
        };

        return (
            <tr className='notice_item_tr'>
                <td>{num}</td>
                <td>{category}</td>
                <td className='notice_item_title'>
                    <Link to={`/CustomerServiceCategory/CustomerServiceNotice/CustomerServiceNoticeDetail/${num}`}
                        onClick={handleView}
                        state={{
                            noticeList: noticeList,
                            num: num,
                            notice_code: notice_code,
                            notice_category: category,
                            notice_title: title,
                            notice_view: view,
                            notice_regdate: regdate,
                            notice_content: content
                        }} >
                        {title}
                    </Link>
                </td>
                <td>{view}</td>
                <td>{regdate}</td>
            </tr>

        )
    } // Notice_item

    return (
        <div className="customer_service_notice1">
            <table className='notice_item'>
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>번호</th>
                        <th style={{ width: '10%' }}>분류</th>
                        <th style={{ width: '60%' }}>제목</th>
                        <th style={{ width: '10%' }}>조회수</th>
                        <th style={{ width: '10%' }}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 공지사항 클릭시 모든 공지사항 리스트가 보여야함. 그래서 첫 랜더링에 filteredNotices에 모든값을 담아둠  */}
                    {filteredNotices.map((notice, index) => (
                        <Notice_item
                            key={index}
                            num={filteredNotices.length - index} // 전체 리스트에서 현재 인덱스만큼 빼기
                            notice_code={notice.notice_code}
                            category={notice.category}
                            title={notice.title}
                            content={notice.content}
                            view={notice.view}
                            regdate={notice.regdate}
                            noticeList={noticeList}
                        />
                    ))}
                </tbody>
            </table>
            {/* 공지사항 검색어와 일치하는 항목이 없을 경우 */}
            {noResultMessage && <p>{noResultMessage}</p>}

            <Pagination
                total={filteredNotices.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default CustomerServiceNoticeContent;



// // 프론트엔드 프로젝트
// // import './CustomerServiceNotice.css';
// // import React, { useContext, useState } from 'react';
// // import { notice_list_context } from '../../../../Data/ProductOriginData_context';
// // // import CustomerServiceNoticeContent from './CustomerServiceNoticeContent';
// // import Modal from 'react-modal'



// // function CustomerServiceNotice() {
// //     const notice_list = useContext(notice_list_context);


// // const Notice_item = ({ logo, no, title, hits, createDate, content, image }) => {

// //     // useState를 사용해서 content의 open여부와 titleHits를 변할수 있게 세팅함.
// //     // content 기본 상태를 false로 설정해서 보이지 않게 해둠.
// //     const [contentOpen, setContentOpen] = useState(false);
// //     const [titleHits, setTitleHits] = useState(hits);

// //     const notice_list_click = () => {
// //         openModal();
// //         if (contentOpen == true) {
// //             // 이벤트핸들러가 작동할때, contentOpen의 상태가 true라면, false로 변경시키면서 titleHits의 증가는 안되도록 설정
// //             // 이해하기 쉽게 설명하자면,
// //             // 보여지고있다면(true) => 보이지않게(false) 작동하고, 조회수(titleHits)증가되지않도록 +0 세팅.
// //             setContentOpen(false);
// //             setTitleHits(titleHits + 0);
// //         } else {
// //             // contentOpen의 상태가 false라면, true로 변경시키면서 titleHits가 증가되도록 설정.
// //             // 보여지지않고있다면(false) => 보여지게(true) 작동하고, 조회수(titleHits)가 증가하도록 +1 세팅.
// //             setContentOpen(true);
// //             setTitleHits(titleHits + 1);
// //         }
// //         // if 조건문으로인해, content를 닫을때 불필요한 조회수 증가를 막을 수 있다.
// //     }

// //     const [isModalOpen, setIsModalOpen] = useState(false);

// //     const openModal = () => {
// //         setIsModalOpen(true);
// //     };

// //     const closeModal = () => {
// //         setIsModalOpen(false);
// //     };

// //     // 수정
// //     const notice_modalStyles = {
// //         content: {
// //             width: '800px',
// //             height: '500px',
// //             padding: '45px 0',
// //             border: '3px solid ',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -40%)'
// //         }
// //     };


// //     return (
// //         <>
// //             <tr>
// //                 <td className='notice_no'>{no}</td>
// //                 {/* <td className={`notice_title ${contentOpen ? 'notice_open': ''}`} onClick={notice_list_click}> */}
// //                 <td className={`notice_title ${contentOpen ? 'notice_content_open' : ''}`} onClick={notice_list_click}>
// //                     {title}
// //                 </td>
// //                 <td className='notice_date'>{createDate}</td>
// //                 <td className='notice_hits'>{titleHits}</td>
// //                 {/* titleHits의 초기값이 hits이기 때문에 onClick={titleClick}이 수행 될 때마다
// //                 titleHits값이 변하기 때문에 titleHits를 불러옴. */}
// //             </tr>
// //             <tr className='aa01'>
// //                 {contentOpen && <td colSpan={3} onClick={notice_list_click}>
// //                     <Modal
// //                         style={notice_modalStyles}
// //                         isOpen={isModalOpen}
// //                         onRequestClose={closeModal}
// //                         contentLabel="모달"
// //                     >
// //                         {/* <img className='notice_content_logo' src={logo} alt='logo'/> */}

// //                         {/* 모달창 내부 클릭시 닫히지 않게 설정 */}
// //                         <div onClick={(e) => e.stopPropagation()}>
// //                             <div className='notice_content_title'>{title}</div>
// //                             <hr />
// //                             {content.split('\n').map((content, index) => (
// //                                 <p key={index} className='notice_content'>{content}</p>
// //                             ))}
// //                             {image && <img className='notice_img' src={image} alt="Image" />}
// //                         </div>
// //                     </Modal>

// //                     {/* 객체속성에 image가 있으면 image영역을 차지하면서 image를 보여주고,
// //                     없으면, 영역조차 차지하지않게 설정. */}
// //                 </td>}
// //             </tr>
// //         </>
// //     )
// // }

// //     return (
// //         <div className="customer_service_notice1">
// //             <div className="notice_list">
// //                 <h2 className="notice">공 지 사 항</h2>
// //                 <table className='notice_item'>
// //                     <thead>
// //                         <tr>
// //                             <th>번호</th>
// //                             <th>제목</th>
// //                             <th>작성일</th>
// //                             <th>조회수</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {notice_list.map((notice, index) => (
// //                             <Notice_item
// //                                 key={index}
// //                                 logo={notice.logo}
// //                                 no={notice.id}
// //                                 title={notice.title}
// //                                 createDate={notice.createDate}
// //                                 hits={notice.hits}
// //                                 content={notice.content}
// //                                 image={notice.image}
// //                             />
// //                         ))}
// //                     </tbody>
// //                 </table>

// //             </div>
// //         </div>
// //     );
// // }

// // export default CustomerServiceNotice;
