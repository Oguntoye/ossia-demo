import React, { useEffect, useState } from "react";
import { GlobalButton, LandingFooter } from "../components/styles/Global";
import {
    AppDesc,
    AppName,
    IntroIcon,
    LandingContainer,
    LandingDiv,
    LandingSelector,
    LandingWrapper,
} from "../components/styles/Landing";
import { colors } from "../utils/colors";
import { MdEmail, MdPhone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
    AccessButtonType,
    AccessForm,
    FormInput,
} from "../components/styles/Access";
import { useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { HiArrowNarrowRight } from "react-icons/hi";
import { postapicallhelper } from "../network/ApiHelper";
import { isValidText } from "../utils/helpers";
import student from "../assets/student.svg";

const Landing = () => {
    const [help, setHelp] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let isAuth = localStorage.getItem('user');
        if(isValidText(isAuth)) {
            navigate("/dashboard");
        }
    }, []);

    const access = async (e) => {
        if(e.target[0].value == "supervisor@gmail.com"){
            window.localStorage.setItem("user", JSON.stringify({
                firstname:"Jane",
                lastname:"doe"
            }));
            window.localStorage.setItem("usertype", "supervisor");
            navigate("/dashboard");
        }
        else if(e.target[0].value == "main@gmail.com"){
            window.localStorage.setItem("user", JSON.stringify({
                userProfile:{
                    firstName:" John",
                    lastName:"Doe",
                    position:"main"
                }
            }));
            window.localStorage.setItem("usertype", "main");
            navigate("/dashboard");
        }

        /*
        e.preventDefault();
        if (loading) return;
        setError("");
        setLoading(true);

        const result = await postapicallhelper("liason/login", {
            email: e.target[0].value,
            password: e.target[1].value
        });

        setLoading(false);
        console.log("result", result)
        if(result.success == true){
            if(e.target[0].value == "swayne@gmail.com"){
                window.localStorage.setItem("user", JSON.stringify({
                    firstname:"Jane",
                    lastname:"doe"
                }));
                window.localStorage.setItem("usertype", "supervisor");
                navigate("/dashboard");
            }
            else{
                window.localStorage.setItem("user", JSON.stringify(result?.data?.userLoginProfile));
                window.localStorage.setItem("usertype", "main");
                navigate("/dashboard");
            }
        }
        else{
            setError(result.message);
        }
        */
    };

   
    return (
        <LandingContainer>
            <LandingWrapper>
                <LandingDiv
                    background={"rgba(237, 237, 237, 0.9)"}
                    flex={0.55}
                    hide={true}
                    style={{
                        justifyContent: "center",
                    }}
                >
                
                <img
                    src={student}
                    style={{
                        width: "70%",
                        height: "auto",
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                    alt="Introduction"
                />

                <AppName style={{ textAlign: "center", color: colors.primary }}>
                    Kumasi Technical University Internship Management Liaison Portal
                    <br />
                    <span style={{ fontWeight: "bold" }}>(OSSIA)</span>
                </AppName>

                </LandingDiv>


                <LandingDiv background={"white"} flex={0.45} hide={false}>
                <IntroIcon
                    src={require("../assets/logo.png")}
                    alt="icon"
                    style={{ width: 65, height: 65 }}
                />
                <AppDesc style={{ color: "black", marginTop: 20, marginBottom: 50 }}>
                    Sign in to you account
                </AppDesc>

                <div style={{ display: "flex", width: "100%" }}>
                    <LandingSelector transition={help}>
                    <form
                        onSubmit={(e) => (!loading ? access(e) : null)}
                        style={{ fontSize: 12 }}
                        ref={form}
                    >
                        Your email *
                        <FormInput
                            type="email"
                            required
                            placeholder="example@gmail.com"
                            style={{ marginBottom: 25 }}
                        />
                        Password *
                        <FormInput
                            type="password"
                            required
                            hidden={false}
                            placeholder="**********"
                        />
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 5,
                            marginBottom: 30,
                            flexWrap: "wrap",
                            width: "100%",
                        }}
                        >
                        <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                            {error}
                        </p>
                        <button
                            onClick={() => navigate("/resetpassword")}
                            style={{
                                fontSize: 11,
                                color: colors.primary,
                                textDecoration: "underline",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                            type="button"
                        >
                            Forgot Password?
                        </button>
                        </div>
                        <GlobalButton
                        background={colors.primary}
                        color="white"
                        border={colors.primary}
                        style={{ marginTop: 25, width: "100%" }}
                        //   onClick={() => setOn((on) => (on++ === 3 ? 1 : on++))}
                        type="submit"
                        >
                        {loading ? (
                            <span
                            style={{ padding: 10, marginTop: -10, marginBottom: 7 }}
                            >
                            <PropagateLoader
                                color={"white"}
                                loading={loading}
                                size={15}
                            />
                            </span>
                        ) : (
                            <>
                            Sign in{" "}
                            <HiArrowNarrowRight
                                size={15}
                                color="white"
                                style={{ marginLeft: 10 }}
                            />
                            </>
                        )}
                        </GlobalButton>
                    </form>
                    </LandingSelector>
                    <LandingSelector transition={!help}>
                    <Link
                        to="#"
                        onClick={(e) => {
                        window.location.href = "mailto:info@ossiaportal.com";
                        e.preventDefault();
                        }}
                        style={{ textDecoration: "none" }}
                    >
                        <GlobalButton
                        style={{ width: "100%" }}
                        background="white"
                        color={colors.primary}
                        border={colors.accent}
                        >
                        <MdEmail
                            color={colors.primary}
                            style={{ marginRight: 5 }}
                            size={20}
                        />{" "}
                        info@ossiaportal.com
                        </GlobalButton>
                    </Link>
                    <Link
                        to="#"
                        onClick={(e) => {
                        window.location.href = "tel:+233342296928";
                        e.preventDefault();
                        }}
                        style={{ textDecoration: "none" }}
                    >
                        <GlobalButton
                        style={{ width: "100%", marginTop: 10 }}
                        background="white"
                        color={colors.primary}
                        border={colors.accent}
                        >
                        <MdPhone
                            color={colors.primary}
                            style={{ marginRight: 5 }}
                            size={20}
                        />{" "}
                        +233342296928
                        </GlobalButton>
                    </Link>
                    </LandingSelector>
                </div>
                <div style={{ flex: 1 }} />
                <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
                    Kumasi Technical University © {new Date().getFullYear()} All rights
                    reserved.
                </p>
                <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
                    v.1.1.1
                </p>
                </LandingDiv>
            </LandingWrapper>
        </LandingContainer>
    );
};

export default Landing;
