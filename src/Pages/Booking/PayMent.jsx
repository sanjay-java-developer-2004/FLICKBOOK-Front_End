

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Gpay from '../../assets/vecteezy_google-pay-logo-transparent-background_46861640.png';
import PhonePe from '../../assets/vecteezy_phonepe-colored-logo-rounded-icon-transparent-background_67065681.png';
import Paytm from '../../assets/paytm-colored-logo-rounded-icon-free-png.webp';
import NetBanking from '../../assets/images.png';
import Cards from '../../assets/images.jpg';
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";
import Loading from "../../Component/Loading/Loading";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem("username");
    const [err, seterr] = useState("");
    const [loading, setloading] = useState(false);
    const [response, setresponse] = useState("");
    const isPaid = useRef(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const [bookingData] = useState(() => {
        try {
            const locState = location.state;
            const localData = sessionStorage.getItem("bookingData");
            if (locState && Object.keys(locState).length > 0) {
                sessionStorage.setItem("bookingData", JSON.stringify(locState));
                return locState;
            }
            return localData ? JSON.parse(localData) : {};
        } catch {
            return {};
        }
    });

    const {
        showId,
        selectedSeats,
        movieName,
        theatreName,
        showTime,
        totalPrice
    } = bookingData;

    useEffect(() => {
        if (err) {
            const timer = setTimeout(() => seterr(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [err]);



    // =========================
    // NATIVE POPSTATE BACK-STACK REPAIR LOGIC
    // =========================

    useEffect(() => {
        const handlePopState = () => {
            if (isPaid.current) return;

            const confirmLeave = window.confirm(
                "Going back will release your held seats. Do you want to continue?"
            );

            if (!confirmLeave) {
                // ❌ User Cancel pannuna: Adhae page la stay pannum
                window.history.pushState(null, "", window.location.pathname);
            } else {
                // ✅ User OK pannuna: Complete page intercept logic apply pannum
                isPaid.current = true;

                if (selectedSeats && selectedSeats.length > 0) {
                    const seatIds = selectedSeats.map(seat => seat.seatid);
                    axios.patch("http://localhost:8080/seats/release", { showId, seatIds })
                        .catch(err => console.log(err));
                }


                // Router string direct jump pannina structural link broken aagum. 
                window.history.back();
            }
        };

        // Standard dynamic safety layer
        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [selectedSeats, showId]);

    // Hard hardware exit listener
    useEffect(() => {
        const handleUnload = () => {
            if (isPaid.current) return;
            if (selectedSeats && selectedSeats.length > 0) {
                const seatIds = selectedSeats.map(seat => seat.seatid);
                navigator.sendBeacon(
                    "http://localhost:8080/seats/release",
                    JSON.stringify({ showId, seatIds })
                );
                sessionStorage.removeItem("bookingData");
            }
        };
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, [selectedSeats, showId]);


//handel pay

    const HandelPay = () => {


        if (!paymentMethod) {
            seterr("Please select a payment method!");
            setloading(false);
            return;
        }

        const seatIds = selectedSeats.map(seat => seat.seatid);
        const send = {
            showId,
            seatIds,
            Total: totalPrice,
            PaymentMethod: paymentMethod,
            UserName: username
        };

        if (send.showId === undefined || send.seatIds.length === 0 || !send.Total || !send.PaymentMethod || !send.UserName) {
            seterr("Something Wrong Login Again");
            return;
        }

        seterr("");
        setloading(true);
        setresponse("");
        axios.patch("http://localhost:8080/Booking/pay-booking", send)
            .then((res) => {
                isPaid.current = true;
                sessionStorage.removeItem("bookingData");
                setresponse("Booking Successfully");
                setTimeout(() => {
                    navigate('/Tickets', { state: res.data });
                }, 1000);
            })
            .catch((err) => {
                seterr(err.response?.data?.message || "Payment Failed");
            })
            .finally(() => setloading(false));
    };

    const formatTime = (Time) => {
        if (!Time) return "";
        const [hours, minutes] = Time.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    };

    return <>
        <NavBar />
        {err && <div className="Error-PopUp"><h6>{err}</h6></div>}
        {response && <div className="Response-PopUp"><h6>{response}</h6></div>}
        {loading && <Loading />}

        <div className="booking-container">
            <div className="booking-contant-box">
                <h2>{movieName}</h2>
                <h3>{theatreName} Cinemas</h3>
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
                    <input type="text" value={paymentMethod} readOnly className="payment-hide" />

                    <div className="upis">
                        <div className={`payment-options-gpay ${paymentMethod === "Gpay" ? "selected" : ""}`} onClick={() => setPaymentMethod("Gpay")}>
                            <img src={Gpay} alt="Gpay" /><label>Gpay</label>
                        </div>
                        <div className={`payment-options-phonepe ${paymentMethod === "PhonePe" ? "selected" : ""}`} onClick={() => setPaymentMethod("PhonePe")}>
                            <img src={PhonePe} alt="PhonePe" /><label>PhonePe</label>
                        </div>
                        <div className={`payment-options-paytm ${paymentMethod === "Paytm" ? "selected" : ""}`} onClick={() => setPaymentMethod("Paytm")}>
                            <img src={Paytm} alt="Paytm" /><label>Paytm</label>
                        </div>
                        <div className={`payment-options-cards ${paymentMethod === "Debit Or Credit Card" ? "selected" : ""}`} onClick={() => setPaymentMethod("Debit Or Credit Card")}>
                            <img src={Cards} alt="Card" /><label>Debit Card</label>
                        </div>
                    </div>
                    <div className="net-banking">
                        <div className={`payment-options-netbanking ${paymentMethod === "Net Banking" ? "selected" : ""}`} onClick={() => setPaymentMethod("Net Banking")}>
                            <img src={NetBanking} alt="Net Banking" /><label>Net Banking</label>
                        </div>
                    </div>
                </div>

                <div className="booking-contants-btn">
                    <button onClick={HandelPay}>Pay Now ₹ {totalPrice}</button>
                </div>
            </div>
        </div>
        <Footer />
    </>;
}