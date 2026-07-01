import { useEffect, useState } from "react";
import { useUser } from "../../Component/Context/Usercontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";


export default function UserTickets() {

    const navigate = useNavigate();
    const [Tickets, setTickets] = useState([]);
    const userid = localStorage.getItem("userid")
    const [err, seterr] = useState("")
    const [loading,setloading] = useState(false)




    useEffect(() => {
        seterr("")
        setloading(true)
        const response = axios.get(`http://localhost:8080/Tickets/getTickets/${userid}`)
            .then((res) => {
                setTickets(res.data)
            })
            .catch((err) => {
                console.log(err.response?.data.message)
                seterr(err.response?.data?.message)
            })
            .finally(()=>{
                setloading(false)
            })
           
    }, [])

    console.log("userid : ", userid);

    return <>
       {loading && <Loading/>}

        <div className="User-Tickets_container">
            <h2>My Tickets</h2>
            <div className="user-ticket-box">
                {err && <h5>{err}</h5>}
                {!err && !loading && Tickets.map((ticket) => (
                    <div className="uset-tickets" key={ticket.TicketId}>
                        <div className="user-ticket-img">

                            <img src={`data:${ticket.ImgType};base64,${ticket.Poster}`} alt={ticket.Tittle}
                            />
                        </div>
                        <div className="user-ticket-footer" onClick={() => navigate(`/TicketView/${ticket.TicketId}`)}>
                            <div className="user-ticket-status">

                                <p className={ticket.TicketStatus === "Verified"
                                    ? "status-verified" : "status-not-verified"} >
                                    {ticket.TicketStatus}
                                </p>
                            </div>
                            <div className="user-tickets-details">
                                <h5>{ticket.Tittle}</h5>
                                <h6>{ticket.Theatre}</h6>
                                <p>{ticket.ShowDate}</p>
                                <p>{ticket.ShowTime}</p>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    </>

}