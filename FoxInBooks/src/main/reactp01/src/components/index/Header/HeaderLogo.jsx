import { Link } from "react-router-dom";

function HeaderLogo() {
    return (
        <div>
            <Link to='/'>
                <h1 className="logo" />
            </Link>
        </div>
    );
}

export default HeaderLogo;