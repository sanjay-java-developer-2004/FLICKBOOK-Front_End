import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Component/Footer/Footer";
import NavBar from "../../Component/NavBar/NavBar";
import Loading from "../../Component/Loading/Loading";


export default function TicketView() {
    const navigate = useNavigate();
    const { TicketId } = useParams();
    const [TicketData, SetTicketData] = useState();
    const [loading, setloading] = useState(false)
    const [err, seterr] = useState("")




    useEffect(() => {
        setloading(true)
        seterr("")
        axios.get(`http://localhost:8080/Tickets/getticket/${TicketId}`)
            .then((res) => {
                SetTicketData(res.data)
            })
            .catch((err) => {
                console.log(err)
                seterr(err.response?.data?.message)
            })
            .finally(() => {
                setloading(false)
            })
    }, [TicketId])

    console.log(TicketId)
    console.log(TicketData?.Tittle)

    const HandelNavigate = () => {
        navigate('/home')
    }
    return <>
        <NavBar />
        {loading && (
            <Loading />
        )}
        {err && (
            <div className="Error-PopUp">
                <h6>{err}</h6>
            </div>
        )}

        <div className="tickets-container">
            <div className="tickets-box">
                <div className="ticket">

                    <div className="ticket-header">

                        <div className="ticket-status">
                            <h5>Ticket Status : {TicketData?.TicketStatus}</h5>
                        </div>

                        <div className="ticket-sub-header">

                            <div className="ticket-img">
                                {TicketData?.Poster && (
                                    <img src={`data:${TicketData?.ImgType};base64,${TicketData?.Poster}`} alt={TicketData?.Tittle} />)}

                            </div>

                            <div className="ticket-tittle">
                                <h4>{TicketData?.Tittle}</h4>
                                <p>{TicketData?.Duration}</p>
                                <p>{TicketData?.Genere}</p>
                                <p>{TicketData?.Censor}</p>
                            </div>

                        </div>


                    </div>

                    <div className="ticket-body">
                        <div className="ticket-show">
                            <h5>{TicketData?.ShowDate}</h5>
                            <h5>{TicketData?.ShowTime}</h5>
                        </div>

                        <div className="seats">
                            <h5>Seats</h5>
                            <h5>{TicketData?.Seats}</h5>
                        </div>
                    </div>

                    <div className="tickets-contant">

                        <div className="ticket-details-head">

                            <div className="theatre-locate">
                                <h5>{TicketData?.Theatre}</h5>
                                <h6>{TicketData?.TheatreLocation}</h6>
                            </div>

                            <div className="ticket-details">
                                <h5> 🎟️Ticket Number : {TicketData?.TicketNumber}</h5>

                            </div>
                        </div>

                        <hr />

                        <div className="QRContant">
                            <div className="qrimg">
                                {TicketData?.QRCode && (
                                    <img src={`data:${TicketData?.QRType};base64,${TicketData?.QRCode}`} alt={TicketData?.TicketNumber} />)}
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

        <Footer />
    </>

}