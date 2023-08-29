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
import { isAfter, isValidEmail, isValidText } from "../../utils/helpers";
import { SearchFilter } from "../../components/General/SearchFilter";
import { getapicallhelper, postapicallhelper } from "../../network/ApiHelper";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";

const Staff = () => {
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
    };



    const request = async (e) => {
        e.preventDefault();
        let errorList = [];
        if(isValidText(formData.title) == false){
            errorList.push("Select title");
        }
        if(isValidText(formData.sex) == false){
            errorList.push("Select gender");
        }
        if(isValidText(formData.firstName) == false){
            errorList.push("Enter firstname");
        }
        if(isValidText(formData.lastName) == false){
            errorList.push("Enter lastname");
        }
        if(isValidText(formData.position) == false){
            errorList.push("Enter position");
        }
        if(isValidEmail(formData.email) == false){
            errorList.push("Enter a valid email");
        }
        if(isValidText(formData.phoneNumber) == false){
            errorList.push("Please enter phone number");
        }
        if(isValidText(formData.password) == false){
            errorList.push("Please enter user password");
        }
        if(isValidText(formData.roleId) == false){
            errorList.push("Please select user role");
        }
        
        if(errorList.length > 0){
            setMessage({content:errorList[0].toString(),type:"err"});
            return false;
        }

        setAdding(true);
        let datatosave = formData;
        const result = await postapicallhelper("liason/AddStaff", datatosave);
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
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Liaison Personnel</AccessInfo>
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
                    autoComplete="off"
                >

                Title *
                <DataListInput
                    style={{ marginBottom: 20 }}
                    required
                    onChange={(event) => handleChange(event)}
                    name="title"
                >
                    <option value="" disabled selected>select type</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Miss">Dr</option>
                    <option value="Miss">Prof.</option>
                </DataListInput>

                Sex *
                <DataListInput
                    style={{ marginBottom: 20 }}
                    required
                    onChange={(event) => handleChange(event)}
                    name="sex"
                >
                    <option value="" disabled selected>select type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </DataListInput>


                First name*
                <FormInput
                    type="text"
                    required
                    placeholder="enter first name"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="firstName"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.firstName}
                />

                Last name*
                <FormInput
                    type="text"
                    required
                    placeholder="enter last name"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="lastName"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.lastName}
                />

                Position*
                <FormInput
                    type="text"
                    required
                    placeholder="enter position"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="position"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.position}
                />

                Email address*
                <FormInput
                    type="email"
                    required
                    placeholder="enter email"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="email"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.email}
                />

                Phone number*
                <FormInput
                    type="text"
                    required
                    placeholder="enter phoneNumber"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="phoneNumber"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.phoneNumber}
                />

                Contact Person Password *
                <FormInput
                    type="password"
                    required
                    placeholder="enter password"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="password"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.password}
                    autoComplete="new-password"
                />

                
                Role *
                <Select
                    closeMenuOnSelect={true}
                    styles={colourStyles}
                    options={instRole}
                    onChange={(selval)=>{
                        let oldData = Object.assign({}, formData);
                        oldData["roleId"] = selval.value;
                        setFormData(oldData);
                    }}
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
                    <div className="col col-d-1">Name</div>
                    <div className="col col-d-2">Email</div>
                    <div className="col col-d-3">Position</div>
                    <div className="col col-d-4">Role</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data.name}
                        title2 = {data.email}
                        title3 = {data.position}
                        title4 = {data.role}
                        fullinfo = {[
                            {
                                title:"Title",
                                content:data.title
                            },
                            {
                                title:"Full name",
                                content:data.name
                            },
                            {
                                title:"Sex",
                                content:data.sex
                            },
                            {
                                title:"Email address",
                                content:data.email
                            },
                            {
                                title:"Position",
                                content:data.position
                            },
                            {
                                title:"Role",
                                content:data.role
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

export default Staff;

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