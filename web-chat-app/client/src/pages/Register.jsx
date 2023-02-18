import {BsArrowRight, BsEnvelopeFill, BsFillPersonFill, BsLockFill} from 'react-icons/bs';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(){
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const toastProps = {
        className: "custom-toast",
        autoClose: 7000,
        draggable: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
    };

    function handleChange(e){
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        if (validate()){

        }
    }

    function validate(){
        const {username, email, password, confirmPassword} = userInfo;
        if (username.length < 4){
            toast.warning('username must be atleast 4 characters', toastProps);
            return false;
        }
        if (email.length < 8){
            toast.warning('email must be atleast 8 characters', toastProps);
            return false;
        }
        if (password.length < 4){
            toast.warning('password must be atleast 4 characters', toastProps);
            return false;
        }
        if (password !== confirmPassword){
            toast.warning('passwords must match', toastProps);
            return false;
        }

        return true;
    }


    return (
        <div className="register-container">
            <h1>Welcome!</h1>
            <h2>Enter your information to register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
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
                    <BsEnvelopeFill className="form-icon"/>
                    <input 
                    className="form-input"
                    type="text"
                    placeholder="Email"
                    name="email"
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
                    <BsLockFill className="form-icon"/>
                    <input 
                    className="form-input"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <BsArrowRight className="form-icon"/>
                    <button 
                    className="form-btn form-input"
                    type="submit"
                    >Register</button>
                </div>
                <span ><Link className="form-footer" to="/login">Press Here to Login Instead</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}