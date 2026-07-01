
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../../Component/NavBar/NavBar";
// import { useUser } from "../../Component/Context/Usercontext";
// import Footer from "../../Component/Footer/Footer";

// export default function Signin() {
//     const navigate = useNavigate();
//     const [name, setname] = useState("");
//     const [pass, setpass] = useState("");
//     const { login } = useUser();
//     const [Error, setError] = useState("");
//     const [loading, setloading] = useState(false)

//     const HandelLogin = async (e) => {
//         e.preventDefault();


//         try {
//             setloading(true)
//             const response = await axios.post("http://localhost:8080/users/login", {
//                 username: name,
//                 password: pass
//             });

//             if (response.status === 200) {
//                 const data = response.data;
//                 setloading(false)

//                 if (!data.role || !data.username) {
//                     alert("Invalid Username or Password!");
//                     return;
//                 }

//                 login(data.username, data.role);
//                 localStorage.setItem("role", data.role)
//                 localStorage.setItem("userid", data.userid)

//                 // ✅ role based redirect
//                 if (data.role === "Admin") {

//                     if (data.theatreid !== null) {
//                         localStorage.setItem("theatreid", data.theatreid);
//                         localStorage.setItem("theatrename", data.theatrename); // ✅

//                         navigate("/DashBoard");       // old admin ✅
//                     } else {

//                         navigate("/addtheatre");      // new admin ✅
//                     }
//                 } else {
//                     navigate("/home");                // user ✅
//                 }
//             }

//         } catch (errors) {
//             setError(errors.response?.data?.message)
//             setloading(false)
//         }
//     }


//     return <>

//         <div className="loading">
//             {loading && <p>Loading........</p>}
//         </div>
//         <div className="Error-PopUp">
//             {Error && <h6>{Error}</h6> }
//         </div>

//         <div className="login-container">
//             <h1>LOGIN NOW</h1>
//             <div className="login-box">
//                 <form onSubmit={HandelLogin}>
//                     <div className="login-details">
//                         <input type="text" name="user" placeholder="" required
//                             onChange={(e) => { setname(e.target.value) }} />
//                         <label><i className="fa-regular fa-user"></i>UserName</label>
//                     </div>
//                     <div className="login-details">
//                         <input type="password" name="pass" placeholder="" required
//                             onChange={(e) => { setpass(e.target.value) }} />
//                         <label><i className="fa-solid fa-lock"></i>Password</label>
//                     </div>
//                     <div className="login-details">
//                         <button type="submit">Sign In</button>  {/* ✅ fixed typo */}
//                     </div>
//                     <div className="login-details">
//                         <h6>Don't Have An Account?
//                             <p onClick={() => { navigate("/signup") }}>SignUp</p>
//                         </h6>
//                     </div>
//                 </form>
//             </div>
//         </div>
//         <Footer />
//     </>
// }






import { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import { useUser } from "../../Component/Context/Usercontext";
import Footer from "../../Component/Footer/Footer";
import Loading from "../../Component/Loading/Loading";


export default function Signin() {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const { login } = useUser();
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
        setError("");
        try {
            setloading(true);
            const response = await axios.post("http://localhost:8080/users/login", {
                username: name,
                password: pass
            });

            if (response.status === 200) {
                const data = response.data;

                if (!data.role || !data.username) {
                    setError("Invalid Username or Password!");
                    return;
                }

                login(data.username, data.role);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userid", data.userid);
                localStorage.setItem("username",data.username)

                if (data.role === "Admin") {
                    if (data.theatreid !== null) {
                        localStorage.setItem("theatreid", data.theatreid);
                        localStorage.setItem("theatrename", data.theatrename);
                        navigate("/DashBoard");
                    } else {
                        navigate("/addtheatre");
                    }
                } else {
                    navigate("/home");
                }
            }
        } catch (errors) {
            setError(errors.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setloading(false);
        }
    };

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
            <h1>LOGIN NOW</h1>
            <div className="login-box">
                <form onSubmit={HandelLogin}>
                    <div className="login-details">
                        <input type="text" name="user" placeholder="" required
                            onChange={(e) => { setname(e.target.value) }} />
                        <label><i className="fa-regular fa-user"></i>UserName</label>
                    </div>
                    <div className="login-details">
                        <input type="password" name="pass" placeholder="" required
                            onChange={(e) => { setpass(e.target.value) }} />
                        <label><i className="fa-solid fa-lock"></i>Password</label>
                    </div>
                    <div className="login-details">
                        <button type="submit" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                    <div className="login-details">
                        <h6>Don't Have An Account?
                            <p onClick={() => { navigate("/signup") }}>SignUp</p>
                        </h6>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </>;
}