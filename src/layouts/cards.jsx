import React, { useState } from 'react';
import { Card, CardContent, CardActions, Checkbox, Box, Typography, Button, Divider } from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const DocumentCard = ({ doc, onSelect, isSelected }) => {
  let colr = !isSelected ? "success" : "error";
  let text = isSelected ? "Selected" : "Select";
  return (
    <Card sx={{ width: 250, margin: 2, boxShadow: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "5px solid skyblue" }}>
      <CardContent>
        <Typography variant="h6">{doc.title}</Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary">
          {doc.excerpt}
        </Typography>
      </CardContent>
      <Divider/>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" color= {colr} onClick={() => onSelect(doc)} size='small' startIcon={<PictureAsPdfOutlinedIcon/>}>
          {text}
        </Button>
      </CardActions>
    </Card>
  );
};


export default DocumentCard;
