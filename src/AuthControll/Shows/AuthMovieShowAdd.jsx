import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";
import AdminNavBar from "../../Component/NavBar/AdminNavBar";
import AdminFooter from "../../Component/Footer/AdminFooter";

export default function AddShowMovies(){

    const[addmovies,setmovies] = useState({
        movie:"",
        showdate:""

    })

    const [addshow,setshow] = useState("")

    const theatreid = localStorage.getItem("theatreid");
    const theatrename = localStorage.getItem("theatrename");


    const HandelAddShow =async (x)=>{
        x.preventDefault();

    const [hoursStr, minutesStr] = addshow.split(":");
        
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours < 10 ? "0" + hours : hours;
    
    const formattedTime = `${formattedHours}:${minutesStr} ${ampm}`; // e.g., "03:30 PM"

    const ShowData = {
        showtime: formattedTime,
        showdate:addmovies.showdate
    };

        await axios.post("http://localhost:8080/Shows/addshows",ShowData,{ params:{
            tname:theatrename,
            mname:addmovies.movie,
            tid:theatreid
        }} )
        .then((res)=>{
            if(res.status === 200){
                 alert(res.data)    
                 setmovies({
                    movie:"",
                    theatre:"",
                     showdate:""
                 })
                 setshow("")
            }else{
                alert(res.data)
            }
        })
        .catch((err)=>{
            console.log(err)
            console.error("Backend Error Details:", err.response?.data);
            alert("Server Error")
        })
    }

    return<>
      <AdminNavBar/>
    <div className="show-addmovie-container">
        <div className="show-movieadd-box">
            <h1>Add Movies</h1>
            <div className="show-movieadd">

                <form onSubmit={HandelAddShow}>

                    <div className="show-movieadd-input">
                        <label>Movie Name</label>
                        <input type="text" placeholder="Enter Movie Name" 
                        value={addmovies.movie}
                        onChange={(e)=>{setmovies({...addmovies, movie:e.target.value})}} />
                    </div>

                    <div className="show-movieadd-input">
                        <label>Theatre Name</label>
                        <input type="text" placeholder="Enter Your Theatre Name" 
                        value={theatrename}
                        readOnly
                         />
                    </div>

                    <div className="show-movieadd-input">
                        <label>Show Date</label>
                        <input type="date" value={addmovies.showdate} 
                        onChange={(e)=>{setmovies({...addmovies, showdate:e.target.value})}}/>
                    </div>

                    <div className="show-movieadd-input">
                        <label>Show Time</label>
                        <input type="time" 
                        value={addshow}
                        onChange={(e)=>{setshow(e.target.value)}}/>
                    </div>

                    <div className="show-movieadd-input">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>

<AdminFooter/>
  
    </>
}