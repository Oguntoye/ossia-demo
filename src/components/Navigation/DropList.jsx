import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { IconDashRight } from "../styles/Dashboard";
import { RowDivSpace } from "../styles/Global";

const DropList = ({ title, children }) => {
    const [drop, setDrop] = useState(false);
    return (
        <>
        <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => setDrop((e) => !e)}
        >
            {title}
            <IconDashRight
            style={{
                transform: drop ? "rotate(90deg)" : "rotate(0deg)",
            }}
            />
        </RowDivSpace>
        <AnimateHeight height={drop ? "auto" : 0}>
            <div style={{ marginLeft: "10%" }}>{children}</div>
        </AnimateHeight>
        </>
    );
};

export default DropList;
