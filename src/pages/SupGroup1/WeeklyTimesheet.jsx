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

const WeeklyTimesheet = () => {
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
    const [fetchedTimeSheetData, SetFetchedTimesheetData] = useState([]);

    useEffect(()=>{
        if(modaldialogbtn2Action=="RSC"){
            
        }
    }, [triggerchage])


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
        // setLoading(true);
        // const result = await getapicallhelper("liason/GetUniversitySupervisorStudentsProfiles", {});
        // if(result.success == true){
        //     setPageData(result?.data?.studentProfiles);
        // }
        // setLoading(false);

        setPageData([
            {
                firstName:"firstname",
                otherNames:"othername",
                lastName:"lastname",
                studentAcademicInformation:{
                    indexNumber:"103000303"
                },
                phoneNumber:"04040404",
                email:"someemail@gmail.com"
            }
        ]);
    };


    const fetchstudenttimesheet = async (studentid) => {
        // setAdding(true);
        // const result = await getapicallhelper(`Liason/GetStudentWeeklyTimesheet?studentId=${studentid}`, {});
        // if(result.success == true){
        //     SetFetchedTimesheetData(result?.data?.timesheetData);
        // }
        // setAdding(false);

        SetFetchedTimesheetData([
            
        ]);
    };
    

    const displayarray = (passedselected, pindex) =>{
        try {
            let result = ["-","-","-","-","-","-","-", "-"];
            if(Array.isArray(passedselected)){
                let keytofind = `Week ${pindex}`;
                let indexvalue = passedselected.findIndex((obj) => obj.week == keytofind);
                if(indexvalue!=-1){
                    let arraytoworkwith = passedselected[indexvalue].data;
                    let newarray = [];
                    let sumtotal = 0;
                    arraytoworkwith.forEach(element => {
                        newarray.push(element.hoursWorked);
                        sumtotal = sumtotal + Number(element.hoursWorked);
                    });
                    newarray.push(sumtotal);
                    result = newarray;
                }
            }
            return result;
        } catch (error) {
            return  ["-","-","-","-","-","-","-", "-"];
        }
    }



    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Weekly TimeSheets</AccessInfo>
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
                    <div className="col col-d-1">Index No</div>
                    <div className="col col-d-2">Student Name</div>
                    <div className="col col-d-3">Phone No</div>
                    <div className="col col-d-4">Email Address</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data?.studentAcademicInformation?.indexNumber}
                        title2 = {`${data?.firstName} ${data.otherNames} ${data.lastName}`}
                        title3 = {data?.phoneNumber}
                        title4 = {data?.email}
                        rowClicked = {(datapassed)=>{
                            setMessage({content:"",type:""});
                            setSelectedData(data);
                            SetFetchedTimesheetData([]);
                            fetchstudenttimesheet(data.id)
                            setFullDataInfo([
                                {
                                    title:"Student Name",
                                    content:`${data?.firstName} ${data.otherNames} ${data.lastName}`
                                },
                                {
                                    title:"Index No",
                                    content:data?.studentAcademicInformation?.indexNumber
                                },
                                {
                                    title:"Student Phone Number",
                                    content:data?.phoneNumber
                                },
                                {
                                    title:"Email Address",
                                    content:`${data?.email}`
                                },
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
                

                <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:20}}>
                    {
                        adding == true &&
                        <>
                        Please wait...
                        <ClipLoader color={colors.primary} loading={true} size={15} />
                        </>
                    }

                    {
                        (adding == false && fetchedTimeSheetData.length > 0) &&
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='9'>{fulldatainfo[0]?.content} Weekly Timesheet</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Week No</Table.Cell>
                                    <Table.Cell>Mon</Table.Cell>
                                    <Table.Cell>Tue</Table.Cell>
                                    <Table.Cell>Wed</Table.Cell>
                                    <Table.Cell>Thur</Table.Cell>
                                    <Table.Cell>Fri</Table.Cell>
                                    <Table.Cell>Sat</Table.Cell>
                                    <Table.Cell>Sun</Table.Cell>
                                    <Table.Cell>Total Days</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>1</Table.Cell>
                                    {
                                        displayarray(fetchedTimeSheetData, 0).map((eachhr, index)=>(
                                            <Table.Cell  key={index}>{eachhr}</Table.Cell>
                                        ))
                                    }
                                </Table.Row>
                            
                                <Table.Row>
                                    <Table.Cell>2</Table.Cell>
                                    {
                                        displayarray(fetchedTimeSheetData, 1).map((eachhr, index)=>(
                                            <Table.Cell  key={index}>{eachhr}</Table.Cell>
                                        ))
                                    }
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.Cell>3</Table.Cell>
                                    {
                                        displayarray(fetchedTimeSheetData, 2).map((eachhr, index)=>(
                                            <Table.Cell  key={index}>{eachhr}</Table.Cell>
                                        ))
                                    }
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>4</Table.Cell>
                                    {
                                        displayarray(fetchedTimeSheetData, 3).map((eachhr, index)=>(
                                            <Table.Cell  key={index}>{eachhr}</Table.Cell>
                                        ))
                                    }
                                </Table.Row>
                            </Table.Body>
                        </Table>
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

export default WeeklyTimesheet;

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