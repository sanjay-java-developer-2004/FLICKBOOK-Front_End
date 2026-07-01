import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import AdminNavBar from "../../Component/NavBar/AdminNavBar";
import NavBar from "../../Component/NavBar/NavBar";
import AdminFooter from "../../Component/Footer/AdminFooter";
import Footer from "../../Component/Footer/Footer";

export default function Movies() {
    const navigate = useNavigate();
    const [MoviesMap, setMoviesMap] = useState({});
    const [err, seterr] = useState("")
    const [loading, setloading] = useState(false)
    const role = localStorage.getItem("role")


    useEffect(() => {
        if (err) {
            const timer = setTimeout(() => {
                seterr("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [err]);


    useEffect(() => {
        seterr("")
        setloading(true)
        axios.get("http://localhost:8080/authControll/movies")
            .then((res) => {
                setMoviesMap(res.data)
            })
            .catch((err) => {
                console.log(err.response?.data?.message)
                seterr(err.response?.data?.message)

            })
            .finally(() => {
                setloading(false)
            })
    }, [])

    const categories = ["NEW_RELEASE", "COMMING_SOON", "RUNNING"];


    return <>

    {role === "Admin"? <AdminNavBar/>:<NavBar/>}

        {loading && (
            <Loading />
        )}
        {err && (
            <div className="Error-PopUp">
                <h6>{err}</h6>
            </div>
        )}
        <div className="auth-movie-container">
            <div className="auth-movie-box">
                {categories.map((Key, index) => (
                    <div className="auth-movie-contant" key={Key || index}>
                        <h2>{Key}</h2>

                        {Array.isArray(MoviesMap[Key]) ? (
                            <div className="auth-movies-grid">
                                {MoviesMap[Key].map((movie) => (

                                    <div key={movie.movieid} className="auth-movies"
                                        onClick={() => navigate(`/moviedetails/${movie.movieid}`)}>

                                        <div className="auth-movie-img">
                                            <img src={`data:${movie.imgtype};base64,${movie.imgdata}`}
                                                alt={movie.moviename} />
                                        </div>

                                        <div className="auth-movie-footer">

                                            <div className="auth-movie-sub-footer">
                                                <h3>{movie.moviename}</h3>
                                            </div>

                                            <div className="auth-movie-sub-footer">
                                                <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                                    </svg>
                                                    {movie.movieduration}
                                                </p>
                                            </div>

                                            <div className="auth-movie-sub-footer">
                                                <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                                    </svg>
                                                    {movie.moviegenre}
                                                </p>
                                            </div>

                                            <div className="auth-movie-sub-footer">
                                                <p>
                                                    <i className="fa-regular fa-calendar"></i>
                                                    {movie.releasedate}
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                ))}
                            </div>
                        ) : (
                            <h6>{MoviesMap[Key]}</h6>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {role === "Admin" ? <AdminFooter/>:<Footer/>}
    </>

}