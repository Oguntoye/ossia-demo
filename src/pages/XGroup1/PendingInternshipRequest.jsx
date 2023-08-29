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
import { arraydatatoextract, isAfter, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import PopupView from "../../components/General/PopupView";
import { ModalDialog } from "../../components/General/ActionModal";
// import { PendingFullContainer, PendingFullDiv } from "../../components/styles/PendingRegistrations";
import { Confirm, Modal, Button, Header, Image,  Icon, Table } from 'semantic-ui-react'
import moment from "moment";

const PendingInternshipRequest = () => {
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
        }
    }, [triggerchage])


  
    useEffect(() => {
        // fetchalldata();
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
        setLoading(true);
        const result = await getapicallhelper("liason/GetAllIntroductoryLetterRequests", {});
        let formatresultlist = [];
        console.log("result",result);
        result?.data?.introoductoryRequests?.forEach(element => {
            let newdataobject = {};
            if(element.isplacementSecured == true){
                newdataobject.fulldata = element.requestYesPlacementData[0]
                newdataobject.securedplacement = "YES";
                newdataobject.orgname = element.requestYesPlacementData[0].nameOfInstitution;
            }
            else{
                newdataobject.fulldata = element.requestNoPlacementData[0];
                newdataobject.securedplacement = "NO";
                newdataobject.orgname = `${getallorgchoices(element?.requestNoPlacementData[0]?.requestNoPlacementPreferences)}`;
            }
            const fullobject = {
                ...element,
                ...newdataobject
            }
            formatresultlist.push(fullobject);
        });

        setPageData(formatresultlist);
        console.log("formatresultlist", formatresultlist)
        setLoading(false);
    };

   
    const getallorgchoices = (passeddata) =>{
        let result = "";
        if(Array.isArray(passeddata) == true){
            let data = [];
            let firstchoice = "";
            let secondchoice = "";
            let thirdchoice = "";
            passeddata.forEach(element => {
                if(element.choiceOption == 0){
                    firstchoice = `${element.industry} - (First Choice)`
                }
                if(element.choiceOption == 1){
                    secondchoice = `${element.industry} - (Second Choice)`
                }
                if(element.choiceOption == 2){
                    thirdchoice = `${element.industry} - (Third Choice)`
                }
            });
            result = `${firstchoice}\n${secondchoice}\n${thirdchoice}`
        }
        return result;
    }

    const datatoxtract = (array) =>{
        let datatoreturn = [];
        for (let index = 0; index < array.length; index++) {
            const data = array[index];
            datatoreturn.push({
                "Student Name":`${data?.studentDetail?.firstName} ${data?.studentDetail?.lastName}`,
                "Student Email Address": `${data?.studentDetail?.email}`,
                "Student Index No": `${data?.studentDetail?.indexNumber}`,
                "Student Phone No": `${data?.studentDetail?.phoneNumber}`,
                "Organization Name": data?.fulldata?.nameOfInstitution,
                "Country": data?.fulldata?.country,
                "Region": data?.fulldata?.region,
                "City": data?.fulldata?.city,
                "Street": data?.fulldata?.steetName,
                "Digital Address": data?.fulldata?.digitalAddress,
                "Contact Person Name": data?.fulldata?.contactPersonName,
                "Contact Person Phone": data?.fulldata?.contactPersonPhoneNumber,
                "Contact Person Position": data?.fulldata?.position,
                "Self Placement":data?.securedplacement,
                "Host Organization":`${data?.orgname}`,
                "Date Requested": `${moment(data?.dateCreated).format('MMMM Do YYYY, h:mm:ss a')}`
            })
        }
        return datatoreturn
    }
    

    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Internship Requests</AccessInfo>
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
                    excelname = "PendingInternshipRequest.csv"
                    exceldata = {datatoxtract(pageData)}
                />
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Student Name</div>
                    <div className="col col-d-2">Self Placement</div>
                    <div className="col col-d-3">Host Organization</div>
                    <div className="col col-d-4">Date Requested</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {`${data?.studentDetail?.firstName} ${data?.studentDetail?.lastName}`}
                        title2 = {data?.securedplacement}
                        title3 = {`${data?.orgname}`}
                        title4 = {moment(data?.dateCreated).format('MMMM Do YYYY, h:mm:ss a')}
                        rowClicked = {(datapassed)=>{
                            setMessage({content:"",type:""});
                            setSelectedData(data);
                            setFullDataInfo([])
                            setPopup(true);
                        }}
                        hideviewmore = {false}
                        fullinfo = {[
                            {
                                title:"Student Name",
                                content:`${data?.studentDetail?.firstName} ${data?.studentDetail?.lastName}` 
                            },
                            {
                                title:"Student Email Address",
                                content:`${data?.studentDetail?.email}` 
                            },
                            {
                                title:"Student Index No",
                                content:`${data?.studentDetail?.indexNumber}` 
                            },
                            {
                                title:"Student Phone No",
                                content:`${data?.studentDetail?.phoneNumber}` 
                            },
                            {
                                title:"Organization Name",
                                content:data?.fulldata?.nameOfInstitution
                            },
                            {
                                title:"Country",
                                content:data?.fulldata?.country
                            },
                            {
                                title:"Region",
                                content:data?.fulldata?.region
                            },
                            {
                                title:"City",
                                content:data?.fulldata?.city
                            },
                            {
                                title:"Street",
                                content:data?.fulldata?.steetName
                            },
                            {
                                title:"Digital Address",
                                content:data?.fulldata?.digitalAddress
                            },
                            {
                                title:"Contact Person Name",
                                content:data?.fulldata?.contactPersonName
                            },
                            {
                                title:"Contact Person Phone",
                                content:data?.fulldata?.contactPersonPhoneNumber
                            },
                            {
                                title:"Contact Person Position",
                                content:data?.fulldata?.position
                            }
                        ]}
                        data={data} 
                        key={index}
                    />
                    ))}
                </ul>
                </>
            }



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

export default PendingInternshipRequest;

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