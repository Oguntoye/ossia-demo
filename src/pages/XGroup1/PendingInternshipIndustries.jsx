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
import PopupView from "../../components/General/PopupView";
import { ModalDialog } from "../../components/General/ActionModal";
// import { PendingFullContainer, PendingFullDiv } from "../../components/styles/PendingRegistrations";
import { Confirm, Modal, Button, Header, Image,  Icon, Table } from 'semantic-ui-react'

const PendingInternshipIndustries = () => {
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
            rejectinst();
        }
    }, [triggerchage])


    const approveinst = async() =>{
        let errorList = [];
        if(isValidText(formData.relationshipOfficerId) == false){
            errorList.push("Please select relationship officer");
        }
        if(errorList.length > 0){
            setmodaldialog(true);
            setModalDialogContent({
                content:errorList[0].toString(),
                type:"e",
            })
            return false;
        }
        const datatosave = {
            industryId: selectedData.id,
            relationshipOfficerId:formData.relationshipOfficerId
        }
        setAdding(true);
        const result = await postapicallhelper("Liason/ApproveIndustries", datatosave);
        setAdding(false);
        if(result.success == true){
            setmodaldialog(true);
            setModalDialogContent({
                content:result.message,
                type:"s",
            })
            setmodaldialogbtn1Text("OK");
            setmodaldialogbtn2Text("");
            setFormData({...{}});
            setAddNew(false);
            setPopup(false);
            fetchalldata();
        }
        else{
            setmodaldialog(true);
            setModalDialogContent({
                content:result.message,
                type:"e",
            })
        }
    }

    const rejectinst = async()=>{
        const datatosave = {
            industryId: selectedData.id
        }
        setAdding(true);
        const result = await postapicallhelper("Liason/RejectIndustry", datatosave);
        setAdding(false);
        if(result.success == true){
            setmodaldialog(true);
            setModalDialogContent({
                content:result.message,
                type:"s",
            })
            setmodaldialogbtn1Text("OK");
            setmodaldialogbtn2Text("");
            setFormData({...{}});
            setAddNew(false);
            setPopup(false);
            fetchalldata();
        }
        else{
            setmodaldialog(true);
            setModalDialogContent({
                content:result.message,
                type:"e",
            })
        }
    }

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
        setPageData([]);
        setIndType([]);
        setCountries([]);
        setRegions([]);
        setAllOfficers([]);

        /*
        setLoading(true);
        const result = await getapicallhelper("liason/getpendingindustries", {});
        if(result.success == true){
            setPageData(result?.data?.industries);
        }
        
        const result3 = await getapicallhelper("setup/getindustrytypes", {});
        if(result3.success == true){
            setIndType(result3?.data?.typeOfIndustries);
        }
       
        const result4 = await getapicallhelper("setup/getcountries", {});
        if(result4.success == true){
            let allcountries = [];
            result4?.data?.countries?.forEach(element => {
                allcountries.push({label:element.value, value:element.key});
            });
            setCountries(allcountries);
        }
        

        const result5 = await getapicallhelper("setup/getregions", {});
        if(result5.success == true){
            let allregions = [];
            result5?.data?.regions?.forEach(element => {
                allregions.push({label:element.value, value:element.key});
            });
            setRegions(allregions);
        }
       

        const result6 = await getapicallhelper("Liason/GetAllLiasonOfficers", {});
        if(result6.success == true){
            let allofficers = [];
            result6?.data?.liasonOfficers?.forEach(element => {
                allofficers.push({label:element.name, value:element.id});
            });
            setAllOfficers(allofficers);
        }
        
        setLoading(false);
        */
    };

    
    const request = async (e) => {
        e.preventDefault();
        let errorList = [];
        if(isValidText(formData.companyName) == false){
            errorList.push("Please enter company name");
        }
        if(isValidText(formData.companyRegistrationNumber) == false){
            errorList.push("Please enter company registration number");
        }
        if(isValidText(formData.typeOfIndustryId) == false){
            errorList.push("Please select industry type");
        }
        if(isValidText(formData.countryId) == false){
            errorList.push("Please select country");
        }
        if(isValidText(formData.city) == false){
            errorList.push("Please enter city");
        }
        if(isValidText(formData.firstName) == false){
            errorList.push("Please enter firstName");
        }
        if(isValidText(formData.lastName) == false){
            errorList.push("Please enter lastName");
        }
        
        if(errorList.length > 0){
            setMessage({content:errorList[0].toString(),type:"err"});
            return false;
        }

        setAdding(true);
        let datatosave = {
            industryData:{
                companyName: formData.companyName,
                companyRegistrationNumber: formData.companyRegistrationNumber,
                typeOfIndustryId: formData.typeOfIndustryId,
                countryId: formData.countryId,
                region: formData.region,
                city: formData.city,
                streetName: formData.streetName,
                digitalAddress: formData.digitalAddress,
            },
            industryContactPersonData:{
                title: formData.title,
                sex: formData.sex,
                firstName: formData.firstName,
                lastName: formData.lastName,
                position: formData.position,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
            }
        }

        const result = await postapicallhelper("liason/addindustry", datatosave);
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
            <AccessInfo style={{ margin: "0 20px 0 0" }}>Pending Internship Institutions</AccessInfo>
            {/* {
                addNew == false && 
                <GlobalButton
                style={{ height: "max-content" }}
                color="white"
                background={colors.primary}
                onClick={() => setAddNew(true)}
                >
                Add new
                </GlobalButton>
            } */}
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

                Company name *
                <FormInput
                    type="text"
                    required
                    placeholder="enter company name"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="companyName"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.companyName}
                />

                Registration Number *
                <FormInput
                    type="text"
                    required
                    placeholder="enter registration number"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="companyRegistrationNumber"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.companyRegistrationNumber}
                />

                Type Of Industry *
                <DataListInput
                    style={{ marginBottom: 20 }}
                    required
                    onChange={(event) => handleChange(event)}
                    name="typeOfIndustryId"
                >
                    <option value="" disabled selected>select type</option>
                    {
                        indType?.map((each, index)=>(
                            <option key={index} value={each.key}>{each.value}</option>
                        ))
                    }
                </DataListInput>

                
                Country *
                <Select
                    closeMenuOnSelect={true}
                    styles={colourStyles}
                    options={countries}
                    onChange={(selval)=>{
                        let oldData = Object.assign({}, formData);
                        oldData["countryId"] = selval.value;
                        setFormData(oldData);
                    }}
                />


                Region *
                <FormInput
                    type="text"
                    required
                    placeholder="enter region name"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="region"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.region}
                />

                City *
                <FormInput
                    type="text"
                    required
                    placeholder="enter city name"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="city"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.city}
                />

                Street Name *
                <FormInput
                    type="text"
                    required
                    placeholder="enter street name"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="streetName"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.streetName}
                />

                Digital Address *
                <FormInput
                    type="text"
                    required
                    placeholder="enter digital address"
                    hidden={false}
                    style={{ marginBottom: 30 }}
                    name="digitalAddress"
                    onChange={(event) => handleChange(event)}
                    defaultValue = {formData?.digitalAddress}
                />

                Contact Person Title *
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

                Contact Person Sex *
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

                Contact Person First Name *
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

                Contact Person Last Name *
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

                Contact Person Position *
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

                Contact Person Email *
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

                Contact Person Phone Number *
                <FormInput
                    type="text"
                    required
                    placeholder="enter phone number"
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
                    <div className="col col-d-1">Company Name</div>
                    <div className="col col-d-2">Type Of Industry</div>
                    <div className="col col-d-3">Reg.No</div>
                    <div className="col col-d-4">Region</div>
                    </li>
                    
                    {pageData.map((data, index) => (
                    <TRow
                        title1 = {data.companyName}
                        title2 = {data.typeOfIndustry}
                        title3 = {data.companyRegistrationNumber}
                        title4 = {data.region}
                        rowClicked = {(datapassed)=>{
                            setMessage({content:"",type:""});
                            setSelectedData(data);
                            setFullDataInfo([
                                {
                                    title:"Company Name",
                                    content:data.companyName
                                },
                                {
                                    title:"Registration No",
                                    content:data.companyRegistrationNumber
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
                                    content:`${data?.industryContactPersonData?.firstName} ${data?.industryContactPersonData?.lastName}`
                                },
                                {
                                    title:"Contact Person Phone",
                                    content:`${data?.industryContactPersonData?.phoneNumber}`
                                },
                                {
                                    title:"Contact Person Email",
                                    content:`${data?.industryContactPersonData?.email}`
                                }
                            ])
                            setPopup(true);
                        }}
                        hideviewmore = {true}
                        fullinfo = {[]}
                        data={data} 
                        key={index}
                    />
                    ))}
                </ul>
                </>
            }


            <PopupView payView={popup} setPayView={setPopup}>
                <div style={{minWidth:600}}>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>{fulldatainfo[0]?.content}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                fulldatainfo?.map((eachr, index)=>(
                                    <Table.Row key={index}>
                                        <Table.Cell>{eachr.title}</Table.Cell>
                                        <Table.Cell>{eachr.content}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </div>
                
                <div style={{height:20}}></div>
                Select relationship officer *
                <Select
                    closeMenuOnSelect={true}
                    options={allofficers}
                    onChange={(selval)=>{
                        let oldData = Object.assign({}, formData);
                        oldData["relationshipOfficerId"] = selval.value;
                        setFormData(oldData);
                    }}
                />
                <div style={{height:10}}></div>

                <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:20}}>
                    {
                        adding == true &&
                        <>
                        Please wait...
                        <ClipLoader color={colors.primary} loading={true} size={15} />
                        </>
                    }

                    {
                        adding == false && 
                        <> 
                        <GlobalButton
                            background={colors.success}
                            color={"white"}
                            style={generalbtn}
                            onClick={async() => {
                                approveinst();
                            }}>
                        Approve
                        </GlobalButton>
                        
                        <div style={{marginLeft:20}}/>
                        <GlobalButton
                            background={colors.danger}
                            color={"white"}
                            style={generalbtn}
                            type="button"
                            onClick={() => {
                                setmodaldialog(true);
                                setModalDialogContent({
                                    content:"Do you really want to reject the selected company?",
                                    type:"i",
                                    headertitle:"Confirmation"
                                })
                                setmodaldialogbtn1Text("No")
                                setmodaldialogbtn2Text("Yes")
                                setmodaldialogbtn2Action("RSC")
                            }}>
                        Reject
                        </GlobalButton>
                        </>
                    }
                </div>
            </PopupView>

            

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

export default PendingInternshipIndustries;

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