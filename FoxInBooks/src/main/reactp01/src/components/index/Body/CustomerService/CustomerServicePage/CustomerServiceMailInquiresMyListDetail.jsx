import './CustomerServiceMailInquires.css';
import { useLocation, Link } from 'react-router-dom';

function CustomerServiceMailInquiresMyListDetail() {

    const location = useLocation();
    const inquiryMyList = location.state;
    const myInquiryNum = location.state.num;
    const inquiryCode = location.state.inquiry_code;
    const inquiryTitle = location.state.inquiry_title;
    const inquiryAnswer = location.state.inquiry_answer;
    const inquiryContent = location.state.inquiry_content;

    // 답변내용 인사말
    const answerIntro = "안녕하세요. 여우책방입니다. 문의주신 내용의 답변입니다.";

    console.log("state inquiryMyList 확인 : " + inquiryMyList);
    console.log("myInquiryNum 확인 : " + myInquiryNum);
    console.log("inquiryCode 확인 : " + inquiryCode);

    return (
        <div className='customer_service_mail_inquires'>
            <h2 className="inquires">내 문의 내역</h2>
            <div className="customer_service_mail_inquires_category">
                <div className='inquires_category'>
                    <span>
                        <Link to="/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresMyList">내 문의 내역</Link>
                    </span>
                    <span>
                        <Link to='/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresRegister'>1:1 문의하기</Link>
                    </span>
                </div>
                <div className='my_inquiry_list_one'>
                    <div className='my_inquiry_title'>
                        {inquiryTitle}
                    </div>
                    <div className='my_inquiry_content'>
                        {inquiryContent}
                    </div>
                    {inquiryAnswer &&
                        <div className='my_inquiry_answer_container'>
                            <p className='inquiry_answer_intro'>{answerIntro}</p>
                            <br />
                            <p className='my_inquiry_answer_content'>{inquiryAnswer}</p>
                            <br />
                            <p className='iquiry_answer_end'>
                                여우책방에 많은 관심과 애정을 보내주셔서 감사드립니다.<br />
                                다른 궁금증 및 문제점이 있을 경우 언제라도 문의해주시기 바랍니다.<br />
                                항상 노력하는 여우책방이 되겠습니다.<br />
                                감사합니다.
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CustomerServiceMailInquiresMyListDetail;