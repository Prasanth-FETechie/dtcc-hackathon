import { Box, Typography, Button } from "@mui/material";
import Chatbot from "../components/Chatbot";
import Card from "../layouts/cards";
import { useState, useEffect } from "react";
import Cards from "../layouts/cards";
import DocumentCard from "../layouts/cards";
import MarketTable from "../components/MarketTable";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Extract() {
  const location = useLocation();
  const navigate = useNavigate();
  // Extracting the docs array from the location state
  const extractedDocs = location.state?.docs || [];
  const companyIds = extractedDocs.map(doc => doc.Company_ID);
  const [expanded, setExpanded] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [existingData, setExistingData] = useState([]);
  const [chatQuery, setChatQuery] = useState([]);
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
    fetchDatas(companyIds)
  }, []);


  const companyArray = Object.entries(extractedData).map(([companyId, data]) => ({
    companyId,
    ...data
  }));

  const fetchDatas = async (input) => {
    try {
      const response = await Axios.post("https://jw3yqvwye0.execute-api.us-west-2.amazonaws.com/def", { company_ids: input });
      setExtractedData(response.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleChatSubmit = async (input) => {
    setChatQuery(input);
    const companys = JSON.parse(sessionStorage.getItem("rows"))
    navigate('/analyze', { state: { docs: {company_id: companys[0].companyId, query: input} } }); 
  };

  return (
    <Box sx={{ height: "100vh", padding: 2, display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Extract</Typography>
      {/* First Section (70%) */}
      <Box sx={{ flex: 8, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
          {/* Left Section */}
          <MarketTable data={existingData} title="" id="view"/>
          <MarketTable data={companyArray} title="" id="extract"/>
        </Box>
      </Box>
      {/* Second Section (30%) */}
      <Box sx={{ flex: 2, marginTop: 2 }}>
        <Chatbot onChatSubmit={handleChatSubmit} />
      </Box>
    </Box>
  );
}
export default Extract;