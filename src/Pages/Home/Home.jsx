import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../Component/NavBar/NavBar";
import { useContext } from "react";
import { useUser } from "../../Component/Context/Usercontext";
import Footer from "../../Component/Footer/Footer";
import Loading from "../../Component/Loading/Loading";


const Locationcontex = createContext(null);

const Location = function Location() {

    const [isvisible,setvisible] = useState(false)
    const[templocation,settemplocation] = useState("Coimbature")
    const [location, setlocation] = useState("Coimbature")
    const{username} = useUser();

    const HandelLocationSearch = ()=>{
        setlocation(templocation.trim());
        setvisible(!isvisible)
    }

    const HandelVisible = ()=>{
        setvisible(!isvisible)
    }


    return <>
    
        <div className="location-container">

            <div className="locations" style={{display:isvisible? "block" : "none"}}>
                <input type="text" value={templocation} onChange={(e) => { settemplocation(e.target.value) }} />
                <button onClick={HandelLocationSearch}>Search</button>
            </div>
            <div className="search-show">
                <p>{location}</p>
                 <li onClick={HandelVisible}><i class="fa-solid fa-location-dot"></i></li>
            </div>
           
        </div>


        <Locationcontex.Provider value={{location}}>
            <CoomingSoon />
            <LatestMovies />
        </Locationcontex.Provider>
    </>





}

const LatestMovies = function Latest() {

    const navigate = useNavigate();
    const [latestdata, setlatestData] = useState([]);
    const [message, setmessage] = useState("")
    const{location} = useContext(Locationcontex);
    const [err,seterr]= useState("");
    const [loading,setloading] = useState(false);

    useEffect(() => {

        seterr("")
        setloading(true)
        axios.get(`http://localhost:8080/home/latestmovies/${location}`)

            .then((res) => {
                if (Array.isArray(res.data)) {
                    setlatestData(res.data)
                    setmessage("")
                } else {
                    setlatestData([])
                    setmessage(res.data)
                }

            })
            .catch((err) => {
                console.log("LatestRelease")
                console.log(err.response?.data?.message);
                seterr(err.response?.data?.message)

            })
            .finally(()=>{
                setloading(false)
            });


    }, [location]);



    return <>

        <div className="latest-movies-container">

            <div className="latest-movies-header">
                <h2>Latest Movies </h2>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
            {loading && <h3>Loading....</h3>}
           {!loading && message && <h3>{message}</h3>}
           {!loading && err && <h3>{err}</h3>}

            <div className="latest-movies-box">

                {!loading && latestdata.map((x, index) => (
                    <div key={x.movieid || index} className="latest-movie" >

                        <img src={`data:${x.imgtype};base64,${x.imgdata}`}
                            alt={x.moviename} onClick={() => { navigate(`/moviedetails/${x.movieid}`) }} />

                        <div className="Latest-Movie-Footer">

                            <div className="movie-tittle">
                                <h4>{x.moviename}</h4>
                            </div>

                            <div className="sub-content">
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>{x.movieduration}</p>
                            </div>

                            <div className="sub-content">
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                </svg>{x.moviegenre}</p>
                            </div>

                            <div className="sub-content">
                                <p><i class="fa-regular fa-calendar"></i>{x.releasedate}</p>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>

    </>

}





const CoomingSoon = function CoomingSoon() {
    const navigate = useNavigate();

    const [comming, setcomming] = useState([])
    const [mesage, setmessage] = useState("")
    const{location} = useContext(Locationcontex);
    const[err,seterr] = useState("")
    const[loading,setloading] = useState(false)

    useEffect(() => {
        seterr("")
        setloading(true)
        axios.get(`http://localhost:8080/home/commingsoon/${location}`)

            .then((res) => {

                if (Array.isArray(res.data)) {
                    setcomming(res.data)
                    setmessage("")
                } else {

                    // console.log("commingSoon response:"+res.data)
                    setcomming([]);
                    setmessage(res.data)

                }

            })

            .catch((err) => {
                console.log(err.response?.data?.message)
                console.log("CommingSoon")
                seterr(err.response?.data?.message)
            })
            .finally(()=>{
                setloading(false)
            })

    }, [location])

    return <>

        <div className="latest-movies-container">

            <div className="latest-movies-header">
                <h2>Comming Soon </h2>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
            {loading && <h3>Loading....</h3>}
            {!loading && mesage && <h3>{mesage}</h3>}
            {!loading && err && <h3>{err}</h3>}

            <div className="latest-movies-box">

                {!Loading && comming.map((x, index) => (

                    <div key={x.movieid || index} className="latest-movie">

                        <img src={`data:${x.imgtype};base64,${x.imgdata}`}
                            alt={x.moviename} onClick={() => { navigate(`/moviedetails/${x.movieid}`) }} />


                        <div className="Latest-Movie-Footer">

                            <div className="movie-tittle">
                                <h4>{x.moviename}</h4>
                            </div>

                            <div className="sub-content">
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>{x.movieduration}</p>
                            </div>

                            <div className="sub-content">
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                </svg>{x.moviegenre}</p>
                            </div>

                            <div className="sub-content">
                                <p><i class="fa-regular fa-calendar"></i>{x.releasedate}</p>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>

    </>

}




export default function Home() {
    return <>
        <NavBar />
        <Location/>
        <Footer/>
    </>

}