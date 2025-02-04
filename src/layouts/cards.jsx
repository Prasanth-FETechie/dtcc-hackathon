import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Collapse, Box, Link } from "@mui/material";
import { motion } from "framer-motion";
import { TrendingUp, AttachMoney, ExpandMore, ExpandLess, Description } from "@mui/icons-material";

const FinancialCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div 
      whileHover= {{ scale: 1.02 }
}
whileTap = {{ scale: 0.98 }}
    >
  <Card sx={ { maxWidth: 600, m: 2, p: 2, borderRadius: 3, boxShadow: 5 } }>
    <CardContent>
    <Typography variant="h6" color = "primary" gutterBottom >
            📈 Financial Performance - Reliance
  </Typography>

  < Box display = "flex" alignItems = "center" gap = { 1} >
    <AttachMoney color="success" />
      <Typography variant="body1" >
        <strong>Revenue: </strong> ₹10,00,122 Cr (US$ 119.9B) <span style={{ color: "green" }}>↑ 2.6%</span >
          </Typography>
          </Box>

          < Box display = "flex" alignItems = "center" gap = { 1} mt = { 1} >
            <TrendingUp color="secondary" />
              <Typography variant="body1" >
                <strong>EBITDA: </strong> ₹1,78,677 Cr (US$ 21.4B) <span style={{ color: "green" }}>↑ 16.1%</span >
                  </Typography>
                  </Box>

                  < Box display = "flex" alignItems = "center" gap = { 1} mt = { 1} >
                    <TrendingUp color="action" />
                      <Typography variant="body1" >
                        <strong>Net Profit: </strong> ₹79,020 Cr <span style={{ color: "green" }}>↑ 7.3%</span >
                          </Typography>
                          </Box>

                          < Typography variant = "body2" color = "textSecondary" mt = { 2} >
                            { data.answer }
                            </Typography>

{/* Expandable Section */ }
<IconButton onClick={ toggleExpand } sx = {{ mt: 2 }}>
  { expanded?<ExpandLess /> : <ExpandMore />}
</IconButton>

  < Collapse in={ expanded } timeout = "auto" unmountOnExit >
    <Typography variant="subtitle1" color = "primary" mt = { 2} >
              📑 Related Documents:
</Typography>

{
  data.documents.map((doc, index) => (
    <Box key= { index } display = "flex" alignItems = "center" mt = { 1} gap = { 1} >
    <Description color="primary" />
  <Link href={ doc.metadata._source_uri } target = "_blank" rel = "noopener" >
  { doc.metadata.Document_Name }
  </Link>
  </Box>
  ))
}
</Collapse>
  </CardContent>
  </Card>
  </motion.div>
  );
};

// Example usage
const responseData = {
  answer: "Reliance delivered robust financial performance with consolidated revenue reaching ₹10,00,122 crore...",
  documents: [
    {
      metadata: {
        Document_Name: "RIL_AR_O&G.pdf",
        _source_uri: "https://teailbucket.s3.us-west-2.amazonaws.com/documents/RIL_AR_O%26G.pdf",
      },
    },
  ],
};

export default function Cards() {
  return <FinancialCard data={ responseData } />;
}
