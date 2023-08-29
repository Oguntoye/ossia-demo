import React, { useEffect, useState } from "react";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input, Radio } from 'semantic-ui-react'
import { FormInput } from "../../../components/styles/Access";
import { DivHalf, GMulti } from "../../../components/styles/GForms";
import { GlobalButton } from "../../../components/styles/Global";
import { colors } from "../../../utils/colors";

export const EOIReportStep1 = (props) => {
    return (
        <>
        <Table celled >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='2'>{"Section 1 - Supervisor/Internship"}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Name of Supervisor
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    Department
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                 <Table.Row>
                    <Table.Cell>
                    Faculty
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    Contact Number
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    No of students assigned
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    No of students supervised
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    Reporting start date
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    Reporting end date
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                            disabled
                        />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>

        <GlobalButton
            background={colors.primary}
            color={"white"}
            style={gbtn}
            type="button"
            onClick={() => {
                props.updateStep()
            }}
        >
            Next
        </GlobalButton>
        </>
    )
}





export const EOIReportStep2 = (props) => {
    return (
        <>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='1'>{"Section 2 - Task & Skills"}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Mention some of the common task performed by interns under your supervision:
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        List some Soft Skills obtained by interns you supervised:
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        List Some Common Technical Skills interns acquired during their attachment period
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        Did you get the cooperation of company you were assigned?    
                        <br/><br/>
                        <div>
                            <input type="radio" value="YES" name="skill1" /> YES &nbsp;&nbsp;&nbsp;
                            <input type="radio" value="NO" name="skill1" /> NO &nbsp;&nbsp;&nbsp;
                        </div>
                    </Table.Cell>
                </Table.Row>


                <Table.Row>
                    <Table.Cell>
                        What percentage of students assigned to you participated in the internship:
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.nameofstudent}
                        />
                    </Table.Cell>
                </Table.Row>


            </Table.Body>
        </Table>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <DivHalf>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={gbtn}
                    type="button"
                    onClick={() => {
                        props.previous()
                    }}
                >
                    Previous
                </GlobalButton>
            </DivHalf>

            <DivHalf>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={gbtn}
                    type="button"
                    onClick={() => {
                        props.updateStep()
                    }}
                >
                    Next
                </GlobalButton>
            </DivHalf>
        </div>


      
        </>
    )
}



export const EOIReportStep3 = (props) => {
    return (
        <>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='1'>{"Section 3 - Challenges & Concerns"}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Challenges interns confronted during the monitoring of interns:
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        Challenges Supervisors confronted in monitoring the interns during this period:
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        Industry Concerns Noted:
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

            </Table.Body>
        </Table>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <DivHalf>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={gbtn}
                    type="button"
                    onClick={() => {
                        props.previous()
                    }}
                >
                    Previous
                </GlobalButton>
            </DivHalf>

            <DivHalf>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={gbtn}
                    type="button"
                    onClick={() => {
                        props.updateStep()
                    }}
                >
                    Next
                </GlobalButton>
            </DivHalf>
        </div>


      
        </>
    )
}



export const EOIReportStep4 = (props) => {
    return (
        <>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='1'>{"Section 4 - Conclusion"}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Details of any incidences recorded about students on the field
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        Names of companies/businesses supervised willing to accept interns from KsTU in the future
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        Recommendations/Comments by Supervisor:
                        <GMulti
                            placeholder=""
                            style={{ marginBottom: 10, width:"100%" }}
                            name="lastName"
                        />
                    </Table.Cell>
                </Table.Row>

            </Table.Body>
        </Table>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <DivHalf>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={gbtn}
                    type="button"
                    onClick={() => {
                        props.previous()
                    }}
                >
                    Previous
                </GlobalButton>
            </DivHalf>

            <DivHalf>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={gbtn}
                    type="button"
                    onClick={() => {
                        props.complete()
                    }}
                >
                    Finish
                </GlobalButton>
            </DivHalf>
        </div>

        </>
    )
}


// export const AssessmentReportStep2 = (props) => {
//     return (
//         <>
//         <Table celled striped>
//             <Table.Header>
//                 <Table.Row>
//                     <Table.HeaderCell colSpan='2'>{"Section 2"}</Table.HeaderCell>
//                 </Table.Row>
//             </Table.Header>

//             <Table.Body>
//                 <Table.Row>
//                     <Table.Cell>
//                         Name of student*
//                         <FormInput
//                             type="text"
//                             required
//                             placeholder="enter title"
//                             hidden={false}
//                             name="nameofstudent"
//                             onChange={(event) => props?.fxhandleChange(event)}
//                             defaultValue = {props?.formData?.nameofstudent}
//                             disabled = {true}
//                         />
//                     </Table.Cell>

//                     <Table.Cell>
//                         Index no*
//                         <FormInput
//                             type="text"
//                             required
//                             placeholder="enter title"
//                             hidden={false}
//                             name="indexno"
//                             onChange={(event) => props?.fxhandleChange(event)}
//                             defaultValue = {props?.formData?.indexno}
//                         />
//                     </Table.Cell>
//                 </Table.Row>
//             </Table.Body>
//         </Table>

//         <GlobalButton
//             background={colors.primary}
//             color={"white"}
//             style={gbtn}
//             type="button"
//             onClick={() => {
//                 props.updateStep()
//             }}
//         >
//             Next
//         </GlobalButton>
//         </>
//     )
// }

const gbtn = {
    margin: 0,
    // marginRight: 20,
    borderRadius: 5,
    padding: "10px 20px",
    width: "100%",
}
