import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";

export default function Tickets() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const ticket = state || JSON.parse(sessionStorage.getItem("ticketdata")); // this is your res.data map from backend


    if(!ticket){
        return<>
        <h3>No Ticket Data Founded</h3>
        </>
    }

    const HandelNavigate =()=>{
         navigate('/home')
    }

    return <>
    <NavBar/>

        <div className="tickets-container">
            <div className="tickets-box">
                <div className="ticket">

                    <div className="ticket-header">

                        <div className="ticket-status">
                            <h5>Ticket Status : {ticket?.TicketStatus}</h5>
                        </div>

                        <div className="ticket-sub-header">

                            <div className="ticket-img">
                                <img src={`data:${ticket?.Postertype};base64,${ticket?.Poster}`} alt={ticket?.Tittle} />
                            </div>

                            <div className="ticket-tittle">
                                <h4>{ticket?.Tittle}</h4>
                                <p>{ticket?.Duration}</p>
                                <p>{ticket?.Genere}</p>
                                <p>{ticket?.Censor}</p>
                            </div>

                        </div>


                    </div>

                    <div className="ticket-body">
                        <div className="ticket-show">
                            <h5>{ticket?.Showdate}</h5>
                            <h5>{ticket?.ShowTime}</h5>
                        </div>

                        <div className="seats">
                            <h5>Seats</h5>
                            <h5>{ticket?.Seats}</h5>
                        </div>
                    </div>

                    <div className="tickets-contant">

                        <div className="ticket-details-head">

                            <div className="theatre-locate">
                                <h5>{ticket?.TheatreName}</h5>
                                <h6>{ticket?.TheatreLocation}</h6>
                            </div>

                            <div className="ticket-details">
                                <h5> 🎟️Ticket Number : {ticket?.TicketNumber}</h5>

                            </div>
                        </div>

                        <hr />

                        <div className="QRContant">
                            <div className="qrimg">
                                {ticket?.QRCode && (                     
                                <img src={`data:${ticket?.QRType};base64,${ticket?.QRCode}`} alt={ticket?.TicketNumber} /> )}
                            </div>
                            <div className="qr-msg">
                                <p> 🎞️ Scan This QR Code And Enjoy The Movie </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className="return-btn">
            <button onClick={HandelNavigate}>Back To Home</button>
        </div>

<Footer/>
    </>
}