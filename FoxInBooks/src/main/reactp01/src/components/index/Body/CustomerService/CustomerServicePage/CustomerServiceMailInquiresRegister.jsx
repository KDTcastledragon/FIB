import axios from 'axios';
import './CustomerServiceMailInquires.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CustomerServiceMailInquiresRegister() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inquiryRegisterButton, setInquiryRegisterButton] = useState(true); // 등록하기 버튼 활성화 관리

    // 로그인 정보에서 user id를 받아온다
    const loginInfo = JSON.parse(sessionStorage.getItem('user'));
    const userId = loginInfo ? loginInfo.id : null;

    const buttonDisabled = () => {
        // 문의유형 & 제목 & 내용 모두 작성시 -> Button(disabled) = abled로 전환
        category != "" && title.length > 0 && content.length > 0 && !"" ? setInquiryRegisterButton(false) : setInquiryRegisterButton(true);
    };

    useEffect(() => {
        buttonDisabled();
    });

    function handleButtonClick(e) {
        e.preventDefault(); // submit 이벤트의 기본 동작을 막기

        let inquiryData = new FormData(document.getElementById("inquiryRegister"));

        axios.post('/test/userInquiryRegister', inquiryData, {
            headers: { 'Content-Type': 'multipart/form-data' }

        })
            .then((response) => {
                alert(response.data);
                navigate("/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresMyList");
            })
            .catch((err) => {
                alert("~~ 시스템 오류, 잠시후 다시하세요 => " + err.message);
            });
    }

    return (
        <div className='customer_service_mail_inquires'>
            <h2 className="inquires">1:1 문의하기</h2>
            <div className="mail_inquires">
                <div className='inquires_category'>
                    <span>
                        <Link to="/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresMyList">내 문의 내역</Link>
                    </span>
                </div>
                <form action="/test/userInquiryRegister" encType="multipart/form-data" id='inquiryRegister' method='post'>
                    <figure>
                        <figcaption></figcaption>
                        <table className='mail_inquires_tabel'>
                            <tbody>
                                <tr>
                                    <th className='inquires_list'>회원 ID</th>
                                    <td>
                                        <input className='inquires_userid' type='text' name='id' id='id' value={userId} readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="inquires_list">문의 유형 </th>
                                    <td>
                                        <select className='inquries_select' name='category' id='inquires_select' value={category} onChange={(e) => setCategory(e.target.value)} required="required">
                                            <option value="" >질문분류 선택</option>
                                            <option value="일반">일반</option>
                                            <option value="제품">제품</option>
                                            <option value="주문&#47;결제">주문 &#47; 결제</option>
                                            <option value="반품&#47;환불&#47;취소">반품 &#47; 환불 &#47; 취소</option>
                                            <option value="이벤트&#47;쿠폰">이벤트 &#47; 쿠폰</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="inquires_list">제목</th>
                                    <td>
                                        <input className='inquires_title' type='text' name='title' id='inquires_title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="inquires_list">문의 내용</th>
                                    <td>
                                        <textarea className='inquires_content' name="content" id="content" cols="80" rows="10" value={content} onChange={(e) => setContent(e.target.value)} required />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="add_file">첨부파일</th>
                                    <td>
                                        <input className="file_upload" placeholder="첨부파일" readOnly />
                                        <label className='file' htmlFor="attached_file">파일찾기</label>
                                        <input className='file_found' type="file" name='inquiry_upload_file' id="attached_file" accept="png, jpeg, jpg" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="component_btn">
                            <button className="btn_submit" type="submit" id="btnsubmit" onClick={handleButtonClick} disabled={inquiryRegisterButton}>등록하기</button>
                            <button className="btn_cencel" type="reset" id="btncencel">취소하기</button>
                        </div >
                    </figure>
                </form>
            </div>
        </div>
    );
}

export default CustomerServiceMailInquiresRegister;