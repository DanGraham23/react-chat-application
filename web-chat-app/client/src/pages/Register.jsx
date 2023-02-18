import {BsArrowRight, BsEnvelopeFill, BsFillPersonFill, BsLockFill} from 'react-icons/bs';
import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register(){
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    function handleChange() {

    }

    return (
        <div className="register-container">
            <h1>Welcome!</h1>
            <h2>Enter your information to register</h2>
            <form className="register-form">
                <div className="form-input">
                    <BsFillPersonFill/>
                    <input 
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-input">
                    <BsEnvelopeFill/>
                    <input 
                    className="form-input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-input">
                    <BsLockFill/>
                    <input 
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-input">
                    <BsLockFill/>
                    <input 
                    className="form-input"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-input">
                    <BsArrowRight/>
                    <button 
                    className="form-btn form-input"
                    type="submit"
                    placeholder="Confirm Password"
                    ></button>
                </div>
                <span><Link to="/login">Press Here to Login Instead</Link></span>
            </form>
        </div>
    )
}