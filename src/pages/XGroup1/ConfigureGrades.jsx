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

const ConfigureGrades = () => {
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
        
        if(isValidNumber(formData.industrySupervisorScore) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter a valid industry supervisor score",type:"e", loading:false});
            return false;
        }
        else if(isValidNumber(formData.academicSupervisorScore) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter a valid academic supervisor score",type:"e", loading:false});
            return false;
        }
        else if(isValidNumber(formData.defenseScore) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter a valid defense score",type:"e", loading:false});
            return false;
        }

        let sumtotalofall = Number(formData.industrySupervisorScore) + Number(formData.academicSupervisorScore) + Number(formData.defenseScore);

        if(sumtotalofall != 100){
            setmodaldialog(true);
            setModalDialogContent({content:"Score should add up to 100%",type:"e", loading:false});
            return false;
        }

        let endpointtocall = "";
        if(formData.addnew == "true"){
            endpointtocall = "Liason/AddGradeScore"
        }
        else if(formData.addnew == "false"){
            endpointtocall = "Liason/UpdateGradeScore"
        }

        setmodaldialog(true);
        setModalDialogContent({content:"",type:"", loading:true});
        const result = await postapicallhelper(endpointtocall, formData);
        if(result.success == true){
            setModalDialogContent({content:"Successfully Updated!",type:"s", loading:false});
        }
        else if(result.success == false){
            setModalDialogContent({content:result.message,type:"e", loading:false});
        }
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
        setmodaldialog(true);
        setModalDialogContent({content:"",type:"", loading:true});
        const result = await getapicallhelper("Liason/GetGradeScores", {});
        setmodaldialog(false);
        setModalDialogContent({content:"",type:"", loading:false});

        if(result.success == true){
            if(result?.data?.gradeScores?.length > 0){
                let oldData = Object.assign({}, formData);
                oldData["addnew"] = "false";
                let merged = {...oldData, ...result?.data?.gradeScores[0]};
                setFormData(merged);
            }
            else{
                let oldData = Object.assign({}, formData);
                oldData["addnew"] = "true";
                setFormData(oldData);
            }
        }
        else{
            let oldData = Object.assign({}, formData);
            oldData["addnew"] = "true";
            setFormData(oldData);
        }
    };

    

    return (
        <div style={{maxWidth:700}}>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0", textAlign:'left' }}>Configure Grade Scale</AccessInfo>
            </div>
            

            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>Grading Scale Breakdown</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Industry Supervisor</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="number"
                                name="industrySupervisorScore"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.industrySupervisorScore}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Academic Supervisor</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="number"
                                name="academicSupervisorScore"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.academicSupervisorScore}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Defence</Table.Cell>
                        <Table.Cell>
                            <FormInput
                                type="number"
                                name="defenseScore"
                                onChange={(event) => handleChange(event)}
                                defaultValue = {formData?.defenseScore}
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

export default ConfigureGrades;

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