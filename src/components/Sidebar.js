import React, {useState} from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'

function Sidebar() {
    const [click,setCick] = useState(false);
    const handleClick = () => setCick(!click);
    console.log(click);

    return (<>
        <div className={click ? "sidebar active": "sidebar"}>
            <div className="logo-content">
                <div className="logo">
                    <i class='bx bxl-meta' ></i>
                    <div className="logo-name">Meta</div>
                </div>
                <i class='bx bx-menu'id="btn" onClick={handleClick} ></i>
            </div>
            <ul class="nav-list">
                <li>
                    <Link to="/">
                        <i class='bx bx-pie-chart-alt'></i>
                        <span className="links-name">Overview</span>
                    </Link>
                    <span className="tooltip">Overview</span>
                </li>
                <li>
                    <Link to="/request">
                    <i class='bx bx-user-plus'></i>
                        <span className="links-name">Request</span>
                    </Link>
                    <span className="tooltip">Request</span>
                </li>
                <li>
                    <Link to="/patient">
                        <i class='bx bx-user' ></i>
                        <span className="links-name">Patient</span>
                    </Link>
                    <span className="tooltip">Patient</span>
                </li>
                <li>
                    <Link to="/setting">
                        <i class='bx bx-bed' ></i>
                        <span className="links-name">Setting</span>
                    </Link>
                    <span className="tooltip">Setting</span>
                </li>
                <li>
                    <Link to="/usermanager">
                        <i class='bx bxs-user'></i>
                        <span className="links-name">User Manager</span>
                    </Link>
                    <span className="tooltip">User Manager</span>
                </li>
            </ul>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-details">
                        <img src="https://scontent.fbkk22-8.fna.fbcdn.net/v/t39.30808-6/261256269_1261363854366821_1068976462874705248_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHD_8UxlDuQ2FZSBImY6WnX-IppSDmoivf4imlIOaiK9yY_moMpJmY_bm-A-z33HRFDNvSTzuEo63HeSJgeiXzt&_nc_ohc=qgOyG-XmXewAX8R371K&_nc_ht=scontent.fbkk22-8.fna&oh=00_AT8xSYl9-mLHGeArr9MhSlHjX534UkhdAX1ktdLgVInGBQ&oe=61C1CA62"/>
                        <div className="name-job">
                            <div className="name">Nattapon Howong</div>
                            <div className="job">Software Engineer</div>
                        </div>
                    </div>
                    <i class='bx bx-log-out' id="log-out"></i>
                </div>
            </div>
        </div>
    </>
        
    )
}

export default Sidebar
