import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const steps = [
  {
    label: "Basic Details",
    icon: <AssignmentIndIcon />,
    description: "Enter your personal information and loan requirements.",
  },
  {
    label: "Loan Information",
    icon: <DescriptionIcon />,
    description:
      "Provide details about your income, expenses, and specific loan needs.",
  },
  {
    label: "Available Offers",
    icon: <AccountBalanceIcon />,
    description:
      "View and select from available loan offers tailored to your profile.",
  },
];

const EligibilityStepDetail = ({ step }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, height: "100%", bgcolor: "#000000" }}>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontFamily: "Poppins",
            color: "#FFFFFF",
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              bgcolor: "#2f3ee3",
              borderRadius: 2,
            },
          }}
        >
          Your Loan Journey
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#FFFFFF", fontFamily: "Poppins" }}
        >
          Complete all steps below to discover loan offers tailored to your
          needs. Each step brings you closer to finding the perfect financing
          solution.
        </Typography>
      </Box>

      <Divider sx={{ mb: 1, bgcolor: "#2f3ee3" }} />

      <List sx={{ mb: 4 }}>
        {steps.map((item, index) => {
          const isActive = index + 1 === step;
          const isCompleted = index + 1 < step;

          return (
            <ListItem
              key={item.label}
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 2,
                transition: "all 0.3s ease",
                bgcolor: isActive ? "#2f3ee320" : "transparent", // light primary highlight
                border: 1,
                borderColor: isActive ? "#2f3ee3" : "#FFFFFF33",
              }}
            >
              <ListItemIcon>
                {isCompleted ? (
                  <CheckCircleIcon sx={{ color: "#2f3ee3", fontSize: 32 }} />
                ) : isActive ? (
                  <Box
                    sx={{
                      color: "#2f3ee3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{ color: "#888", fontSize: 32 }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? "#2f3ee3"
                        : isCompleted
                        ? "#2f3ee3"
                        : "#FFFFFF",
                    }}
                  >
                    {item.label}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      color: isActive ? "#FFFFFF" : "#CCCCCC",
                      opacity: isActive ? 1 : 0.8,
                      fontFamily: "Poppins",
                    }}
                  >
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default EligibilityStepDetail;
