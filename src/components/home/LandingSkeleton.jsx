import React from "react";
import { Box, Skeleton, Stack, Container, Button } from "@mui/material";

export default function LandingPageSkeleton() {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Stack spacing={4} alignItems="center">
        {/* Skeleton for heading lines */}
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="text" width="40%" height={50} />
        <Skeleton variant="text" width="55%" height={50} />

        {/* Skeleton for subheading */}
        <Skeleton variant="text" width="70%" height={30} />

        {/* Skeleton for buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rounded" width={150} height={45} />
          <Skeleton variant="rounded" width={180} height={45} />
        </Box>
      </Stack>
    </Container>
  );
}
