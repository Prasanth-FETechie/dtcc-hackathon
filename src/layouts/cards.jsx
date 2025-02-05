import React, { useState } from 'react';
import { Card, CardContent, CardActions, Checkbox, Box, Typography, Button } from '@mui/material';

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

const DocumentCard = ({ doc, onSelect, isSelected }) => {
  let colr = !isSelected ? "success" : "error";
  let text = isSelected ? "Selected" : "Select";
  return (
    <Card sx={{ width: 250, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{doc.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {doc.excerpt}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" color= {colr} onClick={() => onSelect(doc)}>
          {text}
        </Button>
      </CardActions>
    </Card>
  );
};


export default DocumentCard;
