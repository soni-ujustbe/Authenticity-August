import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import firebaseApp from '../firebaseConfig';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, deleteDoc, arrayUnion, getDoc,Timestamp, updateDoc, query } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Link from 'next/link'
import zoomlogo from '../public/images/zoom.png'
import Header from "../component/module/Header"
const db = getFirestore();

//Image import
import topbannerimg from '../public/images/topbanner.png';

const fivecheckdata = [
    { name: "4pm to 6pm" },
    { name: "5pm to 7pm" },
    { name: "6pm to 8pm" },
    { name: "7pm to 9pm" },
    // { name: "To enhance existing sour relationships" },
    
    
];

const sevencheckdata = [

    { name: "UjustBe Experience Centre (UExC)" },
    { name: "Object Orientation Program Simplified (OOPS)" },
    { name: "Free Space" },
    // { name: "Expanded Self" },
    
];

const PostFormtwo = () => {

    //state used for form
    const [phoneNum, setphoneNum] = useState('')
    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [singleUsers, setsingleUsers] = useState('');


    const [onecheck, setoneCheck] = useState('');
    const [twocheck, setTwoCheck] = useState('');
    const [threecheck, setThreeCheck] = useState('');
    const [fourcheck, setFourCheck] = useState([]);
    const [fivecheck, setFiveCheck] = useState(fivecheckdata);

    const [sixcheck, setSixCheck] = useState("");
    const [sevencheck, setSevenCheck] = useState(sevencheckdata);

    const [oneQuestionInput, setOneQuestionInput] = useState("");
    const [twoQuestionInput, setTwoQuestionInput] = useState("");

   
    const [UserData, setUserData] = useState([]);
    const [userId, setuserId] = useState('');
    const [error, seterror] = useState(false);
    const [formsubmit, setformsubmit] = useState(false)

    const [postfeedbackImg, setpostfeedbackImg] = useState('')
    const [mobileFormbg, setmobileFormbg] = useState('')
    const [eventName, seteventName] = useState('')
    const [secondInput, setsecondInput] = useState("");
    const [second, setsecond] = useState(false);
    const [whatsappgroup, setwhatsappgroup] = useState("");




    //function for add data in firebase
    const CreatForm = async (event) => {
        event.preventDefault();

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        const data = {

            username: username,
            phoneNum: phoneNum,
            PreOneAns: onecheck,
            PreOneInput:oneQuestionInput,
            PreTwoAns: twocheck,
            PreTwoInput:twoQuestionInput,
            PreThreeAns: threecheck,
            PreFourAns: fourcheck,
            PreFiveAns: fivecheck,
            PreSixAns:sixcheck,
            PreSevenAns: sevencheck,
            prefeedbackImg: postfeedbackImg,
            createdBy:Timestamp.now(),


        };

        //if user empty throw error else merge the form data in firebase
          //if user empty throw error else merge the form data in firebase
        if (onecheck==="" || twocheck==="" || fourcheck==="" || fivecheck==="" || sixcheck==="")
        {
            seterror(true);
            setFiveCheck(fivecheckdata);
           
        }
        else {
            const isLogin = localStorage.getItem("ucore");
            const usersDetails = JSON.parse(isLogin);

            setpostfeedbackImg();
            const docRef = doc(db, usersDetails.eventName, phoneNum);

            await setDoc(docRef, data, { merge: true });
           
            console.log("Feedback data", data);

            setformsubmit(true);

        }

        //clear all field after submit the data
        setoneCheck("");
        setOneQuestionInput("");
        setTwoCheck("");
        setTwoQuestionInput("");
        setThreeCheck("")
        setFourCheck("");
        setFiveCheck(fivecheck);
        setSixCheck("");
        setSevenCheck(sevencheck);
        // setformbgImage("");
        // setwhatsappLink("");
        //   Router.push('/dashboard');
    }

    //target checked data for store in firestore

    const questionOne = (event) => {
        const target = event.target;
        if (target.checked) {
            setoneCheck(target.value);
            console.log(event.target.value);
        }

    };

    // const questionTwo = (event) => {
    //     const target = event.target;
    //     if (target.checked) {
    //         setTwoCheck(target.value);
    //         console.log(event.target.value);
    //     }

    // };

    const questionThree = (event) => {
        const target = event.target;
        if (target.checked) {
            setThreeCheck(target.value);
            console.log(event.target.value);
        }
    };

    const questionFour = (event) => {
        const target = event.target;
        if (target.checked) {
            setFourCheck(target.value);
            console.log(event.target.value);
        }
    };

    const questionFive = (event) => {
        const target = event.target;
        if (target.checked) {
            setFourCheck(target.value);
            console.log(event.target.value);
        }
    };




    const questionTwo = (e) => {
        const {name,checked}= e.target;
    //     if(name === "AllSelect"){
    //       let tempSevenData=sevencheck.map((sevendetails)=>{
    //             return {...sevendetails, isChecked:checked}  });
    //         setSevenCheck(tempSevenData);

    //     }
    //    else{
        let tempSevenData=fivecheck.map((fivedetails)=>
        fivedetails.name === name ? { ...fivedetails, isChecked:checked } : fivedetails);
        setFiveCheck(tempSevenData)

        console.log("fivetquestion",fivecheck);
    //    }
       
        // const target = event.target;
        // if (target.checked) {
        //     setSevenCheck(target.value);
        //     console.log(event.target.value);
        // }

    };

    const questionSeven = (e) => {
        const {name,checked} = e.target;

        let tempEightData=sevencheck.map((sevendetails)=>
        sevendetails.name === name ? {...sevendetails, isChecked:checked} : sevendetails);
        setSevenCheck(tempEightData)
        console.log("sevenquestion",sevencheck);
    }

    const questionSix = (event) => {
        const target = event.target;
        if (target.checked) {
            setSixCheck(target.value);
            console.log(event.target.value);
        }

    };


    useEffect(() =>{
        setFiveCheck(fivecheckdata);
     

    },[])

    useEffect(() =>{
        setSevenCheck(sevencheckdata);
     

    },[])

    // useEffect(() =>{
       
    //     setSixCheck(sixcheckdata);

    // },[])

    useEffect(() => {
        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        console.log(usersDetails.username);
        console.log(usersDetails.phoneNum);
        setusername(usersDetails.username);
        setphoneNum(usersDetails.phoneNum);
        seteventName(usersDetails.eventName);
        
        const eventName = usersDetails.eventName;
        // console.log(eventName);

        setLoading(true);

        const getContent = async () => {

            onSnapshot(collection(db, eventName), (snapshot) => {
                console.log("MMform", snapshot);

            });
        }
        const getsingleDoc = async () => {

            const isLogin = localStorage.getItem("ucore");
            const usersDetails = JSON.parse(isLogin);
            console.log(usersDetails);

            const docRef = doc(db, "AdminMonthlyMeet", eventName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setsingleUsers(docSnap.data());
                console.log(singleUsers);
                console.log("Document data:", docSnap.data());
                setpostfeedbackImg(docSnap.data().formImgUrls);
                setmobileFormbg(docSnap.data().mobileUrls);
                seteventName(docSnap.data().eventName);
                // setwhatsappgroup(docSnap.data().whatsappLink);
                console.log(docSnap.data().whatsappLink);


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        // getContent();
        getsingleDoc();
    }, []);


    return (
      <>

            <Header/>
            <section className="c-containerForm">

                <div className='topbanner'>
                    <img className='desktopFormbg' src={postfeedbackImg} />
                    <img className='mobileFormbg' src={mobileFormbg} />
                    {/* <Image src={topbannerimg} placeholder="blur" alt='logo' /> */}

                    

                    {/* <div class="topbanner-navbar ">
                        <div class="topnav">
                            <a href="#home">Home</a>
                            <a href="#news">Feedback</a>
                            <a href={"userprofile/[upid]"} as={"userprofile/" + phoneNum}>Profile</a>
                            <a href="#about">Logout</a>
                        </div>
                    </div> */}
                    <div className="bannertext">
                        <h1>{eventName}</h1>
                    </div>
                </div>

                {/* form start  */}

                {

                    formsubmit ? <div className="sucess">
                        <h2>  Thank you for sharing your responses. </h2>

                        <Link href="/dashboard" ><a className="homelink">Go back to home</a></Link>

                    </div> : <div>
                        <form>
                            {/* {
                        error?<div className="error"><p>required</p></div>:null
                        } */}
                            <div className="form-row">
                                <ul className="form-textfield">
                                <label>Name</label>
                                    <li>
                                        <input type="text"
                                            value={username}
                                            name="username"
                                            disabled
                                            onChange={(event) => {
                                                setusername(event.target.value)
                                            }} />

                                    </li>

                                </ul>
                            </div>
                            
                            <div className="form-row">
                                <ul className="form-textfield">
                                    <label>Phone Number</label>
                                    <li>
                                        <input type="text"
                                            value={phoneNum}
                                            name="phonenumber"
                                            disabled
                                            onChange={(event) => {
                                                setphoneNum(event.target.value)
                                            }} />

                                    </li>

                                </ul>
                            </div>

                               {/* 1st question */}
                               <div className="form-row radio-buttons">
                                <h2>1. Which day will you prefer to have monthly meeting?<sup>*</sup> </h2>

                                <ul>
                                    <li>
                                        <label htmlFor="1A">
                                            <input
                                                id="1A"
                                                value="Saturday"
                                                name="questionOne"
                                                type="radio"
                                                onChange={questionOne}
                                                checked={onecheck == 'Saturday'} />
                                            <div className='custom_radio'></div>
                                            Saturday
                                        </label>

                                    </li>

                                    <li>
                                        <label htmlFor="1B">
                                            <input
                                                id="1B"
                                                value="Sunday"
                                                name="questionOne"
                                                type="radio"
                                                onChange={questionOne}
                                                checked={onecheck == 'Sunday'} />
                                            <div className='custom_radio'></div>
                                            Sunday  </label>
                                    </li>

                                    <li>
                                        <label htmlFor="1C">
                                            <input
                                                id="1C"
                                                value="Week Day "
                                                name="questionOne"
                                                type="radio"
                                                onChange={questionOne}
                                                checked={onecheck == 'Week Day '} />
                                            <div className='custom_radio'></div>
                                            Week Day  </label>
                                    </li>

                                    <li>
                                        <label htmlFor="1D">
                                            <input
                                                id="1D"
                                                value="Any Day "
                                                name="questionOne"
                                                type="radio"
                                                onChange={questionOne}
                                                checked={onecheck == 'Any Day '} />
                                            <div className='custom_radio'></div>
                                            Any Day  </label>
                                    </li>

                                    {/* {onecheck=== "Enter other preferred day" && (  <li>
                                        <input type="text"
                                             id="oneInput"
                                            value={oneQuestionInput}
                                            name="questionOne"
                                            // placeholder='Enter other preferred day'
                                            required
                                            onChange={(event) => {
                                                setOneQuestionInput(event.target.value)
                                            }} />
                                </li> )} */}
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>                           


                            {/* 2nd question */}
                            <div className="form-row radio-buttons">
                                <h2>2. Which time will you prefer for the monthly meeting? <sup>*</sup></h2>
                                <ul>

                                    
                                    <li className='checkbox-style'>
                                        {fivecheck && fivecheck.map((fivedata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={fivedata.name}
                                                        value={fivedata}
                                                        name={fivedata.name}
                                                        checked={fivedata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionTwo} />
                                                
                                                    <label  className='checkbox-label' htmlFor={fivedata.name}> {fivedata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>
                            

                                
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>


                            {/* <div className="form-row radio-buttons">
                                <h2>2. Does the meeting time 4pm-6pm work for you?<sup>*</sup></h2>

                                <ul>
                                    <li>
                                        <label htmlFor="2A">
                                            <input
                                                id="2A"
                                                value="Yes"
                                                name="questionTwo"
                                                type="radio"
                                                onChange={questionTwo}
                                                checked={twocheck == 'Yes'} />
                                            <div className='custom_radio'></div>
                                            Yes
                                        </label>

                                    </li>

                                    <li>
                                        <label htmlFor="2B">
                                            <input
                                                id="2B"
                                                value="Enter other preferred time"
                                                name="questionTwo"
                                                type="radio"
                                                onChange={questionTwo}
                                                checked={twocheck == 'Enter other preferred time'} />
                                            <div className='custom_radio'></div>
                                            Enter other preferred time </label>
                                    </li>

                                    {twocheck==="Enter other preferred time" && (  <li>
                                        <input type="text"
                                             id="twoInput"
                                            value={twoQuestionInput}
                                            name="questionTwo"
                                            // placeholder='Share your preferred time'
                                            required
                                            onChange={(event) => {
                                                setTwoQuestionInput(event.target.value)
                                            }} />
                                </li> )}

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div> */}


                            {/* 3rd question */}
                            <div className="form-row radio-buttons">
                                <h2>3. Which of the initiatives that you have  liked the MOST in this new version of UjustBe Universe? </h2>
                                <ul>

                                    <li>
                                        <label htmlFor="3A">
                                            <input
                                                id="3A"
                                                value="Nucleus Team"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Nucleus Team'} />
                                            <div className='custom_radio'></div>
                                            Nucleus Team</label>
                                    </li>

                                    <li>
                                        <label htmlFor="3B">
                                            <input
                                                id="3B"
                                                value="Communication on WhatsApp group"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Communication on WhatsApp group'} />
                                            <div className='custom_radio'></div>
                                            Communication on WhatsApp group</label>
                                    </li>

                                    <li>
                                        <label htmlFor="3C">
                                            <input
                                                id="3C"
                                                value="Free space"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Free space'} />
                                            <div className='custom_radio'></div>
                                            Free space</label>
                                    </li>

                                    <li>
                                        <label htmlFor="3D">
                                            <input
                                                id="3D"
                                                value="Supernova"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Supernova'} />
                                            <div className='custom_radio'></div>
                                            Supernova</label>
                                    </li>

                                    <li>
                                        <label htmlFor="3E">
                                            <input
                                                id="3E"
                                                value="Values based learning Sessions (offered by Co-founder, Rajeev Ubhe)"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Values based learning Sessions (offered by Co-founder, Rajeev Ubhe)'} />
                                            <div className='custom_radio'></div>
                                            Values based learning Sessions (offered by Co-founder, Rajeev Ubhe)</label>
                                    </li>

                                    

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                            {/* 4th question */}
                            <div className="form-row radio-buttons">
                                <h2>4. Do you think that you can generate referrals by your own? <sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="4A">
                                            <input
                                                id="4A"
                                                value="Yes"
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Yes'} />
                                            <div className='custom_radio'></div>
                                            Yes</label>
                                    </li>

                                    <li>
                                        <label htmlFor="4B">
                                            <input
                                                id="4B"
                                                value="No"
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'No'} />
                                            <div className='custom_radio'></div>
                                            No</label>
                                    </li>

                                  

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                            {/* checkbox */}


                             {/* 5th multiple check box */}
                             <div className="form-row radio-buttons">
                                <h2>5. Do you think that you can take a 3-5 mins knowledge sharing session in our Monthly Meeting? <sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="5A">
                                            <input
                                                id="5A"
                                                value="Yes"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fourcheck == 'Yes'} />
                                            <div className='custom_radio'></div>
                                            Yes</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5B">
                                            <input
                                                id="5B"
                                                value="No"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fourcheck == 'No'} />
                                            <div className='custom_radio'></div>
                                            No</label>
                                    </li>

                                  

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                            {/* <div className="form-row radio-buttons">
                                <h2>5. Do you need immediate help/support from the Nucleus Team in the below areas ? <sup>*</sup></h2>
                                <ul>

                                    
                                    <li className='checkbox-style'>
                                        {fivecheck && fivecheck.map((fivedata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={fivedata.name}
                                                        value={fivedata}
                                                        name={fivedata.name}
                                                        checked={fivedata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionFive} />
                                                
                                                    <label  className='checkbox-label' htmlFor={fivedata.name}> {fivedata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>
                            

                                
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div> */}



                            {/* 6th question */}
                            <div className="form-row radio-buttons">
                            <h2>6. Do you want to be part of Nucleus Team?<sup>*</sup>  </h2>
                            <ul>

                                <li>

                                    <label htmlFor="6A">
                                        <input
                                            id="6A"
                                            value="Yes"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Yes'} />
                                        <div className='custom_radio'></div>
                                        Yes </label>
                                </li>
                                <li>
                                    <label htmlFor="6B">
                                        <input
                                            id="6B"
                                            value="No"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'No'} />
                                        <div className='custom_radio'></div>
                                        No</label>
                                </li>

                               

                             
                                
                             
                          

                               

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 7th Question */}
                        <div className="form-row radio-buttons">
                                <h2>7. Which of the following new initiatives have you experienced? <sup>*</sup></h2>
                                <ul>

                                    
                                    <li className='checkbox-style'>
                                        {sevencheck && sevencheck.map((sevendata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={sevendata.name}
                                                        value={sevendata}
                                                        name={sevendata.name}
                                                        checked={sevendata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionSeven} />
                                                
                                                    <label  className='checkbox-label' htmlFor={sevendata.name}> {sevendata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>
                            

                                
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>



                            {/* submit button */}
                            <div>
                                <button
                                    type="submit"
                                    onClick={CreatForm}
                                >Submit
                                </button>
                            </div>

                        </form>
                    </div>
                }

                {/* form end here */}

            </section>
    </>
    )
}

export default PostFormtwo
