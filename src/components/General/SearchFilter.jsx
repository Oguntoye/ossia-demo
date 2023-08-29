import {PendingFilterContainer,PendingSearch} from "../../components/styles/PendingRegistrations";
import {DashSearchContainer, DashSearchInput} from "../../components/styles/Dashboard";
import { GlobalButton } from "../../components/styles/Global";
import { colors } from "../../utils/colors";
import { RiSearchLine } from "react-icons/ri";
import {AccessInfo, DataListInput, FormInput} from "../../components/styles/Access";
import { CSVLink } from "react-csv";

export const SearchFilter = (props) => {
    const search = (e) => {
        e.preventDefault();
    };

    return (
        <> 
            {
                props.showexcelbtn == true &&
                <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                    <CSVLink
                        data={props.exceldata}
                        filename={props.excelname}
                    >
                       Export as Excel
                    </CSVLink>

                    {/* <GlobalButton
                        background={colors.primary}
                        color={"white"}
                        style={{ margin: 0, borderRadius: 5, padding: "10px 20px" }}
                        type="button"
                        onClick={()=>{
                           
                        }}
                    >
                        Export as Excel
                    </GlobalButton> */}
                </div>
            }
           
            <PendingFilterContainer onSubmit={(e) => search(e)}>
                <PendingSearch>
                <DashSearchInput
                    placeholder="Enter search text here.."
                    style={{ flex: 1, alignSelf: "center" }}
                />
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={{ margin: 0, borderRadius: 5, padding: "5px 10px" }}
                    type="submit"
                >
                    <RiSearchLine color={"white"} size={20} />
                </GlobalButton>
                </PendingSearch>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "max-content",
                    }}
                >
                    <DashSearchContainer
                        style={{
                        alignItems: "center",
                        margin: 0,
                        width: "max-content",
                        marginRight: 5,
                        }}
                    >
                        <DataListInput
                            style={{
                                height: "max-content",
                                width: "max-content",
                                padding: 10,
                                fontSize: 12,
                                border: "none",
                                margin: 0,
                                marginRight: 10,
                            }}
                        >
                            <option value="" disabled>sort by</option>
                            <option>Title</option>
                            <option>Date ascending</option>
                            <option>Date descending</option>
                        </DataListInput>
                    </DashSearchContainer>

                    <DashSearchContainer
                        style={{
                        alignItems: "center",
                        margin: 0,
                        width: "max-content",
                        }}
                    >
                        <DataListInput
                        style={{
                            height: "max-content",
                            width: "max-content",
                            padding: 10,
                            fontSize: 12,
                            border: "none",
                            margin: 0,
                            marginRight: 10,
                        }}
                        >
                            <option value="" disabled>filter by</option>
                            <option>All</option>
                        </DataListInput>
                    </DashSearchContainer>
                </div>
            </PendingFilterContainer>
        </>
    )
}