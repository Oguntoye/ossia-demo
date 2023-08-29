import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";

const Step1 = ({ setEmail, setStep }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const form = useRef();

    const request = async (e) => {
        e.preventDefault();
        setLoading(false);
    };

    return (
        <AccessForm
        key={0}
        onSubmit={(e) => (!false ? request(e) : null)}
        ref={form}
        >
        Your email *
        <FormInput
            type="email"
            required
            placeholder="example@gmail.com"
            hidden={false}
        />
        <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
        <div
            style={{
            display: "flex",
            fontWeight: "200",
            margin: "25px 0px",
            alignItems: "center",
            }}
        >
            {/* <input type={"checkbox"} required style={{ marginRight: 10 }} /> I
            accept{" "}
            <a href="#" style={{ color: "black", marginLeft: 5 }}>
            Privacy Policy
            </a> */}
        </div>
        <GlobalButton
            background={colors.primary}
            color="white"
            border={colors.primary}
            //   onClick={() => setOn((on) => (on++ === 3 ? 1 : on++))}
            type="submit"
        >
            {loading ? (
            <span style={{ padding: 10, marginTop: -10, marginBottom: 7 }}>
                <PropagateLoader color={"white"} loading={loading} size={15} />
            </span>
            ) : (
            <>
                Continue{" "}
                <HiArrowNarrowRight
                size={15}
                color="white"
                style={{ marginLeft: 10 }}
                />
            </>
            )}
        </GlobalButton>
        </AccessForm>
    );
};

export default Step1;
