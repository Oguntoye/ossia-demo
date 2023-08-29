import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import {
    DashboardSelectSection,
    DashSearchContainer,
    DashSearchInput,
    IconDashRight,
} from "../styles/Dashboard";
import { RowDivSpace } from "../styles/Global";
import { pages } from "../../utils/pages";
import DropList from "../Navigation/DropList";
import {useNavigate } from "react-router-dom";

const MenuButtons = ({ navOpen, page, setNavOpen }) => {
    const navigate = useNavigate();
    const [pagename, setPagename] = useState("");

    useEffect(() => {
        console.log("Url: ", page);
        pages?.forEach((element) => {
            if (element?.path === page) setPagename(element?.name);
        });
    }, [page]);

    const direct = (url) => {
        setNavOpen(false);
        navigate(url);
    };

    return (
        <DashboardSelectSection isOpen={navOpen} >
            <h1 style={{ fontSize: 16, textTransform: "capitalize" }}>
            {pagename || page}
            </h1>

            <DashSearchContainer>
            <RiSearchLine color={"black"} size={20} />
            <DashSearchInput placeholder="search.." />
            </DashSearchContainer>

            <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard")}
            >
            Dashboard
            </RowDivSpace>

            <DropList title="Workspace">
                <>
                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/internshipdurarion")}
                >
                Internship Duration
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/pendingcompanies")}
                >
                Pending Institutions
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/internshipcompanies")}
                >
                Approved Institutions
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/staff")}
                >
                Liaison Personnel
                </RowDivSpace>


                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/pendinginternshiprequest")}
                >
                Internship Requests
                </RowDivSpace>


                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/internshipopportunities")}
                >
                Internship Opportunities
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/internshipvideo")}
                >
                Video Scheduling
                </RowDivSpace>


                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/studentprofiles")}
                >
                Student Profiles
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/universitysupervisors")}
                >
                University Supervisors
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/assignstudentsupervisor")}
                >
                Assign Students To Supervisor
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/allstudentspendinggrade")}
                >
                Students Pending Grades
                </RowDivSpace>
                </>
            </DropList>


            {/* <DropList title="Data Bank">
                <>
                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/organizationai")}
                >
                Organization (Active & Inactive)
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/internshipopportunities")}
                >
                Internship Opportunities
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/students")}
                >
                Students
                </RowDivSpace>
                
                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/supervisors")}
                >
                University Supervisors
                </RowDivSpace>
                </>
            </DropList> */}


            <DropList title="Configurations">
                <>
                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/templategenerator")}
                >
                Placement Letter Template Generator
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/studentplacementletter")}
                >
                Generate Student Placement Letter
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/configuregrades")}
                >
                Configure Grade Scale
                </RowDivSpace>


                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/configureinstdata")}
                >
                Configure Institution Data
                </RowDivSpace>

                </>
            </DropList>

            <RowDivSpace
            onClick={() => direct("/dashboard/audittrails")} 
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}>
            Audit Trail
            </RowDivSpace>

            <RowDivSpace style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}>
            Give Feedback
            </RowDivSpace>

            <RowDivSpace style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}>
            Lodge Complain
            </RowDivSpace>
     
        </DashboardSelectSection>
    );
};

export default MenuButtons;
