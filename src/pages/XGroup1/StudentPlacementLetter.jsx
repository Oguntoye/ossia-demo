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
import { isAfter, isValidText, resolveimageconversion } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { ModalDialog } from "../../components/General/ActionModal";
import PopupView from "../../components/General/PopupView";
import { DivHalf, FullDivRow, GMulti } from "../../components/styles/GForms";
import moment from "moment";
import JoditEditor from "jodit-react"
import { Confirm, Modal, Button, Header, Image,  Icon, Table } from 'semantic-ui-react'
import HTMLRenderer from 'react-html-renderer'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";



// const htmlcontent = `<p style="text-align: center;"><img src="https://glydetek.com/wp-content/uploads/2020/09/gt_only_logo.png" alt="" width="90" height="90"></p><p style="text-align: center;"><strong style="font-size: 24px;">GLYDETEK UNIVERSITY</strong></p><hr><p style="text-align: right;"><strong><br></strong></p><p style="text-align: right;"><strong>{{shortdate}}</strong></p><p><strong>Our Ref: {{ourref}} </strong></p><p>The Director </p><p>{{companyname}}</p><p>{{companylocation}}</p><p><br></p><p>Name: {{studentname}}</p><p>Student Number: {{studentname}}</p><p>Telephone:{{studenttelephone}} E-mail: {{studentemail}}</p><p>Program: {{studentprogram}}</p><p><br></p><p>Dear Sir/Madam,</p><p><br></p><p style="text-align: center;"><strong style="font-size: 18px;">REQUEST FOR PLACEMENT FOR STUDENT'S INDUSTRIAL ATTACHMENT-{{academicyear}} ACADEMIC YEAR</strong> </p><p>Our students are required to undertake industrial attachment training for a period of about nine weeks during their program of study to enable them acquire the needed practical skills and experience in their respective fields of training. The {{academicyear}} academic year Industrial Attachment training will begin on {{startdate}} to {{enddate}}. </p><p>The bearer of this letter is our Student. We would be grateful if your reputable organization could accept him/her to be placed in your industry or business to be trained to acquire work experience. Your support will help prepare student well for the future. Please you are not under any financial obligation to the student, though any such gesture will be much appreciated. The student is supposed to do forty hours per week including one hour break per day.</p><p><br></p><p><br></p>`;


