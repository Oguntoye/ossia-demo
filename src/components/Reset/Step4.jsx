import React, { useEffect, useState } from "react";
import { AccessForm } from "../styles/Access";
import { colors } from "../../utils/colors";
import { Link, useNavigate } from "react-router-dom";

const Step4 = () => {
    const [timer, setTimer] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }else{
                navigate("/login")
            }
        }, 1000);
    }, [timer]);

    return (
        <AccessForm>
            <span style={{ color: "grey", textAlign: "center"}}>
                Redirecting to login page in{" "}
                <span style={{ color: colors.primary }}>{timer+" "}</span>
                seconds
            </span>
        </AccessForm>
    );
};

export default Step4;
