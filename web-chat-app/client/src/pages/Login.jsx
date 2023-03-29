import { BsFillPersonFill,BsLockFill,BsArrowRight } from "react-icons/bs"
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })

    const toastProps = {
        className: "custom-toast",
        draggable: false,
        autoClose: 7000,
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
    };

    useEffect( () => {
        if (localStorage.getItem('react-chat-user')){
            navigate("/");
        }
    }, []);

    function handleChange(e){
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        if (validate()){
            const {username, password} = userInfo;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
            },{
                withCredentials: true,
              });
            if (data.status === false){
                toast.warning("Username/Password invalid");
                console.log(data.msg);
            }
            if (data.status === true){
                localStorage.setItem('react-chat-user', JSON.stringify({username:data.username,_id:data._id}));
                navigate("/");
            }
        }else{
            console.log("Could not login user");
        }
    }

    function validate(){
        const {username, password} = userInfo;
        if (username === ""){
            toast.warning('The username field cannot be empty', toastProps);
            return false;
        }
        if (password === "" ){
            toast.warning('The password field cannot be empty', toastProps);
            return false;
        }
        return true;
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
            <ToastContainer/>
        </div>
    )
}