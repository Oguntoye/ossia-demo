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

const UniversitySupervisors = () => {
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
        const result = await getapicallhelper("liason/GetUniversitySupervisors", {});
        console.log("result",result);
        setPageData(result?.data?.liasonOfficers);

        console.log("result?.data?.liasonOfficers",result?.data?.liasonOfficers);
        setLoading(false);
    };


    const datatoxtract = (array) =>{
        let datatoreturn = [];
        for (let index = 0; index < array.length; index++) {
            const data = array[index];
            datatoreturn.push({
                "Name": `${data?.name}`,
                "Email": data?.email
            })
        }
        return datatoreturn
    }
    

    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>University Supervisors</AccessInfo>
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
                    <div className="col col-d-1">Name</div>
                    <div className="col col-d-2">Email</div>
                    <div className="col col-d-3">-</div>
                    <div className="col col-d-4">-</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {`${data?.name}`}
                        title2 = {data?.email}
                        title3 = {data?.phoneNumber}
                        title4 = {data?.studentAcademicInformation?.indexNumber}
                        rowClicked = {(datapassed)=>{
                        }}
                        fullinfo = {[
                            {
                                title:"Name",
                                content:`${data?.name}`
                            },
                            {
                                title:"Email",
                                content:data?.email
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

export default UniversitySupervisors;

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