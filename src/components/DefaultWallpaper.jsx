import React, { useState } from 'react';
import JokeModel from '../utils/JokeModel';
import axios from 'axios';

const DefaultWallpaper = ({userRole}) => {
    const [openJoke,setOpenJoke] = useState(false);
    const [joke,setJoke] = useState("");
    const handleCloseZoke = ()=>{
        setOpenJoke(!openJoke);
        setJoke("");
    }
    
    const handleClick = (e)=>{
        e.preventDefault();
        if(userRole!=="USER"){
            setOpenJoke(!openJoke);
            genarateZoke();
            return;
        }
        console.log("Clicked")
    }

    const genarateZoke = async()=>{
        const data = await axios.get(import.meta.env.VITE_APP_JOKE_API_URI);
        setJoke(data.data.value);
    }
    return (
        <div className={`${userRole === "USER" ? "w-[100%] p-4" : "w-3/4 relative bg-[#f0f2f5]"}`}>
            <div className={`${userRole==="USER"?"gap-0":"gap-20"} flex flex-col justify-center items-center md:py-8`}>
                <img
                    src='/defaultWallpaper.png'
                    alt='Background'
                    className='mx-auto sm:w-[35%]  my-auto mt-36 lg:mt-0 md:mt-36'
                />
                <div className="flex justify-center items-center flex-col">
                    <button 
                        className='bg-[#00d920] px-4 py-2 rounded-lg text-white font-medium shadow-md'
                        type={`${userRole==="USER"?"submit":""}`}
                        onClick={handleClick}
                    >Get Started</button>
                    <div className="flex flex-col">
                    <p className='text-center text-gray-500 text-base mt-4'>
                        Alex Solutions: Where One Supporter Meets Many Clients
                    </p>
                    <p className='text-center text-gray-500 text-sm mt-4'>
                        Sponsored by Alexander
                    </p>
                    </div>
                </div>
            </div>
            {
                openJoke && (
                    <JokeModel joke={joke} alert={openJoke} setAlert={handleCloseZoke}/>
                )
            }
        </div>
    );
};

export default DefaultWallpaper;