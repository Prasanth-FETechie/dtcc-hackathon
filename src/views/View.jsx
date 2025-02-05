import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MarketTable from "../components/MarketTable";
import { historicalData, predictedData } from "../data/historicalData";
import Axios from "axios";
function View() {
 const [showPrediction, setShowPrediction] = useState(false);
 const [existingData, setExistingData] = useState([]);
 useEffect(() => {
     const fetchData = async () => {
         try {
             const response = await Axios.get("https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest");
             if (Array.isArray(response.data.body.companies) ) {
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
 return (
<Box sx={{ p: 3 }}>
<Typography variant="h5">Market Trends</Typography>
<MarketTable data={existingData} title="Historical Data" />
     {showPrediction && <MarketTable data={predictedData} title="Predicted Data" />}
<Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setShowPrediction(true)}>
       Predict
</Button>
</Box>
 );
}
export default View;