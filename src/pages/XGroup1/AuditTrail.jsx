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
import { Pagination } from 'semantic-ui-react'

const AuditTrail = () => {
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

    const [postsPerPage, setPostPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

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
        // const result = await getapicallhelper("Login/AuditActivities", {});
        // setLoading(false);

        // console.log("result",result)
        // setPageData(result?.data?.activityLog);
        setPageData([
            {
                activity:"Sample login",
                email:"sampleemail@gmail.com",
                entryTime:"2021-01-01 00 00",
                exitTime:"2021-01-01 00 00",
            }
        ]);
    };

    const showData = () => {
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentPosts = pageData?.slice(indexOfFirstPage, indexOfLastPage)
        // console.log("currentPosts",currentPosts)
        // {postsPerPage * (currentPage-1)+index+1}
        try{
            return currentPosts.map((data, index) => (
                <TRow
                    title1 = {data.activity}
                    title2 = {data.email}
                    title3 = {data.entryTime}
                    title4 = {data.exitTime}
                    fullinfo = {[
                        {
                            title:"Activity Name",
                            content:data.activity
                        },
                        {
                            title:"User email address",
                            content:data.email
                        },
                        {
                            title:"Entry Time",
                            content:data.entryTime
                        },
                        {
                            title:"Exit Time",
                            content:data.exitTime
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
            ))
        }catch(e){
            console.log("error", e.message)
        }
    }


    const showPagination = () => {
        const pageNumbers = [];
        const totalPosts = pageData.length;
        for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
            pageNumbers.push(i)
        }
   
        return(
            <Pagination 
                defaultActivePage={1} 
                totalPages={pageNumbers.length}
                onPageChange={(e, {activePage})=>{
                    setCurrentPage(activePage)
                }} 
            />
        )
    }



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
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Audit Trails</AccessInfo>
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
                {/* <SearchFilter/> */}
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-d-1">Title</div>
                    <div className="col col-d-2">Start At</div>
                    <div className="col col-d-3">End At</div>
                    <div className="col col-d-4">Status</div>
                    </li>
                    {showData()}
                </ul>
                {showPagination()}
                </>
            }
               
                
        </div>
    );
};

export default AuditTrail;

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