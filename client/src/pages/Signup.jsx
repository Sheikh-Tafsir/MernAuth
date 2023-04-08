import {React,useEffect,useState} from 'react'
import Axios from 'axios';
import { GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
import {Link, NavLink} from "react-router-dom";
import { Button } from 'react-bootstrap';
import "../css pages/Signup.css"
import {FaRegAddressBook} from "react-icons/fa"

const Signup = () => {
    const [ profile, setProfile ] = useState(null);
    const clientId = '1000835904597-ut38ah9s6238riqo9iv189fpcje1fc37.apps.googleusercontent.com';
    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [regStatus, setRegStatus] = useState("");

    let localStorageUsername=localStorage.getItem("localStorageUsername");
    let localStorageLoggedState=localStorage.getItem("localStorageLoggedState");

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);

        if(localStorageLoggedState==1)window.location.href = "/";
    });


    //signup user using credentials and save to server
    const signupUser = () => {
        setRegStatus("please wait...");
        Axios.post('http://localhost:3001/signup',
        {
            name:username,
            email:useremail,
            password:password
        }
        ).then((response) =>{
            //alert(response.data["success"]);
            if(response.data.message == "1"){
                setRegStatus("user data saved");
                localStorage.setItem("localStorageUsername",username);
                localStorage.setItem("localStorageLoggedState",1);
                //window.open("/dashboard", "_top");
                window.location.href = "/";
                
            }
            else if(response.data == "0"){
                setRegStatus("user already exists");
            }
            else {
                setRegStatus(response.data);
            }
        }).catch(error => {
            console.error(error);
        });

        document.querySelector(".signupform").reset();
        //alert("succ");
    }; 

    

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        localStorage.setItem("localStorageLoggedState",1);
        localStorage.setItem("localStorageUsername",res.profileObj.name);
        window.location.href = "/";

    };

    const onFailure = (err) => {
        console.log('failed', err);
        localStorage.setItem("localStorageLoggedState",0);
        localStorage.setItem("localStorageUsername",null);
    };

  return (
    <div className="signuppage">
            <form className="signupform">
                <h2>Signup Form</h2>
                <div className="signupCreds">
                    <FaRegAddressBook className ="signupCredsIcons"/>
                    <input type="text" id="name" name="name" placeholder="Insert name" onChange={(event) => {setUsername(event.target.value);} }/><br/>
                </div>
                <div className="signupCreds">
                    <FaRegAddressBook className ="signupCredsIcons"/>
                    <input type="text" id="email" name="email" placeholder="Insert email" onChange={(event) => {setUseremail(event.target.value);} }/><br/>
                </div>
                <div className="signupCreds">
                    <FaRegAddressBook className ="signupCredsIcons"/>
                    <input type="password" id="iid" name="iid" placeholder="Insert Your password" onChange={(event) => {setPassword(event.target.value);} }/><br/>
                </div>
                <p>{regStatus}</p><br/>
                <Button className="signupformbut" onClick={signupUser}>Signup</Button><br/>
                <h3>or</h3>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    className="googleLoginBut"
                />
                <br/>
                <Link to="/login" className='signToLog'>Already have an account</Link><br/>
            </form>
        </div>
  )
}

export default Signup