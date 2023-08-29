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
import { dactualtext, isAfter, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";

const InternshipIndustries = () => {
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

    const [instType, setInstType] = useState([]);
    const [indType, setIndType] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);

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
        // const result = await getapicallhelper("liason/getapprovedindustries", {});
        // setPageData(result?.data?.industries);

        // console.log("result?.data?.industries",result?.data?.industries);

        // const result2 = await getapicallhelper("setup/getinstitutiontypes", {});
        // setInstType(result2?.data?.typeOfInstitutions);

        // const result3 = await getapicallhelper("setup/getindustrytypes", {});
        // setIndType(result3?.data?.typeOfIndustries);

        // const result4 = await getapicallhelper("setup/getcountries", {});
        // let allcountries = [];
        // result4?.data?.countries?.forEach(element => {
        //     allcountries.push({label:element.value, value:element.key});
        // });
        // setCountries(allcountries);

        // const result5 = await getapicallhelper("setup/getregions", {});
        // let allregions = [];
        // result5?.data?.regions?.forEach(element => {
        //     allregions.push({label:element.value, value:element.key});
        // });
        // setRegions(allregions);
        // setLoading(false);
    };


    const datatoxtract = (array) =>{
        let datatoreturn = [];
        for (let index = 0; index < array.length; index++) {
            const data = array[index];
            datatoreturn.push({
                "Company Name":`${data.companyName}`,
                "Country":data.country,
                "Reg No":`${data.companyRegistrationNumber}`,
                "Region": `${data.region}`,
                "Type Of Institution":data.typeOfInstitution,
                "Type Of Industry": data.typeOfIndustry,
                "City":data.city,
                "Street Name": data.streetName,
                "Digital Address": data.digitalAddress,
                "Contact Person Name": `${dactualtext(data?.industryContactPersonData?.firstName)} ${dactualtext(data?.industryContactPersonData?.lastName)}`,
                "Contact Person Phone": `${dactualtext(data?.industryContactPersonData?.phoneNumber)}`,
                "Contact Person Email": `${dactualtext(data?.industryContactPersonData?.email)}`,
                "Relationship Officer": `${dactualtext(data?.relationOfficerData?.name)}`
            })
        }
        return datatoreturn
    }
    

    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Approved Internship Institutions</AccessInfo>
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
                    excelname = "Approved Internship Institutions.csv"
                    exceldata = {datatoxtract(pageData)}
                />
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Company Name</div>
                    <div className="col col-d-2">Country</div>
                    <div className="col col-d-3">Reg.No</div>
                    <div className="col col-d-4">Region</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data.companyName}
                        title2 = {data.country}
                        title3 = {data.companyRegistrationNumber}
                        title4 = {data.region}
                        rowClicked = {(datapassed)=>{
                            // setPopup(true);
                        }}
                        fullinfo = {[
                            {
                                title:"Company Name",
                                content:data.companyName
                            },
                            {
                                title:"Registration No",
                                content:data.companyRegistrationNumber
                            },
                            {
                                title:"Type Of Institution",
                                content:data.typeOfInstitution
                            },
                            {
                                title:"Type Of Industry",
                                content:data.typeOfIndustry
                            },
                            {
                                title:"Country",
                                content:data.country
                            },
                            {
                                title:"Region",
                                content:data.region
                            },
                            {
                                title:"City",
                                content:data.city
                            },
                            {
                                title:"Street Name",
                                content:data.streetName
                            },
                            {
                                title:"Digital Address",
                                content:data.digitalAddress
                            },
                            {
                                title:"Contact Person Name",
                                content:`${dactualtext(data?.industryContactPersonData?.firstName)} ${dactualtext(data?.industryContactPersonData?.lastName)}`
                            },
                            {
                                title:"Contact Person Phone",
                                content:`${dactualtext(data?.industryContactPersonData?.phoneNumber)}`
                            },
                            {
                                title:"Contact Person Email",
                                content:`${dactualtext(data?.industryContactPersonData?.email)}`
                            },
                            {
                                title:"Relationship Officer",
                                content:`${dactualtext(data?.relationOfficerData?.name)}`
                            }
                        ]}
                        data={data} 
                        key={index}
                        btnsuccess = {""}
                        btndanger = {""}
                        btnSuccessAction = {(datap)=>{
                            // console.log("datap",datap)
                        }}
                        btnDangerAction = {(datap)=>{
                            // console.log("datap",datap)
                        }}
                        rowloading = {false}
                    />
                    ))}
                </ul>
                </>
            }
               
                
        </div>
    );
};

export default InternshipIndustries;

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