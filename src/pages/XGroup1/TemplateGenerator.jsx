import React, { useEffect, useState, useMemo } from "react";
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
import { arraydatatoextract, base64tourl, dactualtext, isAfter, isValidNumber, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { ModalDialog } from "../../components/General/ActionModal";
import PopupView from "../../components/General/PopupView";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input } from 'semantic-ui-react'
import { DivHalf, FullDivRow, GMulti } from "../../components/styles/GForms";
import moment from "moment";
import JoditEditor, {Jodit} from "jodit-react"
import { CSVLink, CSVDownload } from "react-csv";


const TemplateGenerator = () => {
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
    // const [pageData, setPageData] = useState([]);
    const [message, setMessage] = useState({
        content:"",
        type:""
    });

    const [step, setStep] = useState(1);


    const [formData, setFormData] = useState({});
    const [templatemode, settemplatemode] = useState("");
    const [selectedcourse, setSelectedCourse] = useState({});
    const [selectedLevel, setSelectedLevel] = useState({});
    const [fulltemplateContent, setFullTemplateContent] = useState("");

    const editor = useRef(null)

    useEffect(() => {
        
    }, []);


    useEffect(()=>{
        if(modaldialogbtn1Action=="CLOSE"){
            setPopup(false);
            setmodaldialogbtn1Action("")
        }
    }, [triggerchage])




    const handleChange = (event) => {
		setMessage({content:"",type:""})
		let objectkey = event.target.name;
		let objectvalue = event.target.value;
		let oldData = Object.assign({}, formData);
		oldData[objectkey] = objectvalue;
		setFormData(oldData);
	};

    const gettemplatecontent = ()=>{
        let localstorecontent = window.localStorage.getItem("localtempstore");
        if(isValidText(localstorecontent) == true){
            return `${localstorecontent}`
        }
        else{
            return `<p style="text-align: center;"><img src="https://glydetek.com/wp-content/uploads/2020/09/gt_only_logo.png" alt="" width="151" height="152"></p><p style="text-align: center;"><strong style="font-size: 24px;">GLYDETEK UNIVERSITY</strong></p><hr><p style="text-align: right;"><strong><br></strong></p><p style="text-align: right;"><strong>{{shortdate}}</strong></p><p><strong>Our Ref: {{ourref}} </strong></p><p>The Director </p><p>{{companyname}}</p><p>{{companylocation}}</p><p><br></p><p>Name: {{studentname}}</p><p>Student Number: {{studentname}}</p><p>Telephone:{{studenttelephone}} E-mail: {{studentemail}}</p><p>Program: {{studentprogram}}</p><p><br></p><p>Dear Sir/Madam,</p><p><br></p><p style="text-align: center;"><strong style="font-size: 18px;">REQUEST FOR PLACEMENT FOR STUDENT’S INDUSTRIAL ATTACHMENT-{{academicyear}} ACADEMIC YEAR</strong> </p><p>Our students are required to undertake industrial attachment training for a period of about nine weeks during their program of study to enable them acquire the needed practical skills and experience in their respective fields of training. The {{academicyear}} academic year Industrial Attachment training will begin on {{startdate}} to {{enddate}}. </p><p>The bearer of this letter is our Student. We would be grateful if your reputable organization could accept him/her to be placed in your industry or business to be trained to acquire work experience. Your support will help prepare student well for the future. Please you are not under any financial obligation to the student, though any such gesture will be much appreciated. The student is supposed to do forty hours per week including one hour break per day.</p><p><br></p><p><br></p>`
        }
    }

    const pageData = [
        {
            id:"1",
            course:"1",
            coursename: "BTeh Mech",
            level:"1",
            levelname:"100 Level",
            templatesdata: `${gettemplatecontent()}`
        }
    ]

    const course = [
        {
            label:"BTech Heating, Ventilation & Air Conditioning Engineering",
            value:"1",
        },
        {
            label:"Bachelor of Technology in Chemical Engineering",
            value:"2",
        },
        {
            label:"Bachelor of Technology in Building Technology (Top-Up)",
            value:"3",
        },
        {
            label:"Bachelor of Technology in Estate Management (Top-up)",
            value:"4",
        },
        {
            label:"Bachelor of Technology in Entrepreneurship & Finance",
            value:"5",
        },
        {
            label:"Bachelor of Technology in Electrical/Electronic Engineering (Top-Up)",
            value:"6",
        },
        {
            label:"Bachelor of Technology in Civil Engineering (Two Years - Top up)",
            value:"7",
        },
        {
            label:"Bachelor of Technology in Civil Engineering (4 years)",
            value:"8",
        },
        {
            label:"Bachelor of Technology in Hospitality Managment and Catering Technology",
            value:"9",
        },
        {
            label:"Bachelor of Technology in Data Science (Regular/Evening)",
            value:"10",
        },
        {
            label:"Bachelor of Technology in Environmental Statistics",
            value:"11",
        },
        {
            label:"Bachelor of Technology in Agribusiness with Entrepreneurship",
            value:"12",
        },
        {
            label:"Bachelor of Technology in Secretaryship and Management",
            value:"13",
        },
        {
            label:"Bachelor of Technology in Mechanical Engineering",
            value:"14",
        },
        {
            label:"Bachelor of Technology in Fashion Design and Textiles Studies (Regular/Evening)",
            value:"15",
        },
        {
            label:"Bachelor of Technology In Accounting With Computing (4 Years)",
            value:"16",
        },
        {
            label:"Bachelor of Technology in Accounting with Computing (Top Up)",
            value:"17",
        },
        {
            label:"Bachelor of Technology in Electrical/Electronic Engineering",
            value:"18",
        },
        {
            label:"Bachelor of Technology in Building Technology",
            value:"19",
        },
        {
            label:"Bachelor of Technology in Pharmaceutical Sciences",
            value:"20",
        },
        {
            label:"Bachelor of Technology in Marketing (Regular/Weekend) Top-up",
            value:"21",
        },
        {
            label:"Bachelor of Technology in Fashion Design And Modeling (Top-up)",
            value:"22",
        },
        {
            label:"Bachelor of Technology in Health Statistics (Top-Up)",
            value:"23",
        },
        {
            label:"Bachelor of Technology in Library and Information Science",
            value:"24",
        },
        {
            label:"Bachelor of Technology in Procurement and Supply Chain Management(Regular/ Evening/Weekend)",
            value:"25",
        }
    ]

    const levels = [
        {
            label:"Level 100",
            value:"1",
        },
        {
            label:"Level 200",
            value:"2",
        },
        {
            label:"Level 300",
            value:"3",
        },
        {
            label:"Level 400",
            value:"4",
        }
    ]

 
 

    return (
        <div>
            
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Placement Letter Template Generator</AccessInfo>
                <GlobalButton
                style={{ height: "max-content" }}
                color="white"
                background={colors.primary}
                onClick={() => {
                    setSelectedData({})
                    setSelectedCourse({})
                    setSelectedLevel({})
                    settemplatemode("NEW");
                    setPopup(true);
                }}
                >
                Add new
                </GlobalButton>
            </div>

            <>
                <SearchFilter
                    showexcelbtn = {true}
                    excelname = "exceldocument.csv"
                    exceldata = {arraydatatoextract(pageData, ["coursename", "levelname"])}
                />
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Course</div>
                    <div className="col col-d-2">Level</div>
                    <div className="col col-d-3">-</div>
                    <div className="col col-d-4">View Template</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {`${data?.coursename}`}
                        title2 = {data?.levelname}
                        title3 = {""}
                        title4 = {"EDIT/PREVIEW"}
                        rowClicked = {(datapassed)=>{
                            console.log("datapassed",data);
                            settemplatemode("UPDATE");
                            setSelectedData(data);
                            setFullTemplateContent(data?.templatesdata)
                            setSelectedCourse({label:data.coursename, value:data.course})
                            setSelectedLevel({label:data.levelname, value:data.level})
                            setFullDataInfo([])
                            setPopup(true);
                        }}
                        fullinfo = {[]}
                        data={data} 
                        key={index}
                        hideviewmore = {true}
                    />
                    ))}
                </ul>
            </>



            <PopupView payView={popup} setPayView={setPopup}>
                <h1>Create new template</h1>
                      
                <FullDivRow>
                    <DivHalf> 
                        Select course
                        <Select
                            value={selectedcourse}
                            isMulti={false}
                            closeMenuOnSelect={true}
                            styles={colourStyles}
                            options={course}
                            onChange={(selval)=>{
                                setSelectedCourse(selval)
                            }}
                        />
                    </DivHalf>
                    

                    <DivHalf>
                        Select level
                        <Select
                            value={selectedLevel}
                            isMulti={false}
                            closeMenuOnSelect={true}
                            styles={colourStyles}
                            options={levels}
                            onChange={(selval)=>{
                                setSelectedLevel(selval)
                            }}
                        />
                    </DivHalf>
                </FullDivRow>

                <div style={{height:20}}></div>
                
                <h2>Template Data</h2>
                <JoditEditor
                    ref={editor}
                    // config={{
                    //     height:800
                    // }}
                    // config={{
                    //     readonly: false, // all options from https://xdsoft.net/jodit/doc/,
                    //     placeholder: "Gee",
                    //     height:800
                    // }}
                    value={fulltemplateContent}
                    onChange={(newContent) => {
                        setFullTemplateContent(newContent)
                        console.log("newContent",newContent)
                    }}
                />

                <div style={{height:20}}></div>
                <div style={centerall}>
                <GlobalButton
                    background={colors.success}
                    color={"white"}
                    style={{...generalbtn, ...{width:"100%"}}}
                    onClick={async() => {
                        setTimeout(()=>{
                            setModalDialogContent({content:"Successfully Updated!",type:"s", loading:false});
                            setmodaldialogbtn1Action("CLOSE");
                        }, 2000);
                        window.localStorage.setItem("localtempstore", `${fulltemplateContent}`)
                        setmodaldialog(true);
                        setModalDialogContent({content:"",type:"", loading:true});
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
               
                
        </div>
    );
};

export default TemplateGenerator;

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