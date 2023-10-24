import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({authenticated, children}) => {
    const navigate = useNavigate()
    
    
    useEffect(() => {
        if(!authenticated){
            navigate('/login') // Redirect to the login page if not authenticated
        }
    }, [authenticated, navigate])
    
        
    
    
    return (
        authenticated ? children : null
    )
}

export default PrivateRoutes;