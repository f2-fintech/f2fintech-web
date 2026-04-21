import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChatField from "./ChatField"; // Import ChatField component
import API from "../../apis";
import { Utility } from "../utility";

const LIMIT = 5; // Number of queries to fetch per request

const QueryList = ({
  setSelectedQuery,
  submitted,
  setSubmitted,
  selectedQueryId,
  addResponse,
}) => {
  const [queries, setQueries] = useState([]);
  const [queryResponses, setQueryResponses] = useState({});
  const [queryCount, setQueryCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const [page, setPage] = useState(0); // Keeps track of the current page number
  const [hasMoreQueries, setHasMoreQueries] = useState(true); // Controls the visibility of "Load More" button
  const queryListRef = useRef(null); // Ref to control the scroll behavior
  const { getLocalStorage } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  // Fetch queries on initial load or when the page number changes
  useEffect(() => {
    fetchQueries(page);
  }, [page]); // Trigger only when 'page' changes

  // Fetch queries from the API
  const fetchQueries = (currentPage) => {
    API.QueryAPI.get(LIMIT, currentPage * LIMIT, customerId)
      .then((res) => {
        console.log("res", res);
        const newQueries = res.data.data;
        setQueryCount(res.data.count);
        if (newQueries.length < LIMIT) {
          setHasMoreQueries(false); // Disable "Load More" if fewer than LIMIT results are returned
        }
        setQueries((prevQueries) => {
          // Avoid duplicates in case of refresh or form submission
          const mergedQueries = [...prevQueries, ...newQueries].filter(
            (value, index, self) =>
              index === self.findIndex((q) => q.id === value.id)
          );
          return mergedQueries;
        });
      })
      .catch((err) => {
        console.log("Error fetching queries:", err);
      });
  };

  // Fetch responses for the selected query
  const getSelectedQueryResponse = (query_id, page = 0, submit = false) => {
    let OFFSET;
    if (submit) {
      setSubmitCount((prevCount) => prevCount + 1);
      OFFSET = 0;
    } else {
      OFFSET = page > 0 ? page * LIMIT + submitCount : 0;
    }

    API.QueryResponseAPI.get(LIMIT, OFFSET, query_id).then((res) => {
      if (res.data.status === "Success") {
        setResponseCount(res.data.count);
        setQueryResponses((prevResponses) => {
          const currentResponses = page > 0 ? prevResponses[query_id] : [];
          if (submit) {
            return {
              ...prevResponses,
              [query_id]: [...currentResponses, ...res.data.data],
            };
          } else {
            return {
              ...prevResponses,
              [query_id]: [...res.data.data, ...currentResponses],
            };
          }
        });
      }
    });
  };

  // Handle form submission, reset the list and fetch the first set of queries
  useEffect(() => {
    if (submitted) {
      setQueries([]); // Clear current queries
      setPage(0); // Reset page to 0
      setHasMoreQueries(true); // Re-enable "Load More" button
      fetchQueries(0); // Fetch the first set of queries
      setSubmitted(false); // Reset submitted flag
    }
  }, [submitted]);

  console.log(
    "queryResponses[selectedQueryId]",
    queryResponses[selectedQueryId]
  );

  return (
    <Box sx={{ p: 2, mb: "10px",}} ref={queryListRef}>
      {selectedQueryId ? (
        <Box >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {queries
              .find((query) => query.id === selectedQueryId)
              ?.title.replace(/\b\w/g, (char) => char.toUpperCase())}
          </Typography>

          {/* Display the ChatField with responses for the selected query */}
          <ChatField
            queryDescription={
              queries.find((query) => query.id === selectedQueryId)?.description
            }
            queryAttachment={
              queries.find((query) => query.id === selectedQueryId)?.attachment
            }
            queryResponses={queryResponses[selectedQueryId]}
            responseCount={responseCount}
            getSelectedQueryResponse={getSelectedQueryResponse}
            setSelectedQuery={setSelectedQuery}
            selectedQueryId={selectedQueryId}
          />
        </Box>
      ) : (
        <Box sx={{fontFamily:'Poppins'}}>
          <Typography>Select a query to view and respond</Typography>
          <List>
            {queries.map((query) => (
              <ListItem
                key={query.id}
                button
                onClick={() => {
                  setSelectedQuery(query.id);
                  getSelectedQueryResponse(query.id);
                }}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                  },
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={query.title.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                  sx={{ color: "black" }}
                />
              </ListItem>
            ))}
          </List>

          {/* Show "Load More" button only if there are more queries */}

          {queryCount > LIMIT && hasMoreQueries && (
            <Button
              onClick={() => setPage((prevPage) => prevPage + 1)} // Load next page of queries
              variant="contained"
              sx={{ mt: 2 }}
            >
              Load More
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default QueryList;
