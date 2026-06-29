
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";

export default function HoldPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        showId,
        selectedSeats,
        movieName,
        theatreName,
        showTime,
        totalPrice,
        movieId
    } = location.state || {};

    // =========================
    // BOOK BUTTON CLICK → CONFIRM POPUP
    // =========================
    const handleBookClick = () => {


        const confirmAction = window.confirm("Do you want to confirm booking Hold seats? " +
            "Important! After Hold The Seats Complete Your Booking Within 5 Mins");

        if (!confirmAction) {
            navigate(`/showSeats/${showId}`);
            return;
        }
      
        // =========================
        // OK → HOLD API CALL
        // =========================

        const seatIds = selectedSeats.map(seat => seat.seatid);

        const send = {
            showId: showId,   // ✅ MUST match backend
            seatIds: seatIds,  // ✅ MUST be array
        };

        axios.patch("http://localhost:8080/seats/book", send)
            .then((res) => {

                alert(res.data);
                navigate('/confiembooking', {
                    state: {
                        showId,
                        selectedSeats,
                        movieName,
                        theatreName,
                        showTime,
                        totalPrice,
                        movieId
                    }
                })

            })
            .catch((err) => {
                console.log(err, err.response?.data);
                alert("Hold failed");
            });
    };

    
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
        <div className="hold-page">

            <h2>Hold & Book Your Seats</h2>

            <h3>{movieName}</h3>
            <p>{theatreName}</p>
            <p>{showId}</p>
            <p>{formatTime(showTime)}</p>

            <hr />

            <h4>Selected Seats</h4>

            {selectedSeats?.map((seat) => (
                <div key={seat.seatid}>
                    <p>
                        Seat: <b>{seat.seatnumber}</b> | ₹{seat.price}
                    </p>
                </div>
            ))}

            <hr />

            <h3>Total: ₹{totalPrice}</h3>

            {/* BOOK BUTTON */}
            <button onClick={handleBookClick}>
                Hold & Book
            </button>

        </div>

    <Footer/>
    </>
}