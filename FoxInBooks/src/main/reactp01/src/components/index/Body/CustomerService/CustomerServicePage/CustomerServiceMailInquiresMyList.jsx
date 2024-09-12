import axios from 'axios';
import './CustomerServiceMailInquires.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '../../Index/IndexBody/Pagination';

function CustomerServiceMailInquiresMyList() {
    const [myInquiryList, setMyInquiryList] = useState([]);
    const navigate = useNavigate();

    // 페이지네이션
    const [limit, setLimit] = useState(7);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit; // 데이터 시작 번호

    useEffect(() => {
        const loginInfo = JSON.parse(sessionStorage.getItem('user'));
        const id = loginInfo ? loginInfo.id : null;

        if (id) {
            axios
                .get(`/test/inquiryList?id=${id}`)
                .then((response) => {
                    setMyInquiryList(response.data.content);

                    // 최근 문의내역이 위로오도록 내림차순 정렬
                    myInquiryList.sort((a, b) => b.inquiry_code - a.inquiry_code);

                    console.log(`1:1문의 리스트 받아오기 성공 : `, response.data);
                }).catch((err) => {
                    alert(`1:1문의 리스트 받아오기 실패 => ${err.message}`);
                });
        }
    }, []);

    const MyInquiry_list = ({ num, inquiry_code, category, title, content, answer_check, answer, regdate }) => {
        return (
            <tr className='my_inquiry_list'>
                <td>{num}</td>
                <td>{category}</td>
                <td className='my_inquiry_list_title'>
                    <Link to={`/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresMyListDetail/${num}`}
                        state={{
                            num: num,
                            inquiry_code: inquiry_code,
                            inquiry_category: category,
                            inquiry_title: title,
                            inquiry_answer_check: answer_check,
                            inquiry_answer: answer,
                            inquiry_regdate: regdate,
                            inquiry_content: content
                        }} >
                        {title}
                    </Link>
                </td>
                <td>{answer_check == 1 ? "O" : " X "}</td>
                <td>{regdate}</td>
            </tr>
        );
    }

    const InquiryClick = () => {
        const loginInfo = JSON.parse(sessionStorage.getItem('user'));
        if (!loginInfo) {
            // Redirect to login page if not logged in
            alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
            navigate('/LogIn'); // Replace with your login page path
        } else {
            // Handle the logic for clicking on "1:1 문의하기"
            // For example, navigate to the 1:1 문의 등록 페이지
            navigate('/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresRegister');
        }
    };

    return (
        <div className='customer_service_mail_inquires'>
            <h2 className="inquires">내 문의 내역</h2>
            <div className="customer_service_mail_inquires_category">
                <div className='inquires_category'>
                    <span>
                        <Link to="/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresMyList">내 문의 내역</Link>
                    </span>
                    <span>
                        {/* <Link to='/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresRegister'>1:1 문의하기</Link> */}
                        <a onClick={InquiryClick}>1:1 문의하기</a>
                    </span>
                </div>
                <table className='my_inquiry_container'>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>번호</th>
                            <th style={{ width: '10%' }}>분류</th>
                            <th style={{ width: '60%' }}>제목</th>
                            <th style={{ width: '10%' }}>답변여부</th>
                            <th style={{ width: '10%' }}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myInquiryList.map((inquiry, index) => (
                            <MyInquiry_list
                                key={index}
                                num={myInquiryList.length - index}
                                inquiry_code={inquiry.inquiry_code}
                                category={inquiry.category}
                                title={inquiry.title}
                                content={inquiry.content}
                                answer_check={inquiry.answer_check}
                                answer={inquiry.answer}
                                regdate={inquiry.regdate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                total={myInquiryList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default CustomerServiceMailInquiresMyList;