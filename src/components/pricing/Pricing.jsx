import { useMemo, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import PriceCard from "./PriceCard";
import PriceSwitch from "./PriceSwitch";
import { content, packages } from "../../data";

const Pricing = ({ theme }) => {
  const [billing, setBilling] = useState("Yearly");

  // Toggle between Monthly and Yearly billing
  const handlePriceChange = (event) => {
    setBilling(event.target.checked ? "Monthly" : "Yearly");
  };

  // Dynamically calculate prices based on billing cycle
  const prices = useMemo(
    () =>
      packages.map((item) => ({
        ...item,
        price:
          billing === "Monthly" ? Math.floor(item.price * 1.2) : item.price,
      })),
    [billing]
  );

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack direction="column" spacing={5}>
        {/* Page Title */}
        <Typography
          variant="h1"
          sx={{ fontSize: "3rem", fontWeight: 900, textAlign: "center" }}
        >
          {content.pageTitle}
        </Typography>

        {/* Feature List */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
          justifyContent="space-evenly"
        >
          {content.features.map((item, index) => (
            <Stack key={index} direction="row" spacing={1}>
              <CheckOutlinedIcon />
              <Typography variant="body1">{item}</Typography>
            </Stack>
          ))}
        </Stack>
        {/* Price Toggle Switch */}
        <PriceSwitch setPrice={handlePriceChange} checkStatus={billing} />

        {/* Pricing Cards */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
          {prices.map((item) => (
            <PriceCard
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              price={item.price}
              includes={item.includes}
              color={item.color}
              buttoncolor={item.buttoncolor}
              hovercolor={item.hovercolor}
              border={item.border}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Pricing;
