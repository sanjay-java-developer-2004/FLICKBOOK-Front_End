
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import axios from "axios";
import Footer from "../../Component/Footer/Footer";
import Loading from "../../Component/Loading/Loading";

export default function MovieShows() {

    const { movieid } = useParams();
    const navigate = useNavigate();

    const [date, setdate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [theatres, setTheatres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");




    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };



    useEffect(() => {
        setError("")
        setLoading(true)

        const fetchShows = async () => {
            try {
                setTheatres([])
                const res = await axios.get(
                    `http://localhost:8080/Shows/getshows/${movieid}/shows`,
                    { params: { date } }
                );

                console.log("API Response:", res.data);
                setTheatres(res.data);

            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message)

            }
            finally {
                setLoading(false)
            }
        };

        fetchShows();
    }, [movieid, date]);



    return (
        <>
            <NavBar />


            {loading && <Loading/>}

            <div className="shows-container">
                <div className="shows-content">
                    <h1>Shows Available</h1>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setdate(e.target.value)}
                    />


                    {error && (
                        <div style={{ color: '#FFD700', padding: '10px', margin: '10px 0' }}>
                             {error}
                        </div>
                    )}

                    {theatres.map((theatre) => (

                        <div
                            className="available-theatres"
                            key={theatre.TheatreId}>
                            <h3>
                                {theatre.TheatreName} -
                                <small>{theatre.Location}</small>
                            </h3>

                            <div className="available-shows">
                                {theatre.Shows.map((show) => (

                                    <div key={show.ShowID}>
                                        <button className="show-time-btn" onClick={(e) => { navigate(`/showSeats/${show.ShowID}`) }}>{formatTime(show.ShowTimings)}</button>
                                    </div>

                                ))}
                            </div>

                            <hr className="theatre-divider" />
                        </div>

                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}