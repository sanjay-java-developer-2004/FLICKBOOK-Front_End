import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer/Footer";
import { useUser } from "../../Component/Context/Usercontext";

export default function MovieDetails(){

    const navigate = useNavigate();
    const {movieid} = useParams();
    const[movie , setmovie] = useState("");
    const role = localStorage.getItem("role");

     console.log("role is ",role)


    useEffect(()=>{
        axios.get(`http://localhost:8080/movies/getmovie/${movieid}`)
        .then((res)=>{
            setmovie(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[movieid])



    const HandelNavigate = ()=>{
        console.log(role)

        if(role === "Admin"){
            navigate('/addshow')
        }else{
            navigate(`/TheatresAndShow/${movieid}`)
        }


    }

   return<>

   <NavBar/>

     <div className="moviedetails-container">

      <div className="moviedetails">
        
         <div className="details">

             <img  src={`data:${movie.imgtype};base64,${movie.imgdata}`}
                alt={movie.moviename} />

             <div className="tittle-contant">
                <h2>{movie.moviename}</h2>
                <h6>{movie.movieduration}</h6>
                <h6>{movie.releasedate}</h6>
             </div>

             <div className="other-details">
              <h5>Movie Genre : {movie.moviegenre}</h5>
              <h5>Censor Certificate : {movie.censorcertificate}</h5>
              <h5>Language : {movie.movielanguage}</h5> 
             </div>

                <div className="oneline-story">
                    <h5>Storyline</h5>
                    <p>{movie.onelinestory} </p>
                </div>
            
             <div className="btn-details">
                 <button onClick={HandelNavigate}>{role === "Admin" ? "Add Show" : "Show Theatre"}</button>
             </div>

            </div>
             
       </div>
    </div>
    <Footer/>
   </>
}