import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MarketTable from "../components/MarketTable";
import { historicalData, predictedData } from "../data/historicalData";
import Chatbot from "../components/Chatbot";
import Axios from "axios";
function View() {
    const [showPrediction, setShowPrediction] = useState(false);
    const [existingData, setExistingData] = useState([]);
    const [chatQuery, setChatQuery] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest");
                if (Array.isArray(response.data.body.companies)) {
                    //   setHeaders(Object.keys(response.data.body.companies[0]))
                    //   setApiData(response.data.body.companies);
                    setExistingData(response.data.body.companies)
                } else {
                    console.warn("API returned an empty array or unexpected data format");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        // console.log(headers);
        // console.log(apiData);
    }, []);
    const handleChatSubmit = async (input) => {
        setChatQuery(input)
    };
    return (
        <>
            <Box sx={{ p: 3 }}>
                <Typography variant="h5">Market Trends</Typography>
                <MarketTable data={existingData} title="" id="view"/>
                {showPrediction && <MarketTable data={predictedData} title="Predicted Data" />}
            </Box>
            <Box sx={{ flex: 2, marginTop: 2 }}>
                <Chatbot onChatSubmit={handleChatSubmit} />
            </Box>
        </>
    );
}
export default View;