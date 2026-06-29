import { useState } from "react"

export default function Profile() {

    const [profileimg, setprofileimg] = useState(null)

    return <>
        <div className="profile-container">
            <div className="profile-box">
                <div className="profile">

                    <div className="img-container">

                        <div className="img">
                            <img src={profileimg} alt="ProfileImg" />

                            
                            <div className="edit">
                                <input type="file" id="profile-img" value={profileimg}
                                  onChange={(e) => setprofileimg(e.target.files[0])} 
                                 className="hide-profile-input" />
                                <label htmlFor="profile-img" className="custom-edit"><i class="fa-solid fa-user-pen"></i></label>
                            </div>
                        </div>

                        <div className="personal-details">
                            <h2>name</h2>
                            <p>phn:o</p>
                            <p>mail</p>
                        </div>


                    </div>

                    <div className="profile-service">
                        <div className="services">
                            <div className="options">
                                <h3>Tickets</h3>
                            </div>
                            <div className="options">
                                <h3>History</h3>
                            </div>
                            <div className="options">
                                <h3>Logout</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}