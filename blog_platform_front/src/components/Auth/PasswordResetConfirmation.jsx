import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../../config";

const PasswordResetConfirmation = () => {
  const { uid, token } = useParams()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')

  const handlePasswordResetConfirmation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/password_reset/confirm/${uid}/${token}/`, {
        new_password1: password,
        new_password2: confirmPassword,
      });
      const responseData = response.data;
      if (response.status === 200) {
        // Password reset was successful
        alert(responseData.detail)
        setSuccess(responseData.detail);        
      } else {
        // Handle other status codes or error responses if needed
        console.log(responseData.detail);
      }
      setSuccess(true);
    } catch (error) {
      if(error.response){
        const errorData = error.response.data;
        console.error(errorData)
        if(errorData.errors){
          setError('Your password should contain at least 8 characters, including at least one letter (a-z or A-Z) and at least one number (0-9).')
        }else{
          setError(`${errorData.detail}`)
        }       
      }else{
        setError(error.message)
        console.error(error.message);
      }
      
    }
    
  };
  return (
    <div>      
      {success ? (
        <div>{success} Please navigate to the <Link to='/login'>Login Page</Link> to access your blog account.</div>
      ) : (
        <>
        {error && <div>{error}</div>}
        <form onSubmit={handlePasswordResetConfirmation}>
          <input
            type="password"
            name='password'
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name='confirmPassword'
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
        </>
      )}
    </div>
  );
};

export default PasswordResetConfirmation;
