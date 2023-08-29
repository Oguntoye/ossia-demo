import styled from "styled-components";
import { colors } from "../../utils/colors";
import ViewSlider from "react-view-slider";
import { Button, Card, Image, Form, Dropdown } from 'semantic-ui-react'

export const DivQuarter = styled.div`
    width: 32%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const DivHalf = styled.div`
    width: 48%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const FullDiv = styled.div`
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const FullDivRow = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`;

export const GMulti = styled.textarea`
    width: 60%;
    padding: 10px;
    border: 0.5px solid #cdcdcd;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 14px;
    outline: none;
    transition: all 0.5s ease-in-out;
    margin-bottom: 15px;
    height: 100px;
    resize: none;

    @media (max-width: 768px) {
        font-size: 12px;
        width: 100%;
    }
`;