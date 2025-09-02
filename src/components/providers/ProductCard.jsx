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
import { useTheme } from "@mui/material/styles";
import ButtonComp from "../common/button/Button";
import { Utility } from "../utility";
import { theme } from "@cloudinary/url-gen/actions/effect";

const StyledCard = styled(Box)(() => ({
  width: "100%",
  maxWidth: 330,
  margin: "1rem",
  height: "75vh",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.01)",
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
  const theme = useTheme();
  return (
    <StyledCard
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          borderColor: "#bdbdbd",
        },
      }}
    >
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#fff", // custom background
            color: "white", // default text color inside
            borderRadius: "16px", // rounded corners
            p: 2, // padding
          },
        }}
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
              color: "white",
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
              color: "white",
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
          style={{ height: "45vh", width: "100%", objectFit: "contain" }}
        />
        <StyledCheckbox
          sx={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
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
          sx={{
            fontWeight: "700",
            color: "#333",
            fontFamily: "DM Sans",
            fontSize: "1.25rem",
            marginBottom: "12px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            color: "#666",
            fontFamily: "Poppins",
            lineHeight: "1.5",
            fontSize: "0.9rem",
          }}
        >
          {text.description}
        </Typography>
        {home && (
          <Box
            sx={{
              backgroundColor: "#f3f7ff",
              padding: "8px 12px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "500",
                color: "#1976d2",
              }}
            >
              Interest Rate:{" "}
              <span style={{ fontWeight: "700" }}>{interestRate}</span>
            </Typography>
          </Box>
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
              backgroundColor: "#1976d2",
              color: "white",
              fontSize: "0.9rem",
              fontFamily: "Poppins",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              padding: "8px 20px",
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              minWidth: "120px",
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
                width: "100%",
                textAlign: "center",
              }}
            >
              Apply Now
            </Link>
          </Button>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.85rem",
                color: "#666",
                ml: 7,
              }}
            >
              Compare
            </Typography>
          </Box>
          <Checkbox
            checked={isCompared}
            onChange={handleCompareToggle}
            sx={{
              ml: "auto",
              color: "gray",
              "&.Mui-checked": {
                color: "blue",
              },
            }}
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
