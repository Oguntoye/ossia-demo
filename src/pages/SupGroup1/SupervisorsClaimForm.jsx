import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import TRow from "../../components/General/TRow";
import {AccessInfo,FormInput,DataListInput} from "../../components/styles/Access";
import {DashSearchContainer} from "../../components/styles/Dashboard";
import { GlobalButton } from "../../components/styles/Global";
import { colors } from "../../utils/colors";
import "../../components/styles/DuesTable.scss";
import "../../components/styles/join.css";
import { ClipLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useRef } from "react";
import { isAfter, isValidNumber, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import PopupView from "../../components/General/PopupView";
import { ModalDialog } from "../../components/General/ActionModal";
// import { PendingFullContainer, PendingFullDiv } from "../../components/styles/PendingRegistrations";
import { Confirm, Modal, Button, Header, Image,  Icon, Table } from 'semantic-ui-react'

const SupervisorsClaimForm = () => {
    const [modaldialog, setmodaldialog] = useState(false);
    const [modaldialogbtn1Text, setmodaldialogbtn1Text] = useState("");
    const [modaldialogbtn2Text, setmodaldialogbtn2Text] = useState(null);
    const [modaldialogbtn2Action, setmodaldialogbtn2Action] = useState(null);
    const [triggerchage, settriggerchange] = useState(false);
    const [modalDialogContent, setModalDialogContent] = useState({
        content:"",
        type:"",
        headertitle:""
    });


    const [addNew, setAddNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [message, setMessage] = useState({
        content:"",
        type:""
    });

    const [formData, setFormData] = useState({});
    const [selectedData, setSelectedData] = useState({});

    useEffect(()=>{
        if(modaldialogbtn2Action=="RSC"){
        }
    }, [triggerchage])



    const submitdata = async() =>{
        // alert(formData.)
        // return false;
        
        if(isValidNumber(formData.noofinterns) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter number of Interns monitored",type:"e", loading:false});
            return false;
        }
        else if(isValidNumber(formData.periodofinternships) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter period of Internship in weeks",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.startdate) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter a valid start date",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.enddate) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter a valid end date",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.agreeed) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please agree",type:"e", loading:false});
            return false;
        }


        setTimeout(()=>{
            setModalDialogContent({content:"Successfully Updated!",type:"s", loading:false});
        }, 1000)
        setmodaldialog(true);
        setModalDialogContent({content:"",type:"", loading:true});
    }


    useEffect(() => {
        fetchalldata();
    }, []);


    const handleChange = (event) => {
		setMessage({content:"",type:""})
		let objectkey = event.target.name;
		let objectvalue = event.target.value;
		let oldData = Object.assign({}, formData);
		oldData[objectkey] = objectvalue;
		setFormData(oldData);
	};

    const fetchalldata = async () => {
        let oldData = Object.assign({}, formData);
        oldData["title"] = "Mr.";
        oldData["lecturername"] = "Mr. George Oswald";
        oldData["faculty"] = "Faculty of Arts ";
        setFormData(oldData);
    };

    

    return (
        <div style={{maxWidth:700}}>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0", textAlign:'left' }}>Supervisor's Claim Form</AccessInfo>
            </div>
            

            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>Internship Monitoring Claims Form</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Name Of Lecturer</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="text"
                                name="lecturername"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.lecturername}
                                disabled
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Title</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="text"
                                name="title"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.title}
                                disabled
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Faculty</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="text"
                                name="faculty"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.faculty}
                                disabled
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>No Of Interns Monitored During This Period</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="number"
                                name="noofinterns"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.noofinterns}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Period Of Internship (In Weeks)</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="number"
                                name="periodofinternships"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.periodofinternships}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Start Date For Monitoring</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="date"
                                name="startdate"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.startdate}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>End Date For Monitoring</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="date"
                                name="enddate"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.enddate}
                            />
                        </Table.Cell>
                    </Table.Row>


                </Table.Body>
            </Table>

            <input 
                type="radio"
                onChange={(event) => handleChange(event)} 
                value="1" 
                name="agreeed"
            /> I agree that by submitting this form, I lay claim on Kumasi Technical University to honour payments for my internship monitoring. Any false information provided renders my claim null and void. 

            <br/><br/>
            <GlobalButton
                background={colors.success}
                color={"white"}
                style={generalbtn}
                onClick={async() => {
                    submitdata();
                }}>
            Update
            </GlobalButton>
            
            

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

        </div>
    );
};

export default SupervisorsClaimForm;

const titles = {
    margin: "15px 0",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const btncancel = {
    margin: 0,
    marginRight: 20,
    borderRadius: 5,
    padding: "10px 20px",
    width: 100,
}

const btnsuccess = {
    margin: 0,
    borderRadius: 5,
    padding: "10px 20px",
    width: 100,
}

const generalbtn = {
    margin: 0,
    borderRadius: 5,
    padding: "13px 30px",
    width: 200,
}

const nodatayet = {
    margin: "10px 0",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.09)",
    backgroundColor: "#f8f8fa",
    fontSize: 14,
}