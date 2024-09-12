import { Routes, Route } from "react-router-dom";
import CustomerServiceCategory from "./CustomerServicePage/CustomerServiceCategory";

function CustomerService() {
    return (
        <div>
            <Routes>
                <Route path='/CustomerServiceCategory/*' element={<CustomerServiceCategory />}></Route>
            </Routes>
        </div>
    );
}

export default CustomerService;