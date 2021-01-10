import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../smschool_icon.png';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function NavbarContainer() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    // flip state
    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand mr-auto" to="/">
                Home
            </Link>
            <img src={logo} height="80" width="120"></img>

            <button
                className="navbar-toggler ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                onClick={handleNavCollapse}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* renders the nav bar according to the state */}
            <div
                className={`${
                    isNavCollapsed ? 'collapse' : ''
                } navbar-collapse`}
                id="navbarNav"
            >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/students">
                            Student Contacts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/questions">
                            Questions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sms">
                            SMS
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavbarContainer;
