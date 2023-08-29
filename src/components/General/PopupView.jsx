import React, { useEffect, useRef, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PopupView = ({ payView, setPayView, children }) => {
  return (
    <Modal 
    	open={payView} 
		onClose={() => setPayView(false)}
		center
		classNames={{
			modal: 'custommodalbr',
		}}
	>
        <div style={{ marginTop: 30}}>{children}</div>
    </Modal>
  );
};

export default PopupView;
