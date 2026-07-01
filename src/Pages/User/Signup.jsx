import { useState ,useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import Footer from "../../Component/Footer/Footer";
import Loading from "../../Component/Loading/Loading";


export default function Signup() {
    const navigate = useNavigate();

    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const [mail, setemail] = useState("");
    const [number, setphonenumber] = useState("");
    const [role, setrole] = useState("");
    const [Error, setError] = useState("");
    const [loading, setloading] = useState(false);


    useEffect(() => {
        if (Error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer); // cleanup if Error changes again before 5s
        }
    }, [Error]);




    const HandelLogin = async (e) => {
        e.preventDefault();

        const User = {
            username: name,
            password: pass,
            email: mail,
            phonenumber: number,
            role: role

        }

        try {
            setloading(true)

            const response = await axios.post("http://localhost:8080/users/register", User);

            if (response.status === 200) {

                const data = response.data
                if (!data.role || !data.username || !data.userid) {
                    console.log("user name alresdcondain ")
                    alert("UserName Is Already Contain Try Different Username")
                    return
                }

                if (data.role === "Admin") {

                    localStorage.setItem("userid", data.userid);

                    navigate('/addtheatre');
                } else {
                    navigate("/signin");
                }
            }



        }
        catch (errors) {
            console.log(errors)
            setError(errors.response?.data?.message || "Something went wrong. Please try again.");


        } finally {
            setloading(false)
        }

    }





    return <>

 {loading && (
           <Loading/>
        )}
        {Error && (
            <div className="Error-PopUp">
                <h6>{Error}</h6>
            </div>
        )}

        <div className="login-container">
            <h1>SIGNUP NOW</h1>
            <div className="login-box">

                <form onSubmit={HandelLogin}>

                    <div className="login-details">
                        <input type="text" name="user" placeholder=" " onChange={(e) => { setname(e.target.value) }} required />
                        <label> <i class="fa-regular fa-user"></i>UserName</label>
                    </div>

                    <div className="login-details">
                        <input type="password" name="pass" placeholder=" " onChange={(e) => { setpass(e.target.value) }} required />
                        <label> <i class="fa-solid fa-lock"></i> Password</label>
                    </div>

                    <div className="login-details">
                        <input type="email" name="email" placeholder=" " onChange={(e) => { setemail(e.target.value) }} required />
                        <label><i class="fa-regular fa-envelope"></i>Email</label>
                    </div>

                    <div className="login-details">
                        <input type="number" name="number" className="numberinput" placeholder=" " onChange={(e) => { setphonenumber(e.target.value) }} required />
                        <label> <i class="fa-solid fa-mobile"></i>Mobile</label>
                    </div>

                    <div className="login-details-role">


                        <select name="role" required onChange={(e) => { setrole(e.target.value) }} required>

                            <option></option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>

                        <label>  Role</label>
                    </div>


                    <div className="login-details">
                        <button type="submit">Sign Up</button>
                    </div>

                    <div className="login-details">
                        <h6>Already Have An Account? <p onClick={() => { navigate("/signin") }}>SignIn</p></h6>
                    </div>

                </form>

            </div>
        </div>
        <Footer />
    </>
}