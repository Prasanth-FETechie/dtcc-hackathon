import { Box, Typography, Button, Fab, Popover, Card, CardHeader, CardContent, CardActions, IconButton, Collapse, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Chatbot from "../components/Chatbot";
import MarketTable from "../components/MarketTable";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { useState, useEffect, useRef } from "react";

function Extract() {
  const location = useLocation();
  const navigate = useNavigate();
  const extractedDocs = location.state?.docs || [];
  const companyIds = extractedDocs.map(doc => doc.Company_ID);
  const [existingData, setExistingData] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [chatQuery, setChatQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [responseDataList, setResponseDataList] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const fabRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest");
        if (Array.isArray(response.data.body.companies)) {
          setExistingData(response.data.body.companies);
        } else {
          console.warn("API returned an empty array or unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchDatas(companyIds);
  }, []);

  const fetchDatas = async (input) => {
    try {
      const response = await Axios.post("https://jw3yqvwye0.execute-api.us-west-2.amazonaws.com/def", { company_ids: input });
      setExtractedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChatSubmit = async (input) => {
    setChatQuery(input);
    try {
      const inputObject = {
        company_id: JSON.parse(sessionStorage.getItem('rows'))[0].companyId,
        query: input
      };
      
      const response = await Axios.post("https://klswll0tw9.execute-api.us-west-2.amazonaws.com/dev", inputObject);
      setResponseDataList(prevList => [...prevList, { query: input, data: response.data }]);
      setAnchorEl(fabRef.current);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleExpand = (index) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const open = Boolean(anchorEl);
  const id = open ? "fab-popover" : undefined;

  return (
    <Box sx={{ height: "85vh", padding: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 8, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
          <MarketTable data={existingData} title="" id="view" />
          <MarketTable data={Object.entries(extractedData).map(([companyId, data]) => ({ companyId, ...data }))} title="" id="extract" />
        </Box>

        { responseDataList.length > 0 && <Fab ref={fabRef} color="primary" onClick={() => setAnchorEl(fabRef.current)} sx={{ position: 'fixed', bottom: 110, right: 40, zIndex: 1000 }}>
          <QuestionAnswerRoundedIcon titleAccess="Analyze" />
        </Fab>}

        {/* Popover containing response cards */}
        <Popover 
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
          transformOrigin={{ vertical: 'center', horizontal: 'right' }}
          sx={{ marginRight: 2, borderRadius: 20 }}
        >
          <Box sx={{ padding: 2, width: '650px', height: '600px', overflowY: 'auto', background: "#edf6f9" }}>
            {responseDataList.map((responseItem, index) => (
              <Card key={index} sx={{ marginBottom: 2 }}>
                <CardHeader title={responseItem.query} />
                <Divider />
                <CardContent>
                  <Typography variant="body2">{responseItem.data.answer}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton onClick={() => toggleExpand(index)}>
                    {expandedCards[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </CardActions>
                <Divider />
                <Collapse in={expandedCards[index]} timeout="auto" unmountOnExit>
                  <CardContent>
                    {responseItem.data.documents.map((doc, docIndex) => (
                      <Card key={docIndex} sx={{ padding: 1, margin: 1, boxShadow: 2, width: '100%' }}>
                        <Typography variant="body2" fontWeight="bold">{doc.metadata.Document_Name}</Typography>
                        <Typography variant="caption">{doc.metadata._source_uri}</Typography>
                      </Card>
                    ))}
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </Box>
        </Popover>
      </Box>
      <Box sx={{ flex: 2, marginTop: 2 }}>
        <Chatbot onChatSubmit={handleChatSubmit} />
      </Box>
    </Box>
  );
}

export default Extract;
