
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";

export default function AddTheatre() {
    const navigate = useNavigate();
    const [theatre, settheatre] = useState({
        theatername: "",
        theaterlocation: "",
        totalseats: ""
    });

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

        await axios.post("http://localhost:8080/theatre/addTheatre", theatre, { params: { userId: userid } })
            .then((res) => {
                alert(res.data.message);
                localStorage.setItem("theatreid", res.data.theatreid); 
                localStorage.setItem("theatrename", res.data.theatrename); 
                
                settheatre({
                    theatername: "",
                    theaterlocation: "",
                    totalseats: ""
                });

                navigate("/addshow");
            })
            
            .catch((err) => {
                console.error("Axios Error Details:", err);
                alert("Server Error - Check backend terminal logs");
            });
    };



    return <>
    
        <NavBar/>


        <div className="add-theatre-container">
            <div className="add-theatre-box">
                <h1>Add Theatre</h1>

                <div className="add-theatre">
                    <form onSubmit={HandelAddTheatre}>

                        <div className="add-theatre-details">
                            <label>Theatre Name</label>
                            <input
                                type="text"
                                name="theatername"
                                placeholder="Enter Your Theatre Name"
                                value={theatre.theatername || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="add-theatre-details">
                            <label>Theatre Location</label>
                            <input
                                type="text"
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
                                name="totalseats"
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

        <Footer/>
    </>
}