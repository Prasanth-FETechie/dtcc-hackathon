import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MarketTable from "../components/MarketTable";
import { historicalData, predictedData } from "../data/historicalData";
import Axios from "axios";
function View() {
 const [showPrediction, setShowPrediction] = useState(false);
 const [existingData, setExistingData] = useState([]);

 return (
<Box sx={{ p: 3 }}>
<Typography variant="h5">Market Trends</Typography>
<MarketTable data="https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest" title="Historical Data" />
     {showPrediction && <MarketTable data={predictedData} title="Predicted Data" />}
<Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setShowPrediction(true)}>
       Predict
</Button>
</Box>
 );
}
export default View;