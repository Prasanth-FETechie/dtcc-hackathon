// import { Box, Typography } from "@mui/material";
// import Chatbot from "../components/Chatbot";
// function Report() {

//   const handleChatSubmit = async (input) => {

//   }

//   return (
//     <Box sx={{ height: "85vh", padding: 2, display: "flex", flexDirection: "column" }}>

//         <Box sx={{ p: 3 }}>
//             <Typography variant="h5">Report</Typography>
//             <Chatbot onChatSubmit={handleChatSubmit} />
//         </Box>
//     </Box>
//   );
// }
// export default Report;

import { Box, Typography, Card } from "@mui/material";
import Chatbot from "../components/Chatbot";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import axios from "axios";

function Report() {
  const [chartOptions, setChartOptions] = useState(null);
  const [insights, setInsights] = useState("");

  const handleChatSubmit = async (input) => {
    try {
      const response = await axios.post(
        "https://si8zczq3z3.execute-api.us-west-2.amazonaws.com/dummyReport",
        { query: input }
      );

      if (response.data?.highcharts_code) {
        console.log(response);
        
        const highchartsCode = response.data.highcharts_code.replace("const options = ", "");
        
        const st = highchartsCode.replaceAll("\n", "")
        const newString = st.replace(';', "")
        
        const parsedOptions = eval(`(${newString})`);
        setChartOptions(parsedOptions);
      }
      
      if (response.data?.insights) {
        setInsights(response.data.insights);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box sx={{ height: "85vh", padding: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      {chartOptions && (
        <Card sx={{ p: 2, mb: 2 }}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          {insights && <Typography sx={{ mt: 2 }}>{insights}</Typography>}
        </Card>
      )}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Report</Typography>
        <Chatbot onChatSubmit={handleChatSubmit} />
      </Box>
    </Box>
  );
}

export default Report;

// Questions
// Which companies have EPS of exactly 5?