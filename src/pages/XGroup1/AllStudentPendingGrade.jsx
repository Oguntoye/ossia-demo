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
import { base64tourl, dactualtext, isAfter, isValidNumber, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { ModalDialog } from "../../components/General/ActionModal";
import PopupView from "../../components/General/PopupView";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input } from 'semantic-ui-react'
import { GMulti } from "../../components/styles/GForms";
import moment from "moment";
import { Viewer, Worker } from '@react-pdf-viewer/core';


const AllStudentPendingGrade = () => {
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
            setmodaldialogbtn1Action("")
        }
    }, [triggerchage])


    const fetchalldata = async () => {
        // setLoading(true);
        // const result = await getapicallhelper("liason/GetAllStudentPendingGrade", {});
        // if(result.success == true){
        //     setPageData(result?.data?.studentPendingGrades);
        // }
        // setLoading(false);

        setPageData([
            {
                studentDetail:{
                    firstName:"firstname",
                    otherNames:"othername",
                    lastName: "lastname",
                    email:"sampleemail@gmail.com",
                    phoneNumber:"09940404",
                    indexNumber:"41222222",
                },
                defenseSupervisorGradeScore: 30,
                documentDataString:`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YXRlIChEOjIwMjMwODI1MTkxMDE4WjAwJzAwJykKPj4KZW5kb2JqCnhyZWYKMCAxNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAyNzUgMDAwMDAgbiAKMDAwMDAwMzIyMyAwMDAwMCBuIAowMDAwMDAwMDIyIDAwMDAwIG4gCjAwMDAwMDAzNzkgMDAwMDAgbiAKMDAwMDAwMzE4OCAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMDMzNTUgMDAwMDAgbiAKMDAwMDAwMDQ3NiAwMDAwMCBuIAowMDAwMDAzMzA2IDAwMDAwIG4gCjAwMDAwMDM5NTEgMDAwMDAgbiAKMDAwMDAwMzU2OSAwMDAwMCBuIAowMDAwMDA0MTg3IDAwMDAwIG4gCjAwMDAwMTQyMjYgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxNCAvUm9vdCA5IDAgUiAvSW5mbyAxMyAwIFIgL0lEIFsgPGU3NDMzNGFhMTZkN2EwMDQ4NjQ0Yjk5OGFjNjI2ZGNjPgo8ZTc0MzM0YWExNmQ3YTAwNDg2NDRiOTk4YWM2MjZkY2M+IF0gPj4Kc3RhcnR4cmVmCjE0NDQwCiUlRU9GCg==`
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


    const submitdata = async() =>{
        
        if(isValidNumber(formData.score) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter a valid score",type:"e", loading:false});
            return false;
        }

        setmodaldialog(true);
        setModalDialogContent({content:"",type:"", loading:true});
        const result = await postapicallhelper("Liason/DefenseSupervisorScorePendingGrade", formData);
        if(result.success == true){
            setModalDialogContent({content:"Successfully Updated!",type:"s", loading:false});
            setmodaldialogbtn1Action("CLOSE");
            fetchalldata();
        }
        else if(result.success == false){
            setModalDialogContent({content:result.message,type:"e", loading:false});
        }
    }

 

    return (
        <div>
            
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Student Pending Grade</AccessInfo>
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
                        title1 = {`${dactualtext(data?.studentDetail?.firstName)} ${dactualtext(data?.studentDetail?.otherNames)} ${dactualtext(data?.studentDetail?.lastName)}`}
                        title2 = {data?.studentDetail?.email}
                        title3 = {data?.studentDetail?.phoneNumber}
                        title4 = {data?.studentDetail?.indexNumber}
                        rowClicked = {(datapassed)=>{
                            let oldData = Object.assign({}, formData);
                            oldData["id"] = data?.id;
                            oldData["score"] = data?.defenseSupervisorGradeScore;
                            setFormData(oldData);

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
                <div style={{minWidth:600, border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '750px'}}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                        <Viewer fileUrl={base64tourl(selectedData?.documentDataString)} />
                    </Worker>
                </div>
                <div style={{height:20}}></div>
                <div style={centerall}>
                <GlobalButton
                    background={colors.success}
                    color={"white"}
                    style={{...generalbtn, ...{width:"100%"}}}
                    onClick={async() => {
                        window.open(base64tourl(selectedData?.documentDataString), '_blank', 'noopener,noreferrer');
                    }}>
                Open PDF In New Tab
                </GlobalButton>
                </div>
                <div style={{height:20}}></div>
                
                Score *
                <FormInput
                    type="text"
                    required
                    placeholder="enter score"
                    style={{ marginBottom: 10 }}
                    name="score"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.score}
                />

                <div style={centerall}>
                <GlobalButton
                    background={[colors.primary, {}]}
                    color={"white"}
                    style={generalbtn}
                    onClick={async() => {
                        submitdata();
                    }}>
                Grade Student
                </GlobalButton>
                </div>

               
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

export default AllStudentPendingGrade;

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


const generalbtn = {
    margin: 0,
    borderRadius: 5,
    padding: "13px 30px",
    width: 200,
}

const centerall = {
    display:"flex",
    justifyContent:'center',
    alignItems:'center'
}