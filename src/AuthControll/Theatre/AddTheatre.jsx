
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";
import AdminNavBar from "../../Component/NavBar/AdminNavBar";
import AdminFooter from "../../Component/Footer/AdminFooter";
import Loading from "../../Component/Loading/Loading";

export default function AddTheatre() {
    const navigate = useNavigate();
    const [err, seterr] = useState("")
    const [loading, setloading] = useState(false)
    const [response, setresponse] = useState("")

    const [theatre, settheatre] = useState({
        theatername: "",
        theaterlocation: "",
        totalseats: ""
    });


    useEffect(() => {
        if (err) {
            const timer = setTimeout(() => {
                seterr("");
            }, 5000);
            return () => clearTimeout(timer); // cleanup if Error changes again before 5s
        }
    }, [err]);

        useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                setresponse("");
            }, 5000);
            return () => clearTimeout(timer); // cleanup if Error changes again before 5s
        }
    }, [response]);

    const userid = localStorage.getItem("userid");
    const handleChange = (e) => {

        const { name, value } = e.target;

        settheatre((prevState) => ({
            ...prevState,
            [name]: name === "totalseats" ? Number(value) : value
        }));
    };

    const HandelAddTheatre = async (x) => {

        x.preventDefault();
        seterr("")
        setloading(true)
        setresponse("")

        await axios.post("http://localhost:8080/theatre/addTheatre", theatre, { params: { userId: userid } })
            .then((res) => {

                localStorage.setItem("theatreid", res.data.theatreid);
                localStorage.setItem("theatrename", res.data.theatrename);

                setresponse(res.data.message)
                console.log(res.data)

                settheatre({
                    theatername: "",
                    theaterlocation: "",
                    totalseats: ""
                });

                setTimeout(() => {
                      navigate("/addshow");
                }, 1000);
              
            })

            .catch((err) => {
                console.error("Axios Error Details:", err);
                console.log(err.response?.data?.message)
                seterr(err.response?.data?.message)
            })

            .finally(() => {
                setloading(false)
            })
    };



    return <>

        <AdminNavBar />
        {loading && (
            <Loading />
        )}
        {err && (
            <div className="Error-PopUp">
                <h6>{err}</h6>
            </div>
        )}

        {response && (
            <div className="Response-PopUp">
                <h6>{response}</h6>
            </div>
        )}

        <div className="add-theatre-container">
            <div className="add-theatre-box">
                <h1>Add Theatre</h1>

                <div className="add-theatre">
                    <form onSubmit={HandelAddTheatre}>

                        <div className="add-theatre-details">
                            <label>Theatre Name</label>
                            <input
                                type="text"
                                name="theatername" required
                                placeholder="Enter Your Theatre Name"
                                value={theatre.theatername || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="add-theatre-details">
                            <label>Theatre Location</label>
                            <input
                                type="text" required
                                name="theaterlocation"
                                placeholder="Enter Your Theatre Location"
                                value={theatre.theaterlocation || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="add-theatre-details">
                            <label>Total Seats Availability</label>
                            <input
                                type="number"
                                name="totalseats" required
                                placeholder="Enter Your Total Seats"
                                value={theatre.totalseats || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="add-theatre-details">
                            <button type="submit">Add Theatre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <AdminFooter />
    </>
}