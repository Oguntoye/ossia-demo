import React, { useEffect, useState } from "react";
import { AccessForm, FormInput } from "../../components/styles/Access";
import { GlobalButton } from "../../components/styles/Global";
import { PropagateLoader } from "react-spinners";
import { HiArrowNarrowRight } from "react-icons/hi";
import { colors } from "../../utils/colors";


export const PasswordResetStep1 = (props) =>{
    return (
        <AccessForm style={{padding:20}}> 
        Your email *
        <FormInput
            type="email"
            required
            placeholder="example@gmail.com"
            hidden={false}
            name="email"
            onChange={(event) => props?.fxhandleChange(event)}
            value = {props?.formData?.email}
        />
       
        <GlobalButton
            background={colors.primary}
            style={{marginTop:20}}
            color="white"
            border={colors.primary}
            type="button"
            onClick={async()=>{
                props.updateStep()
            }}
        >
            <>
                Continue{" "}
                <HiArrowNarrowRight
                size={15}
                color="white"
                style={{ marginLeft: 10 }}
                />
            </>
        </GlobalButton>
        </AccessForm>
    );
}


export const PasswordResetStep2 = (props) =>{
    return (
        <AccessForm style={{padding:20}}> 
        Enter OTP *
        <FormInput
            type="text"
            required
            hidden={false}
            name="otp"
            onChange={(event) => props?.fxhandleChange(event)}
            value = {props?.formData?.otp}
            autoComplete="off"
        />

        Enter New Password *
        <FormInput
            type="password"
            required
            hidden={false}
            name="newpassword"
            onChange={(event) => props?.fxhandleChange(event)}
            value = {props?.formData?.newpassword}
            autoComplete="off"
        />

        Cofirm New Password *
        <FormInput
            type="password"
            required
            hidden={false}
            name="confirmpassword"
            onChange={(event) => props?.fxhandleChange(event)}
            value = {props?.formData?.confirmpassword}
            autoComplete="off"
        />
       
        <GlobalButton
            background={colors.primary}
            style={{marginTop:20}}
            color="white"
            border={colors.primary}
            type="button"
            onClick={async()=>{
                props.updateStep()
            }}
        >
            <>
                Continue{" "}
                <HiArrowNarrowRight
                size={15}
                color="white"
                style={{ marginLeft: 10 }}
                />
            </>
        </GlobalButton>
        </AccessForm>
    );
}