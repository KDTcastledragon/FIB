import './CustomerServiceFaq.css';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerServiceFaqCategory from './CustomerServiceFaqCategory';


function CustomerServiceFaq() {

    return (
        <div className='customer_service_faq_list'>
            <h2 className='faq'> 자주하는 질문 BEST </h2>
            <div className='customer_service_faq_list_category'>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory" state={{ category: "" }} >전체</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/nomal" state={{ category: '일반' }} >일반</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqLogin" state={{ category: '로그인' }} >로그인/회원가입</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqProduct" state={{ category: '제품' }}>제품</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqOrder" state={{ category: '주문' }}>주문/결제</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqDelivery" state={{ category: '배송' }}>배송</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqCancell" state={{ category: '반품' }}>반품/환불/취소</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqEvent" state={{ category: '이벤트' }}>이벤트</Link>
                </span>
                <span>
                    <Link to="/CustomerServiceCategory/CustomerServiceFaq/CustomerServiceFaqCategory/FaqCoupon" state={{ category: '쿠폰' }}>쿠폰</Link>
                </span>
            </div>  
            <Routes>
                <Route path='/*' element={<CustomerServiceFaqCategory />}></Route>        
            </Routes>
        </div>
    );
}

export default CustomerServiceFaq;



// 프론트엔드 프로젝트
// import React, { useState } from 'react';
// import './CustomerServiceFaq.css';
// import { Link } from 'react-router-dom';


// function CustomerServiceFaq() {
//     const faq_list = [
//         {
//             question: '로그인에 실패합니다.',
//             answer: `아이디와 비밀번호를 다시 한번 정확히 입력해주세요.
//                     그래도 로그인에 실패한다면, 1:1 문의로 문의주시길 바랍니다.`

//         },
//         {
//             question: '회원가입중에 실명확인에서 오류가 발생합니다.',
//             answer: `고객님의 개인정보 보호와 안전한 쇼핑을 위해 가입 시 실명확인제를 실시하고 있습니다.
//                     실명확인(본인인증) 오류는 한국신용평가정보(주)에 본인의 주민등록번호와 이름이 등록되지 않아 발생하는 오류입니다.
//                     한국신용평가정보(주) (http://www.kisinfo.com) 고객센터로 문의하시어 고객님의 정보 등록 후 가입 진행하시면 됩니다.  `
//         },
//         {
//             question: '결제가 안됩니다.',
//             answer: '고객님 대표번호 1588-1588로 연락주시면 바로 해결 해드리겠습니다.'
//         },
//         {
//             question: '불면증 때문에 책을 읽어보려고 하는데, 추천할만한 책이 있나요?',
//             answer: '***을 추천 드립니다. 저도 읽고 있는데 잠이잘ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ'
//         },
//         {
//             question: '교환/환불은 어떻게 해야하나요.',
//             answer: '교환/환불 정책은 없습니다. 감사합니다.'
//         },
//         {
//             question: '배송이 너무 늦어요.',
//             answer: '1:1문의로 아이디와 주문번호를 보내주시면 확인 후 연락드리겠습니다.'
//         },
//         {
//             question: '책은 어떻게 읽어야 하나요.',
//             answer: '두 눈으로 잘 ~ 읽으시면 됩니다.'
//         },
//         {
//             question: '주문,결제를 완료 했는데 주문내역이 없어요.',
//             answer: '눈치 채셨나요..? 맞습니다.. 먹튀입니다.'
//         },
//         {
//             question: '마일리지는 어떻게 사용 할 수 있나요?',
//             answer: '마일리지 1만 포인트를 적립하시면 사용 하실 수 있습니다.'
//         },
//         {
//             question: '여기는 왜 이렇게 불친절 한가요.',
//             answer: '뭐가요. 어쩌라구요.'
//         }
//     ];
    
//     // 게시글 1개만 토글되는 코드인데 클릭몇번하면 반응이 밀림
//     const Faq_item = ({ id, question, answer }) => {
//         const [faqOpen, setFaqOpen] = useState(false);
//         // const faq_q_click = () => {
//         //     setFaqOpen(!faqOpen);
//         //     console.log(id);
//         // };

//         // faq_open 클래스가 있는지 확인하는 함수
//         const hasFaqOpenClass = (element) => {
//             return element.classList.contains('faq_open');
//         };

//         // onClick 이벤트 핸들러
//         const handleFaqClick = (event) => {
//             setFaqOpen(!faqOpen);
//             const clickedElement = event.currentTarget;

//             if (hasFaqOpenClass(clickedElement)) {
//                 // 클릭한 요소에 faq_open 클래스가 있으면 제거
//                 clickedElement.classList.remove('faq_open');
//             } else {
//                 // 클릭한 요소에 faq_open 클래스가 없으면 다른 요소들의 faq_open 클래스를 제거하고 클릭한 요소에 추가
//                 const faqItems = document.querySelectorAll('.faq_item');
//                 faqItems.forEach(item => item.classList.remove('faq_open'));
//                 clickedElement.classList.add('faq_open');
//             }
//         };

//         const [expandedId, setExpandedId] = useState(null);

//         // const handleTitleClick = (id) => {
//         //     if (expandedId === id) {
//         //         setExpandedId(null);
//         //     } else {
//         //         setExpandedId(id);
//         //     }
//         // };


//         return (
//             <div
//                 className={`faq_item ${faqOpen ? 'faq_open' : ''}`}
//                 onClick={handleFaqClick}>
//                 <div className='faq_q'>{question}</div>
//                 {faqOpen && <div className='faq_a'>{answer}</div>}
//             </div>
//         );
//     };

    

//     return (
//         <div className='customer_service_faq_list'>
//             <h2 className='faq'> 자주하는 질문 BEST </h2>
//             {faq_list.map((faq, index) => (
//                 <Faq_item key={index} id={index} question={faq.question} answer={faq.answer} />
//             ))}
//         </div>
//     );
// }

// export default CustomerServiceFaq;

