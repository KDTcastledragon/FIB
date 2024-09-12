import './DetailPageReviewCon.css';
import ReviewImgModal from './ReviewImgModal';
import { ReactComponent as Star } from './review_star.svg';

function DetailPageReviewCon({ review_code, product_code, id, star_count, regdate, content, image, onClick_review_delete }) {

    const loginID = sessionStorage.getItem("loginID");

    return (
        <>
            <hr className='DetailPage_line' />

            <div className="review_con_01 d-flex">
                <div className="review_con_01_L">
                    <span className="review_con_star">
                        {
                            [1, 2, 3, 4, 5].map((index) => (
                                <Star key={index} className={`star_index${index <= star_count ? '_count_selected' : ''}`} />
                            ))
                        }
                    </span>
                </div>
                <div className="review_con_01_R">
                    <div className="review_user_info d-flex">
                        <span>
                            <span className="review_user_name">{id}</span>
                            <span className="review_date">{new Date(regdate).toLocaleDateString()}</span>
                        </span>
                        <span>

                            {
                                loginID !== id ?
                                    ''
                                    :
                                    <span className="review_delete_btn_box">
                                        {/* <button type="button" className='review_delete_btn' onClick={() => onClick_review_update(review_code)}>수정</button> &#124; */}
                                        <button type="button" className='review_delete_btn' onClick={() => onClick_review_delete(review_code)}>삭제</button>
                                    </span>
                            }

                        </span>
                    </div>
                    <div className="review_con_cover d-flex">
                        <span className="review_con">{content}</span>
                        <span>
                            {
                                image !== '' ?
                                    // <img className="review_con_img" src={`../img/${image}`} />
                                    <ReviewImgModal image={image} />
                                    :
                                    ''
                            }
                        </span>
                    </div>
                </div>
            </div >
        </>
    );
}

export default DetailPageReviewCon;