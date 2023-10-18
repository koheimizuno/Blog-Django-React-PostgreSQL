import React, {useState} from "react"; 
import axios from "axios";
import API_BASE_URL from "../../config";

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${API_BASE_URL}/api/password_reset`, {email});
            setSuccess(true)
        }catch(error){
            if(error.response.status === 400){
                const errorData = error.response.data;
                console.log(errorData)
                if(errorData.email){
                    setError(`${errorData.email[0]}`)
                }
                
            }else{
                setError(error)
            }
            
        }

    }

    return(
        <div>
            {error && <div>{error}</div>}
            {success ? (<div>Password reset email sent. Check your inbox.</div>)
                     : (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input type="email" name="email" placeholder="Enter Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button type="submit">Reset Password</button>
                            </form>
                        </div>
                     )
            
            }
        </div>
    )
}

export default PasswordReset;