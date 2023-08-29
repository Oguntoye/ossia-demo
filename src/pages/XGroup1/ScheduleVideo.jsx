import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import TRow from "../../components/General/TRow";
import {AccessInfo,FormInput,DataListInput} from "../../components/styles/Access";
import {ProfileInputMulti} from "../../components/styles/Profile";
import {DashSearchContainer} from "../../components/styles/Dashboard";
import { GlobalButton } from "../../components/styles/Global";
import { colors } from "../../utils/colors";
import "../../components/styles/DuesTable.scss";
import "../../components/styles/join.css";
import { ClipLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useRef } from "react";
import { isAfter, isValidEmail, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { Button, Card, Image, Form, Dropdown, Divider, Grid, Segment } from 'semantic-ui-react'
import { DivHalf, DivQuarter, FullDiv, FullDivRow } from "../../components/styles/GForms";
import { ModalDialog } from "../../components/General/ActionModal";
import moment from "moment";

const ScheduleVideo = () => {
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

    const [instRole, setIndusRole] = useState([]);
    const [meetingApp, setMeetingApp] = useState("");

    const [hostingOrganization, setHostingOrganization] = useState([
        {
            label:"Loading...",
            value:""
        }
    ]);
    const [allhostingOrg, setAllHostingOrg] = useState([]);


    const [students, setStudents] = useState([
        {
            label:"Loading...",
            value:""
        }
    ]);
    const [allStudents, setAllStudents] = useState([]);
    const [allSelectedStudents, setAllSelectedStudents] = useState([]);
   

    const [hostingOrgUsers, setHostOrgUsers] = useState([
        {
            label:"Loading...",
            alue:""
        }
    ]);
    const [allhostingOrgUsers, setAllHostingOrgUsers] = useState([]);
    const [allselectedhostingOrgUsers, setAllSelectedHostingOrgUsers] = useState([]);


    const [LiasonOfficerUsers, setLiasonOfficerUsers] = useState([
        {
            label:"Loading...",
            alue:""
        }
    ]);
    const [allLiasonOfficerUsers, setAllLiasonOfficerUsers] = useState([]);
    const [allSelectedLiasonOfficerUsers, setAllSelectedLiasonOfficerUsers] = useState([]);


    const prefetchdata = async() =>{
        const result = await getapicallhelper("liason/getapprovedindustries", {});
        setAllHostingOrg(result?.data?.industries);
        let newresults = [];
        for (let index = 0; index < result?.data?.industries.length; index++) {
            const element = result?.data?.industries[index];
            newresults.push({
                label:element.companyName,
                value:element.id,
            })
        }
        setHostingOrganization(newresults);

        let studentprofiles = [];
        const result2 = await getapicallhelper("liason/GetStudentProfiles", {});
        setAllStudents(result2?.data?.studentProfiles);
        for (let index = 0; index < result2?.data?.studentProfiles.length; index++) {
            const data = result2?.data?.studentProfiles[index];
            studentprofiles.push({
                label:`${data?.firstName} ${data?.otherNames} ${data?.lastName}`,
                value:data.id,
            })
        }
        setStudents(studentprofiles); 

        let hostingOrg = [];
        const result3 = await getapicallhelper("liason/GetStudentProfiles", {});
        setAllHostingOrgUsers(result3?.data?.studentProfiles);
        for (let index = 0; index < result3?.data?.studentProfiles.length; index++) {
            const data = result3?.data?.studentProfiles[index];
            hostingOrg.push({
                label:`${data?.firstName} ${data?.otherNames} ${data?.lastName}`,
                value:data.id,
            })
        }
        setHostOrgUsers(hostingOrg); 


        let liasUsers = [];
        const result4 = await getapicallhelper("liason/GetStudentProfiles", {});
        setAllLiasonOfficerUsers(result4?.data?.studentProfiles);
        for (let index = 0; index < result4?.data?.studentProfiles.length; index++) {
            const data = result4?.data?.studentProfiles[index];
            liasUsers.push({
                label:`${data?.firstName} ${data?.otherNames} ${data?.lastName}`,
                value:data.id,
            })
        }
        setLiasonOfficerUsers(hostingOrg); 
    }
    

    useEffect(()=>{
        if(modaldialogbtn2Action=="RSC"){
            window.location.reload();
        }
    }, [triggerchage])




    useEffect(() => {
        prefetchdata();

        // fetchalldata();
        setPageData(meetingData);
    }, []);


    const handleChange = (event) => {
		setMessage({content:"",type:""})
		let objectkey = event.target.name;
		let objectvalue = event.target.value;
		let oldData = Object.assign({}, formData);
		oldData[objectkey] = objectvalue;
		setFormData(oldData);
	};

    // const fetchallorg = async () => {
        
        // setLoading(true);
        // const result2 = await getapicallhelper("setup/getroles", {});
        // let allroles = [];
        // result2?.data?.roles?.forEach(element => {
        //     allroles.push({label: element.value, value:element.key})
        // });
        // setIndusRole(allroles);

        // console.log(" result2?.data?.roles", result2?.data?.roles);

        // const result3 = await getapicallhelper("liason/getallstaff", {});
        // setPageData(result3?.data?.allStaff);
        // console.log("result3allstaff",result3);

        // setLoading(false);
    // };

    // const fetchalldata = async () => {
        
    //     setLoading(true);
    //     const result2 = await getapicallhelper("setup/getroles", {});
    //     let allroles = [];
    //     result2?.data?.roles?.forEach(element => {
    //         allroles.push({label: element.value, value:element.key})
    //     });
    //     setIndusRole(allroles);

    //     console.log(" result2?.data?.roles", result2?.data?.roles);

    //     const result3 = await getapicallhelper("liason/getallstaff", {});
    //     setPageData(result3?.data?.allStaff);
    //     console.log("result3allstaff",result3);

    //     setLoading(false);
    // };



    const request = async (e) => {
        e.preventDefault();

     
        console.log("allStudents", allStudents);
        console.log("allhostingOrgUsers", allhostingOrgUsers);
        console.log("allLiasonOfficerUsers", allLiasonOfficerUsers);
        // return false;
       
        if(isValidText(formData.hostingorgid) ==  false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select hosting organization",type:"e", loading:false});
            return false;
        }
        else if(allSelectedStudents.length == 0){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select at least one student participant",type:"e", loading:false});
            return false;
        }
        else if(allselectedhostingOrgUsers.length == 0){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select at least one hosting organization participant",type:"e", loading:false});
            return false;
        }
        else if(allSelectedLiasonOfficerUsers.length == 0){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select at least one liason officer participant",type:"e", loading:false});
            return false;
        }
        else if(meetingApp != "ZOOM" && meetingApp !="GMEET"){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select meeting application",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.date0) == false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select starting date",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.date1) == false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select starting time",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.date2) == false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please select ending time",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.meetingtitle) == false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter meeting title",type:"e", loading:false});
            return false;
        }
        else if(isValidText(formData.meetingdetails) == false){
            setmodaldialog(true);
            setModalDialogContent({content:"Please enter meeting details",type:"e", loading:false});
            return false;
        }
        else if(formData.date1 > formData.date2){
            setmodaldialog(true);
            setModalDialogContent({content:"Start time cannot be more than End time",type:"e", loading:false});
            return false;
        }

        let a = moment(formData.date2, "HH:mm:ss");//now
        let b = moment(formData.date1, "HH:mm:ss");
        let midifference = a.diff(b, 'minutes');  //If it's negative.. cancel it
        if(Number(midifference) <=0 ){
            setmodaldialog(true);
            setModalDialogContent({content:"Invalid time selection",type:"e", loading:false});
            return false;
        }
        
        let fullstartdate = `${formData.date0}T${formData.date1}:00`;

        let allfullzoomdetails = [];
        allSelectedStudents.forEach(element => {
            let filteredArr = allStudents.filter(function(obj) {
                return obj.id === element.value;
            });
            if(filteredArr.length > 0){
                filteredArr = filteredArr[0];
                allfullzoomdetails.push({
                    name:`${filteredArr.firstName} ${filteredArr.lastName}`,
                    email: `${filteredArr.email}`
                })
            }
        });

        allselectedhostingOrgUsers.forEach(element => {
            let filteredArr = allhostingOrgUsers.filter(function(obj) {
                return obj.id === element.value;
            });
            if(filteredArr.length > 0){
                filteredArr = filteredArr[0];
                allfullzoomdetails.push({
                    name:`${filteredArr.firstName} ${filteredArr.lastName}`,
                    email: `${filteredArr.email}`
                })
            }
        });

        allSelectedLiasonOfficerUsers.forEach(element => {
            let filteredArr = allLiasonOfficerUsers.filter(function(obj) {
                return obj.id === element.value;
            });
            if(filteredArr.length > 0){
                filteredArr = filteredArr[0];
                allfullzoomdetails.push({
                    name:`${filteredArr.firstName} ${filteredArr.lastName}`,
                    email: `${filteredArr.email}`
                })
            }
        });


        let datatosave = {
            topic: formData.meetingtitle,
            durationInMinuites: midifference.toString(),
            startTime: fullstartdate,
            zoomRecipients: allfullzoomdetails
        }
        setmodaldialog(true);
        setModalDialogContent({content:"",type:"", loading:true});
        const result = await postapicallhelper("Setup/CreateMeeting", datatosave);
        if(result.success == true){
            setModalDialogContent({content:"Successfully created!",type:"s", loading:false});
            setFormData({...{}});
        }
        else{
            setModalDialogContent({content:result.message,type:"e", loading:false});
            // setMessage({content:result.message,type:"err"});
        }
    };


    const usersparticipants = [
        {
            label:"James Boateng",
            value:"1",
        },
        {
            label:"Ama Adepa",
            value:"2",
        },
        {
            label:"Nana Kwame",
            value:"3",
        },
        {
            label:"Abena Quayson",
            value:"4",
        },
        {
            label:"Kofi Ansah",
            value:"5",
        }
    ]

    const meetingapplication = [
        {
            label:"Google Meeting",
            value:"1",
        },
        {
            label:"Zoom Meeting",
            value:"1",
        },
    ]

    const meetingData = [
        {
            noofparti:2,
            date: "2022-02-05",
            time:"1pm - 2pm",
            title:"To report your progress with your supervisors",
            participants: [
                "Jane Doe - janedoe@yahoo.com",
                "Joseph Boateng - josephboateng@gmail.com",
            ]
        },
        {
            noofparti:1,
            date: "2022-02-05",
            time:"12pm - 1pm",
            title:"To report your progress with your supervisors",
            participants: [
                "Joseph Boateng - josephboateng@gmail.com",
            ]
        },
        {
            noofparti:4,
            date: "2022-02-05",
            time:"12pm - 1pm",
            title:"To report your progress with your supervisors",
            participants: [
                "Joseph Boateng - josephboateng@gmail.com",
                "Nana Abena - nanaabena@gmail.com",
                "Akosua Frimpong - akosuafrimpong@gmail.com",
                "Abel Joe - abelj@gmail.com",
            ]
        },
        {
            noofparti:1,
            date: "2022-03-05",
            time:"3pm - 4pm",
            title:"To report your progress with your supervisors",
            participants: [
                "Joseph Boateng - josephboateng@gmail.com",
            ]
        }
    ]

    

    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>{addNew ? "Schedule a meeting" : "Scheduled Meeting(s)"}</AccessInfo>
            {
                addNew == false && 
                <GlobalButton
                style={{ height: "max-content" }}
                color="white"
                background={colors.primary}
                onClick={() => setAddNew(true)}
                >
                Add new
                </GlobalButton>
            }
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
            

            <AnimateHeight height={addNew ? "auto" : 0}>
                <form
                    style={{ fontSize: 14, color: "grey", paddingRight:10, paddingLeft:10 }}
                    onSubmit={(e) => request(e)}
                    ref={formRef}
                    autoComplete="off"
                >
                    <FullDivRow>
                        <FullDiv>
                            Hosting Organization
                            <Select
                                closeMenuOnSelect={true}
                                styles={colourStyles}
                                options={hostingOrganization}
                                onChange={(selval)=>{
                                    let oldData = Object.assign({}, formData);
                                    oldData["hostingorgid"] = selval.value;
                                    setFormData(oldData);
                                }}
                            />
                        </FullDiv>
                    </FullDivRow>
                    
                    
                    <FullDivRow>
                        <DivQuarter> 
                            Select participants(Students)
                            <Select
                                isMulti={true}
                                closeMenuOnSelect={true}
                                styles={colourStyles}
                                options={students}
                                onChange={(selval)=>{
                                    setAllSelectedStudents(selval);
                                }}
                            />
                        </DivQuarter>
                        

                        <DivQuarter>
                            Select Participants(Hosting Org.)
                            <Select
                                isMulti={true}
                                closeMenuOnSelect={true}
                                styles={colourStyles}
                                options={hostingOrgUsers}
                                onChange={(selval)=>{
                                    setAllSelectedHostingOrgUsers(selval);
                                }}
                            />
                        </DivQuarter>


                        <DivQuarter>
                        Select Participants(Laison Officer )
                        <Select
                            isMulti={true}
                            closeMenuOnSelect={true}
                            styles={colourStyles}
                            options={LiasonOfficerUsers}
                            onChange={(selval)=>{
                                setAllSelectedLiasonOfficerUsers(selval);
                            }}
                        />
                        </DivQuarter>
                    </FullDivRow>


                    <FullDivRow>
                       
                        <FullDiv>
                            Meeting Application
                            <div style={{display:'flex', flexDirection:'row', marginTop:10, marginBottom:15}}>

                                <div onClick={()=>{
                                    setMeetingApp("ZOOM")
                                }} style={{borderWidth:1, borderColor:'gray', borderStyle:'solid', padding:15, cursor:'pointer', borderRadius:4, width:200, marginRight:20, backgroundColor:meetingApp=="ZOOM" ? colors.primary : ''}}>
                                    <Image
                                        size='mini'
                                        src={require("../../../src/assets/zoomicon.png")}
                                    />
                                    <p>Zoom Meeting</p>
                                </div>

                                <div onClick={()=>{
                                    setMeetingApp("GMEET")
                                }} style={{borderWidth:1, borderColor:'gray', borderStyle:'solid', padding:15, cursor:'pointer', borderRadius:4, width:200, backgroundColor:meetingApp=="GMEET" ? colors.primary : ''}}>
                                    <Image
                                        size='mini'
                                        src={require("../../../src/assets/googlemeet.png")}
                                    />
                                    <p>Google Meet</p>
                                </div>
                            </div>

                        </FullDiv>
                    </FullDivRow>
                    

                    <FullDivRow>
                        <DivQuarter>
                            Date*
                            <FormInput
                                type="date"
                                name="date0"
                                hidden={false}
                                style={{ marginBottom: 30 }}
                                onChange={(event) => handleChange(event)}
                            />
                        </DivQuarter>

                        <DivQuarter>
                            Start at *
                            <FormInput
                                type="time"
                                name="date1"
                                hidden={false}
                                style={{ marginBottom: 30 }}
                                onChange={(event) => handleChange(event)}
                            />
                        </DivQuarter>

                        <DivQuarter>
                            End at *
                            <FormInput
                                type="time"
                                name="date2"
                                hidden={false}
                                style={{ marginBottom: 30 }}
                                onChange={(event) => handleChange(event)}
                            />
                        </DivQuarter>
                    </FullDivRow>
                    

                    <FullDivRow>
                        <FullDiv>
                            Title*
                            <FormInput
                                type="text"
                                placeholder="enter title"
                                hidden={false}
                                style={{ marginBottom: 30 }}
                                name="meetingtitle"
                                onChange={(event) => handleChange(event)}
                            />
                        </FullDiv>
                    </FullDivRow>
                    

                    <FullDivRow>
                        <FullDiv>
                            Meeting Details*
                            <ProfileInputMulti
                                placeholder="enter meeting details"
                                style={{ marginBottom: 30, width:"100%" }}
                                name="meetingdetails"
                                onChange={(event) => handleChange(event)}
                            />
                        </FullDiv>
                    </FullDivRow>
                    

                    {
                        adding == false && 
                        <span style={{ marginTop: 20, display: "flex" }}>
                        <GlobalButton
                            background={colors.primary}
                            color={"white"}
                            style={btncancel}
                            type="button"
                            onClick={() => {
                                formRef.current.reset();
                                setAddNew(false);
                            }}
                        >
                            Cancel
                        </GlobalButton>

                        <GlobalButton
                            background={"green"}
                            color={"white"}
                            style={btnsuccess}
                            type="submit"
                        >
                            Add
                        </GlobalButton>
                        </span>
                    }


                    {
                        adding == true && 
                        <span style={{display:'flex', justify:'center', alignItems:'center'}}> 
                        Please wait... &nbsp;&nbsp;
                        <ClipLoader color={colors.primary} size={25} />
                        </span>
                    }

                </form>
                
            </AnimateHeight>
            
            

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


            <Card.Group style={{marginTop:20}}>
            {
                pageData.map((each, index)=>(
                   
                        <Card key={index}>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={require("../../../src/assets/googlemeet.png")}
                                />
                                <Card.Header>{each.noofparti} Participant(s)</Card.Header>
                                <Card.Meta>{each.date} - {each.time}</Card.Meta>
                                <Card.Description><strong>{each.title}</strong>
                                </Card.Description>
                            </Card.Content>

                            <Card.Content>
                                {
                                    each?.participants?.map((each, index)=>(
                                        <p key={index}>{each}</p>
                                    ))
                                }
                            </Card.Content>
        
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button onClick={()=>{
                                    window.open("https://meet.google.com/emj-wfwg-enf", '_blank', 'noopener,noreferrer');
                                }} basic color='green'>
                                Join
                                </Button>

                                <Button basic color='red'>
                                Cancel
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                ))
            }
            </Card.Group>
            

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

export default ScheduleVideo;

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

const nodatayet = {
    margin: "10px 0",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.09)",
    backgroundColor: "#f8f8fa",
    backgroundColor: "#f8f8fa",
    fontSize: 14,
}