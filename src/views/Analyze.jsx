import { Box, Typography } from "@mui/material";
import Chatbot from "../components/Chatbot";
function Analyze() {
 return (
<Box sx={{ p: 3 }}>
<Typography variant="h5">Analyze</Typography>
<Chatbot from="analyze" />
</Box>
 );
}
export default Analyze;