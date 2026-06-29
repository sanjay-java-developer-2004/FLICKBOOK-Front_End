import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const navigate = useNavigate();
    const [searchkey, setsearchkey] = useState("");
    const [moviedata, setmoviedata] = useState([]);
    const [thatredata, settheatredata] = useState([]);
    const [errormsg, seterrormsg] = useState("")



    const HandelSearch = async () => {

        console.log(searchkey)

        if (!searchkey.trim()) {
            setmoviedata([]);
            settheatredata([]);
            return;
        }

        await axios.get("http://localhost:8080/home/search", { params: { keyword: searchkey.trim() } })
            .then((res) => {

                setmoviedata(res.data.movies || []);
                settheatredata(res.data.theatres || []);
                seterrormsg(res.data.message);
                setsearchkey("")

            })
            .catch((err) => {
                console.error(err)
                setsearchkey("")
            })

    }

    const HandelCancelSearch = () => {
        navigate(-1);
    }


    const groupedmovies = thatredata.reduce((acc, show) => {

        const moviename = show.movie.moviename;

        if (!acc[moviename]) {
            acc[moviename] = [];
        }

        acc[moviename].push(show)
        return acc;
    }, {})


    console.log("movie" + moviedata)
    console.log("theatre" + thatredata)


    return <>
        <div className="search-container">
            <div className="search-box">

                <div className="search">
                    <input type="text" placeholder="Search Something!......." value={searchkey}
                        onChange={(e) => { setsearchkey(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                HandelSearch();
                            }
                        }} />
                    <div className="cancel-search" onClick={HandelCancelSearch}>
                        <li><i class="fa-solid fa-x"></i></li>
                    </div>

                </div>


            </div>

            <div className="response-containers">
                <h4>{errormsg}</h4>

                {moviedata.length > 0 && (<>

                    <h3>Movie</h3>

                    {moviedata.map((movieitem) => (


                        <div key={movieitem.movieid}>

                            <div className="search-movieresponse-container">
                                <img src={`data:${movieitem.imgtype};base64,${movieitem.imgdata}`}
                                    alt={movieitem.moviename} onClick={() => { navigate(`/moviedetails/${movieitem.movieid}`) }} />

                                <div className="search-Latest-Movie-Footer">

                                    <div className="search-movie-tittle">
                                        <h4>{movieitem.moviename}</h4>
                                    </div>

                                    <div className="search-sub-content">
                                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                        </svg>{movieitem.movieduration}</p>
                                    </div>

                                    <div className="search-sub-content">
                                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                        </svg>{movieitem.moviegenre}</p>
                                    </div>

                                    <div className="search-sub-content">
                                        <p><i class="fa-regular fa-calendar"></i>{movieitem.releasedate}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}


                </>)}



                {thatredata.length > 0 && (<>

                    <h3>Theatre</h3>
                    <div className="theatreresponse">
                        <h2>{thatredata[0]?.theatre?.theatername}</h2>

                        {Object.entries(groupedmovies).map(([movieName, shows]) => (

                            <div key={movieName}>

                                <img
                                    src={`data:${shows[0].movie.imgtype};base64,${shows[0].movie.imgdata}`}
                                    alt={movieName}
                                    width="120"
                                />

                                {/* <h3>{movieName}</h3>
                                 <h4>{shows[0].showdate}</h4>
                                {shows.map((show) => (

                                    <div key={show.showid}>
                                       
                                        <button>{show.showtime}</button>

                                    </div>

                                ))} */}

                                {/* Stacked block for name and date */}
                                <div className="movie-info-block">
                                    <h3>{movieName}</h3>
                                    <h4>{shows[0]?.showdate}</h4>
                                </div>

                                {/* Group container for showtime buttons */}
                                <div className="showtimes-block">
                                    {shows.map((show) => (
                                        <div key={show.showid}>
                                            <button onClick={(e)=>{navigate(`/showSeats/${show.showid}`)}}>{show.showtime}</button>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        ))}
                    </div>
                </>)}


            </div>
        </div>
    </>
}