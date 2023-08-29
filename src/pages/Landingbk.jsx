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
    };

   
    
    return (
        <LandingContainer>
            <LandingWrapper>
                <LandingDiv
                    background={colors.primary}
                    flex={0.55}
                    hide={true}
                    style={{
                        justifyContent: "center",
                        backgroundColor: "rgba(29, 20, 58, 0.8)",
                    }}
                >
                <IntroIcon src={require("../assets/logo-circular.png")} alt="icon" />
                </LandingDiv>

                <LandingDiv background={"white"} flex={0.45} hide={false}>
                    <AppDesc style={{ color: "black", marginTop: 20, marginBottom: 50 }}>
                    Sign in to Admin Account
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
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    style={{ marginBottom: 25 }}
                                />

                                Password *
                                <FormInput
                                    type="password"
                                    required
                                    hidden={false}
                                    placeholder="**********"
                                />

                                <div style={div1}>
                                    <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                                    {error}
                                    </p>

                                    <button
                                        onClick={() => navigate("/resetpassword")}
                                        style={btn1}
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
                                    type="submit"
                                >
                                {loading ? (
                                    <span style={sp1}>
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
                                window.location.href = "mailto:info@kumasiitech.com";
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
                            info@kumasiitech.com
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

                    {/* <div style={{ flex: 1 }} />
                    <GlobalButton
                        style={{ width: "100%", fontSize: 12 }}
                        background={"white"}
                        color={colors.primary}
                        border={"white"}
                        onClick={() => setHelp((help) => !help)}
                    >
                    {help ? "Access account?" : "Need help? Contact us!"}
                    </GlobalButton> */}

                    <p style={{ textAlign: "center", fontSize: 10, color: "gray", marginTop:15 }}>
                    OSSIA - Industrial Liaison Office Portal © {new Date().getFullYear()} All rights reserved.
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


const div1 = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 30,
    flexWrap: "wrap",
    width: "100%",
}

const btn1 = {
    fontSize: 11,
    color: colors.primary,
    textDecoration: "underline",
    background: "none",
    border: "none",
    cursor: "pointer",
}

const sp1 = { 
    padding: 10, 
    marginTop: -10, 
    marginBottom: 7 
}