import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './DetailPageReview.css';
import DetailPageReviewCon from './detailPageReivew/DetailPageReviewCon';
import { ReactComponent as Star } from './review_star.svg';

function DetailPageReview({ oneProductWriterJoin }) {

    const { product_code, id } = oneProductWriterJoin;

    const loginID = sessionStorage.getItem("loginID");

    // 별점 =========================================================
    // 별점 선택
    const [click_count, setClick_count] = useState(6);

    const onClick_star = (index_number) => {
        setClick_count(index_number);
    }

    // 별점 값 계산
    const star_count = 6 - click_count;

    // 리뷰 내용 받아오기
    const [review, setReview] = useState([]);

    useEffect(() => {
        axios.post('/restreview/reviewList')
            .then((response) => {
                const reviewFilter = response.data.filter(item => item.product_code === product_code);
                setReview(reviewFilter);
            }).catch((err) => {
                alert(`리뷰 내용을 가져오지 못했습니다. (${err.message})`);
            });
    }, [product_code]);

    // 리뷰 등록 ============================================================
    // 리뷰 내용 작성
    const [review_content, setReview_content] = useState('');

    const onChange_review_content = (e) => {
        setReview_content(e.target.value);
    }

    // 현재 날짜 생성
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const today = `${year}-${month}-${day}`;

    // 리뷰 등록 버튼 클릭 --------------------------
    // 로그인 전
    const reviewLoginCheck = () => {
        alert('로그인 후 이용 가능합니다.');
        window.location.href = `/LogIn`;
    }

    // 로그인 후
    const review_ref = useRef();

    // 상품 구매 여부
    const [orderCheck, setOrderCheck] = useState(0);

    useEffect(() => {
        if (product_code !== undefined) {
            axios.get(`/mpdetail/mpordercheck?id=${loginID}&product_code=${product_code}`
            ).then((response) => {
                setOrderCheck(response.data);
            }).catch((err) => {
                alert(`상품 구매 여부를 확인하지 못했습니다. (${err.message})`);
            });
        }
    }, [product_code]);

    //  리뷰 등록한 아이디 존재 여부
    const [reviewCheck, setReviewCheck] = useState(false);

    useEffect(() => {
        for (const r of review) {
            if (r.id === loginID) {
                setReviewCheck(true);
            }
        }
    }, [review]);

    // 선택한 리뷰 이미지 미리보기
    const handleImageChange = (e) => {
        // 선택한 파일 가져오기
        const selectedFile = e.target.files[0];

        // 파일이 선택되었는지 확인하고 미리보기를 보여주기
        if (selectedFile) {
            // FileReader 객체 생성
            const reader = new FileReader();

            // 이미지 읽기가 완료되면 실행될 콜백 함수
            reader.onloadend = () => {
                // 미리보기 이미지 상태 업데이트
                document.getElementById('imgSelected').src = reader.result;
            };

            // FileReader를 사용하여 선택된 이미지 읽기 시작
            reader.readAsDataURL(selectedFile);
        }
    };

    const review_insert = () => {

        if (orderCheck !== 0) {
            alert('구매한 상품에 대해서만 리뷰 등록이 가능합니다.');
        } else {
            if (reviewCheck) {
                alert('이미 등록된 리뷰가 있습니다.');
            } else {
                if (click_count >= 6) {
                    alert('별점을 선택해 주세요~');
                } else {
                    if (!review_content) {
                        review_ref.current.focus();
                        alert('리뷰 내용을 작성해 주세요~');
                    } else {
                        const review_formData = new FormData(document.getElementById('review_form'));

                        axios.post(
                            '/restreview/reviewinsert',
                            review_formData,
                            {
                                headers: { 'Content-Type': 'multipart/form-data' }
                            }
                        ).then((response) => {
                            alert('리뷰가 등록되었습니다.');
                            window.location.href = `/DetailPage/${product_code}`;
                        }).catch((err) => {
                            alert(`리뷰 등록에 실패했습니다. (${err.message})`);
                        });
                    }
                }
            }
        }
    }

    // 리뷰 수정 버튼 클릭
    // const onClick_review_update = (num) => {

    // }

    // 리뷰 삭제 버튼 클릭
    const onClick_review_delete = (num) => {

        axios.post(
            '/restreview/reviewdelete',
            {
                review_code: num,
                product_code: product_code
            })
            .then((response) => {
                alert('리뷰가 삭제되었습니다.');
                window.location.href = `/DetailPage/${product_code}`;
            })
            .catch((err) => {
                alert(`리뷰 삭제에 실패했습니다. (${err.message})`);
            });

    }

    return (
        <div className="review">
            <form id="review_form" encType="multipart/form-data" method="post">

                <input type="hidden" name="product_code" value={product_code} />
                <input type="hidden" name="id" value={loginID} />
                <input type="hidden" name="regdate" value={today} />

                <div className="review_box d-flex">
                    <div className="review_L">리뷰</div>
                    <div className="review_write">
                        <div className="review_star_cover">
                            <span className="review_star">
                                {
                                    [1, 2, 3, 4, 5].map((index) => (
                                        <Star key={index}
                                            className={`star${index >= click_count ? '_select' : ''}`}
                                            onClick={() => { onClick_star(index) }}
                                        />
                                    ))
                                }
                            </span>
                            <input type="hidden" name="star_count" value={star_count} />
                        </div>
                        <div className="review_note_cover d-flex">
                            <div className="review_note">
                                <textarea
                                    ref={review_ref}
                                    name="content"
                                    value={review_content}
                                    onChange={onChange_review_content}
                                    className="review_note_01"
                                    placeholder="500자 이내 작성 가능"
                                    maxLength="500"
                                />
                            </div>
                            <div className="review_image_cover">
                                <img src="../img/review_basic_image.png" id="imgSelected" />
                                {/* accept : 입력된 확장자가 아닐 경우에 업로드를 하지 못하게 해줌. */}
                                <label htmlFor="reviewImageUploadfile">사진첨부</label>
                                <input type="file"
                                    name="reviewImageUploadfile"
                                    id="reviewImageUploadfile"
                                    accept='.jpg, .png'
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="review_btn_cover">
                                {
                                    loginID == null ?
                                        <button type="button" className="review_btn" onClick={reviewLoginCheck}>등록</button>
                                        :
                                        <button type="button" className="review_btn" onClick={review_insert}>등록</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="review_con_box">
                    {review.map((it, index) =>
                    (<DetailPageReviewCon key={index} {...it}
                        // onClick_review_update={onClick_review_update}
                        onClick_review_delete={onClick_review_delete} />
                    )
                    )}
                </div>
            </form>
        </div>
    );
}

export default DetailPageReview;