import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {
    AccessAppName,
    AccessContainer,
    AccessForm,
    AccessFormContainer,
    AccessInfo,
    AccessIntroIcon,
    AccessNav,
    FormInput,
    ViewSliderContainer,
} from "../components/styles/Access";
import { GlobalButton, LandingFooter } from "../components/styles/Global";
import { colors } from "../utils/colors";
import { LandingSelector } from "../components/styles/Landing";
import { PropagateLoader } from "react-spinners";
import { HiArrowNarrowRight } from "react-icons/hi";
import { ModalDialog } from "../components/General/ActionModal";
import { postapicallhelper } from "../network/ApiHelper";
import { PasswordResetStep1, PasswordResetStep2} from "./MultipleScreens/PasswordReset";
import { isValidText } from "../utils/helpers";

const ResetPassword = () => {
    const [modaldialog, setmodaldialog] = useState(false);
    const [modaldialogbtn1Text, setmodaldialogbtn1Text] = useState("");
    const [modaldialogbtn2Text, setmodaldialogbtn2Text] = useState(null);
    const [modaldialogbtn1Action, setmodaldialogbtn1Action] = useState(null);
    const [modaldialogbtn2Action, setmodaldialogbtn2Action] = useState(null);
    const [triggerchage, settriggerchange] = useState(false);
    const [modalDialogContent, setModalDialogContent] = useState({
        content:"",
        type:"",
        headertitle:""
    });

    const [step, setStep] = useState(1);
    const [type, setType] = useState(null);
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(modaldialogbtn1Action=="CLOSE"){
            window.localStorage.clear()
            navigate("/", { replace: true });
        }
    }, [triggerchage])


    const renderView = ({ index, active, transitionState, props }) => {
        if(index === 1){
            return  <PasswordResetStep1
                        fxhandleChange = {(data)=>{ handleChange(data)}}
                        updateStep = {async()=>{
                            if(isValidText(formData.email) ==  false){
                                setmodaldialog(true);
                                setModalDialogContent({content:"Please enter your email address",type:"e", loading:false});
                                return false;
                            }


                            let datatosave = {
                                email: formData.email,
                                loginURL: "https://liaison.ossiaportal.com/",
                            }

                            
                            setmodaldialog(true);
                            setModalDialogContent({content:"",type:"", loading:true});
                            const result = await postapicallhelper("Liason/ForgotPassword", datatosave);
                            console.log("result", result);
                            if(result.success == true){
                                setModalDialogContent({content:"Login instruction sent to your email address",type:"s", loading:false});
                                setmodaldialogbtn1Action("CLOSE");
                            }
                            else if(result.success == false){
                                setModalDialogContent({content:result.message,type:"e", loading:false});
                            }            
                            
                        }}
                        formData = {formData}
                    />
        }
        if(index === 2){
            return  <PasswordResetStep2
                        fxhandleChange = {(data)=>{ handleChange(data)}}
                        updateStep = {async()=>{
                            if(isValidText(formData.oldpassword) ==  false){
                                setmodaldialog(true);
                                setModalDialogContent({content:"Please enter old password",type:"e", loading:false});
                                return false;
                            }
                            else if(isValidText(formData.newpassword) ==  false){
                                setmodaldialog(true);
                                setModalDialogContent({content:"Please enter new password",type:"e", loading:false});
                                return false;
                            }
                            else if(isValidText(formData.confirmpassword) ==  false){
                                setmodaldialog(true);
                                setModalDialogContent({content:"Please confirm password",type:"e", loading:false});
                                return false;
                            }
                            else if(formData.newpassword != formData.confirmpassword){
                                setmodaldialog(true);
                                setModalDialogContent({content:"Password does not match",type:"e", loading:false});
                                return false;
                            }
                    
                            let datatosave = {
                                oldPassword: formData.oldpassword,
                                newPassword: formData.newpassword,
                            }
                            setmodaldialog(true);
                            setModalDialogContent({content:"",type:"", loading:true});
                            const result = await postapicallhelper("Liason/ChangePassword", datatosave);
                            console.log("result", result)
                            if(result.success == true){
                                setModalDialogContent({content:"Successfully updated!",type:"s", loading:false});
                                setmodaldialogbtn1Action("CLOSE");
                                setFormData({...{}});
                            }
                            else{
                                setModalDialogContent({content:result.message,type:"e", loading:false});
                            }
                        }}
                        formData = {formData}
                    />
        }
    };

    
    const handleChange = (event) => {
		let objectkey = event.target.name;
		let objectvalue = event.target.value;
		let oldData = Object.assign({}, formData);
		oldData[objectkey] = objectvalue;
		setFormData(oldData);
	};


    return (
        <AccessContainer>
            <AccessNav>
                <AccessIntroIcon
                    src={require("../assets/logo-circular.png")}
                    alt="icon"
                    title="Home"
                    onClick={() => navigate("/")}
                />
                <AccessAppName>OSSIA</AccessAppName>
                <div style={{ flex: 1 }} />
                <Link to="/" style={{ textDecoration: "none" }}>
                <GlobalButton
                    style={{ width: "100%" }}
                    background={colors.primary}
                    color="white"
                    border={colors.primary}
                >
                    Login
                </GlobalButton>
                </Link>
            </AccessNav>

            <div style={{ display: "flex", width: "100%" }}>
                <LandingSelector transition={step === 4} style={{ margin: 0 }}>
                <AccessInfo>Password Reset</AccessInfo>
                </LandingSelector>
                <LandingSelector transition={step !== 4} style={{ margin: 0 }}>
                <AccessInfo>Password changed successfully.</AccessInfo>
                </LandingSelector>
            </div>

            <AccessFormContainer>
                <ViewSliderContainer
                    renderView={renderView}
                    numViews={3}
                    activeView={step}
                    animateHeight
                />
            </AccessFormContainer>

            
            <ModalDialog
                modalVisible ={modaldialog}
                setmodaldialog = {setmodaldialog}
                btn1Text = {modaldialogbtn1Text}
                btn2Text = {modaldialogbtn2Text}
                btn1Pressed = {()=>{
                    setmodaldialog(false);
                    settriggerchange(!triggerchage);
                }}
                btn2Pressed = {()=>{
                    setmodaldialog(false)
                    settriggerchange(!triggerchage);
                }}
                modalDialogContent = {modalDialogContent}
            />
               

        </AccessContainer>
    );
};

export default ResetPassword;
