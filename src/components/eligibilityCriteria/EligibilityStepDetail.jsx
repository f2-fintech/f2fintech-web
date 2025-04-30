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
    <Box sx={{ p: 4, height: "100%"}}>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "black",
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              bgcolor: theme.palette.secondary.main,
              borderRadius: 2,
            },
          }}
        >
          Your Loan Journey
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: theme.palette.text.secondary }}
        >
          Complete all steps below to discover loan offers tailored to your
          needs. Each step brings you closer to finding the perfect financing
          solution.
        </Typography>
      </Box>

      <Divider sx={{ mb: 1}} />

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
                bgcolor: isActive
                  ? `${theme.palette.primary.main}15`
                  : "transparent",
                border: 1,
                borderColor: isActive
                  ? theme.palette.primary.main
                  : theme.palette.divider,
              }}
            >
              <ListItemIcon>
                {isCompleted ? (
                  <CheckCircleIcon color="success" fontSize="large" />
                ) : isActive ? (
                  <Box
                    sx={{
                      color:" theme.palette.primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                ) : (
                  <RadioButtonUncheckedIcon color="disabled" fontSize="large" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? theme.palette.primary.main
                        : isCompleted
                        ? theme.palette.success.main
                        : theme.palette.text.primary,
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
                      color: isActive
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                      opacity: isActive ? 1 : 0.8,
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
