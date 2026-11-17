import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import ChatField from "./ChatField";
import QueryForm from "./QueryForm";
import QueryList from "./QueryList";
import { Utility } from "../utility";

const QueryMain = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQueryId, setSelectedQueryId] = useState(null);

  const [submitted, setSubmitted] = useState(true);
  const { getLocalStorage } = Utility();
  const customerInfo = getLocalStorage("customerInfo");

  useEffect(() => {
    if (selectedQueryId !== null) {
      const queryIndex = queries.findIndex((q) => q.id === selectedQueryId);
      setSelectedQueryId(queries[queryIndex]?.id);
    }
  }, [queries]);

  const addQuery = (query) => {
    setQueries([
      ...queries,
      {
        ...query,
        id: queries.length,
        responses: [
          {
            response: query.description,
            type: "user",
            created_at: new Date().toISOString(),
            attachment: query.attachment, // Include the attachment in the first message
          },
        ],
      },
    ]);
    setSubmitted(true);
  };

  const addResponse = (queryId, response) => {
    setQueries(
      queries.map((q) =>
        q.id === queryId ? { ...q, responses: [...q.responses, response] } : q
      )
    );
  };

  return (
    <Container
      sx={{
        maxHeight: "70vh",
        display: "flex",
        paddingBottom: "10px",
        marginBottom: "10px",
        overflow: "auto",
        justifyContent: "space-between",
        boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
        backgroundColor: "#000000",
        mt: 6,
        borderRadius: "20px"

      }}
    >
      <Box
        sx={{
          position: "sticky", // Stick to the container, not the entire viewport
          top: 0, // Stick to the top of the container
          width: "50%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <QueryForm
          customer_id={customerInfo?.id}
          addQuery={addQuery}
          setSubmitted={setSubmitted}
        />
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          mb: "10px",
          overflowY: "auto",
          height: "75vh",
          color: "white",
        }}
      >
        <QueryList
          queries={queries}
          setSelectedQuery={setSelectedQueryId}
          submitted={submitted}
          setSubmitted={setSubmitted}
          selectedQueryId={selectedQueryId}
          addResponse={addResponse}
          queryAttachment={queries[selectedQueryId]?.responses[0]?.attachment} // Pass attachment
          attachmentPreview={
            queries[selectedQueryId]?.responses[0]?.attachmentPreview
          } // Pass preview URL
        />
      </Box>
    </Container>
  );
};

export default QueryMain;
