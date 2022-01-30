import React, {useState} from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function Sidebar() {
    const [click,setCick] = useState(false);
    const {logout} = useAuth();
    const handleClick = () => setCick(!click);
    console.log(click);

    return (<>
        <div className={click ? "sidebar active": "sidebar"}>
            <div className="logo-content">
                <div className="logo">
                    <div className="logo-name">qCovid</div>
                </div>
                <i className='bx bx-menu'id="btn" onClick={handleClick} ></i>
            </div>
            <ul className="nav-list">
                <li>
                    <Link to="/overview">
                        <i className='bx bx-pie-chart-alt'></i>
                        <span className="links-name">ภาพรวม</span>
                    </Link>
                    <span className="tooltip">ภาพรวม</span>
                </li>
                <li>
                    <Link to="/request">
                    <i className='bx bx-user-plus'></i>
                        <span className="links-name">คำขอการจอง</span>
                    </Link>
                    <span className="tooltip">คำขอการจอง</span>
                </li>
                <li>
                    <Link to="/patient">
                        <i className='bx bx-user' ></i>
                        <span className="links-name">รายชื่อผู้ป่วย</span>
                    </Link>
                    <span className="tooltip">รายชื่อผู้ป่วย</span>
                </li>
                <li>
                    <Link to="/setting">
                        <i className='bx bx-bed' ></i>
                        <span className="links-name">การตั้งค่า</span>
                    </Link>
                    <span className="tooltip">การตั้งค่า</span>
                </li>
            </ul>
            <div className="profile-content">
                <div className="profile" onClick={logout}>
                    <div className="profile-details">
                        <img src="https://scontent.fbkk22-8.fna.fbcdn.net/v/t39.30808-6/261256269_1261363854366821_1068976462874705248_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHD_8UxlDuQ2FZSBImY6WnX-IppSDmoivf4imlIOaiK9yY_moMpJmY_bm-A-z33HRFDNvSTzuEo63HeSJgeiXzt&_nc_ohc=qgOyG-XmXewAX8R371K&_nc_ht=scontent.fbkk22-8.fna&oh=00_AT8xSYl9-mLHGeArr9MhSlHjX534UkhdAX1ktdLgVInGBQ&oe=61C1CA62"/>
                        <div className="name-job">
                            <div className="name">Nattapon Howong</div>
                            <div className="job">Software Engineer</div>
                        </div>
                    </div>
                    <i className='bx bx-log-out' id="log-out"></i>
                </div>
            </div>
        </div>
    </>
        
    )
}

export default Sidebar
