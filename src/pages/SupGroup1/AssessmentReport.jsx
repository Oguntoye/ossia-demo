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
import { isAfter, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { ModalDialog } from "../../components/General/ActionModal";
import PopupView from "../../components/General/PopupView";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input } from 'semantic-ui-react'
import { GMulti } from "../../components/styles/GForms";
import { AssessmentReportStep1, AssessmentReportStep2, AssessmentReportStep3, AssessmentReportStep4 } from "./SubForms/AssessmentRptSubForms";
import moment from "moment";



const AssessmentReport = () => {
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


    useEffect(()=>{
        if(modaldialogbtn1Action=="CLOSE"){
            setPopup(false);
        }
    }, [triggerchage])


    const fetchalldata = async () => {
        setPageData([
            {
                firstName: "Jane",
                otherNames:"Doe",
                lastName:"Doee",
                email:"janedoe@yahoo.com",
                phoneNumber:"0548765995",
                studentAcademicInformation:{
                    indexNumber:"0103903"
                }
            }
        ]);
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
            return  <AssessmentReportStep1
                        fxhandleChange = {(data)=>{ handleChange(data);}}
                        updateStep = {()=>{setStep(2)}}
                        formData = {formData}
                    />
        }
        else if(index === 2){
            return  <AssessmentReportStep2
                        fxhandleChange = {(data)=>{ handleChange(data);}}
                        updateStep = {()=>{setStep(step + 1)}}
                        previous = {()=>{setStep(step-1)}}
                        formData = {formData}
                    />
        }
        else if(index === 3){
            return  <AssessmentReportStep3
                        fxhandleChange = {(data)=>{ handleChange(data);}}
                        updateStep = {()=>{setStep(step + 1)}}
                        previous = {()=>{setStep(step-1)}}
                        formData = {formData}
                    />
        }
        else if(index === 4){
            return  <AssessmentReportStep4
                        fxhandleChange = {(data)=>{ handleChange(data);}}
                        updateStep = {()=>{setStep(step + 1)}}
                        previous = {()=>{setStep(step-1)}}
                        formData = {formData}
                        complete = {async()=>{
                           
                            let endpointtocall = "";
                            let datatopass = {};
                            if(formData.addnewform == true){
                                endpointtocall = "Liason/AddSupervisorEndorsement";
                                formData.signeddate = moment().format("YYYY-MM-DD");
                                datatopass.data = JSON.stringify(formData);
                                datatopass.studentId = formData.studentid;
                            }
                            else{
                                endpointtocall = "Liason/UpdateSupervisorEndorsement";
                                datatopass.endorsementId = formData.endorsementid;
                                formData.signeddate = moment().format("YYYY-MM-DD");
                                datatopass.data = JSON.stringify(formData);
                            }
                            setmodaldialog(true);
                            setModalDialogContent({content:"",type:"", loading:true});
                            const result = await postapicallhelper(endpointtocall, datatopass);
                            if(result.success == true){
                                setmodaldialogbtn1Action("CLOSE")
                                setModalDialogContent({content:result.message,type:"s", loading:false});
                                fetchalldata();
                            }
                            else{
                                setModalDialogContent({content:result.message,type:"e", loading:false});
                            }
                        }}
                    />
        }
    };


    return (
        <div>
            
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Student Assessment Report</AccessInfo>
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
                <SearchFilter/>
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Student Name</div>
                    <div className="col col-d-2">Email</div>
                    <div className="col col-d-3">Phone No</div>
                    <div className="col col-d-4">Index No</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {`${data?.firstName} ${data?.otherNames} ${data?.lastName}`}
                        title2 = {data?.email}
                        title3 = {data?.phoneNumber}
                        title4 = {data?.studentAcademicInformation?.indexNumber}
                        rowClicked = {(datapassed)=>{

                            let savedExtraData = {};
                            let industryInfo = {};
                            let supervisorInfo = data?.universitySupervisor;

                            let addnewform = false;
                            let endorsementid = 0;
                            try {
                                if(data?.supervisorEndorsements.length > 0){
                                    savedExtraData = JSON.parse(data.supervisorEndorsements[0].data);
                                    addnewform = false;
                                    endorsementid = data.supervisorEndorsements[0].id;
                                }

                                if(data?.industryInfo.length > 0){
                                    industryInfo = data.studentCareers[0];
                                }
                                addnewform = true;
                                endorsementid = 0;
                            } catch (error) {
                                addnewform = true;
                                endorsementid = 0;
                            }

                            let assessmentreportdata = {
                                studentid: data.id,
                                nameofstudent: `${data.firstName} ${data.otherNames} ${data.lastName}`,
                                indexno: data?.studentAcademicInformation?.indexNumber,
                                programme: data?.studentAcademicInformation?.course,
                                level: data?.studentAcademicInformation?.studentLevel,

                                addnewform : addnewform,
                                endorsementid: endorsementid,

                                startingdate: savedExtraData?.startingdate,
                                endingdate: savedExtraData?.endingdate,
                                duties1: savedExtraData?.duties1,
                                duties2: savedExtraData?.duties2,
                                duties3: savedExtraData?.duties3,

                                // nameofindustry: industryInfo?.organizationName,
                                nameofindustry: savedExtraData?.nameofindustry,
                                jobtitle: savedExtraData?.jobtitle,
                                industryaddress: savedExtraData?.industryaddress,
                                industrytown: savedExtraData?.industrytown,
                                industrydistrict: savedExtraData?.industrydistrict,
                                industryregion: savedExtraData?.industryregion,
                                industrytel: savedExtraData?.industrytel,
                                industryfax: savedExtraData?.industryfax,
                                industryemail: savedExtraData?.industryemail,
                                industryexactlocation: savedExtraData?.industryexactlocation,

                                totalscore: savedExtraData?.totalscore,
                                generalremark: savedExtraData?.generalremark,

                                nameofsupervisor: `${supervisorInfo?.firstName} ${supervisorInfo?.lastName}`,
                                signeddate: savedExtraData?.signeddate,
                                noofcredithours: savedExtraData?.noofcredithours,
                                recommendedscoreandgrade: savedExtraData?.recommendedscoreandgrade,

                                skill1name: savedExtraData?.skill1name,
                                skill1grade: savedExtraData?.skill1grade,

                                skill2name: savedExtraData?.skill2name,
                                skill2grade: savedExtraData?.skill2grade,

                                skill3name: savedExtraData?.skill3name,
                                skill3grade: savedExtraData?.skill3grade,

                                generalskillscomment: savedExtraData?.generalskillscomment,

                                q1:savedExtraData?.q1,
                                q2:savedExtraData?.q2,
                                q3:savedExtraData?.q3,
                                q4:savedExtraData?.q4,
                                q5:savedExtraData?.q5,
                                q6:savedExtraData?.q6,
                                q7:savedExtraData?.q7,

                                qq1:savedExtraData?.qq1,
                                qq2:savedExtraData?.qq2,
                                qq3:savedExtraData?.qq3,
                                qq4:savedExtraData?.qq4,
                                qq5:savedExtraData?.qq5,
                                qq6:savedExtraData?.qq6,
                                qq7:savedExtraData?.qq7,

                                qq8:savedExtraData?.qq8,
                                qq9:savedExtraData?.qq9,
                            }

                            // console.log("assessmentreportdata",assessmentreportdata);
                            // console.log("data",data);

                            setFormData(assessmentreportdata);
                            setMessage({content:"",type:"", loading:false});
                            setSelectedData(data);
                            setFullDataInfo([])
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

export default AssessmentReport;

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