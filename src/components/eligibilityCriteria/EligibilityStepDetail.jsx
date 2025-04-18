import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";

const steps = [
  { label: "Basic Details", icon: <AssignmentIcon /> },
  { label: "Loan Information", icon: <UploadFileIcon /> },
  { label: "Available offers", icon: <PersonIcon /> },
//   { label: "Additional Details", icon: <DescriptionIcon /> },
];

const EligibilityStepDetail = ({ step }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 600}}
      >
        Steps Ahead
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        In order to get Loan offers,
        <br />
        you will need to <strong>successfully complete</strong> these steps.
      </Typography>

      <List>
        {steps.map((item, index) => (
          <ListItem
            key={item.label}
            sx={{
              backgroundColor: index + 1 === step ? "pink" : "transparent",
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                color: index + 1 === step ? "black" : "black",
                fontWeight: index + 1 === step ? "bold" : "normal",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EligibilityStepDetail;
