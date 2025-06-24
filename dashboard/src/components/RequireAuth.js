import react, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequireAuth ({children}){
    const [loading, setLodaing]= useState(true);
    const navigate= useNavigate();

    useEffect(()=>{
        axios.get("https:localhost:3002/me", {withCredentials: true}).then((res)=>{
            setLodaing(false);
        }).catch((e)=>{
            navigate("http://localhost:3000/login")
        })
    }, [])

    if (loading) return <p>Loading...</p>;

    return children;
}

export default RequireAuth;