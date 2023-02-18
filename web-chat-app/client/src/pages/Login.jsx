import { BsFillPersonFill,BsLockFill,BsArrowRight } from "react-icons/bs"
import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })

    function handleChange(e){
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return (
        <div className="login-container">
            <h1>Welcome!</h1>
            <h2>Enter your information to login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <BsFillPersonFill className="form-icon"/>
                    <input 
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <BsLockFill className="form-icon"/>
                    <input 
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <BsArrowRight className="form-icon"/>
                    <button 
                    className="form-btn form-input"
                    type="submit"
                    >Login</button>
                </div>
                <span ><Link className="form-footer" to="/register">Press Here to Register Instead</Link></span>
            </form>
        </div>
    )
}