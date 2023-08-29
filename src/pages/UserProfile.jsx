import React, { useEffect, useState } from "react";
import {
    DashSearchContainer,
} from "../components/styles/Dashboard";
import {
    ProfileCoverContainer,
    ProfileCoverImg,
    ProfileIfoContainer,
    ProfileImgUser,
    ProfileInfoSub,
    ProfileName,
    ProfileSchoolCourse,
    ProfileSchoolTitleHome,
    ProfileSectionCard,
    ProfileType,
} from "../components/styles/Profile";
import { ClipLoader } from "react-spinners";
import { colors } from "../utils/colors";
import { FaUniversity } from "react-icons/fa";
import { GlobalButton, GlobalDashButton } from "../components/styles/Global";
import { isValidText, ToSentenceCase } from "../utils/helpers";
import { ModalDialog } from "../components/General/ActionModal";
import PopupView from "../components/General/PopupView";
import { Confirm, Modal, Button, Header, Image,  Icon, Table} from 'semantic-ui-react'
import { FormInput } from "../components/styles/Access";
import { Link, useNavigate } from "react-router-dom";
import { postapicallhelper } from "../network/ApiHelper";

const UserProfile = () => {
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
    const [popup, setPopup] = useState(false);

    const [addNew, setAddNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [message, setMessage] = useState({
        content:"",
        type:""
    });
    const [formData, setFormData] = useState({});
    const [pageInfo, setPageInfo] = useState({});
    useEffect(() => {
        fetchalldata();
    }, []);

    const navigate = useNavigate();

    useEffect(()=>{
        if(modaldialogbtn1Action=="CLOSE"){
            window.localStorage.clear()
            navigate("/", { replace: true });
        }
    }, [triggerchage])


    const fetchalldata = async () => {
        try{
            let getlocalstoragedata = window.localStorage.getItem("user");
            getlocalstoragedata = JSON.parse(getlocalstoragedata);

            console.log("getlocalstoragedata",getlocalstoragedata)

            let fullname = `${getlocalstoragedata?.userProfile?.firstName} ${getlocalstoragedata?.userProfile?.lastName}`
            let objtoset = {
                fullname: fullname,
                role: `${getlocalstoragedata?.userProfile?.position}`
            }
            setPageData(objtoset);
        }
        catch(e){
        }
    };


    const handleChange = (event) => {
		setMessage({content:"",type:""})
		let objectkey = event.target.name;
		let objectvalue = event.target.value;
		let oldData = Object.assign({}, formData);
		oldData[objectkey] = objectvalue;
		setFormData(oldData);
	};



    const submitdata = async() =>{
       
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
            // setMessage({content:result.message,type:"err"});
            setModalDialogContent({content:result.message,type:"e", loading:false});
        }
    }



    return (
        <>
        {loading ? (
            <DashSearchContainer
            style={{
                margin: "10px 0",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.09)",
            }}
            >
            Please wait, loading additional profile details..
            <ClipLoader color={colors.primary} loading={true} size={15} />
            </DashSearchContainer>
        ) : null}

            
        <ProfileSectionCard style={{ padding: 0, marginTop: 20 }}>
            <ProfileCoverContainer style={{ width: "100%", margin: 0 }}>
            <ProfileCoverImg
                src={require("../assets/landingbackground.jpg")}
            />
            <ProfileIfoContainer>
                <ProfileImgUser src={require("../assets/avatar.jpeg")} />
                <ProfileInfoSub>
                <ProfileName>{pageData.fullname}</ProfileName>
                <ProfileType>
                    <span style={{ color: colors.primary, fontWeight: "bold" }}>
                    {pageData.role}
                    </span>
                </ProfileType>
                </ProfileInfoSub>
                <GlobalDashButton
                background={"white"}
                color="black"
                border="#CDCDCD"
                style={{ alignSelf: "flex-end" }}
                onClick={() => {
                    setPopup(true)
                    // navigate("/dashboard/editprofile")
                }}
                >
                Change Password
                </GlobalDashButton>
            </ProfileIfoContainer>
            </ProfileCoverContainer>
            <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: 15,
                alignItems: "center",
            }}
            >
            <div
                style={{
                display: "flex",
                margin: 10,
                marginTop: 20,
                alignItems: "center",
                }}
            >
                <div style={{ marginRight: 10 }}>
                <img
                    alt="logo"
                    src={require("../assets/logo-circular.png")}
                    width={35}
                    height={35}
                />
                </div>
                <div>
                <ProfileSchoolTitleHome>
                    Kumasi Technical University
                </ProfileSchoolTitleHome>
                </div>
            </div>
            </div>
        </ProfileSectionCard>

            <PopupView payView={popup} setPayView={setPopup}>
                <div style={{minWidth:600}}>
                    {/* <h1>Hello </h1> */}
                    
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>Update Password</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Old Password</Table.Cell>
                                <Table.Cell colSpan='3'>
                                    <FormInput
                                        type="password"
                                        name="oldpassword"
                                        onChange={(event) => handleChange(event)}
                                        defaultValue = {formData?.oldpassword}
                                    />
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>New Password</Table.Cell>
                                <Table.Cell colSpan='3'>
                                    <FormInput
                                        type="password"
                                        name="newpassword"
                                        onChange={(event) => handleChange(event)}
                                        defaultValue = {formData?.newpassword}
                                    />
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>Confirm New Password</Table.Cell>
                                <Table.Cell colSpan='3'>
                                    <FormInput
                                        type="password"
                                        name="confirmpassword"
                                        onChange={(event) => handleChange(event)}
                                        defaultValue = {formData?.confirmpassword}
                                    />
                                </Table.Cell>
                            </Table.Row>


                        </Table.Body>
                    </Table>


                    <GlobalButton
                        background={colors.success}
                        color={"white"}
                        style={generalbtn}
                        onClick={async() => {
                            submitdata();
                        }}>
                    Update
                    </GlobalButton>

                </div>
                <div style={{height:20}}></div>
            </PopupView>

            

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



        </>
    );
};

export default UserProfile;

const generalbtn = {
    margin: 0,
    borderRadius: 5,
    padding: "13px 30px",
    width: 200,
}
