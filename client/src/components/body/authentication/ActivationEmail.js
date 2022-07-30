import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import "./activation.css"
import successimage from "./verified.png"

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div className="active_page">
        <img className='successful' src={successimage} alt='successful' />
        <h1>Congratulations! Your account is now verified</h1>
        <h2>Proceed to sign in within 5 minutes and begin your journey with Algo-Rhythm</h2>

        <div className='verierror'>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        </div>
    )
}

export default ActivationEmail