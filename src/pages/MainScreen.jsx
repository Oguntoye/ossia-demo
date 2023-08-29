import React, { useEffect, useState } from "react";
import Navigation from "../components/Dashboard/Navigation";
import { RowDivSpace, RowSpan } from "../components/styles/Global";
import dateFormat from "dateformat";
import {
    DashboardContainer,
    DashboardWorkSection,
    DashDate,
    IconDashNotification,
    IconDashProfile,
} from "../components/styles/Dashboard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import IndLSummaryScreen from "./XGroup1/IndLSummaryScreen";
import AcadSupSummaryScreen from "./SupGroup1/AcadSupSummaryScreen";
import DashNotFound from "./XGroup1/DashNotFound";
import MenuButtons from "../components/Dashboard/MenuButtons";


import InternshipDuration from "./XGroup1/InternshipDuration";
import InternshipIndustries from "./XGroup1/InternshipIndustries";
import PendingInternshipIndustries from "./XGroup1/PendingInternshipIndustries";
import Staff from "./XGroup1/Staff";
import PendingInternshipRequest from "./XGroup1/PendingInternshipRequest";
import InternshipOpportunities from "./XGroup1/InternshipOpportunities";
import InternshipVideoSchedule from "./XGroup1/ScheduleVideo";
import StudentProfiles from "./XGroup1/StudentProfiles";
import UniversitySupervisors from "./XGroup1/UniversitySupervisors";
import UniveristySupervisorMenuButtons from "../components/Dashboard/UniveristySupervisorMenuButtons";
import DailyActivityTracker from "./SupGroup1/DailyActivityTracker";
import WeeklyActivityTracker from "./SupGroup1/WeeklyActivityTracker";
import WeeklyTimesheet from "./SupGroup1/WeeklyTimesheet";
import AssessmentReport from "./SupGroup1/AssessmentReport";
import EOIFinalReport from "./SupGroup1/EOIFinalReport";
import AllowanceRequest from "./SupGroup1/AllowanceRequest";
import AssignStudentSupervisor from "./XGroup1/AssignStudentSupervisor";
import SupStudentPendingGrade from "./SupGroup1/SupStudentPendingGrade";
import ConfigureGrades from "./XGroup1/ConfigureGrades";
import AllStudentPendingGrade from "./XGroup1/AllStudentPendingGrade";
import ConfigureInstData from "./XGroup1/ConfigureInstData";
import TemplateGenerator from "./XGroup1/TemplateGenerator";
import StudentPlacementLetter from "./XGroup1/StudentPlacementLetter";
import SupervisorsClaimForm from "./SupGroup1/SupervisorsClaimForm";
import AuditTrail from "./XGroup1/AuditTrail";
import UserProfile from "./UserProfile";

const Dashboard = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [page, setPage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const pages = location.pathname?.split("/");
            setPage(pages.length === 3 ? pages[2] : pages[1]);
        } catch (e) {
            console.error(e);
        }
    }, [location]);

    return (
        <DashboardContainer>
            <Navigation setNavOpen={setNavOpen} page={page}/>

            {
                window.localStorage.getItem("usertype") == "main" &&
                <MenuButtons navOpen={navOpen} page={page} setNavOpen={setNavOpen}/>
            }

            {
                window.localStorage.getItem("usertype") == "supervisor" &&
                <UniveristySupervisorMenuButtons navOpen={navOpen} page={page} setNavOpen={setNavOpen}/>
            }
            

            <DashboardWorkSection>
                {/* Top main workspace */}
                <RowDivSpace style={topscreen}>
                    <div><DashDate>{dateFormat(Date.now(), "dddd, dS mmmm")}</DashDate></div>
                    <RowSpan>
                        <IconDashNotification />
                        <IconDashProfile onClick={() => navigate("userprofile")} />
                    </RowSpan>
                </RowDivSpace>
                
                <Routes>
                    <Route path="/" element={localStorage.getItem("usertype") == "main" ? <IndLSummaryScreen/> : <AcadSupSummaryScreen />} />

                    {/* Laison routes */}
                    <Route path="/internshipdurarion" element={<InternshipDuration />} />
                    <Route path="/internshipcompanies" element={<InternshipIndustries />} />
                    <Route path="/pendingcompanies" element={<PendingInternshipIndustries />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/pendinginternshiprequest" element={<PendingInternshipRequest />} />
                    <Route path="/internshipopportunities" element={<InternshipOpportunities />} />
                    <Route path="/internshipvideo" element={<InternshipVideoSchedule />} />
                    <Route path="/studentprofiles" element={<StudentProfiles />} />
                    <Route path="/universitysupervisors" element={<UniversitySupervisors />} />
                    <Route path="/configuregrades" element={<ConfigureGrades />} />
                    <Route path="/configureinstdata" element={<ConfigureInstData />} />
                    <Route path="/allstudentspendinggrade" element={<AllStudentPendingGrade />} />
                    <Route path="/templategenerator" element={<TemplateGenerator />} />
                    <Route path="/studentplacementletter" element={<StudentPlacementLetter />} />
                    <Route path="/audittrails" element={<AuditTrail />} />
                    

                    {/* University Supervisors routes */}
                    <Route path="/studentsdailytracker" element={<DailyActivityTracker />} />
                    <Route path="/studentsweeklytracker" element={<WeeklyActivityTracker />} />
                    <Route path="/weeklytimesheet" element={<WeeklyTimesheet />} />
                    <Route path="/assessmentreport" element={<AssessmentReport />} />
                    <Route path="/eoifinalreport" element={<EOIFinalReport />} />
                    <Route path="/allowancerequest" element={<SupervisorsClaimForm />} />
                    <Route path="/assignstudentsupervisor" element={<AssignStudentSupervisor />} />
                    <Route path="/supstudentpendinggrade" element={<SupStudentPendingGrade />} />

                    {/**Both */}
                    <Route path="/userprofile" element={<UserProfile/>} />
                    
                    <Route path="*" element={<DashNotFound />} />
                </Routes>
            </DashboardWorkSection>
        </DashboardContainer>
    );
};

export default Dashboard;

const topscreen = {
    fontSize: 14,
    alignItems: "center",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    paddingBottom: 10
}