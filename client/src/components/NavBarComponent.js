import { Link, withRouter } from 'react-router-dom';
import { getUsername, logOut } from '../services/authorize';

const NavbarComponent = (props) => {



    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">MAIN</Link>
                </li>
                {
                    getUsername() &&
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link to="/create" className="nav-link">CREATE BLOG</Link>
                    </li>
                }
                {
                    !getUsername() &&
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link to="/login" className="nav-link">LOG IN</Link>
                    </li>
                }
                {
                    getUsername() &&
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <button className="nav-link" onClick={() => logOut(() => props.history.push("/"))}>LOG OUT</button>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default withRouter(NavbarComponent);