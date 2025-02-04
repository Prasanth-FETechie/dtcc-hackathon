import { Box, Typography, Paper } from "@mui/material";
import Chatbot from "../components/Chatbot";
import MarketTable from "../components/MarketTable";
function Discover() {
    return (
        <Box sx={{ height: "100vh", padding: 2, display: "flex", flexDirection: "column" }}>
            {/* First Section (70%) */}
            <Box sx={{ flex: 8, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
                    {/* Left Section */}
                        <MarketTable data="https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest" title="" />
                    {/* Right Section */}
                        <MarketTable data="https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest" title="" />
                </Box>
            </Box>

            {/* Second Section (30%) */}
            <Box sx={{ flex: 2, marginTop: 2 }}>
                <Chatbot />
            </Box>
        </Box>
    );
}
export default Discover;