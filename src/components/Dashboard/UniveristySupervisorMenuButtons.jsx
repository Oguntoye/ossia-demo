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

const UniveristySupervisorMenuButtons = ({ navOpen, page, setNavOpen }) => {
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
                onClick={() => direct("/dashboard/studentsdailytracker")}
                >
                Daily Activity Tracker
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/studentsweeklytracker")}
                >
                Weekly Activity Tracker
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/weeklytimesheet")}
                >
                Weekly Timesheet
                </RowDivSpace>


                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/internshipvideo")}
                >
                Schedule Video Conferencing
                </RowDivSpace>
                </>
            </DropList>


            <DropList title="Monitoring Report">
                <>
                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/assessmentreport")}
                >
                Endorse Assessment Report
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/eoifinalreport")}
                >
                Submit EOI Final Report
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/allowancerequest")}
                >
                Monitoring Allowance Request
                </RowDivSpace>

                <RowDivSpace
                style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
                onClick={() => direct("/dashboard/supstudentpendinggrade")}
                >
                Student Pending Grade
                </RowDivSpace>
                </>
            </DropList>


            <RowDivSpace style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}>
            Give Feedback
            </RowDivSpace>

            <RowDivSpace style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}>
            Incidence
            </RowDivSpace>

            <RowDivSpace style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}>
            Lodge Complain
            </RowDivSpace>
     
        </DashboardSelectSection>
    );
};

export default UniveristySupervisorMenuButtons;
