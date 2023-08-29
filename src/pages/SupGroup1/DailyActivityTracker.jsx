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
import { isAfter, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import PopupView from "../../components/General/PopupView";
import { ModalDialog } from "../../components/General/ActionModal";
// import { PendingFullContainer, PendingFullDiv } from "../../components/styles/PendingRegistrations";
import { Confirm, Modal, Button, Header, Image,  Icon, Table } from 'semantic-ui-react'
import { GMulti } from "../../components/styles/GForms";
import moment from "moment";

const DailyActivityTracker = () => {
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
    const formRef = useRef();

    const [indType, setIndType] = useState([]);
    const [countries, setCountries] = useState([]);
    const [popup, setPopup] = useState(false);
    const [confirmPopup, setConfirmPopUp] = useState(false);

    const [regions, setRegions] = useState([]);
    const [allofficers, setAllOfficers] = useState([]);
    const [fulldatainfo, setFullDataInfo] = useState([]);
    const [selectedData, setSelectedData] = useState({});

    useEffect(()=>{
        if(modaldialogbtn2Action=="RSC"){
            // rejectinst();
        }
    }, [triggerchage])


    const approveinst = async() =>{
        let errorList = [];
        if(isValidText(formData?.universitySupervisorRemarks) == false){
            errorList.push("Please enter supervisor's remark");
        }
        if(errorList.length > 0){
            setmodaldialog(true);
            setModalDialogContent({
                content:errorList[0].toString(),
                type:"e",
            })
            return false;
        }
        const datatosave = {
            logId: selectedData.id,
            universitySupervisorRemarks:formData?.universitySupervisorRemarks,
            status:1
        }
        setAdding(true);
        const result = await postapicallhelper("Liason/UniversitySupervisorApproveRejectStudentDailyActivity", datatosave);
        setAdding(false);
        if(result.success == true){
            setmodaldialog(true);
            setModalDialogContent({
                content:result.message,
                type:"s",
            })
            setmodaldialogbtn1Text("OK");
            setmodaldialogbtn2Text("");
            setFormData({...{}});
            setAddNew(false);
            setPopup(false);
            fetchalldata();
        }
        else{
            setmodaldialog(true);
            setModalDialogContent({
                content:result.message,
                type:"e",
            })
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
        setPageData([
            {
                studentName:"Student name",
                entryStartDate: "2020-01-01",
                hoursWorked: 10,
                workDone: "",
                internRemarks:"Some remark"

            }
        ]);
        
        // setLoading(true);
        // const result = await getapicallhelper("liason/GetUniversitySupervisorStudentDailyWorks", {});
        // if(result.success == true){
        //     setPageData(result?.data?.dailyLog);
        //     console.log("result?.data?.dailyLog", result?.data?.dailyLog)
        // }
        // setLoading(false);
    };


    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Unapproved Students Daily Activity Trackers</AccessInfo>
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
                    <div className="col col-d-2">Day</div>
                    <div className="col col-d-3">Hours</div>
                    <div className="col col-d-4">Status</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data.studentName}
                        title2 = {moment(data?.entryStartDate).format('MMMM Do YYYY')}
                        title3 = {data.hoursWorked}
                        title4 = {"Pending"}
                        rowClicked = {(datapassed)=>{
                            setMessage({content:"",type:""});
                            setSelectedData(data);
                            setFullDataInfo([
                                {
                                    title:"Student name",
                                    content:data?.studentName
                                },
                                {
                                    title:"Day",
                                    content:`${moment(data?.entryStartDate).format('MMMM Do YYYY')}`
                                },
                                {
                                    title:"Hours worked",
                                    content:data?.hoursWorked
                                },
                                {
                                    title:"Work Done",
                                    content:data?.workDone
                                },
                                {
                                    title:"Intern's Remark",
                                    content:data?.internRemarks
                                }
                            ])
                            setPopup(true);
                        }}
                        hideviewmore = {true}
                        fullinfo = {[]}
                        data={data} 
                        key={index}
                    />
                    ))}
                </ul>
                </>
            }


            <PopupView payView={popup} setPayView={setPopup}>
                <div style={{minWidth:600}}>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>{fulldatainfo[0]?.content}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                fulldatainfo?.map((eachr, index)=>(
                                    <Table.Row key={index}>
                                        <Table.Cell>{eachr.title}</Table.Cell>
                                        <Table.Cell>{eachr.content}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </div>
                
                <div style={{height:20}}></div>
                
                Add comment
                <GMulti
                    placeholder="enter remark"
                    style={{ marginBottom: 10, width:"100%" }}
                    name="universitySupervisorRemarks"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.universitySupervisorRemarks}
                />
                <div style={{height:10}}></div>

                <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
                    {
                        adding == true &&
                        <>
                        Please wait...
                        <ClipLoader color={colors.primary} loading={true} size={15} />
                        </>
                    }

                    {
                        adding == false && 
                        <> 
                        <GlobalButton
                            background={colors.success}
                            color={"white"}
                            style={generalbtn}
                            onClick={async() => {
                                approveinst();
                            }}>
                        Approve
                        </GlobalButton>
                        </>
                    }
                </div>
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

export default DailyActivityTracker;

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
    padding: "10px 20px",
    width: 100,
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