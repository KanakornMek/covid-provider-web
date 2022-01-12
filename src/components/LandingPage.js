import React from 'react'
import './LandingPage.css'
import tenthepres2 from './assets/tenthepres2.svg'
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="colossal-box">
            <div className="LeftSideComponent">
                <div className="LeftHeroContainer">
                    <img src={tenthepres2} className="LeftLandingHero" />
                </div>
            </div>
            <div className='RightSideComponent'>
                <div className="RightHeroContainer">
                    <div className="LoginHeadContainer">
                        <h1 className="LoginText">LOGIN</h1>
                        <p className='LoginDesText'>Login and get in touch with your patient</p>
                    </div>
                    <div className='LoginFormContainer'>
                        <form>
                            <div className='UsernameForm'>
                                <label></label>
                                <input type="text" required></input>
                            </div>
                            <div className='PasswordForm'>
                                <label></label>
                                <input type="password" required></input>
                            </div>
                            <div className='befLoginButt'>
                                <Link to='#'>Forgot Password?</Link>
                            </div>
                            <div className='LoginButt'>
                                <input type="submit" value="Login"></input>
                            </div>
                            <div className='afterLoginButt'>
                                Have a troble with logging in? <Link to='#'>Contact us</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
