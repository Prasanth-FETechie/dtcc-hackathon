import { Box, Typography, Button } from "@mui/material";
import Chatbot from "../components/Chatbot";
import Card from "../layouts/cards";
import { useState } from "react";
import Cards from "../layouts/cards";
import DocumentCard from "../layouts/cards";

const documentData = [
  {
    "title": "SEL_AR_O&G.pdf",
    "excerpt": "...to active development of its field operations...",
    "Document_Name": "SEL_AR_O&G",
    "Document_Category": "FIN",
    "source_uri": "https://teailbucket.s3.us-west-2.amazonaws.com/documents/SEL_AR_O%26G.pdf",
    "Company_Name": "Selan Exploration",
    "Company_ID": "INE073A01015",
    "Document_Type": "AR"
  },
  {
    "title": "OIL_SR_O&G.pdf",
    "excerpt": "...Exploration and Production of Crude oil...",
    "Document_Name": "OIL_SR_O&G",
    "Document_Category": "ESG",
    "source_uri": "https://teailbucket.s3.us-west-2.amazonaws.com/documents/OIL_SR_O%26G.pdf",
    "Company_Name": "Oil India Limited",
    "Company_ID": "INE490J01019",
    "Document_Type": "SR"
  },
  // Add other document data here
];
function Extract() {
    const [expanded, setExpanded] = useState(false);
    const [showDoc, setShowDoc] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState([]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleChatSubmit = async (input) => {
    console.log(input);
    try {
        // const response = await Axios.post("https://your-api-endpoint.com", { query: input });
        // setMarketData(response.data); // Update MarketTable data
    } catch (error) {
        console.error("Error fetching market data:", error);
    }
};
const handleSelect = (doc) => {
  setSelectedDocs((prevState) =>
    prevState.includes(doc) ? prevState.filter(item => item !== doc) : [...prevState, doc]
  );
};
 return (
<Box sx={{ p: 3 }}>
<Typography variant="h5">Extract</Typography>
{documentData.map((doc) => (
                            <DocumentCard
                                key={doc.Document_Name}
                                doc={doc}
                                onSelect={handleSelect}
                                isSelected={selectedDocs.includes(doc)}
                            />
                        ))}
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                            <Button variant="contained" color="secondary" onClick={() => alert('Selected Documents: ' + selectedDocs.map(d => d.title).join(', '))}>
                                Show Selected Documents
                            </Button>
                        </Box>
<Chatbot from="extract" onChatSubmit={handleChatSubmit}/>
</Box>
 );
}
export default Extract;