const StudentPlacementLetter = () => {
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


    const [addNew, setAddNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [message, setMessage] = useState({
        content:"",
        type:""
    });

    const [selectedData, setSelectedData] = useState({});
    const [allidentifiers, setAllIdentifiers] = useState([]);

    const editor = useRef(null)
    const pdfRef = useRef(null);

    const [htmldatatorender, setHtmlDataToRender] = useState("<p></p>");

    useEffect(() => {
        fetchalldata();
    }, []);


    useEffect(()=>{
        if(modaldialogbtn1Action=="CLOSE"){
            setPopup(false);
            setmodaldialogbtn1Action("")
        }
    }, [triggerchage])


    const gettemplatecontent = ()=>{
        let localstorecontent = window.localStorage.getItem("localtempstore");
        if(isValidText(localstorecontent) == true){
            return `${localstorecontent.toString()}`
        }
        else{
            let datastore = `<p style="text-align: center;"><img src="https://glydetek.com/wp-content/uploads/2020/09/gt_only_logo.png" alt="" width="151" height="152"></p><p style="text-align: center;"><strong style="font-size: 24px;">GLYDETEK UNIVERSITY</strong></p><hr><p style="text-align: right;"><strong><br></strong></p><p style="text-align: right;"><strong>{{shortdate}}</strong></p><p><strong>Our Ref: {{ourref}} </strong></p><p>The Director </p><p>{{companyname}}</p><p>{{companylocation}}</p><p><br></p><p>Name: {{studentname}}</p><p>Student Number: {{studentname}}</p><p>Telephone:{{studenttelephone}} E-mail: {{studentemail}}</p><p>Program: {{studentprogram}}</p><p><br></p><p>Dear Sir/Madam,</p><p><br></p><p style="text-align: center;"><strong style="font-size: 18px;">REQUEST FOR PLACEMENT FOR STUDENT’S INDUSTRIAL ATTACHMENT-{{academicyear}} ACADEMIC YEAR</strong> </p><p>Our students are required to undertake industrial attachment training for a period of about nine weeks during their program of study to enable them acquire the needed practical skills and experience in their respective fields of training. The {{academicyear}} academic year Industrial Attachment training will begin on {{startdate}} to {{enddate}}. </p><p>The bearer of this letter is our Student. We would be grateful if your reputable organization could accept him/her to be placed in your industry or business to be trained to acquire work experience. Your support will help prepare student well for the future. Please you are not under any financial obligation to the student, though any such gesture will be much appreciated. The student is supposed to do forty hours per week including one hour break per day.</p><p><br></p><p><br></p>`
            console.log("datastore",datastore)
            return datastore;
        }
    }

    const htmlcontent  = gettemplatecontent();

    const fetchalldata = async () => {
        // setLoading(true);
        // const result = await getapicallhelper("liason/GetStudentProfiles", {});
        // console.log("result",result);
        // setPageData(result?.data?.studentProfiles);

        // console.log("result?.data?.studentProfiles",result?.data?.studentProfiles);
        // setLoading(false);

        setPageData([
            {
                "id": 1,
                "title": "Mr",
                "firstName": "Gordon",
                "lastName": "Newman",
                "otherNames": "Crabbe",
                "sex": "Male",
                "dateOfBirth": "1995-10-17T00:00:00",
                "isDisabled": false,
                "disabilityDescription": null,
                "email": "GNewman@gmail.com",
                "phoneNumber": "233244124312",
                "alternameNumber": null,
                "website": null,
                "linkedIn": null,
                "emergencyPersonName": "Samuel Newman",
                "emergencyPersonContact": "233244124312",
                "country": "Israel",
                "region": "Badakhshan",
                "city": "Accra",
                "town": "Achimota",
                "streetName": "Banana Street",
                "dateCreated": "2022-10-17T10:18:57.727",
                "createdBy": "App Dev",
                "studentCareers": [
                    {
                        "organizationName": "Palm Limited",
                        "role": "Intern",
                        "startDate": "2022-09-01T00:00:00",
                        "endDate": "2022-09-30T00:00:00"
                    },
                    {
                        "organizationName": "Octus Ventures",
                        "role": "Assistant Treasurer",
                        "startDate": "2022-05-01T00:00:00",
                        "endDate": "2022-05-31T00:00:00"
                    }
                ],
                "studentAcademicInformation": {
                    "indexNumber": "10000011",
                    "studentLevel": "200",
                    "typeOfProgram": "Regular",
                    "levelOfProgram": "Diploma",
                    "admisssionYear": 2015,
                    "course": "Bachelor of Fine Arts",
                    "department": "Accounting",
                    "campus": "Accra",
                    "hasEverRepeated": false,
                    "repeatdYear": null,
                    "isInternationalStudent": false,
                    "internationalStudentCountry": null
                },
                "internshipHistory": [],
                "universitySupervisor": {
                    "id": 1006,
                    "title": "Mr",
                    "sex": "Male",
                    "firstName": "Samuel",
                    "lastName": "Wayne",
                    "position": "Lecturer",
                    "email": "Swayne@gmail.com",
                    "phoneNumber": "233244123456",
                    "industryName": "KTU"
                },
                "supervisorEndorsements": [
                    {
                        "id": 32,
                        "data": "{\"studentid\":1,\"nameofstudent\":\"Gordon Crabbe Newman\",\"indexno\":\"10000011\",\"programme\":\"Bachelor of Fine Arts\",\"level\":\"200\",\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"Duty 1\",\"duties2\":\"Duty 2\",\"duties3\":\"Duty 3\",\"nameofindustry\":\"Some industry\",\"jobtitle\":\"Title\",\"industryaddress\":\"Address\",\"industrytown\":\"town\",\"industrydistrict\":\"district\",\"industryregion\":\"region\",\"industrytel\":\"090394\",\"industryfax\":\"0404\",\"industryemail\":\"some@gmail.com\",\"industryexactlocation\":\"Some location\",\"totalscore\":\"50\",\"generalremark\":\"Great\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-07\",\"noofcredithours\":\"40\",\"recommendedscoreandgrade\":\"A2\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"Skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"Skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Super great\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-07T12:38:07.997"
                    },
                    {
                        "id": 31,
                        "data": "{\"studentid\":1,\"nameofstudent\":\"Gordon Crabbe Newman\",\"indexno\":\"10000011\",\"programme\":\"Bachelor of Fine Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"Duty 1\",\"duties2\":\"Duty 2\",\"duties3\":\"Duty 3\",\"nameofindustry\":\"Some industry\",\"jobtitle\":\"Title\",\"industryaddress\":\"Address\",\"industrytown\":\"town\",\"industrydistrict\":\"district\",\"industryregion\":\"region\",\"industrytel\":\"090394\",\"industryfax\":\"0404\",\"industryemail\":\"some@gmail.com\",\"industryexactlocation\":\"Some location\",\"totalscore\":\"50\",\"generalremark\":\"Great\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-02\",\"noofcredithours\":\"40\",\"recommendedscoreandgrade\":\"A2\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"Skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"Skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Super great\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-02T00:48:24.57"
                    },
                    {
                        "id": 29,
                        "data": "{\"studentid\":1,\"nameofstudent\":\"Gordon Crabbe Newman\",\"indexno\":\"10000011\",\"programme\":\"Bachelor of Fine Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"Duty 1\",\"duties2\":\"Duty 2\",\"duties3\":\"Duty 3\",\"nameofindustry\":\"Some industry\",\"jobtitle\":\"Title\",\"industryaddress\":\"Address\",\"industrytown\":\"town\",\"industrydistrict\":\"district\",\"industryregion\":\"region\",\"industrytel\":\"090394\",\"industryfax\":\"0404\",\"industryemail\":\"some@gmail.com\",\"industryexactlocation\":\"Some location\",\"totalscore\":\"50\",\"generalremark\":\"Great\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-02\",\"noofcredithours\":\"40\",\"recommendedscoreandgrade\":\"A2\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"Skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"Skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Super great\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-02T00:15:52.813"
                    },
                    {
                        "id": 3,
                        "data": "soem gibb dummy test",
                        "dateCreated": "2022-10-31T14:02:32.31"
                    },
                    {
                        "id": 2,
                        "data": "string",
                        "dateCreated": "2022-10-31T14:01:59.763"
                    }
                ]
            },
            {
                "id": 2,
                "title": "Mr",
                "firstName": "George",
                "lastName": "Osborg",
                "otherNames": "",
                "sex": "Male",
                "dateOfBirth": "1995-10-17T00:00:00",
                "isDisabled": true,
                "disabilityDescription": "Blind",
                "email": "GOsborg@gmail.com",
                "phoneNumber": "233244197315",
                "alternameNumber": null,
                "website": null,
                "linkedIn": null,
                "emergencyPersonName": "James Osborg",
                "emergencyPersonContact": "233244124382",
                "country": "Israel",
                "region": "Badakhshan",
                "city": "Accra",
                "town": "Lapaz",
                "streetName": "Accacia Street",
                "dateCreated": "2022-10-17T10:18:57.727",
                "createdBy": "App Dev",
                "studentCareers": [
                    {
                        "organizationName": "Palm Limited",
                        "role": "Intern",
                        "startDate": "2022-09-01T00:00:00",
                        "endDate": "2022-09-30T00:00:00"
                    },
                    {
                        "organizationName": "Octus Ventures",
                        "role": "Assistant Treasurer",
                        "startDate": "2022-05-01T00:00:00",
                        "endDate": "2022-05-31T00:00:00"
                    }
                ],
                "studentAcademicInformation": {
                    "indexNumber": "10000021",
                    "studentLevel": "200",
                    "typeOfProgram": "Parallel",
                    "levelOfProgram": "Bachlors Degree",
                    "admisssionYear": 2015,
                    "course": "Bachelor of Arts",
                    "department": "Audiology, Speech and Language",
                    "campus": "Accra",
                    "hasEverRepeated": false,
                    "repeatdYear": null,
                    "isInternationalStudent": false,
                    "internationalStudentCountry": null
                },
                "internshipHistory": [
                    {
                        "isSelfPlaced": true,
                        "organizationName": null,
                        "startDate": null,
                        "endDate": null,
                        "industryAddress": null,
                        "country": null,
                        "region": null,
                        "district": null,
                        "city": null,
                        "telephone": null,
                        "fax": null,
                        "email": null,
                        "location": null
                    },
                    {
                        "isSelfPlaced": true,
                        "organizationName": null,
                        "startDate": null,
                        "endDate": null,
                        "industryAddress": null,
                        "country": null,
                        "region": null,
                        "district": null,
                        "city": null,
                        "telephone": null,
                        "fax": null,
                        "email": null,
                        "location": null
                    }
                ],
                "universitySupervisor": {
                    "id": 1006,
                    "title": "Mr",
                    "sex": "Male",
                    "firstName": "Samuel",
                    "lastName": "Wayne",
                    "position": "Lecturer",
                    "email": "Swayne@gmail.com",
                    "phoneNumber": "233244123456",
                    "industryName": "KTU"
                },
                "supervisorEndorsements": [
                    {
                        "id": 30,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Some industry\",\"jobtitle\":\"Software engineer\",\"industryaddress\":\"Botwe\",\"industrytown\":\"Accra\",\"industrydistrict\":\"Accra\",\"industryregion\":\"Accra\",\"industrytel\":\"3094949\",\"industryfax\":\"440505\",\"industryemail\":\"somesome@gmail.com\",\"industryexactlocation\":\"Botwe GH\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-02\",\"noofcredithours\":\"100\",\"recommendedscoreandgrade\":\"90\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Some cool remark\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-02T00:22:28.64"
                    },
                    {
                        "id": 28,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"jobtitle\":\"Software engineer\",\"industryaddress\":\"Botwe\",\"industrytown\":\"Accra\",\"industrydistrict\":\"Accra\",\"industryregion\":\"Accra\",\"industrytel\":\"3094949\",\"industryfax\":\"440505\",\"industryemail\":\"somesome@gmail.com\",\"industryexactlocation\":\"Botwe GH\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"noofcredithours\":\"100\",\"recommendedscoreandgrade\":\"90\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Some cool remark\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-01T23:58:46.793"
                    },
                    {
                        "id": 27,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"jobtitle\":\"Software engineer\",\"industryaddress\":\"Botwe\",\"industrytown\":\"Accra\",\"industrydistrict\":\"Accra\",\"industryregion\":\"Accra\",\"industrytel\":\"3094949\",\"industryfax\":\"440505\",\"industryemail\":\"somesome@gmail.com\",\"industryexactlocation\":\"Botwe GH\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"noofcredithours\":\"100\",\"recommendedscoreandgrade\":\"90\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Some cool remark\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-01T23:54:01.033"
                    },
                    {
                        "id": 26,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"jobtitle\":\"Software engineer\",\"industryaddress\":\"Botwe\",\"industrytown\":\"Accra\",\"industrydistrict\":\"Accra\",\"industryregion\":\"Accra\",\"industrytel\":\"3094949\",\"industryfax\":\"440505\",\"industryemail\":\"somesome@gmail.com\",\"industryexactlocation\":\"Botwe GH\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"noofcredithours\":\"100\",\"recommendedscoreandgrade\":\"90\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Some cool remark\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\",\"qq1\":\"1\",\"qq2\":\"2\",\"qq3\":\"3\",\"qq4\":\"4\",\"qq5\":\"5\",\"qq6\":\"1\",\"qq7\":\"2\",\"qq8\":\"3\",\"qq9\":\"4\"}",
                        "dateCreated": "2022-11-01T23:52:55.66"
                    },
                    {
                        "id": 25,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"jobtitle\":\"Software engineer\",\"industryaddress\":\"Botwe\",\"industrytown\":\"Accra\",\"industrydistrict\":\"Accra\",\"industryregion\":\"Accra\",\"industrytel\":\"3094949\",\"industryfax\":\"440505\",\"industryemail\":\"somesome@gmail.com\",\"industryexactlocation\":\"Botwe GH\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"noofcredithours\":\"100\",\"recommendedscoreandgrade\":\"90\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Some cool remark\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\"}",
                        "dateCreated": "2022-11-01T21:57:49.883"
                    },
                    {
                        "id": 24,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"jobtitle\":\"Software engineer\",\"industryaddress\":\"Botwe\",\"industrytown\":\"Accra\",\"industrydistrict\":\"Accra\",\"industryregion\":\"Accra\",\"industrytel\":\"3094949\",\"industryfax\":\"440505\",\"industryemail\":\"somesome@gmail.com\",\"industryexactlocation\":\"Botwe GH\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"noofcredithours\":\"100\",\"recommendedscoreandgrade\":\"90\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\",\"generalskillscomment\":\"Some cool remark\",\"q1\":\"1\",\"q2\":\"2\",\"q3\":\"3\",\"q4\":\"4\",\"q5\":\"5\",\"q6\":\"1\",\"q7\":\"2\"}",
                        "dateCreated": "2022-11-01T21:57:21.447"
                    },
                    {
                        "id": 23,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"skill1name\":\"skill 1\",\"skill1grade\":\"1\",\"skill2name\":\"skill 2\",\"skill2grade\":\"2\",\"skill3name\":\"skill 3\",\"skill3grade\":\"3\"}",
                        "dateCreated": "2022-11-01T21:49:28.617"
                    },
                    {
                        "id": 22,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"skill1name\":\"Screwing\",\"skill1grade\":\"5\"}",
                        "dateCreated": "2022-11-01T21:37:39.987"
                    },
                    {
                        "id": 21,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\",\"skill1name\":\"Screwing\"}",
                        "dateCreated": "2022-11-01T21:29:48.323"
                    },
                    {
                        "id": 20,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"totalscore\":\"40\",\"generalremark\":\"Some great work done\",\"nameofsupervisor\":\"Samuel Wayne\",\"signeddate\":\"2022-11-01\"}",
                        "dateCreated": "2022-11-01T21:21:36.913"
                    },
                    {
                        "id": 19,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"To screw bolt\",\"duties2\":\"To screw keep record\",\"duties3\":\"To punch keyboard\",\"nameofindustry\":\"Palm Limited\",\"nameofsupervisor\":\"Samuel Wayne\"}",
                        "dateCreated": "2022-11-01T20:52:31.703"
                    },
                    {
                        "id": 18,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"d1\",\"duties2\":\"d2\",\"duties3\":\"d3\",\"nameofindustry\":\"Palm Limited\",\"nameofsupervisor\":\"Samuel Wayne\"}",
                        "dateCreated": "2022-11-01T20:42:48.4"
                    },
                    {
                        "id": 16,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"duties1\":\"d1\",\"duties2\":\"d2\",\"duties3\":\"d3\",\"nameofindustry\":\"Palm Limited\",\"nameofsupervisor\":\"Samuel Wayne\"}",
                        "dateCreated": "2022-11-01T20:38:25.297"
                    },
                    {
                        "id": 15,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"nameofsupervisor\":\"undefined undefined\"}",
                        "dateCreated": "2022-11-01T20:36:37.147"
                    },
                    {
                        "id": 14,
                        "data": "{\"studentid\":2,\"nameofstudent\":\"George  Osborg\",\"indexno\":\"10000021\",\"programme\":\"Bachelor of Arts\",\"level\":null,\"addnewform\":true,\"endorsementid\":0,\"nameofsupervisor\":\"undefined undefined\"}",
                        "dateCreated": "2022-11-01T20:35:39.85"
                    }
                ]
            },
            {
                "id": 3,
                "title": "Mrs",
                "firstName": "Alice",
                "lastName": "Nkoom",
                "otherNames": "Esi",
                "sex": "Female",
                "dateOfBirth": "1993-10-17T00:00:00",
                "isDisabled": false,
                "disabilityDescription": null,
                "email": "ANkoom@gmail.com",
                "phoneNumber": "233244124316",
                "alternameNumber": null,
                "website": null,
                "linkedIn": null,
                "emergencyPersonName": "Rita Osei Newman",
                "emergencyPersonContact": "233244124002",
                "country": "Israel",
                "region": "Badakhshan",
                "city": "Accra",
                "town": "East Legon",
                "streetName": "Okra Street",
                "dateCreated": "2022-10-17T10:18:57.727",
                "createdBy": "App Dev",
                "studentCareers": [],
                "studentAcademicInformation": {
                    "indexNumber": "10000024",
                    "studentLevel": "200",
                    "typeOfProgram": "Evening",
                    "levelOfProgram": "Higher National Diplomas",
                    "admisssionYear": 2015,
                    "course": "Bachelor of Law",
                    "department": "Anaesthesia",
                    "campus": "Accra",
                    "hasEverRepeated": false,
                    "repeatdYear": null,
                    "isInternationalStudent": false,
                    "internationalStudentCountry": null
                },
                "internshipHistory": [],
                "universitySupervisor": {
                    "id": null,
                    "title": null,
                    "sex": null,
                    "firstName": null,
                    "lastName": null,
                    "position": null,
                    "email": null,
                    "phoneNumber": null,
                    "industryName": "KTU"
                },
                "supervisorEndorsements": []
            },
            {
                "id": 4,
                "title": "Mrs",
                "firstName": "Ivy",
                "lastName": "Blake",
                "otherNames": "",
                "sex": "Female",
                "dateOfBirth": "1992-10-17T00:00:00",
                "isDisabled": true,
                "disabilityDescription": "Cripple",
                "email": "IBlake@gmail.com",
                "phoneNumber": "233244197313",
                "alternameNumber": null,
                "website": null,
                "linkedIn": null,
                "emergencyPersonName": "Ameyaw Kofi",
                "emergencyPersonContact": "233244124330",
                "country": "Israel",
                "region": "Badakhshan",
                "city": "Accra",
                "town": "Ashaiman",
                "streetName": "Adoley Street",
                "dateCreated": "2022-10-17T10:18:57.727",
                "createdBy": "App Dev",
                "studentCareers": [],
                "studentAcademicInformation": {
                    "indexNumber": "10000027",
                    "studentLevel": "200",
                    "typeOfProgram": "Weekdend",
                    "levelOfProgram": "Masters Degree",
                    "admisssionYear": 2015,
                    "course": "Bachelor of Science in Administration",
                    "department": "Anaesthesia\r\n\r\nArchaeology and Heritage Studies\r\n\r\nAudiology, Speech and Language\r\n\r\nBiochemistry, Cell and Molecular Biology\r\n\r\nChemical Pathology",
                    "campus": "Accra",
                    "hasEverRepeated": false,
                    "repeatdYear": null,
                    "isInternationalStudent": false,
                    "internationalStudentCountry": null
                },
                "internshipHistory": [],
                "universitySupervisor": {
                    "id": null,
                    "title": null,
                    "sex": null,
                    "firstName": null,
                    "lastName": null,
                    "position": null,
                    "email": null,
                    "phoneNumber": null,
                    "industryName": "KTU"
                },
                "supervisorEndorsements": []
            }
        ])
    };


    const replaceImgSrc = async(html) => {
        var imgTags = html.match(/<img[^>]+>/g);
        if (!imgTags) return html;

        console.log("imgTags",imgTags);
        for (let index = 0; index < imgTags.length; index++) {
            const imgTag = imgTags[index];
            var src = imgTag.match(/src="([^"]+)"/)[1];
            var base64 = await resolveimageconversion(src);
            console.log("base64",base64)
            html = html.replace(imgTag, imgTag.replace(src, base64.base64data));
            
        }
        console.log("html",html)
        return html;
    } 


    const replaceIdentifierText = (passedidentifier, html) => {
        for (let index = 0; index < passedidentifier.length; index++) {
            const element = passedidentifier[index];
            html = html.replaceAll(element.key, element.value);
        }
        return html;
    } 


    const customhandleChange = (event) => {
		setMessage({content:"",type:""})
		let objectkey = event.target.name;
		let objectvalue = event.target.value;

        //Copy the original array
        let copiedarray = [...allidentifiers];

        //Find based on the name and update the value
        let objindex = copiedarray.findIndex((obj) => obj.name == objectkey);
        copiedarray[objindex].value = objectvalue;
        setAllIdentifiers(copiedarray);
	};

    
    const renderandprint = async(passedref) =>{
        setTimeout(async()=>{
            await html2canvas(passedref,  {
                logging:true,
                scale:1,
            })
            .then((canvas) => {
                const image = { type: 'jpeg', quality: 0.98 };
                const margin = [0.5, 0.5];
                const filename = 'PlacementLetter.pdf';

                var imgWidth = 8.5;
                var pageHeight = 12;

                var innerPageWidth = imgWidth - margin[0] * 2;
                var innerPageHeight = pageHeight - margin[1] * 2;

                // Calculate the number of pages.
                var pxFullHeight = canvas.height;
                var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
                var nPages = Math.ceil(pxFullHeight / pxPageHeight);

                // Define pageHeight separately so it can be trimmed on the final page.
                var pageHeight = innerPageHeight;

                // Create a one-page canvas to split up the full image.
                var pageCanvas = document.createElement('canvas');
                var pageCtx = pageCanvas.getContext('2d');
                pageCanvas.width = canvas.width;
                pageCanvas.height = pxPageHeight;

                // Initialize the PDF.
                var pdf = new jsPDF('p', 'in', [8.5, 11]);

                for (var page = 0; page < nPages; page++) {
                // Trim the final page to reduce file size.
                if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                    pageCanvas.height = pxFullHeight % pxPageHeight;
                    pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
                }

                // Display the page.
                var w = pageCanvas.width;
                var h = pageCanvas.height;
                pageCtx.fillStyle = 'white';
                pageCtx.fillRect(0, 0, w, h);
                pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                // Add the page to the PDF.
                if (page > 0) pdf.addPage();
                //   debugger;
                var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
                pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
                }

                pdf.save(filename);
            })
        },5000)
        let result = await replaceImgSrc(htmlcontent);
        let modifiedresult = replaceIdentifierText(allidentifiers, result)
        setHtmlDataToRender(modifiedresult);
    }


    
    return (
        <div>

            <div style={{marginTop:-1000, position:'absolute'}}>
                <div style={{width:800}} ref={pdfRef}>
                    <HTMLRenderer
                        html={htmldatatorender}
                    />
                </div>
            </div>


            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Student Placement Letter</AccessInfo>
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
                    <div className="col col-d-4">Generate Letter</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {`${data?.firstName} ${data?.otherNames} ${data?.lastName}`}
                        title2 = {data?.email}
                        title3 = {data?.phoneNumber}
                        title4 = {"[GENERATE LETTER]"}
                        rowClicked = {(datapassed)=>{

                            let getallidentifiers = htmlcontent?.match(/{{[^}]+}}/g);
                            getallidentifiers = getallidentifiers.filter((item, index) => getallidentifiers.indexOf(item) === index);

                            let newpassedlist = [];
                            for (let index = 0; index < getallidentifiers.length; index++) {
                                const element = getallidentifiers[index];
                                let actualkey = element.replace("{{", "");
                                actualkey = actualkey.replace("}}","");

                                let valuetosave = "";
                                let disabled = false;
                                if(actualkey=="studentname"){
                                    disabled = true;
                                    valuetosave = `${data?.firstName} ${data?.otherNames} ${data?.lastName}`
                                }
                                else if(actualkey=="studenttelephone"){
                                    disabled = true;
                                    valuetosave = `${data?.phoneNumber}`
                                }
                                else if(actualkey=="studentemail"){
                                    disabled = true;
                                    valuetosave = `${data?.email}`
                                }
                                else if(actualkey=="studentprogram"){
                                    disabled = true;
                                    valuetosave = `${data?.studentAcademicInformation.course}`
                                }

                                newpassedlist.push({
                                    id:index.toString(),
                                    key: element,
                                    name: actualkey,
                                    value: valuetosave, 
                                    disabled: disabled
                                });
                            }

                            setAllIdentifiers(newpassedlist);
                            setSelectedData(data);
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
            }




            <PopupView payView={popup} setPayView={setPopup}>
                <h2>Generate Placement Letter</h2>   
                <FullDivRow>
                    <DivHalf> 
                        Full Name
                        <FormInput
                            type="text"
                            disabled
                            style={{ marginBottom: 30 }}
                            value={`${selectedData?.firstName} ${selectedData?.otherNames} ${selectedData?.lastName}`}
                        />
                    </DivHalf>

                    <DivHalf> 
                        Index No
                        <FormInput
                            type="text"
                            disabled
                            style={{ marginBottom: 30 }}
                            value={selectedData?.studentAcademicInformation?.indexNumber}
                        />
                    </DivHalf>
                </FullDivRow>


                <FullDivRow>
                    <DivHalf> 
                        Course
                        <FormInput
                            type="text"
                            disabled
                            style={{ marginBottom: 30 }}
                            value={selectedData?.studentAcademicInformation?.course}
                        />
                    </DivHalf>

                    <DivHalf> 
                        Level
                        <FormInput
                            type="text"
                            disabled
                            style={{ marginBottom: 30 }}
                            value={selectedData?.studentAcademicInformation?.studentLevel}
                        />
                    </DivHalf>
                </FullDivRow>


                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>IDENTIFIER MAPPING</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        
                        {
                            allidentifiers.map((each, index)=>(
                                <Table.Row  key={index}>
                                    <Table.Cell style={{width:300}}>{each.key}</Table.Cell>
                                    <Table.Cell>
                                    <FormInput
                                        type="text"
                                        required
                                        name={each.name}
                                        onChange={(event) => customhandleChange(event)}
                                        disabled={each.disabled}
                                        value={each.value}
                                    />
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                       

                    </Table.Body>
                </Table>

                <GlobalButton
                    background={colors.success}
                    color={"white"}
                    style={{...generalbtn, ...{width:"100%"}}}
                    onClick={async() => {
                        setmodaldialog(true);
                        setModalDialogContent({content:"",type:"", loading:true});
                        await renderandprint(pdfRef.current);
                        setModalDialogContent({content:"Successfully Generated!",type:"s", loading:false});
                        setmodaldialogbtn1Action("CLOSE");
                    }}>
                Generate
                </GlobalButton>
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

export default StudentPlacementLetter;

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





 
  


