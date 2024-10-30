import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const PriceCard = ({
  id,
  name,
  desc,
  price,
  includes,
  color,
  buttoncolor,
  hovercolor,
  border,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Function to set unique border colors based on id
  const hoverBorder = () => {
    switch (id) {
      case 1:
        return "1.5px solid #FFC107";
      case 2:
        return "1.5px solid #0077C2";
      case 3:
        return "1.5px solid #A61DFF";
      default:
        return border;
    }
  };

  const darkCard = name === "Business";

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        backgroundColor: color,
        p: 3,
        borderRadius: "10px",
        // border: isHovered ? hoverBorder() : "1.5px solid transparent",
        
        "&:hover": {
          transform: "scale(0.99)", // Scale down on hover (zoom out effect)
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        }
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack
          direction="column"
          alignItems="center"
          className="break-words"
          spacing={1}

        >
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            {name}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "4rem", fontWeight: "700", }}>
            €{price}
          </Typography>
          <Typography variant="body2" align="left">
            {desc}
          </Typography>
          <Button
            variant={darkCard ? "contained" : "outlined"}
            fullWidth
            sx={{
              borderRadius: "15px",
              backgroundColor: buttoncolor,
              color: "white",
              border: "none",
              "&:hover": {
                border: "none",
                backgroundColor: "black",
                color: "white",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Start My 15-day Trial
          </Button>
        </Stack>
        <Divider sx={{ width: 1 }}
  
        
        />
        <List>
          {includes.map((feature, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{feature}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Card>
  );
};

export default PriceCard;
