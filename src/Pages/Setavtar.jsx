import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import "./setavatar.css"
import { setavtar } from '../Utils/APIRoutes';


const SetAvatar = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
    } , [])


    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = Buffer.from(response.data, 'utf-8');
                    data.push(buffer.toString('base64'));   
                }
                console.log("Fetched avatars data:", data);
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching avatars:", error);
            }
        };

        fetchAvatars();
    }, []);

    const handleAvatarSelection = (index , avtar) => {
        console.log(index,avtar)
        setSelectedAvatar(avtar);
       
    };

    const handleavtarsubmit = async ()=>{
        
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        console.log( selectedAvatar)
        const {data} = await axios.post(`${setavtar}/${user._id}`, {
            image :  selectedAvatar,
            

        })

        console.log("this is the avtar" , data)

        if(data.isSet){ 
            user.isavtarimageset = true ;
            user.avtarimage = data.iamge;
            localStorage.setItem("chat-app-user", JSON.stringify(user));
            navigate('/')
        }

    }

    return (
        <div>
            <div className='title-container'>
                <h1>Pick an avatar as your profile</h1>
                <div className="avatars-container" style={{display:"flex" , justifyContent:"center"}}>
                    {!isLoading && avatars.map((avatar, index) => (
                        <div 
                            key={index}
                            className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`}
                            onClick={() => handleAvatarSelection(index , avatar)}
                        >
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt={`Avatar ${index}`}  style={{height:"120px"}} />
                        </div>
                    ))}
                   
                </div>
                <button onClick={handleavtarsubmit}>select</button>
            </div>
        </div>
    );
};

export default SetAvatar;
