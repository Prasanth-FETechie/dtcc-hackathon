// import { Box, Typography, Card } from "@mui/material";
// import Chatbot from "../components/Chatbot";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useState } from "react";
// import axios from "axios";

// function Report() {
//   const [chartOptions, setChartOptions] = useState(null);
//   const [insights, setInsights] = useState("");

//   const handleChatSubmit = async (input) => {
//     try {
//       const response = await axios.post(
//         "https://si8zczq3z3.execute-api.us-west-2.amazonaws.com/dummyReport",
//         { query: input }
//       );

//       if (response.data?.highcharts_code) {
//         console.log(response);
        
//         const highchartsCode = response.data.highcharts_code.replace("const options = ", "");
        
//         const st = highchartsCode.replaceAll("\n", "")
//         const newString = st.replace(';', "")
        
//         const parsedOptions = eval(`(${newString})`);
//         setChartOptions(parsedOptions);
//       }
      
//       if (response.data?.insights) {
//         setInsights(response.data.insights);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <Box sx={{ height: "85vh", padding: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
//       {chartOptions && (
//         <Card sx={{ p: 2, mb: 2 }}>
//           <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//           {insights && <Typography sx={{ mt: 2 }}>{insights}</Typography>}
//         </Card>
//       )}
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h5">Report</Typography>
//         <Chatbot onChatSubmit={handleChatSubmit} />
//       </Box>
//     </Box>
//   );
// }

// export default Report;

// // Questions
// Which companies have EPS of exactly 5?


// import { Box, Typography, Card, Divider, Button } from "@mui/material";
// import Chatbot from "../components/Chatbot";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import { PictureAsPdf as PdfIcon } from "@mui/icons-material";

// function Report() {
//   const [responses, setResponses] = useState([]);

//   const handleChatSubmit = async (input) => {
//     try {
//       const response = await axios.post(
//         "https://si8zczq3z3.execute-api.us-west-2.amazonaws.com/dummyReport",
//         { query: input }
//       );
      
//       if (response.data?.highcharts_code) {
//         console.log(response);
//         const highchartsCode = response.data.highcharts_code.replace("const options = ", "").replaceAll("\n", "").replace(";", "");
//         const parsedOptions = eval(`(${highchartsCode})`);
        
//         const newResponse = {
//           chartOptions: parsedOptions,
//           insights: response.data?.insights || "",
//         };
//         setResponses((prev) => [...prev, newResponse]);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleDownloadReport = () => {
//     const doc = new jsPDF();
//     let yOffset = 10;
//     responses.forEach((res, index) => {
//       doc.text(`Report ${index + 1}`, 10, yOffset);
//       yOffset += 10;
//       doc.text(res.insights, 10, yOffset, { maxWidth: 180 });
//       yOffset += 30;
//     });
//     doc.save("report.pdf");
//   };

//   return (
//     <Box sx={{ height: "100vh", padding: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", overflowY: "auto" }}>
//       <Box sx={{ overflowY: "scroll" }}>
//         {responses.map((res, index) => (
//             <Card key={index} sx={{ mb: 2, overflowY: "auto" }}>
//                 <HighchartsReact highcharts={Highcharts} options={res.chartOptions} />
//                     <Divider />
//                 <Typography sx={{p: 2}}>{res.insights}</Typography>
//             </Card>
//         ))}
//       </Box>
//       <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
//         {responses.length > 0 && (
//           <Button variant="contained" startIcon={<PdfIcon />} onClick={handleDownloadReport} sx={{ mt: 2, ml: 'auto', width: '250px' }}>
//             Download Report
//           </Button>
//         )}
//         <Chatbot onChatSubmit={handleChatSubmit} />
//       </Box>
//     </Box>
//   );
// }

// export default Report;


import { Box, Typography, Card, Divider, Button, CardHeader, Backdrop, CircularProgress } from "@mui/material";
import Chatbot from "../components/Chatbot";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PictureAsPdf as PdfIcon } from "@mui/icons-material";

function Report() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);    
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  const handleChatSubmit = async (input) => {
    setLoading(true);
    try {
      const response = await axios.post(
        // "https://si8zczq3z3.execute-api.us-west-2.amazonaws.com/dummyReport",
        "https://hq5ac5kxbc.execute-api.us-west-2.amazonaws.com/ReportGeneration",
        { query: input }
      );
      
      if (response.data?.highcharts_code) {
        console.log(response);
        const highchartsCode = response.data.highcharts_code.replace("const option = ", "").replaceAll("\n", "").replaceAll(";", "");
        console.log(highchartsCode);
        
        const parsedOptions = eval(`(${highchartsCode})`);
        
        const newResponse = {
          query: input,
          chartOptions: parsedOptions,
          insights: response.data?.insights || "",
        };
        setResponses((prev) => [...prev, newResponse]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
        setLoading(false)
    }
  };

  const handleDownloadReport = async () => {
    const doc = new jsPDF();
    for (let i = 0; i < responses.length; i++) {
      const chartElement = document.getElementById(`chart-container-${i}`);
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, 10, 180, 90);
        doc.text(responses[i].query, 10, 105, { maxWidth: 180 });
        doc.text(responses[i].insights, 10, 120, { maxWidth: 180 });
        if (i < responses.length - 1) doc.addPage();
      }
    }
    doc.save("report.pdf");
  };

  return (
    <Box sx={{ height: "100vh", padding: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", overflowY: "auto" }}>
        <Backdrop open={loading} sx={{ color: '#ddd', zIndex: 1300, backdropFilter: "blur(1px)" }}>
            <CircularProgress color="inherit" />
        </Backdrop>
      <Box sx={{ overflowY: "scroll" }}>
        {responses.map((res, index) => (
          <Card key={index} id={`chart-container-${index}`} 
            sx={{ mb: 2, overflowY: "auto", borderLeft: '6px solid #8338ec', borderRight: '5px solid #8338ec' }} 
            ref={index === responses.length - 1 ? containerRef : null}>
            <CardHeader title={res.query} />
            <Divider/>
            <HighchartsReact highcharts={Highcharts} options={res.chartOptions} />
            <Divider />
            <Typography sx={{ p: 2 }}>{res.insights}</Typography>
          </Card>
        ))}
      </Box>
      <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
        {responses.length > 0 && (
          <Button variant="contained" startIcon={<PdfIcon />} onClick={handleDownloadReport} sx={{ mt: 2, ml: 'auto', width: '250px' }}>
            Download Report
          </Button>
        )}
        <Chatbot onChatSubmit={handleChatSubmit} />
      </Box>
    </Box>
  );
}

export default Report;

