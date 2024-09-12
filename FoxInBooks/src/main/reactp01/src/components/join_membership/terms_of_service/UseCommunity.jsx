import './Terms_of_service.css';

function UseCommunity({ isOpen, onClose, handleSingleCheck, checkboxId }) {
    if (!isOpen) {
        return null;
    }

    const agree = () => {
        handleSingleCheck(true, checkboxId);
        onClose();
    }

    const notAgree = () => {
        handleSingleCheck(false, checkboxId);
        onClose();
    }

    return (
        <div className="terms_of_service">
            <div className='terms_of_service_popup_content'>
                <div className='terms_of_service_index d-flex'>
                    <img src="img/fox_logo.png" alt="terms_of_service_logo" className='terms_of_service_logo' />
                    <h1 className='terms_of_service_index_text'>커뮤니티 이용약관</h1>
                </div>
                <div className='terms_of_service_head'>
                    <h2>제 1장</h2>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 1조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 2조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 3조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                </div>
                <div className='terms_of_service_head'>
                    <h2>제 2장</h2>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 4조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                </div>
                <div className='terms_of_service_head'>
                    <h2>제 3장</h2>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 5조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 6조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                    <div>
                        <div className='terms_of_service_head_sub'>
                            제 7조
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                        <div className='terms_of_service_main'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque numquam repellendus est ipsam quos reiciendis laboriosam! Maxime vel atque, delectus, veniam soluta possimus ipsum adipisci eum quasi, ipsam deleniti quam!
                        </div>
                    </div>
                </div>
                <div className='terms_of_service_button_container d-flex'>
                    <button onClick={agree} className='terms_of_service_agree_button'>동의</button>
                    <button onClick={notAgree} className='terms_of_service_notAgree_button'>미동의</button>
                </div>
            </div>
        </div>
    );
}

export default UseCommunity;