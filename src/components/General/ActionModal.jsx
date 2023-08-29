import React, { useEffect, useState } from "react";
import { Confirm, Modal, Button, Header, Image  } from 'semantic-ui-react'
import { isValidText } from "../../utils/helpers";
import { ClipLoader } from "react-spinners";
import { colors } from "../../utils/colors";
export const ModalDialog = (props) =>{
    return (
        <Modal
            onClose={() => props.setmodaldialog(false)}
            onOpen={() => props.setmodaldialog(true)}
            open={props.modalVisible}
            size='tiny'
            // closeOnEscape={props?.modalDialogContent?.loading == true ? false : true}
            // closeOnDimmerClick={props?.modalDialogContent?.loading == true ? false : true}
            closeOnEscape={false}
            closeOnDimmerClick={false}
        >   
            {
                (props?.modalDialogContent?.type == "e" && props?.modalDialogContent?.loading != true) &&
                <Header color="red" icon='exclamation' content={isValidText(props?.modalDialogContent?.headertitle) == true ? props?.modalDialogContent?.headertitle : "Opps. Sorry"}/>
            }
            
            {
                (props?.modalDialogContent?.type == "s" && props?.modalDialogContent?.loading != true) &&
                <Header color="green" icon='check circle outline' content={isValidText(props?.modalDialogContent?.headertitle) == true ? props?.modalDialogContent?.headertitle : "Success"}/>
            }

            {
                (props?.modalDialogContent?.type == "i" && props?.modalDialogContent?.loading != true) &&
                <Header color="green" icon='exclamation' content={isValidText(props?.modalDialogContent?.headertitle) == true ? props?.modalDialogContent?.headertitle : "Information"}/>
            }

            {
                props?.modalDialogContent?.loading == true &&
                <Header color="black" icon='' content={"Please Wait"}/>
            }
           

            {
                props?.modalDialogContent?.loading == true &&
                <Modal.Content>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:20}}>
                        <ClipLoader color={colors.primary} size={50} />
                    </div>
                </Modal.Content>
            }
        
            
            {
                props?.modalDialogContent?.loading != true &&
                <Modal.Content>
                <p>{props?.modalDialogContent?.content}</p>
                </Modal.Content>
            }
          

            {
                props?.modalDialogContent?.loading != true &&
                <Modal.Actions>
                <Button color='blue' onClick={() => props.btn1Pressed()}>{isValidText(props?.btn1Text) == true ? props?.btn1Text : "OK"}</Button>
                {
                    isValidText(props.btn2Text) == true &&
                    <Button color='black' onClick={() => props.btn2Pressed()}>{isValidText(props?.btn2Text) == true ? props?.btn2Text : "Yes"}</Button>
                }
                </Modal.Actions>
            }
        </Modal>
    )
}