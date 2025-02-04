import { Box, Typography } from "@mui/material";
import Chatbot from "../components/Chatbot";
import Card from "../layouts/cards";
import { useState } from "react";
import Cards from "../layouts/cards";
function Extract() {
    const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

 return (
<Box sx={{ p: 3 }}>
<Typography variant="h5">Extract</Typography>
<Cards/>
<Chatbot from="extract" />
</Box>
 );
}
export default Extract;