import React, { useState } from 'react';
import '../LoginComponents/login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import apiService from '../ApiServices/ApiServices';


export const Login = ({ setIsAuthenticated }) => {

    const [MastName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            apiService.post('/User/Login', { MastName, password, }
            ).then((response) => {
                if (response.data && response.data.Token) {
                    sessionStorage.setItem("EmployeeId", response.data.EmployeeId);
                    sessionStorage.setItem("EmployeeName", response.data.EmployeeName);
                    sessionStorage.setItem("Token", response.data.Token);
                    sessionStorage.setItem('Usercode', response.data.MastCode);
                    sessionStorage.setItem('RoleCode', response.data.RoleCode);
                    sessionStorage.setItem('isAuthenticated', "true");
                    setIsAuthenticated(true);
                    navigate('/DashBoard');
                } else {
                    alert('Invalid username or password');
                    throw error;
                }
            });

        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <>
            <div className='main-wrapper'>
                <div className='Wrapper1'>
                    <form action='' onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type='text' placeholder='UserName' value={MastName} onChange={handleUsernameChange} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='Password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
                            <FaLock className='icon' />
                        </div>
                        <div className="remember-forget">
                            <label ><input type='checkbox' /> Remember Me </label>
                            <a href='#' >Forgot Password?</a>
                        </div>
                        <button type='submit'>Login</button>
                        <div className="register-link">
                            <p>Don't Have  an Account? <a href='/register'>Register</a></p>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
};
export default Login;
