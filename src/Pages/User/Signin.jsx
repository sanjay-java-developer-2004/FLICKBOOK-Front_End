// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import{useNavigate} from "react-router-dom";
// import NavBar from "../../Component/NavBar/NavBar";
// import { UserProvider, useUser } from "../../Component/Context/Usercontext";




// export default function Signin() {

//     const navigate = useNavigate();

//     const [name, setname] = useState("");
//     const [pass, setpass] = useState("");
//     const {login} = useUser();


//     const HandelLogin = async (e) => {
//         e.preventDefault();

//         const User = {
//             username: name,
//             password: pass

//         }

//         if(name.trim()){
//             login(name);   //add to context
//         }


//         try {

//             const response = await axios.post("http://localhost:8080/users/login", User);

//             if (response.status === 200) {
//                 alert(response.data) 

//                 if(response.data === "Login Successfully"){
//                     navigate("/Home")
//                 }

//             } else {
//                 alert(response.data)
//             }

//         }
//         catch (errors) {
//             alert(errors);

//         }


//     }





//     return <>

//     <NavBar/>

//         <div className="login-container">
//             <h1>LOGIN NOW</h1>
//             <div className="login-box">

//                 <form onSubmit={HandelLogin}>

//                     <div className="login-details">
//                         <input type="text" name="user" placeholder=" " onChange={(e) => { setname(e.target.value) }} />
//                         <label> <i class="fa-regular fa-user"></i>UserName</label>
//                     </div>

//                     <div className="login-details">
//                         <input type="password" name="pass" placeholder=" " onChange={(e) => { setpass(e.target.value) }} />
//                         <label> <i class="fa-solid fa-lock"></i> Password</label>
//                     </div>

//                     <div className="login-details">
//                         <button type="submite">Sign In</button>
//                     </div>

//                     <div className="login-details">
//                         <h6>Don't Have An Account? <p onClick={()=>{navigate("/signup")}}>SignUp</p> </h6>
//                     </div>

//                 </form>

//             </div>
//         </div>



//     </>
// }














import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import { useUser } from "../../Component/Context/Usercontext";
import Footer from "../../Component/Footer/Footer";

export default function Signin() {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const { login } = useUser();

    const HandelLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/users/login", {
                username: name,
                password: pass
            });

            if (response.status === 200) {
                const data = response.data;

                if (!data.role || !data.username) {
                    alert("Invalid Username or Password!");
                    return;  // ✅ stop here — don't navigate
                }
                
                login(data.username, data.role);
                localStorage.setItem("role", data.role)
                localStorage.setItem("userid", data.userid)

                // ✅ role based redirect
                if (data.role === "Admin") {

                    if (data.theatreid !== null) {
                        localStorage.setItem("theatreid", data.theatreid);
                        localStorage.setItem("theatrename", data.theatrename); // ✅

                        navigate("/DashBoard");       // old admin ✅
                    } else {

                        navigate("/addtheatre");      // new admin ✅
                    }
                } else {
                    navigate("/home");                // user ✅
                }
            }

        } catch (errors) {
            alert(errors.response?.data || "Login failed");
        }
    }

    return <>
        <div className="login-container">
            <h1>LOGIN NOW</h1>
            <div className="login-box">
                <form onSubmit={HandelLogin}>
                    <div className="login-details">
                        <input type="text" name="user" placeholder=" "
                            onChange={(e) => { setname(e.target.value) }} />
                        <label><i className="fa-regular fa-user"></i>UserName</label>
                    </div>
                    <div className="login-details">
                        <input type="password" name="pass" placeholder=" "
                            onChange={(e) => { setpass(e.target.value) }} />
                        <label><i className="fa-solid fa-lock"></i>Password</label>
                    </div>
                    <div className="login-details">
                        <button type="submit">Sign In</button>  {/* ✅ fixed typo */}
                    </div>
                    <div className="login-details">
                        <h6>Don't Have An Account?
                            <p onClick={() => { navigate("/signup") }}>SignUp</p>
                        </h6>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
    </>
}