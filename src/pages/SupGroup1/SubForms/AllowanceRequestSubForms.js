import React, { useEffect, useState } from "react";
import { Confirm, Modal, Button, Header, Image,  Icon, Table, Input, Radio } from 'semantic-ui-react'
import { FormInput } from "../../../components/styles/Access";
import { DivHalf, GMulti } from "../../../components/styles/GForms";
import { GlobalButton } from "../../../components/styles/Global";
import { colors } from "../../../utils/colors";

export const AllowanceRequestStep1 = (props) => {
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
                        Name of Lecturer
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
                        Title
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
                    No. of Interns Monitored during this period
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
                    Period of Internship (In weeks)
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
                    Start Date for Monitoring
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
                    End Date for monitoring
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
                    Work Station
                    </Table.Cell>

                    <Table.Cell>
                        <FormInput
                            type="text"
                            defaultValue = {props?.formData?.indexno}
                        />
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell colSpan='2'>
                    NB: By submitting this form, I lay claim on Kumasi Technical University to honour payments for my internship monitoring. Any false information provided renders my claim null and void.
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
            Submit
        </GlobalButton>
        </>
    )
}


const gbtn = {
    margin: 0,
    // marginRight: 20,
    borderRadius: 5,
    padding: "10px 20px",
    width: "100%",
}
