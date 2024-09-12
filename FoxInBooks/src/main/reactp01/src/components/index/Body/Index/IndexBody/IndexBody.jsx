
import Popup from "./Popup";
import BigSlide from "./BigSlide";
import SideButton from '../../../../SideButton';
import { SlideItemBestSeller, SlideAllItem, BookItem } from "./ItemSlide";
import { DivisionBestSeller, DivisionAllItem } from "./Division";

function IndexBody() {

    return (
        <div className="index_body">
            {/* 구현되있으나 수정필요.. */}
            {/* <Popup></Popup> */}
            <BigSlide />

            <DivisionBestSeller />
            <SlideItemBestSeller />

            <DivisionAllItem />
            <SlideAllItem />

            <BookItem />

            <SideButton />
        </div>
    );
}

export default IndexBody;
