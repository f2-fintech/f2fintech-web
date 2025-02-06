import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import styled from "@emotion/styled";

import ButtonComp from "../common/button/Button";
import { Utility } from "../utility";

const StyledCard = styled(Box)(() => ({
  width: "100%",
  maxWidth: 330,
  margin: "1rem",
  height: "70vh",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "50%",
  padding: "4px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

const ProductCard = ({
  api,
  loanProviderId,
  title,
  home,
  homeimg,
  interestRate,
  text,
  isCompared,
  handleCompareToggle,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const navigateTo = useNavigate();

  const { getLocalStorage } = Utility();
  const customer = getLocalStorage("customerInfo");
  const token = customer?.token;

  useEffect(() => {
    api
      .getFavourites(loanProviderId, customer?.id)
      .then(({ data: resp }) => {
        console.log(resp, "favorites resp");
        if (resp?.data.isFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log("Error occured in Getting Favourites from db", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirects the user to the login page if they are not logged in.
  const handleLoginRedirect = () => {
    setOpenDialog(false);
    navigateTo("/login");
  };

  // Adds/removes loan providers from the favorites list. If the user is not logged in, it triggers the login dialog.
  const handleFavoriteToggle = (event) => {
    event.stopPropagation();
    if (!token) {
      setOpenDialog(true);
      return;
    }

    const customerFavourite = {
      loan_provider_id: loanProviderId,
      customer_id: customer.id,
    };
    api
      .toggleFavourite(customerFavourite, isFavorite)
      .then((res) => {
        console.log("response created", res);
        setIsFavorite(!isFavorite);
      })
      .catch((err) => {
        console.log("error creating favorite", err);
      });
  };

  return (
    <StyledCard sx={{ border: "1px solid #333333" }}>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "black",
              fontFamily: "DM sans",
              fontSize: "2.4vh",
              fontWeight: "550",
            }}
            id="alert-dialog-description"
          >
            You must be logged in to add items to your Favorites.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "black",
              fontFamily: "Poppins",
              fontSize: "2.4vh",
              fontWeight: "550",
            }}
            onClick={() => setOpenDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "black",
              fontFamily: "Poppins",
              fontSize: "2.4vh",
              fontWeight: "550",
            }}
            onClick={handleLoginRedirect}
            autoFocus
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: "relative" }}>
        <img
          src={homeimg}
          alt={title}
          style={{ height: "45vh", width: "100%", objectFit: "cover" }}
        />
        <StyledCheckbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          checked={isFavorite}
          onChange={handleFavoriteToggle}
        />
      </Box>
      <Box p={2}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ fontWeight: "600", color: "white", fontFamily: "DM sans " }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, color: "white", fontFamily: "Poppins" }}
        >
          {text.description}
        </Typography>
        {home && (
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ mb: 1, fontFamily: "Poppins" }}
          >
            Interest Rate: {interestRate}
          </Typography>
        )}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* <ButtonComp 
            title="Calculate Returns"
           width="120px"
            height="5vh"
            fontSize="1.7vh"
          /> */}
          <Button
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              fontSize: { xs: ".95rem", sm: "1rem", md: ".8rem" },
              fontFamily: "Poppins",
              fontWeight: "500",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#ffd700",
              },
              height: { md: "4.5vh", xs: "4vh" },
              width: {
                md: "7vw",
              },
              marginBottom: {
                xs:'5px'
              },
              borderRadius: "30px",
            }}
          >
              <Link
                to="/application-form"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  position: "relative",
                  zIndex: 1,
                  display: "inline-block",
                }}
              >
                Apply Now
              </Link>
          </Button>
          <Checkbox
            checked={isCompared}
            onChange={handleCompareToggle}
            sx={{ ml: "auto", color: "white" }}
          />
        </Box>
      </Box>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  api: PropTypes.any,
  loanProviderId: PropTypes.any,
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
  interestRate: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  isCompared: PropTypes.bool.isRequired,
  handleCompareToggle: PropTypes.func.isRequired,
};

export default ProductCard;
