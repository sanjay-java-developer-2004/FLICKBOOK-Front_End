import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signin from './Pages/User/Signin'
import Signup from './Pages/User/Signup'
import MovieDetails from './Pages/Movie/MovieDetails'
import Home from './Pages/Home/Home'
import AddShowMovies from './AuthControll/Shows/AuthMovieShowAdd'
import MovieShows from './Pages/Shows/Shows'
import AddTheatre from './AuthControll/Theatre/AddTheatre'
import Seats from './Pages/Seats/Seat'
import HoldPage from './Pages/Booking/BookingHold'
import Payment from './Pages/Booking/PayMent'
import Search from './Component/NavBar/Search'
import { UserProvider } from './Component/Context/Usercontext'
import Tickets from './Pages/Ticket/Ticket'
import Loading from './Component/Loading/Loading'
import AuthAddMovie from './AuthControll/GlobalMovie/AuthAddMovie'
import DeleteMovie from './AuthControll/GlobalMovie/AuthDeleteMovie'
import DashBoard from './AuthControll/DashBoard/DashBoard'
import Movies from './Pages/Movie/Movies'
import UserTickets from './Pages/Ticket/UserTickets'
import TicketView from './Pages/Ticket/TicketView'


function App() {

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/addmovies' element = {<AuthAddMovie/>} />
          <Route path='/deletemovies' element = {<DeleteMovie/>} />
          <Route path='/addshow' element={<AddShowMovies />} />
          <Route path='/addtheatre' element={<AddTheatre />} />
          <Route path='/moviedetails/:movieid' element={<MovieDetails />} />
          <Route path='/TheatresAndShow/:movieid' element={<MovieShows />} />
          <Route path='/showSeats/:showid' element={<Seats />} />
          <Route path='/bookingHold' element={<HoldPage />} />
          <Route path='/confiembooking' element={<Payment />} />
          <Route path='/search' element={<Search />} />
          <Route path='/Tickets' element={<Tickets/>} />
          <Route path='/Loading' element = {<Loading/>}/>
          <Route path='/DashBoard' element = {<DashBoard/>}/>
          <Route path='/movies'element = {<Movies/>} />
          <Route path='/UserTickets' element = {<UserTickets/>}/>
          <Route path='/TicketView/:TicketId' element = {<TicketView/>}/>
         </Routes>
      </UserProvider>
    </>
  )
}

export default App
