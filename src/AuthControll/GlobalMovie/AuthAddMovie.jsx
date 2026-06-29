import axios from "axios";
import { useState } from "react"
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";

export default function AuthAddMovie() {
    const [moviedetails, setmoviedetails] = useState({

        moviename: "",
        movielanguage: "",
        movieduration: "",
        moviegenre: "",
        releasedate: "",
        censorcertificate: "",
        onelinestory: ""

    })

    const [moviefile, setmoviefile] = useState(null);


    const HandelSubmit = async (x) => {
        x.preventDefault();
      
    

        const formData = new FormData();

        formData.append("movie",
            new Blob([JSON.stringify(moviedetails)],
                { type: "application/json" })
        );

        formData.append("file", moviefile);
        try {
            const response = await axios.post("http://localhost:8080/movies/addmovie", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200) {
                alert(response.data)

                setmoviedetails({
                    moviename: "",
                    movielanguage: "",
                    movieduration: "",
                    moviegenre: "",
                    releasedate: "",
                    censorcertificate: "",
                    onelinestory: ""
                })
                setmoviefile(null);

            } else {
                alert(response.data)
            }
        }

        catch (err) {
            console.log(err);
            alert("Server Error")
        }

    }

    
    return <>
        <NavBar />

        <div className="add-container">


            <div className="add-contant">
                <h2>Add Movies</h2>

                <div className="add-details">


                    <form onSubmit={HandelSubmit}>

                        <div className="movies-contant">

                            <label>Tittle </label>
                            <input type="text" placeholder='Movie Name'
                                value={moviedetails.moviename}
                                onChange={(e) => setmoviedetails({ ...moviedetails, moviename: e.target.value })} />
                        </div>

                        <div className="movies-contant">
                            <label>Language</label>
                            <input type="text" placeholder='Movie Language'
                                value={moviedetails.movielanguage}
                                onChange={(e) => setmoviedetails({ ...moviedetails, movielanguage: e.target.value })} />
                        </div>

                        <div className="movies-contant">
                            <label>Duration</label>
                            <input type="text" placeholder='Movie Duration'
                                value={moviedetails.movieduration}
                                onChange={(e) => setmoviedetails({ ...moviedetails, movieduration: e.target.value })} />
                        </div>

                        <div className="movies-contant">
                            <label>Genre</label>
                            <input type="text" placeholder='Movie Genre'
                                value={moviedetails.moviegenre}
                                onChange={(e) => setmoviedetails({ ...moviedetails, moviegenre: e.target.value })} />
                        </div>

                        <div className="movies-contant">
                            <label>Release Date</label>
                            <input type="date" placeholder='Release Date'
                                value={moviedetails.releasedate}
                                onChange={(e) => setmoviedetails({ ...moviedetails, releasedate: e.target.value })} />
                        </div>

                        <div className="movies-contant">
                            <label>Censor Certificate</label>
                            <input type="text" placeholder="Censor Certificate"
                                value={moviedetails.censorcertificate}
                                onChange={(e) => setmoviedetails({ ...moviedetails, censorcertificate: e.target.value })} />
                        </div>

                        <div className="movies-contant">
                            <label>OneLine Story</label>
                            <input type="text" placeholder="OneLine Story"
                                value={moviedetails.onelinestory}
                                onChange={(e) => setmoviedetails({ ...moviedetails, onelinestory: e.target.value })} />
                        </div>



                        <div className="movies-contant-file">
                            <label>Movie Poster</label>

                            <input type="file"
                                onChange={(e) => setmoviefile(e.target.files[0])} 
                                id="movie-poster-upload" 
                                className="hidden-input-file"/>


                                <div className="upload-action-area">
                                {/* Intha label thaan button mathiri design panna ponom, ithai click panna file uploader varum */}
                                <label htmlFor="movie-poster-upload" className="custom-upload-btn">
                                    📁 Choose File
                                </label>
                                

                                {/* File name kaatuvatharkana span */}
                                <span className="file-status-text" style={{ color: moviefile ? "#28a745" : "#777" }}>
                                    {moviefile ? moviefile.name : "No file chosen"}
                                </span>
                            </div>
                        </div>



                        <div className="movies-contant-btn">
                            <button type="submit">Add Now</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>


       <Footer/>
      
    </>
}