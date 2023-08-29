import React, { useEffect, useState } from "react";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input, Radio } from 'semantic-ui-react'
import { FormInput } from "../../../components/styles/Access";
import { DivHalf, GMulti } from "../../../components/styles/GForms";
import { GlobalButton } from "../../../components/styles/Global";
import { colors } from "../../../utils/colors";

export const AssessmentReportStep1 = (props) => {
    return (
        <>
        <div className="preventselect">
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>{"Section 1 - Student Info"}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Name of student*
                            <FormInput
                                type="text"
                                defaultValue = {props?.formData?.nameofstudent}
                                disabled
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Index no*
                            <FormInput
                                type="text"
                                defaultValue = {props?.formData?.indexno}
                                disabled
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Programme:
                            <FormInput
                                type="text"
                                defaultValue = {props?.formData?.programme}
                                disabled
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Level:
                            <FormInput
                                type="text"
                                defaultValue = {props?.formData?.level}
                                disabled
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Starting Date:
                            <FormInput
                                type="date"
                                name="startingdate"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.startingdate}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Ending Date:
                            <FormInput
                                type="date"
                                name="endingdate"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.endingdate}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                        Duties
                        </Table.Cell>

                        <Table.Cell>
                            (1)
                            <FormInput
                                type="text"
                                name="duties1"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.duties1}
                            />

                            (2)
                            <FormInput
                                type="text"
                                name="duties2"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.duties2}
                            />

                            (3)
                            <FormInput
                                type="text"
                                name="duties3"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.duties3}
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>

        <div style={{height:20}}></div>
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




export const AssessmentReportStep2 = (props) => {
    return (
        <>
        <div className="preventselect"> 
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>{"Section 2 - Industry Info"}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Name of Industry*
                            <FormInput
                                type="text"
                                name="nameofindustry"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.nameofindustry}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Job Title*
                            <FormInput
                                type="text"
                                name="jobtitle"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.jobtitle}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Industry Address:
                            <FormInput
                                type="text"
                                name="industryaddress"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industryaddress}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Town:
                            <FormInput
                                type="text"
                                name="industrytown"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industrytown}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            District:
                            <FormInput
                                type="text"
                                name="industrydistrict"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industrydistrict}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Region:
                            <FormInput
                                type="text"
                                name="industryregion"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industryregion}
                            />
                        </Table.Cell>
                    </Table.Row>


                    <Table.Row>
                        <Table.Cell>
                            Tel. Number:
                            <FormInput
                                type="text"
                                name="industrytel"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industrytel}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Fax Number:
                            <FormInput
                                type="text"
                                name="industryfax"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industryfax}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Email Address:
                            <FormInput
                                type="text"
                                name="industryemail"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industryemail}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Exact Location Of Industry:
                            <FormInput
                                type="text"
                                name="industryexactlocation"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.industryexactlocation}
                            />
                        </Table.Cell>
                    </Table.Row>
                    
                    
                </Table.Body>
            </Table>
        </div>

        <div style={{height:20}}></div>
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



export const AssessmentReportStep3 = (props) => {
    return (
        <>
         <div className="preventselect"> 
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>{"Section 3 - Total Score"}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Total score*
                            <FormInput
                                type="number"
                                name="totalscore"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.totalscore}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            General remarks*
                            <GMulti
                                placeholder="Enter remarks"
                                style={{ marginBottom: 10, width:"100%" }}
                                type="text"
                                name="generalremark"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.generalremark}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                        Name of supervisor
                            <FormInput
                                type="text"
                                name="nameofsupervisor"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.nameofsupervisor}
                                disabled
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Signed Date:
                            <FormInput
                                type="text"
                                name="signeddate"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.signeddate}
                                disabled
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell colSpan='2'>
                        TO BE COMPLETED BY HEAD OF DEPARTMENT OF STUDENT’S INSTITUTION
                        </Table.Cell>
                    </Table.Row>


                    <Table.Row>
                        <Table.Cell>
                            No Of Credit Hours:
                            <FormInput
                                type="number"
                                name="noofcredithours"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.noofcredithours}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            Recommended Score & Grade:
                            <FormInput
                                type="text"
                                name="recommendedscoreandgrade"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.recommendedscoreandgrade}
                            />
                        </Table.Cell>
                    </Table.Row>
                    
                </Table.Body>
            </Table>
        </div>

        <div style={{height:20}}></div>
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


