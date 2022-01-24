import React, { useEffect, useRef, useState } from 'react'
import './LandingPage.css'
import tenthepres2 from './assets/tenthepres2.svg'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'

export default function LandingPage() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(usernameRef.current.value, passwordRef.current.value)
            navigate("/overview")
        } catch {
            setError('Failed to Login')
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        if(currentUser){
            navigate("/overview");
        }
    }, [])

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
                        {error && <alert>{error}</alert>}
                    </div>
                    <div className='LoginFormContainer'>
                        <form onSubmit = {handleSubmit}>
                            <div className='UsernameForm'>
                                <label>USERNAME</label>
                                <input type="text" ref={usernameRef} required></input>
                            </div>
                            <div className='PasswordForm'>
                                <label>PASSWORD</label>
                                <input type="password" ref={passwordRef} required></input>
                            </div>
                            <div className='befLoginButt'>
                                <Link to='#'>Forgot Password ?</Link>
                            </div>
                            <div className='LoginButt'>
                                <input disabled={loading} type="submit" value="Login"></input>
                            </div>
                            <div className='afterLoginButt'>
                                Have a troble with logging in ? &nbsp;<Link to='#'>Contact us</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
