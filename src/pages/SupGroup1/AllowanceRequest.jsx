import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import TRow from "../../components/General/TRow";
import {AccessInfo,FormInput,DataListInput, ViewSliderContainer} from "../../components/styles/Access";
import {DashSearchContainer} from "../../components/styles/Dashboard";
import { GlobalButton } from "../../components/styles/Global";
import { colors } from "../../utils/colors";
import "../../components/styles/DuesTable.scss";
import "../../components/styles/join.css";
import { ClipLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useRef } from "react";
import { arraydatatoextract, isAfter, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { ModalDialog } from "../../components/General/ActionModal";
import PopupView from "../../components/General/PopupView";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input } from 'semantic-ui-react'
import { GMulti } from "../../components/styles/GForms";
import { EOIReportStep1, EOIReportStep2, EOIReportStep3, EOIReportStep4 } from "./SubForms/EOISubForms";
import { AllowanceRequestStep1 } from "./SubForms/AllowanceRequestSubForms";



const AllowanceRequest = () => {
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

    const [popup, setPopup] = useState(false);
    const [confirmPopup, setConfirmPopUp] = useState(false);

    const [regions, setRegions] = useState([]);
    const [allofficers, setAllOfficers] = useState([]);
    const [fulldatainfo, setFullDataInfo] = useState([]);
    const [selectedData, setSelectedData] = useState({});


    const [addNew, setAddNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [message, setMessage] = useState({
        content:"",
        type:""
    });

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({});
    useEffect(() => {
        fetchalldata();
    }, []);


    const fetchalldata = async () => {
        setLoading(true);
        const result = await getapicallhelper("liason/getinternshipduration", {});
        if(result.success ==  true){
            console.log("result",result);
            setPageData(result?.data?.internshipDurations);
            console.log("result?.data?.internshipDurations",result?.data?.internshipDurations);
        }
        else{
            //logout
        }
        setLoading(false);
    };

    const handleChange = (event) => {
		setMessage({content:"",type:""})
		let objectkey = event.target.name;
		let objectvalue = event.target.value;
		let oldData = Object.assign({}, formData);
		oldData[objectkey] = objectvalue;
		setFormData(oldData);
	};


  
    const renderView = ({ index, active, transitionState, props }) => {
        if(index === 1){
            return  <AllowanceRequestStep1
                        fxhandleChange = {(data)=>{ handleChange(data);}}
                        updateStep = {()=>{
                            alert("hello")
                        }}
                        formData = {formData}
                    />
        }
    };


    return (
        <div>
            
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Supervisor's Claims Form</AccessInfo>
            </div>

            {
                isValidText(message.content) &&
                <>
                <DashSearchContainer
                style={{
                    margin: "10px 0",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: `${message.type == "err" ? colors.danger : colors.success}`,
                    border: "none",
                    color: "white",
                }}
                >
                {message.content}
                <MdError color={"white"} size={20} />
                </DashSearchContainer>
                </>
            }
            

            {
                loading &&
                <DashSearchContainer
                style={{
                    margin: "10px 0",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgba(0, 0, 0, 0.09)",
                }}
                >
                Loading..
                <ClipLoader color={colors.primary} loading={true} size={15} />
                </DashSearchContainer>
            }


            {
                (loading == false && pageData.length == 0 && message.type != "err") && 
                <DashSearchContainer style={nodatayet}>
                Currently don't have any data yet!
                <IoNotificationsCircleSharp color={colors.primary} size={30} />
                </DashSearchContainer>
            }

               


            {
                (loading == false && pageData.length > 0) &&
                <>
                <SearchFilter
                    showexcelbtn = {true}
                    excelname = "exceldocument.csv"
                    exceldata = {arraydatatoextract(pageData, ["studentname"])}
                />
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Title</div>
                    <div className="col col-d-2">Start At</div>
                    <div className="col col-d-3">End At</div>
                    <div className="col col-d-4">Status</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data.title}
                        title2 = {data.startDate}
                        title3 = {data.endDate}
                        title4 = {data.status}
                        rowClicked = {(datapassed)=>{
                            setMessage({content:"",type:""});
                            setSelectedData(data);
                            setFullDataInfo([
                                {
                                    title:"Student name",
                                    content:data.studentname
                                }
                            ])
                            setPopup(true);
                            setStep(1);
                        }}
                        fullinfo = {[]}
                        data={data} 
                        key={index}
                        hideviewmore = {true}
                    />
                    ))}
                </ul>
                </>
            }


            <PopupView payView={popup} setPayView={setPopup}>
                <div style={{minWidth:600}}>
                    <ViewSliderContainer
                        renderView={renderView}
                        numViews={3}
                        activeView={step}
                        animateHeight
                        passedonchange = {(data)=>{
                            handleChange(data)
                        }}
                    />
                </div>
                <div style={{height:20}}></div>
            </PopupView>

            

            <ModalDialog
                modalVisible ={modaldialog}
                setmodaldialog = {setmodaldialog}
                btn1Text = {modaldialogbtn1Text}
                btn2Text = {modaldialogbtn2Text}
                btn1Pressed = {()=>{
                    setmodaldialog(false)
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

export default AllowanceRequest;

const titles = {
    margin: "15px 0",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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