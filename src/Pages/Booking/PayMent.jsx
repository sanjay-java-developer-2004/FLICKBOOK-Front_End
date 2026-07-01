import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Gpay from '../../assets/vecteezy_google-pay-logo-transparent-background_46861640.png';
import PhonePe from '../../assets/vecteezy_phonepe-colored-logo-rounded-icon-transparent-background_67065681.png';
import Paytm from '../../assets/paytm-colored-logo-rounded-icon-free-png.webp';
import NetBanking from '../../assets/images.png';
import Cards from '../../assets/images.jpg';
import { useUser } from "../../Component/Context/Usercontext";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";



export default function Payment() {
     const navigate = useNavigate();
    const location = useLocation();
    const {username} = useUser();

    const {
        showId,
        selectedSeats,
        movieName,
        theatreName,
        showTime,
        totalPrice,
        movieId
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState("");


    const HandelPay = () => {
        console.log("btn clicked")
        console.log(paymentMethod)
        const seatIds = selectedSeats.map(seat => seat.seatid);
        
        const send = {
            showId: showId,   // ✅ MUST match backend
            seatIds: seatIds,  // ✅ MUST be array
            Total: totalPrice,
            PaymentMethod:paymentMethod,
            UserName:username
        };
        console.log(send)

        axios.patch("http://localhost:8080/Booking/pay-booking", send)
            .then((res) => {
                // sessionStorage.setItem("ticketdata",JSON.stringify(res.data))
                console.log(res.data)
                alert("Booking Successfully");
                navigate('/Tickets', {
                    state:res.data
                })

            })

            .catch((err) => {
                console.log(err, err.response?.data);
                alert("PayMent failed");
            });
    }


        
    const formatTime = (Time) => {
           if (!Time) return "";

        const [hours, minutes] = Time.split(":");

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };


    return <>

    <NavBar/>
        <div className="booking-container">
            <div className="booking-contant-box">
               
                <h2> {movieName}</h2>
                 <h3> {theatreName} Cinimas</h3>
                <h4>ShowTime : {formatTime(showTime)}</h4>
                <hr /> 
                {selectedSeats?.map((x) => (
                    <div className="booking-contants" key={x.seatid}>
                        <h4>Seats : {x.seatnumber}</h4>
                        <h5>Price : ₹ {x.price}</h5>
                        <hr />

                    </div>

                ))}
                <p>Total : ₹ {totalPrice}</p>


                <div className="payment-methods">

                    <label>Payment Method</label>

                    <input
                        type="text"
                        value={paymentMethod}
                        readOnly
                        className="payment-hide"
                    />

                    <div className="upis">

                        <div
                            className={`payment-options-gpay ${paymentMethod === "Gpay" ? "selected" : ""}`}
                            onClick={() => setPaymentMethod("Gpay")}
                        >
                            <img src={Gpay} alt="Gpay" />
                            <label>Gpay</label>
                        </div>

                        <div
                            className={`payment-options-phonepe ${paymentMethod === "PhonePe" ? "selected" : ""}`}
                            onClick={() => setPaymentMethod("PhonePe")}
                        >
                            <img src={PhonePe} alt="PhonePe" />
                            <label>PhonePe</label>
                        </div>

                        <div
                            className={`payment-options-paytm ${paymentMethod === "Paytm" ? "selected" : ""}`}

                            onClick={() => setPaymentMethod("Paytm")}
                        >
                            <img src={Paytm} alt="Paytm" />
                            <label>Paytm</label>
                        </div>

                        <div
                            className={`payment-options-cards ${paymentMethod === "Debit Or Credit Card" ? "selected" : ""}`}
                            onClick={() => setPaymentMethod("Debit Or Credit Card")}
                        >
                            <img src={Cards} alt="Card" />
                            <label>Debit Or Credit Card</label>
                        </div>

                    </div>

                    <div className="net-banking">
                        <div
                            className={`payment-options-netbanking ${paymentMethod === "Net Banking" ? "selected" : ""}`}

                            onClick={() => setPaymentMethod("Net Banking")}
                        >
                            <img src={NetBanking} alt="Net Banking" />
                            <label>Net Banking</label>
                        </div>
                    </div>

                </div>
                <div className="booking-contants-btn"> <button onClick={HandelPay}>Pay Now ₹ {totalPrice}</button> </div>


            </div>
        </div>

        <Footer/>
    </>

}