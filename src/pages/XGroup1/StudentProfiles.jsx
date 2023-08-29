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

const StudentProfiles = () => {
    const [addNew, setAddNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [message, setMessage] = useState({
        content:"",
        type:""
    });

    const [formData, setFormData] = useState({});
    useEffect(() => {
        // fetchalldata();
    }, []);


    const fetchalldata = async () => {
        setLoading(true);
        const result = await getapicallhelper("liason/GetStudentProfiles", {});
        console.log("result",result);
        setPageData(result?.data?.studentProfiles);

        console.log("result?.data?.studentProfiles",result?.data?.studentProfiles);
        setLoading(false);
    };

    const datatoxtract = (array) =>{
        let datatoreturn = [];
        for (let index = 0; index < array.length; index++) {
            const data = array[index];
            datatoreturn.push({
                "Student Name":`${data?.firstName} ${data?.otherNames} ${data?.lastName}`,
                "Email":data?.email,
                "Phone Number":`${data?.phoneNumber}`,
                "Index No": `${data?.studentAcademicInformation?.indexNumber}`,
                "Admission Year": data?.studentAcademicInformation?.admisssionYear,
                "Department":data?.studentAcademicInformation?.departmentId,
                "Course": data?.studentAcademicInformation?.courseId,
                "Gender": data?.sex,
                "Date of birth": data.dateOfBirth,
                "Nationality": data.country,
                "City": data.city,
                "Town": data.town,
                "Street": data.streetName,
                "Emmergency Person Name": data.emergencyPersonName,
                "Emmergency Person's Contact": data.emergencyPersonContact
            })
        }
        return datatoreturn
    }
    
    

    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Student Profiles</AccessInfo>
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
                    excelname = "Student Profiles.csv"
                    exceldata = {datatoxtract(pageData)}
                />
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
                        }}
                        fullinfo = {[
                            {
                                title:"Fullname",
                                content:`${data?.firstName} ${data?.otherNames} ${data?.lastName}`
                            },
                            {
                                title:"Index No",
                                content:data?.studentAcademicInformation?.indexNumber
                            },
                            {
                                title:"Admission Year",
                                content:data?.studentAcademicInformation?.admisssionYear
                            },
                            {
                                title:"Department",
                                content:data?.studentAcademicInformation?.departmentId
                            },
                            {
                                title:"Course",
                                content:data?.studentAcademicInformation?.courseId
                            },
                            {
                                title:"Gender",
                                content:data?.sex
                            },
                            {
                                title:"Date of birth",
                                content:data.dateOfBirth
                            },
                            {
                                title:"Email",
                                content:data.email
                            },
                            {
                                title:"Phone number",
                                content:data.phoneNumber
                            },
                            {
                                title:"Nationality",
                                content:data.country
                            },
                            {
                                title:"City",
                                content:data.city
                            },
                            {
                                title:"Town",
                                content:data.town
                            },
                            {
                                title:"Street",
                                content:data.streetName
                            },
                            {
                                title:"Emmergency Person Name",
                                content:data.emergencyPersonName
                            },
                            {
                                title:"Emmergency Person's Contact",
                                content:data.emergencyPersonContact
                            }
                        ]}
                        data={data} 
                        key={index}
                    />
                    ))}
                </ul>
                </>
            }
               
                
        </div>
    );
};

export default StudentProfiles;

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