export const AssessmentReportStep4 = (props) => {
    return (
        <>
         <div className="preventselect"> 
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>{"Section 4 - Assessment"}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell colSpan='2'>
                        SCORING GUIDE: 1. WEAK &nbsp;&nbsp;&nbsp;2. AVERAGE &nbsp;&nbsp;&nbsp;3. GOOD &nbsp;&nbsp;&nbsp;4.VERY GOOD &nbsp;&nbsp;&nbsp;5. EXCELLENT &nbsp;&nbsp;&nbsp;
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                        Specific Skills (1)
                            <FormInput
                                type="text"
                                name="skill1name"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.skill1name}
                            />
                            <br/><br/>
                            <div>
                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="1" 
                                    checked = {props?.formData?.skill1grade == "1" ? true : false} name="skill1grade"
                                /> 1 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="2" 
                                    checked = {props?.formData?.skill1grade == "2" ? true : false} name="skill1grade"
                                /> 2 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="3" 
                                    checked = {props?.formData?.skill1grade == "3" ? true : false} name="skill1grade"
                                /> 3 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="4" 
                                    checked = {props?.formData?.skill1grade == "4" ? true : false} name="skill1grade"
                                /> 4 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="5" 
                                    checked = {props?.formData?.skill1grade == "5" ? true : false} name="skill1grade"
                                /> 5 &nbsp;&nbsp;&nbsp;
                            </div>


                            <br/><br/>
                            Specific Skills (2)
                            <FormInput
                                type="text"
                                name="skill2name"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.skill2name}
                            />
                            <br/><br/>
                            <div>
                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="1" 
                                    checked = {props?.formData?.skill2grade == "1" ? true : false} name="skill2grade"
                                /> 1 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="2" 
                                    checked = {props?.formData?.skill2grade == "2" ? true : false} name="skill2grade"
                                /> 2 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="3" 
                                    checked = {props?.formData?.skill2grade == "3" ? true : false} name="skill2grade"
                                /> 3 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="4" 
                                    checked = {props?.formData?.skill2grade == "4" ? true : false} name="skill2grade"
                                /> 4 &nbsp;&nbsp;&nbsp;

                                <input 
                                    type="radio"
                                    onChange={(event) => props?.fxhandleChange(event)} 
                                    value="5" 
                                    checked = {props?.formData?.skill2grade == "5" ? true : false} name="skill2grade"
                                /> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Specific Skills (3)
                            <FormInput
                                type="text"
                                name="skill3name"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.skill3name}
                            />
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.skill3grade == "1" ? true : false} name="skill3grade"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.skill3grade == "2" ? true : false} name="skill3grade"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.skill3grade == "3" ? true : false} name="skill3grade"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.skill3grade == "4" ? true : false} name="skill3grade"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.skill3grade == "5" ? true : false} name="skill3grade"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>
                        </Table.Cell>

                        <Table.Cell>
                            
                            Comments*
                            <GMulti
                                placeholder="Skills Remarks"
                                style={{ marginBottom: 10, width:"100%" }}
                                type="text"
                                name="generalskillscomment"
                                onChange={(event) => props?.fxhandleChange(event)}
                                defaultValue = {props?.formData?.generalskillscomment}
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            GENERAL EMPLOYABILITY SKILLS
                            <br/><br/>
                            Ability to follow instructions carefully
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q1 == "1" ? true : false} name="q1"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q1 == "2" ? true : false} name="q1"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q1 == "3" ? true : false} name="q1"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q1 == "4" ? true : false} name="q1"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q1 == "5" ? true : false} name="q1"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Ability to complete work on schedule
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q2 == "1" ? true : false} name="q2"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q2 == "2" ? true : false} name="q2"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q2 == "3" ? true : false} name="q2"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q2 == "4" ? true : false} name="q2"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q2 == "5" ? true : false} name="q2"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Ability to take initiatives
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q3 == "1" ? true : false} name="q3"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q3 == "2" ? true : false} name="q3"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q3 == "3" ? true : false} name="q3"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q3 == "4" ? true : false} name="q3"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q3 == "5" ? true : false} name="q3"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Ability to work with little supervision
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q4 == "1" ? true : false} name="q4"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q4 == "2" ? true : false} name="q4"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q4 == "3" ? true : false} name="q4"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q4 == "4" ? true : false} name="q4"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q4 == "5" ? true : false} name="q4"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Ability to work with other staff.
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q5 == "1" ? true : false} name="q5"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q5 == "2" ? true : false} name="q5"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q5 == "3" ? true : false} name="q5"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q5 == "4" ? true : false} name="q5"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q5 == "5" ? true : false} name="q5"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Adherence to organisation's rules and regulations
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q6 == "1" ? true : false} name="q6"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q6 == "2" ? true : false} name="q6"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q6 == "3" ? true : false} name="q6"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q6 == "4" ? true : false} name="q6"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q6 == "5" ? true : false} name="q6"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Adherence to safety and environmental rules
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.q7 == "1" ? true : false} name="q7"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.q7 == "2" ? true : false} name="q7"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.q7 == "3" ? true : false} name="q7"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.q7 == "4" ? true : false} name="q7"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.q7 == "5" ? true : false} name="q7"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>
                        </Table.Cell>



                        <Table.Cell>
                            ATTITUDE TO WORK
                            <br/><br/>
                            Attendance to work
                            <br/><br/>
                        <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq1 == "1" ? true : false} name="qq1"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq1 == "2" ? true : false} name="qq1"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq1 == "3" ? true : false} name="qq1"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq1 == "4" ? true : false} name="qq1"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq1 == "5" ? true : false} name="qq1"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Punctuality
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq2 == "1" ? true : false} name="qq2"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq2 == "2" ? true : false} name="qq2"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq2 == "3" ? true : false} name="qq2"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq2 == "4" ? true : false} name="qq2"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq2 == "5" ? true : false} name="qq2"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Desire to work
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq3 == "1" ? true : false} name="qq3"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq3 == "2" ? true : false} name="qq3"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq3 == "3" ? true : false} name="qq3"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq3 == "4" ? true : false} name="qq3"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq3 == "5" ? true : false} name="qq3"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Willingness to accept responsibilities
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq4 == "1" ? true : false} name="qq4"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq4 == "2" ? true : false} name="qq4"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq4 == "3" ? true : false} name="qq4"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq4 == "4" ? true : false} name="qq4"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq4 == "5" ? true : false} name="qq4"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>


                            <br/><br/>
                            HUMAN RELATIONS

                            <br/><br/>
                            Relationship with those who use your organisation's services
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq5 == "1" ? true : false} name="qq5"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq5 == "2" ? true : false} name="qq5"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq5 == "3" ? true : false} name="qq5"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq5 == "4" ? true : false} name="qq5"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq5 == "5" ? true : false} name="qq5"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Relationship with subordinates
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq6 == "1" ? true : false} name="qq6"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq6 == "2" ? true : false} name="qq6"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq6 == "3" ? true : false} name="qq6"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq6 == "4" ? true : false} name="qq6"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq6 == "5" ? true : false} name="qq6"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Relationship with other colleagues
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq7 == "1" ? true : false} name="qq7"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq7 == "2" ? true : false} name="qq7"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq7 == "3" ? true : false} name="qq7"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq7 == "4" ? true : false} name="qq7"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq7 == "5" ? true : false} name="qq7"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Relationship with other professionals
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq8 == "1" ? true : false} name="qq8"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq8 == "2" ? true : false} name="qq8"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq8 == "3" ? true : false} name="qq8"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq8 == "4" ? true : false} name="qq8"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq8 == "5" ? true : false} name="qq8"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>

                            <br/><br/>
                            Ability to control emotions when provoked
                            <br/><br/>
                            <div>
                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="1" checked = {props?.formData?.qq9 == "1" ? true : false} name="qq9"/> 1 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="2" checked = {props?.formData?.qq9 == "2" ? true : false} name="qq9"/> 2 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="3" checked = {props?.formData?.qq9 == "3" ? true : false} name="qq9"/> 3 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="4" checked = {props?.formData?.qq9 == "4" ? true : false} name="qq9"/> 4 &nbsp;&nbsp;&nbsp;

                                <input type="radio" onChange={(event) => props?.fxhandleChange(event)} value="5" checked = {props?.formData?.qq9 == "5" ? true : false} name="qq9"/> 5 &nbsp;&nbsp;&nbsp;
                            </div>
                        </Table.Cell>
                    </Table.Row>

                    
                </Table.Body>
            </Table>
        </div>

        <div style={{height:5}}></div>
        <br/><br/>
        Comment
        <GMulti
            placeholder="Enter comment"
            style={{ marginBottom: 10, width:"100%" }}
            type="text"
            name="gcomment"
            onChange={(event) => props?.fxhandleChange(event)}
            defaultValue = {props?.formData?.gcomment}
        />


        <div style={{height:20}}></div>
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
                    Accept
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
