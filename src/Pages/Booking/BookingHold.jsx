
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";
import { useState, useEffect, useRef } from "react";

export default function HoldPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [err, seterr] = useState("");
    const [response, setrespons] = useState("");
    const isLeavingToPayment = useRef(false);

    // Multi-page architecture trace state setup
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


    // Component normal ah backward unmount aagum podhu background release triggered

    useEffect(() => {
        return () => {
            if (!isLeavingToPayment.current) {
                if (selectedSeats && selectedSeats.length > 0) {
                    const seatIds = selectedSeats.map(seat => seat.seatid);
                    axios.patch("http://localhost:8080/seats/release", { showId, seatIds })
                        .catch(err => console.log("Release failed", err));
                }
            }
        };
    }, [showId, selectedSeats]);


    // Hard tab/browser close sync logic
    useEffect(() => {
        const handleUnload = () => {
            if (isLeavingToPayment.current) return;
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


    //handel boooking 
    const handleBookClick = () => {
        seterr("");
        setrespons("");

        const confirmAction = window.confirm("Do you want to confirm booking Hold seats? " +
            "Important! After Hold The Seats Complete Your Booking Within 5 Mins");

        if (!confirmAction) {
            navigate(`/showSeats/${showId}`);
            return;
        }

        const seatIds = selectedSeats.map(seat => seat.seatid);
        axios.patch("http://localhost:8080/seats/book", { showId, seatIds })
            .then((res) => {
                setrespons(res.data);
                sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
                setTimeout(() => {
                    isLeavingToPayment.current = true;
                    navigate('/confiembooking', { state: bookingData }); 
                }, 1000);
            })
            .catch((err) => {
                seterr(err.response?.data?.message || "Hold Error");
            });
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
        {err && <div className="Error-PopUp"><h6>{err}</h6></div>}
        {response && <div className="Response-PopUp"><h6>{response}</h6></div>}
        <NavBar />
        <div className="hold-page">
            <h2>Hold & Book Your Seats</h2>
            <h3>{movieName}</h3>
            <p>{theatreName}</p>
            <p>{formatTime(showTime)}</p>
            <hr />
            <h4>Selected Seats</h4>
            {selectedSeats?.map((seat) => (
                <div key={seat.seatid}>
                    <p>Seat: <b>{seat.seatnumber}</b> | ₹{seat.price}</p>
                </div>
            ))}
            <hr />
            <h3>Total: ₹{totalPrice}</h3>
            <button onClick={handleBookClick}>Hold & Book</button>
        </div>
        <Footer />
    </>;
}