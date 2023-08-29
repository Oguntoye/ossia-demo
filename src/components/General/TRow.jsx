import React, { useState } from "react";
import "../styles/PendingRegistrations.scss";
import "../styles/DuesTable.scss";
import AnimateHeight from "react-animate-height";
import { GlobalButton } from "../styles/Global";
import {
    PendingFullContainer,
    PendingFullDiv,
} from "../styles/PendingRegistrations";
import { colors } from "../../utils/colors";
import { DashSearchContainer } from "../styles/Dashboard";
import { ClipLoader } from "react-spinners";
import { isValidText } from "../../utils/helpers";

const Eachrow = (rowdata) =>(
    <div
        style={{
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            marginBottom: 5,
        }}
    >
        <div style={{ flex: 0.3, color: "gray" }}>{rowdata?.title}</div>
        <div style={{ flex: 0.7, paddingLeft: 3 }}>{rowdata?.content}</div>
    </div>
)

const replaceWithBr = (datap) => {
    try {
        datap = datap.toString();
        if(isValidText(datap)==true){
            return datap.replace(/\n/g, "<br />")
        }
        else{
            return ""
        }
    } catch (error) {
        return ""
    }
  
}

const MainRow = (props) => {
    const [details, setDetails] = useState(false);

    return (
        <>
        <li className="table-row" onClick={()=>{
            if(props?.hideviewmore != true){
                setDetails(!details);
            }
            else{
                props.rowClicked(props)
            }            
        }}>
            <div
                className="col col-d-1"
                data-label="Title"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {props?.title1}
            </div>

            <div
                className="col col-d-2"
                data-label="Type"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {props?.title2}
            </div>

            <div
                className="col col-d-3"
                data-label="Group"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <p dangerouslySetInnerHTML={{__html: replaceWithBr(props?.title3)}} />
            </div>

            <div
                className="col col-d-4"
                data-label="Due date"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
           {props?.title4}

            {
                props.hideviewmore != true &&
                <GlobalButton
                    background={"green"}
                    color={"white"}
                    style={{
                    margin: 0,
                    borderRadius: 5,
                    padding: "10px 20px",
                    width: "max-content",
                    marginTop: 10,
                    }}
                    type="submit"
                    onClick={() => setDetails(!details)}
                >
                    {details ? "View less" : "View more"}
                </GlobalButton>
            }
           
            </div>
        </li>

        <AnimateHeight height={details ? "auto" : 0}>
            
            <PendingFullContainer>
                <PendingFullDiv width={0.7} direction="row">
                <span style={{ flex: 1, paddingLeft: 10 }}>
                    {
                        props.fullinfo?.map((eachr, index)=>(
                            <Eachrow
                                key={index}
                                title = {eachr.title}
                                content = {eachr.content}
                            />
                        ))
                    }
                </span>
                </PendingFullDiv>

                {/* <PendingFullDiv width={0.3} style={{justifyContent: "flex-end" }}> */}
                
                {/* {
                    props.rowloading == true &&
                    <> 
                    Please wait... &nbsp;&nbsp;
                    <ClipLoader color={colors.primary} loading={true} size={25} />
                    </>
                } */}
               
                
                {/* {
                    isValidText(props.btnsuccess) &&
                    <GlobalButton
                        background={colors.primary}
                        color={"white"}
                        style={{
                            margin: 0,
                            borderRadius: 5,
                            padding: "10px 20px",
                            width: 100,
                            marginLeft: 10,
                            height: "max-content",
                        }}
                        type="submit"
                        onClick={() => props.btnSuccessAction(props)}
                    >
                        {props.btnsuccess}
                    </GlobalButton>
                }
              
                {
                    isValidText(props.btndanger) &&
                    <GlobalButton
                        background={colors.danger}
                        color={"white"}
                        style={{
                        margin: 0,
                        borderRadius: 5,
                        padding: "10px 20px",
                        width: 100,
                        marginLeft: 10,
                        height: "max-content",
                        }}
                        type="submit"
                        onClick={() => props.btnDangerAction(props)}
                    >
                        {props.btndanger}
                    </GlobalButton>
                }
               */}

                {/* </PendingFullDiv> */}
            </PendingFullContainer>
        </AnimateHeight>
        </>
    );
};

export default MainRow;
