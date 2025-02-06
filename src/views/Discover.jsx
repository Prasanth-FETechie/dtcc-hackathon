import { Box, Typography, Paper, Button, Checkbox, FormControlLabel, Fab } from "@mui/material";
import ExtractIcon from '@mui/icons-material/FileCopy'
import Chatbot from "../components/Chatbot";
import DocumentCard from "../layouts/cards";
import MarketTable from "../components/MarketTable";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@mui/material";

const dropAnimation = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

function Discover() {
    const navigate = useNavigate();
    const [existingData, setExistingData] = useState([]);
    const [intResponseData, setIntResponseData] = useState([]);
    const [selectedQualifiers, setSelectedQualifiers] = useState([]);
    const [discoverResponseData, setDiscoverResponseData] = useState(null);
    const [chatQuery, setChatQuery] = useState("");
    const [showDoc, setShowDoc] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("https://47l1w34bw5.execute-api.us-west-2.amazonaws.com/dataTest");
                if (Array.isArray(response.data.body.companies)) {
                    setExistingData(response.data.body.companies)
                } else {
                    console.warn("API returned an empty array or unexpected data format");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log("Current Selected Docs:", selectedDocs);
    }, [selectedDocs]);
    const handleNavigate = () => {
        navigate('/extract', { state: { docs: selectedDocs } });
      };
    const handleSelect = (doc) => {
        console.log(doc)
        // setSelectedDocs((prevState) =>
        //     prevState.includes(doc) ? prevState.filter(item => item !== doc) : [...prevState, doc]
        // );
        setSelectedDocs(prevState => {
            // Check if the document is already selected, and toggle it
            const updatedState = prevState.includes(doc)
                ? prevState.filter(item => item.title !== doc.title)
                : [...prevState, doc];

            return updatedState;
        });
        console.log(selectedDocs)
    };
    const fetchIntentData = async (input) => {
        try {
            const response = await Axios.post("https://5ux67r8wfc.execute-api.us-west-2.amazonaws.com/dummydiscoverintent", { query: input });
            return response.data.qualifiers;
        } catch (error) {
            console.error("Error fetching intent data", error);
        }
    };
    const fetchDiscoverData = async () => {
        try {
            const response = await Axios.post("https://dcib4a0zp1.execute-api.us-west-2.amazonaws.com/dummydiscovermain",
                { query: chatQuery, qualifiers: intResponseData });
            return response.data.values;
        } catch (error) {
            console.error("Error fetching intent data", error);
        }
    };
    const handleSelectOption = (option) => {

        setSelectedQualifiers((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
        console.log(selectedQualifiers)
    };
    const handleSubmitSelection = async () => {
        try {
            const disres = await fetchDiscoverData();
            console.log(disres);

            setDiscoverResponseData(disres); // Store the final response for MarketTable
            setShowDoc(true);
        }
        catch (error) {
            console.error("Error fetching discover data:", error);
        }
    };
    const handleChatSubmit = async (input) => {
        setChatQuery(input)
        try {
            const intres = await fetchIntentData(input);
            console.log(intres)
            setIntResponseData(intres)
        } catch (error) {
            console.error("Error fetching market data:", error);
        }
    };
    return (
        <Box sx={{ height: "100vh", padding: 2, display: "flex", flexDirection: "column" }}>
            {/* First Section (70%) */}
            <Box sx={{ flex: 8, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
                    {/* Left Section */}
                    <MarketTable data={existingData} title="" id="discover"/>
                    {/* Right Section */}
                    {intResponseData.length>0 && ( <Paper sx={{ width: '70vw', overflowY: 'auto', height: '75vh' }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {!showDoc && Array.isArray(intResponseData) && intResponseData.length > 0 && (
                                <Box>
                                    <h3>Enhance your query based on below parameters</h3>
                                    {intResponseData.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    checked={selectedQualifiers.includes(option)}
                                                    onChange={() => handleSelectOption(option)}
                                                />
                                            }
                                            label={option}
                                        />
                                    ))}
                                    <Button variant="contained" onClick={handleSubmitSelection} disabled={selectedQualifiers.length <= 0}>
                                        Submit Selection
                                    </Button>
                                </Box>
                            )}
                            {showDoc && discoverResponseData?.map((doc) => (
                                <DocumentCard
                                    key={doc.Document_Name}
                                    doc={doc}
                                    onSelect={handleSelect}
                                    isSelected={selectedDocs.some(item => item.title === doc.title)}
                                />
                            ))}
                            {/* <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                            <Button variant="contained" color="secondary" onClick={() => alert('Selected Documents: ' + selectedDocs.map(d => d.title).join(', '))}>
                                Show Selected Documents
                            </Button>
                        </Box> */}
                        </Box>
                    </Paper>)}
                </Box>
                {selectedDocs.length > 0 && (
                    <Fab
                        color="primary"
                        onClick={handleNavigate}
                        sx={{
                            position: 'fixed',
                            bottom: 100,  // Distance from bottom
                            right: 20,    // Distance from left side
                            zIndex: 1000,  // Ensure the button is above other content
                            animation: selectedDocs.length > 0 ? `${dropAnimation} 0.5s ease-out` : 'none',
                        }}
                    >
                        <ExtractIcon titleAccess="Extract" />
                    </Fab>)}

            </Box>

            {/* Second Section (30%) */}
            <Box sx={{ flex: 2, marginTop: 2 }}>
                <Chatbot onChatSubmit={handleChatSubmit} />
            </Box>

        </Box>
    );
}
export default Discover;