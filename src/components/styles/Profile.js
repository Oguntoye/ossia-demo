import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { colors } from "../../utils/colors";

export const ProfileCoverContainer = styled.div`
  height: 250px;
  display: flex;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  @media (max-width: 768px) {
    height: 125px;
  }
`;

export const ProfileDivLeft = styled.div`
  position: relative;
  padding: 0;
  flex: 1;
`;

export const ProfileIfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-left: 5%;
  padding-right: 2%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 0px;
    position: relative;
    flex-direction: column;
  }
`;

export const ProfileSectionCard = styled.div`
  border-radius: 10px;
  width: 100;
  padding: 10px;
  height: max-content;
  box-shadow: 0 1.5px 5px rgb(0 0 0 / 0.1);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    border: none;
    box-shadow: none;
  }
`;

export const ProfileInfoSub = styled.div`
  align-self: flex-end;
  padding-bottom: 10px;
  padding-left: 10px;
  flex: 1;
  @media (max-width: 768px) {
    padding: 5px;
    align-self: flex-start;
  }
`;

export const ProfileName = styled.h5`
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ProfileType = styled.p`
  font-size: 13px;
  color: grey;
  margin-top: 2px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ProfileCoverImg = styled.img`
  width: 100%;
  height: 70%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  object-fit: cover;
  position: absolute;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 0;
  }
`;

export const ProfileImg = styled(FaUserCircle)`
  width: 120px;
  height: 120px;
  color: black;
  border: 4px solid white;
  background-color: white;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const ProfileImgUser = styled.img`
  width: 120px;
  height: 120px;
  color: black;
  border: 4px solid white;
  background-color: white;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 70px;
    left: 10px;
    height: 70px;
  }
`;

export const ProfileImgUserDefault = styled(FaUserCircle)`
  width: 120px;
  height: 120px;
  color: black;
  border: 2px solid white;
  background-color: white;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 70px;
    left: 10px;
    height: 70px;
  }
`;

export const ProfileInput = styled.input`
  width: 60%;
  padding: 10px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const ProfileInputMulti = styled.textarea`
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

export const ProfileInputSelect = styled.select`
  width: 60%;
  padding: 10px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const ProfileDataContainer = styled.div`
  flex: 1;
  display: flex;
  margin-top: 40px;
  font-size: 14px;
  border-bottom: 1px solid #cdcdcd;
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 12px;
    margin-top: 20px;
  }
`;

export const ProfileDataTitle = styled.div`
  flex: 0.2;
  color: black;
  @media (max-width: 768px) {
    flex: 1;
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

export const ProfileDataInputContainer = styled.div`
  flex: 0.8;
  font-size: 14;
  color: grey;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const ProfileSchoolImg = styled.img`
  width: 60px;
  height: 60px;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

export const ProfileSchoolTitle = styled.h4`
  color: black;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProfileSchoolTitleHome = styled.h4`
  color: black;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProfileSchoolCourse = styled.p`
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ProfileIconEdit = styled(MdEditNote)`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  align-self: flex-end;

  :hover {
    background-color: ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    align-self: flex-start;
    width: 35px;
    height: 35px;
  }
`;

export const ProfileIcconAdd = styled(RiAddFill)`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  :hover {
    background-color: ${colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const ProfileIcconRemove = styled(FiMinus)`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  :hover {
    background-color: ${colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const DashTitleButton = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DashSearchContainerEdit = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  margin-top: 40px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProfileButtonContainer = styled.div`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  :hover {
    background-color: rgba(0,0,0,0.5);
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const EditCropImage = styled.img`
  width: 500px;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
