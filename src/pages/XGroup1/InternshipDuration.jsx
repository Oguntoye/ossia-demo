import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import TRow from "../../components/General/TRow";
import {AccessInfo,FormInput} from "../../components/styles/Access";
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

const InternshipDuration = () => {
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
        // const result = await getapicallhelper("liason/getinternshipduration", {});
        // setLoading(false);
        // setPageData(result?.data?.internshipDurations);

        setPageData([
            {
                title:"Sample Title",
                description: "Sample description",
                startDate: "2020-01-01 00 00",
                endDate: "2020-01-01 00 00",
                createdBy: "Jane Doe",
                status: "Active",
            }
        ]);
    };


    const request = async (e) => {
        e.preventDefault();
        let errorList = [];
        if(isValidText(formData.title) == false){
            errorList.push("Please enter title");
        }
        if(isValidText(formData.description) == false){
            errorList.push("Please enter description");
        }
        if(isValidText(formData.startDate) == false){
            errorList.push("Please select start date");
        }
        if(isValidText(formData.endDate) == false){
            errorList.push("Please select end date");
        }
        if(isAfter(formData.startDate, formData.endDate) == true){
            errorList.push("Invalid date selection");
        }
        if(errorList.length > 0){
            setMessage({content:errorList[0].toString(),type:"err"});
            return false;
        }
        setAdding(true);
        const result = await postapicallhelper("liason/addinternshipduration", formData);
        setAdding(false);
        if(result.success == true){
            setMessage({content:result.message,type:"suc"});
            setFormData({...{}});
            formRef.current.reset();
            setAddNew(false);
            fetchalldata();
        }
        else{
            setMessage({content:result.message,type:"err"});
        }
    };

    return (
        <div>
            <div style={titles}>
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Internship Duration</AccessInfo>
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
                    style={{ fontSize: 14, color: "grey" }}
                    onSubmit={(e) => request(e)}
                    ref={formRef}
                >

                Title *
                <FormInput
                    type="text"
                    required
                    placeholder="enter title"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="title"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.title}
                />

                Description *
                <FormInput
                    type="text"
                    required
                    placeholder="enter description"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="description"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.description}
                />
            

                Start date *
                <FormInput
                    type="date"
                    name="startDate"
                    required
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.startDate}
                />

                End date *
                <FormInput
                    type="date"
                    name="endDate"
                    required
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.endDate}
                />

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

               


            {
                (loading == false && pageData.length > 0) &&
                <>
                <SearchFilter/>
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Title</div>
                    <div className="col col-d-2">Start At</div>
                    <div className="col col-d-3">End At</div>
                    <div className="col col-d-4">Status</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data.title}
                        title2 = {data.startDate}
                        title3 = {data.endDate}
                        title4 = {data.status}
                        fullinfo = {[
                            {
                                title:"Internship Title",
                                content:data.title
                            },
                            {
                                title:"Internship Description",
                                content:data.description
                            },
                            {
                                title:"Start Date",
                                content:data.startDate
                            },
                            {
                                title:"End Date",
                                content:data.endDate
                            },
                            {
                                title:"Created By:",
                                content:data.createdBy
                            },
                            {
                                title:"Status",
                                content:data.status
                            }
                        ]}
                        data={data} 
                        key={index}
                        btnsuccess = {""}
                        btndanger = {""}
                        btnSuccessAction = {(datap)=>{
                            console.log("datap",datap)
                        }}
                        btnDangerAction = {(datap)=>{
                            console.log("datap",datap)
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

export default InternshipDuration;

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