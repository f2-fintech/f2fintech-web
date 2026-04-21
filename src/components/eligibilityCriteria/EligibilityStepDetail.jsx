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
    <Box sx={{ p: 4, height: "100%", bgcolor: "#fff" }}>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontFamily: "Poppins",
            color: "#3244e6",
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              bgcolor: "#3244e6",
              borderRadius: 2,
            },
          }}
        >
          Your Loan Journey
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#000", fontFamily: "Poppins" }}
        >
          Complete all steps below to discover loan offers tailored to your
          needs. Each step brings you closer to finding the perfect financing
          solution.
        </Typography>
      </Box>

      <Divider sx={{ mb: 1, bgcolor: "#3244e6" }} />

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
                bgcolor: isActive ? "#3244e620" : "transparent",
                border: 1,
                borderColor: isActive ? "#3244e6" : "#FFFFFF33",
              }}
            >
              <ListItemIcon>
                {isCompleted ? (
                  <CheckCircleIcon sx={{ color: "#3244e6", fontSize: 32 }} />
                ) : isActive ? (
                  <Box
                    sx={{
                      color: "#3244e6",
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
                        ? "#3244e6"
                        : isCompleted
                        ? "#3244e6"
                        : "#000",
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
                      color: isActive ? "#000" : "#000",
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
