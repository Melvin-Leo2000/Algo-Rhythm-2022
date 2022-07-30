import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import "./login.css"



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}


export default function Login() {
    const [user, setUser] = useState(initialState)

    //dispatch an action
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)


            dispatch(dispatchLogin())
            navigate("/main")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }



    return (
        <div className='login-page'>
            <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign in to Algo-Rhythm</h1>
            <div class="form_div">

                    <input type="text" placeholder="Email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                    <label htmlFor="password"></label>
                    <input type="password" placeholder="Password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />


                <div className='regiserror'>{err && showErrMsg(err)}</div>
                {success && showSuccessMsg(success)}
                    <button className='loginbutton' type="submit">Login</button>
                    <p className='regis'>Dont have any account? <a href='/register'>Sign up!</a></p>
                </div>
            </form>
        </div>
  )
}