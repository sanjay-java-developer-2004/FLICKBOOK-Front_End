
import NavBar from "../../Component/NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer/Footer";

export default function Seats() {
    const { showid } = useParams();
    const navigate = useNavigate();

    const [seats, setseats] = useState([]);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const movieName = seats[0]?.movieName;
    const theatreName = seats[0]?.theatreName;
    const showTime = seats[0]?.showTime;
    const price = seats[0]?.price;
    const movieId = seats[0]?.movieId ;

    // group by row
    const groupedSeats = seats.reduce((acc, seat) => {
        const row = seat.seatnumber.charAt(0);
        if (!acc[row]) acc[row] = [];
        acc[row].push(seat);
        return acc;
    }, {});

    // fetch seats
    useEffect(() => {
        axios
            .get(`http://localhost:8080/seats/seat/${showid}`)
            .then((res) => setseats(res.data))
            .catch((err) => {
                console.error(err);
                alert("Server Error");
            });
    }, [showid]);



    
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
  



    // =========================
    // SEAT CLICK (ONLY SELECT)
    // =========================
    const handleSeatClick = (seatId) => {

        const seat = seats.find(s => s.seatid === seatId);

        // ❌ blocked seats
        if (seat?.seatstatus === "Booked" || seat?.seatstatus === "Hold") {
            return;
        }

        // toggle selection
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };


    // =========================
    // TOTAL PRICE
    // =========================

    const totalPrice = seats
        .filter(seat => selectedSeats.includes(seat.seatid))
        .reduce((sum, seat) => sum + (seat.price || 150), 0);


    // =========================
    // GO TO CONFIRM PAGE (HOLD API THERE)
    // =========================

    const handleGoToBookPage = () => {

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat!");
            return;
        }

        const selectedSeatsData = seats
            .filter(seat => selectedSeats.includes(seat.seatid))
            .map(seat => ({
                seatid: seat.seatid,
                seatnumber: seat.seatnumber,
                status: seat.seatstatus,
                price: seat.price || 150
            }));

        navigate("/bookingHold", {
            state: {
                showId: showid,
                selectedSeats: selectedSeatsData,
                movieName,
                theatreName,
                showTime,
                totalPrice,
                movieId
            }
        });
    };

    return<>
    <NavBar/>
     (
        
        
        <div className="seat-container">
            <div className="seat-header">

                <h2>{movieName}</h2>
                <h3>{theatreName}</h3>
                <p>{formatTime(showTime)}</p>
                <p>Gold ₹{price}</p>

                {Object.keys(groupedSeats).map((row) => (
                    <div key={row} className="row">
                        <span>{row}</span>

                        {groupedSeats[row].map((seat) => {

                            const isBooked = seat.seatstatus === "Booked";
                            const isHold = seat.seatstatus === "Hold";
                            const isSelected = selectedSeats.includes(seat.seatid);

                            return (
                                <button
                                    key={seat.seatid}
                                    onClick={() => handleSeatClick(seat.seatid)}
                                    className={
                                        isBooked
                                            ? "booked"
                                            : isHold
                                                ? "hold"
                                                : isSelected
                                                    ? "selected"
                                                    : "available"
                                    }
                                    disabled={isBooked || isHold}
                                >
                                    {seat.seatnumber}
                                </button>
                            );
                        })}
                    </div>
                ))}

                <div className="screen"></div>

                {selectedSeats.length > 0 && (
                    <div className="price-summary">
                        <p>Selected Seats: {selectedSeats.length}</p>
                        <p>Total Price: ₹{totalPrice}</p>

                        <button onClick={handleGoToBookPage}>
                            Hold Now
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
    <Footer/>
    </>
}