import { useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import axios from "axios";
import Footer from "../../Component/Footer/Footer";

export default function DeleteMovie(){

    const[deletemovie,setdeletemovie] = useState("");


    const HandelDelete = async (x)=>{
        x.preventDefault();



     if(confirm("You Want To Delete Movie")){

        console.log("Promise Accesed")

        const response = await axios.delete("http://localhost:8080/movies/deletemovie",{data:{deletemovie}})
            .then((res)=>{
            alert(res.data)

        })
        .catch((err)=>console.log(err))
        
    } else{
        console.log("conform Promise Decline")
    }
}


    return<>
    <NavBar/>

    <div className="delete-container">
        <div className="delete-box">
            <h1>Delete Movie</h1>
            <div className="delete-input">

                <form onSubmit={HandelDelete}>
                <label>Movie Tittle</label>
                <input type="text" placeholder="Which Movie Want To Remove!......" 
                value={deletemovie.moviename}
                onChange={(e)=>{setdeletemovie(e.target.value)}}/>

                <button type="submit">Delete Now</button>
                </form>

            </div>
        </div>
    </div>

    <Footer/>
    </>


}