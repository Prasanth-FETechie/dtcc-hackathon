import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, Grid, CardContent } from "@mui/material";
import MarketTable from "../components/MarketTable";
import { historicalData, predictedData } from "../data/historicalData";
import Chatbot from "../components/Chatbot";
import Axios from "axios";
function View() {
    const [showPrediction, setShowPrediction] = useState(false);
    const [existingData, setExistingData] = useState([]);
    const [chatQuery, setChatQuery] = useState("");
    const [portfolio, setPortfolio] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest");
                if (Array.isArray(response.data.body.companies)) {
                    //   setHeaders(Object.keys(response.data.body.companies[0]))
                    //   setApiData(response.data.body.companies);
                    setPortfolio(response.data.body)
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
        setShowPrediction(true)
    };
    return (
        <>
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", minHeight: "100vh"}}>
           {showPrediction && <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Market Trends</Typography>
                <Box>
                <MarketTable data={existingData} title="" id="view" />
                </Box>
                <Grid container spacing={3} my={1}>
                    {/* Summary Card */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2, height: "100%" }}>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Summary
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {portfolio?.summary || "No summary available"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Growth Rate Card */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 , height: "100%"}}>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Growth Rate
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mt: 1,
                                        fontWeight: "bold",
                                        color: "green", // Highlight positive growth
                                    }}
                                >
                                    {portfolio?.growth_rate || "N/A"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box> }
            <Box sx={{  marginTop: "auto" ,position: "sticky", bottom: 0  }}>
                <Chatbot onChatSubmit={handleChatSubmit} />
            </Box>
            </Box>

        </>
    );
}
export default View;