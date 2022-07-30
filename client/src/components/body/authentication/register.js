import React, {useState} from 'react'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import image from './sunsetman.png';
import logo from './logo.png';
import "./register.css"

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="regis_page">
            <form className="regis-form" onSubmit={handleSubmit}>

                    <h1>Sign up with Algo-Rhythm</h1>
                    <input type="text" placeholder="Username" id="name"
                    value={name} name="name" onChange={handleChangeInput} />


                    <input type="text" placeholder="Email Address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />

                    <input type="password" placeholder="Password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />


                    <input type="password" placeholder="Confirm password" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput} />
                
                <div className='registererror'>{err && showErrMsg(err)}</div>
                <div className='registererror'>{success && showSuccessMsg(success)}</div>

                    <button  type="submit">Register</button>
                    <p className='logg'>Have an account?<a href='/login'> Sign in!</a></p>
            </form>
        </div>
    )
}

export default Register
