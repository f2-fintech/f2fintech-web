/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  CurrencyRupee as CurrencyRupeeIcon,
  ArrowForward as ArrowForwardIcon,
  WhatsApp as WhatsAppIcon,
  Call as CallIcon,
  Sms as SmsIcon,
  Email as EmailIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material/styles";
import { Utility } from "../utility";
import { useDispatch, useSelector } from "react-redux";
import step1ValidationSchema from "./step1ValidationSchema";
import Toast from "../toast/Toast";
import API from "../../apis";
import useCreateLeadsInfo from "../../apis/EligibilityLeadsInfo";

const Step1Form = ({
  customerId,
  applicationNumber,
  setApplicationNumber,
  getStarted,
  handleNext,
  setGetStarted,
  salary,
}) => {
  const [provider, setProvider] = useState("");
  const [loanType, setLoanType] = useState("");
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [loading, setLoading] = useState(false);
  const [loanStatus, setLoanStatus] = useState(null);
  const toastInfo = useSelector((state) => state.toastInfo);
  const dispatch = useDispatch();
  const { getLocalStorage, setLocalStorage, toastAndNavigate } = Utility();
  const storedCustomerId = getLocalStorage("customerInfo")?.id;
  const [fetchvalue, setFetchvalue] = useState();
  const [errors, setErrors] = useState({
    amount: "",
    tenure: "",
    provider: "",
    loanType: "",
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    prefix: "",
    email: "",
    contact: "",
    status: "active",
    father_name: "",
    mother_name: "",
    working_address: "",
    permanent_address: "",
    current_address: "",
    dob: null,
    city: "",
    state: "",
    pan: "",
    employment_type: "",
  });

  const { getLeadCibilScore } = useCreateLeadsInfo();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log("ID from URL:", id);

  // Fetching initiall values from ELigibility Criteria form
  useEffect(() => {
    const fetchCibil = async () => {
      if (!id) return;
      setLoading(true);

      try {
        const result = await getLeadCibilScore(id);
        // const result = "noos"
        console.log("result", result);

        if (result.success && result.data) {
          const data = result.data;

          setInitialValues({
            name: data.name || "",
            prefix: data.prefix || "",
            email: data.email || "",
            contact: data.contact || "",
            status: data.status || "active",
            father_name: data.father_name || "",
            mother_name: data.mother_name || "",
            working_address: data.working_address || "",
            permanent_address: data.permanent_address || "",
            current_address: data.current_address || "",
            dob: data.dob ? dayjs(data.dob) : null,
            city: data.city || "",
            state: data.state || "",
            pan: data.pan || "",
            employment_type: data.employment_type || "",
          });

          setProvider(data.provider);
          setAmount(data.amount);
          setLoanType(data.loanType);

          setFetchvalue(data);
        } else {
          console.error(result.error || "Failed to fetch lead info");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCibil();
  }, [id]);
  console.log("fetchvalue", fetchvalue);

  // Validation function for the amount and provider
  const validateAmount = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    } else if (isNaN(value)) {
      error = "Amount must be a number";
    } else if (value < 50000 || value > 100000000) {
      error = "Amount must be within 50 thousand and 10 crore";
    } else if (value % 5 !== 0) {
      error = "Amount must be divisible by 5";
    }
    setErrors((prev) => ({ ...prev, amount: error }));
  };
  // Validation function for theprovider
  const validateProvider = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setErrors((prev) => ({ ...prev, provider: error }));
  };
  // Validation function for the loantype
  const validateLoanType = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setErrors((prev) => ({ ...prev, loanType: error }));
  };

  // Validation function for the tenure
  const validateTenure = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setErrors((prev) => ({ ...prev, tenure: error }));
  };

  // button lets get started
  const PinkTextButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#4E9FE5",
    color: "black !important",
    fontWeight: 500,
    fontSize: "1rem",
    fontFamily: "Poppins",
    lineHeight: "1.5rem",
    "&:hover": {
      backgroundColor: "#2f3ee3",
      color: "white",
    },
  }));

  useEffect(() => {
    const fetchCustomerData = (id) => {
      console.log("first", id);
      API.CustomerAPI.getCustomerProfile(id)
        .then(({ data }) => {
          if (data.status === "Success") {
            setInitialValues((prev) => ({
              ...prev,
              name: data.data.customer.name || "",
              email: data.data.customer.email || "",
              contact: data.data.customer.contact || "",
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    };

    const idToFetch = customerId || storedCustomerId;
    if (idToFetch) {
      fetchCustomerData(idToFetch);
    }
  }, [customerId, storedCustomerId]);

  // Generate random application number
  const randomNumberGenerator = () =>
    Math.floor(10000000 + Math.random() * 90000000);

  const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number

  // Get the current date and calculate 20 years ago
  const minDate = dayjs("1900-01-01");
  const maxDate = dayjs().subtract(20, "year");

  useEffect(() => {
    console.log("Scroll To Top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch application number and loan status using stored customer ID
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (storedCustomerId) {
        try {
          const { data: response } =
            await API.CustomerApplicationAPI.getApplicationById(
              storedCustomerId
            );
          if (response.status === "Success") {
            setApplicationNumber(response.data.application_no);
            const { data: resp } =
              await API.LoanTrackingAPI.getLoanTrackingById(response.data.id);
            if (resp.status === "Success") {
              setLoanStatus(resp.data.status);
            }
          }
        } catch (err) {
          console.log("Error fetching customer data:", err);
        }
      }
    };
    fetchCustomerData();
  }, [storedCustomerId]);

  // Function to register the customer
  async function registerCustomer(customer) {
    const customerData = {
      ...customer,
      name: `${customer.prefix} ${customer.name}`.trim(), // Combine title and name, then trim
    };

    const { data: res } = await API.CustomerAPI.register(customerData);
    if (res.status !== "Success") {
      throw new Error(`Registration failed: ${res.message}`);
    }
    return res.data.id;
  }

  // Function to create customer info
  async function createCustomerInfo(customerId, restValues) {
    await API.CustomerInfoAPI.create({
      customer_id: customerId,
      ...restValues,
    });
  }

  // Function to create the customer application
  async function createCustomerApplication(
    customerId,
    applicationNumber,
    amount,
    tenure,
    provider, // Make sure this parameter is properly handled
    loanType
  ) {
    const { data: applicationResponse } =
      await API.CustomerApplicationAPI.createApplication({
        customer_id: customerId,
        application_no: applicationNumber,
        amount,
        tenure,
        provider, // Ensure this is properly included in the API request
        loan_type: loanType,
      });
    return applicationResponse.data.applicationId;
  }

  // Function to create loan tracking
  async function createLoanTracking(applicationId) {
    await API.LoanTrackingAPI.createLoanTracking({
      customer_application_id: applicationId,
      status: "submitted",
    });
  }

  // Function to log in the customer
  async function loginCustomer(contact, name) {
    const response = await API.CustomerAPI.login({
      contact,
      password: `${name.replace(/\s/g, "")}@${randomFourDigitNumber}`,
    });

    if (response.data.status === "Success") {
      const customerInfo = {
        id: response.data.data.id,
        name: response.data.data.name,
        token: response.data.data.token,
      };
      setLocalStorage("customerInfo", customerInfo);
      location.reload();
    }
  }

  // Create new customer with loan application
  const create = useCallback(
    async (values) => {
      const applicationNumber = randomNumberGenerator();
      const { contact, email, name, status, dob, ...restValues } = values;
      const customer = {
        contact,
        dob,
        email,
        name,
        password: `${name.replace(/\s/g, "")}@${randomFourDigitNumber}`,
        status,
      };

      setLoading(true); // Start loading
      const startTime = Date.now(); // Capture start time

      try {
        const customerId =
          storedCustomerId || (await registerCustomer(customer));
        await createCustomerInfo(customerId, restValues);
        const applicationId = await createCustomerApplication(
          customerId,
          applicationNumber,
          amount,
          tenure,
          provider,
          loanType
        );

        await createLoanTracking(applicationId);
        if (!storedCustomerId) {
          await loginCustomer(contact, name);
        } else {
          location.reload();
        }

        console.log(
          "Customer info, application, and loan tracking created successfully"
        );
      } catch (err) {
        toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
        console.log(
          "Error during customer creation:",
          err?.response?.data?.msg
        );
      } finally {
        // Ensure at least 3 seconds loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(8000 - elapsedTime, 0);

        setTimeout(() => {
          setLoading(false); // Stop loading
        }, remainingTime);
      }
    },
    [amount, tenure, provider, loanType]
  );

  // If application number and loan status exists, display success message without making user to fill the form again
  const theme = useTheme();
  if (applicationNumber) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
          padding: 3,
          border: "1px solid #b6b6b6",
          borderRadius: "20px",
          boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
          backgroundColor: "#f9f9f9",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
            lineHeight: "2rem",
            color: "#1976d2",
            fontWeight: "600",
            fontFamily: "Roboto, sans-serif",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Your application is submitted!
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#333",
            marginBottom: 2,
          }}
        >
          Your Application Number is <strong>{applicationNumber}</strong>.
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#333",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          We will contact you within the next half an hour.
          {!salary &&
            `To speed up the
          process, please complete the next steps.`}
        </Typography>
        {salary ? (
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              borderRadius: "0px 0px 10px 0px",
              bgcolor: "#f06292",
              color: "white",
              "&:hover": {
                bgcolor: "#f06292",
                color: "white",
              },
            }}
            onClick={() => {
              remLocalStorage("customerInfo");
              location.reload();
            }}
          >
            Fill Another Application
          </Button>
        ) : null}
      </Box>
    );
  }

  // Initial form view with amount and tenure selection
  if (!getStarted) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "4vw",
              sm: "3.5vw",
              md: "1.7vw",
            },
            lineHeight: "2rem",
            color: "#2f3ee3",
            fontWeight: {},
            fontFamily: "DM sans",
            marginBottom: 2,
          }}
        >
          Get the loan best suited for your wish
        </Typography>

        <Box
          sx={{
            // width: "45%",
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          }}
        >
          {!provider ? (
            // If provider not selected, show dropdown
            <FormControl fullWidth variant="filled" sx={{ mb: 1 }}>
              <InputLabel id="provider-select-label" sx={{ color: "gray" }}>
                Provider Name*
              </InputLabel>
              <Select
                labelId="provider-select-label"
                name="provider"
                value={provider}
                onChange={(e) => {
                  setProvider(e.target.value);
                  validateProvider(e.target.value);
                }}
                onBlur={() => validateProvider(provider)}
                error={!!errors.provider}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBalanceIcon sx={{ color: "#2f3ee3", mr: 1 }} />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#D3D3D3",
                  borderRadius: "4px",
                  "& .MuiSelect-filled.Mui-error": {
                    borderBottomColor: "red",
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="bajaj finance">Bajaj Finance</MenuItem>
                <MenuItem value="bajaj market">Bajaj Market</MenuItem>
                <MenuItem value="chola">Chola</MenuItem>
                <MenuItem value="l&t">L&T</MenuItem>
                <MenuItem value="tata">Tata</MenuItem>
                <MenuItem value="abfl">ABFL</MenuItem>
                <MenuItem value="godrej">Godrej</MenuItem>
                <MenuItem value="idfc">IDFC</MenuItem>
                <MenuItem value="hdfc bank">HDFC Bank</MenuItem>
                <MenuItem value="icici">ICICI</MenuItem>
                <MenuItem value="indusland">Indusland</MenuItem>
                <MenuItem value="lending cart">Lending Cart</MenuItem>
                <MenuItem value="incred">Incred</MenuItem>
                <MenuItem value="credit saison">Credit Saison</MenuItem>
                <MenuItem value="paysense">PaySense</MenuItem>
                <MenuItem value="shriram">Shriram</MenuItem>
              </Select>
              {errors.provider && (
                <FormHelperText error>{errors.provider}</FormHelperText>
              )}
            </FormControl>
          ) : (
            // If provider already selected, show it as read-only
            <TextField
              fullWidth
              variant="filled"
              label="Provider Name"
              value={provider}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceIcon sx={{ color: "#2f3ee3" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                backgroundColor: "#D3D3D3",
                borderRadius: "4px",
                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "gray",
                },
                "& .MuiFormLabel-root": {
                  color: "gray",
                },
              }}
            />
          )}

          {/* <TextField
            autoComplete="off"
            fullWidth
            variant="filled"
            name="provider"
            label="Provider Name*"
            placeholder="Any Loan Provider preference?"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              validateProvider(e.target.value);
            }}
            onBlur={() => validateProvider(provider)}
            error={!!errors.provider}
            helperText={errors.provider}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: "#2f3ee3" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: "13px",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: 1,
              "& .MuiInputBase-root": {
                backgroundColor: "D3D3D3", // Makes the input background transparent
              },
              "& .MuiFormLabel-root": {
                color: "gray", // Label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "gray", // Underline color
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#ffffff", // Underline color on hover
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FFD700", // Underline color when focused
              },
            }}
          /> */}
        </Box>
        <Box
          sx={{
            // width: "45%",
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          }}
        >
          <TextField
            type="number"
            autoComplete="off"
            fullWidth
            variant="filled"
            name="amount"
            label="Enter Amount*"
            placeholder="How Much Loan Do You Require?"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              validateAmount(e.target.value);
            }}
            onBlur={() => validateAmount(amount)}
            error={!!errors.amount}
            helperText={errors.amount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon sx={{ color: "#2f3ee3" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: "13px",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: 1,
              "& .MuiInputBase-root": {
                backgroundColor: "D3D3D3", // Makes the input background transparent
              },
              "& .MuiFormLabel-root": {
                color: "gray", // Label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "gray", // Underline color
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#ffffff", // Underline color on hover
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FFD700", // Underline color when focused
              },
            }}
          />
        </Box>
        <Box
          sx={{
            // width: "45%",
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          }}
        >
          <FormControl fullWidth variant="filled" sx={{ mb: 1 }}>
            <InputLabel id="loan-type-label" sx={{ color: "gray" }}>
              Loan Type*
            </InputLabel>
            <Select
              labelId="loan-type-label"
              name="loanType"
              value={loanType}
              onChange={(e) => {
                setLoanType(e.target.value);
                validateLoanType(e.target.value);
              }}
              onBlur={() => validateLoanType(loanType)}
              error={!!errors.loanType}
              sx={{
                backgroundColor: "#D3D3D3",
                borderRadius: "4px",
                "& .MuiSelect-filled.Mui-error": {
                  borderBottomColor: "red",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="term loan">Term Loan</MenuItem>
              <MenuItem value="personal loan">Personal</MenuItem>
              <MenuItem value="business loan">Business</MenuItem>
              <MenuItem value="professional loan">Professional</MenuItem>
              <MenuItem value="home">Home</MenuItem>
              <MenuItem value="education loan">Education</MenuItem>
              <MenuItem value="lap">LAP</MenuItem>
              <MenuItem value="machinery loan">Machinery</MenuItem>
              <MenuItem value="auto loan">Auto Loan</MenuItem>
            </Select>
            {errors.loanType && (
              <FormHelperText error>{errors.loanType}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <FormControl
          autoComplete="off"
          variant="filled"
          error={!!errors.tenure}
          sx={{
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            fontSize: "13px",
            marginBottom: 3,
          }}
        >
          <InputLabel style={{ color: "black" }}>
            Select A Comfortable Tenure
          </InputLabel>
          <Select
            variant="filled"
            name="tenure"
            value={tenure}
            onChange={(e) => {
              setTenure(e.target.value);
              validateTenure(e.target.value);
            }}
            onBlur={() => validateTenure(tenure)}
            sx={{
              "& .MuiFilledInput-root": {
                borderRadius: "10px",
                border: "1px solid transparent",
                transition: "border-color 0.3s, border-width 0.3s",
                "&:hover": {
                  borderColor: "#0000ff",
                },
                "&.Mui-focused": {
                  borderColor: "#0000ff",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputAdornment-root": {
                color: "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
          >
            {["3 Years", "5 Years", "8 Years"].map((label) => (
              <MenuItem
                key={label}
                value={label}
                sx={{
                  backgroundColor: "#4E9FE5", // Default background color
                  color: "black", // Default text color
                  "&:hover": {
                    backgroundColor: "gray", // Slightly lighter black on hover
                  },
                  "&.Mui-selected": {
                    backgroundColor: "gray", // Background color when selected
                    color: "white", // Text color when selected
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "gray", // Slightly lighter black on hover when selected
                  },
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Select>

          {errors.tenure && (
            <Typography
              color="error"
              sx={{
                marginLeft: 1,
                margin: "3px 14px",
                fontSize: "10.2857px",
                fontFamily: "Verdana, sans-serif",
                fontWeight: "400",
              }}
            >
              {errors.tenure}
            </Typography>
          )}
        </FormControl>
        <PinkTextButton
          disabled={
            !!errors.amount ||
            !!errors.tenure ||
            !!errors.loanType ||
            !amount ||
            !tenure ||
            !loanType ||
            !provider
          }
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => setGetStarted(true)}
          sx={{
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            alignSelf: "center",
            marginBottom: 3,
          }}
        >
          LET&apos;S GET STARTED
        </PinkTextButton>
      </Box>
    );
  }

  // Main form view for getting customer details
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={step1ValidationSchema}
        onSubmit={(values) => create(values)}
      >
        {({
          dirty,
          errors,
          touched,
          values,
          setFieldValue,
          setFieldTouched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    fontSize: {
                      xs: "1.7rem", // Mobile
                      sm: "2.5rem", // Tablet
                      md: "2rem", // Desktop
                    },
                    color: "#2f3ee3",
                    fontWeight: 500,
                    marginBottom: 1,
                  }}
                >
                  Basic Details
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "2vh",
                    color: "black",
                    marginBottom: 3,
                  }}
                >
                  Step 1/4
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "15px 15px",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "77%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2, // spacing between prefix and name field
                    flexWrap: "wrap", // responsive for small screens
                    mb: 3,
                  }}
                >
                  {/* Prefix Dropdown */}
                  <FormControl variant="filled" sx={{ width: "20%" }}>
                    <InputLabel id="prefix-label" sx={{ color: "gray" }}>
                      Prefix
                    </InputLabel>
                    <Select
                      labelId="prefix-label"
                      name="prefix"
                      value={values.prefix}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      sx={{
                        backgroundColor: "#D3D3D3",
                        borderRadius: "4px",
                        "& .MuiSelect-filled.Mui-error": {
                          borderBottomColor: "red",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="mr">Mr</MenuItem>
                      <MenuItem value="miss">Miss</MenuItem>
                      <MenuItem value="mrs">Mrs</MenuItem>
                      <MenuItem value="dr">Dr</MenuItem>
                      <MenuItem value="cs">CA</MenuItem>
                      <MenuItem value="er">Er</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Name TextField */}
                  <TextField
                    autoComplete="off"
                    variant="filled"
                    type="text"
                    name="name"
                    label="Name*"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      width: { xs: "70%", sm: "70%", md: "75%" },
                      height: "50px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        backgroundColor: "D3D3D3",
                      },
                      "& .MuiFormLabel-root": {
                        color: "gray",
                      },
                      "& .MuiFilledInput-underline:before": {
                        borderBottomColor: "gray",
                      },
                      "& .MuiFilledInput-underline:hover:before": {
                        borderBottomColor: "#ffffff",
                      },
                      "& .MuiFilledInput-underline:after": {
                        borderBottomColor: "#4E9FE5",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "pink",
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="number"
                  name="contact"
                  label="Contact*"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="email"
                  name="email"
                  label="E-mail*"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  name="pan"
                  label="PAN*"
                  value={values.pan}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    const uppercaseValue = event.target.value.toUpperCase();
                    setFieldValue("pan", uppercaseValue); // Update the Formik field value in uppercase
                  }}
                  error={touched.pan && Boolean(errors.pan)}
                  helperText={touched.pan && errors.pan}
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: "uppercase" }, // Applies uppercase stylin
                  }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="father_name"
                  label="Father's Name*"
                  value={values.father_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.father_name && !!errors.father_name}
                  helperText={touched.father_name && errors.father_name}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="mother_name"
                  label="Mother's Name*"
                  value={values.mother_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.mother_name && !!errors.mother_name}
                  helperText={touched.mother_name && errors.mother_name}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="working_address"
                  label="Working Address*"
                  value={values.working_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.working_address && !!errors.working_address}
                  helperText={touched.working_address && errors.working_address}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="permanent_address"
                  label="Permanent Address*"
                  value={values.permanent_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    !!touched.permanent_address && !!errors.permanent_address
                  }
                  helperText={
                    touched.permanent_address && errors.permanent_address
                  }
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="current_address"
                  label="Current Address*"
                  value={values.current_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.current_address && !!errors.current_address}
                  helperText={touched.current_address && errors.current_address}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  name="city"
                  label="City*"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "D3D3D3", // Makes the input background transparent
                    },
                    "& .MuiFormLabel-root": {
                      color: "gray", // Label color
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "gray", // Underline color
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "#ffffff", // Underline color on hover
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "#4E9FE5", // Underline color when focused
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "pink",
                      opacity: 1, // Ensure visibility
                    },
                  }}
                />

                <FormControl
                  autoComplete="off"
                  variant="filled"
                  error={!!touched.state && !!errors.state}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                  }}
                >
                  <InputLabel sx={{ color: "black" }}>State*</InputLabel>
                  <Select
                    variant="filled"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "#4E9FE5",
                          color: "black",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                    <MenuItem value="Arunachal Pradesh">
                      Arunachal Pradesh
                    </MenuItem>
                    <MenuItem value="Assam">Assam</MenuItem>
                    <MenuItem value="Bihar">Bihar</MenuItem>
                    <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                    <MenuItem value="Goa">Goa</MenuItem>
                    <MenuItem value="Gujarat">Gujarat</MenuItem>
                    <MenuItem value="Haryana">Haryana</MenuItem>
                    <MenuItem value="Himachal Pradesh">
                      Himachal Pradesh
                    </MenuItem>
                    <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                    <MenuItem value="Karnataka">Karnataka</MenuItem>
                    <MenuItem value="Kerala">Kerala</MenuItem>
                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    <MenuItem value="Manipur">Manipur</MenuItem>
                    <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                    <MenuItem value="Mizoram">Mizoram</MenuItem>
                    <MenuItem value="Nagaland">Nagaland</MenuItem>
                    <MenuItem value="Odisha">Odisha</MenuItem>
                    <MenuItem value="Punjab">Punjab</MenuItem>
                    <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                    <MenuItem value="Sikkim">Sikkim</MenuItem>
                    <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                    <MenuItem value="Telangana">Telangana</MenuItem>
                    <MenuItem value="Tripura">Tripura</MenuItem>
                    <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                    <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                    <MenuItem value="West Bengal">West Bengal</MenuItem>
                    <MenuItem value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </MenuItem>
                    <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                    <MenuItem value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </MenuItem>
                    <MenuItem value="Delhi">Delhi</MenuItem>
                    <MenuItem value="Jammu and Kashmir">
                      Jammu and Kashmir
                    </MenuItem>
                    <MenuItem value="Ladakh">Ladakh</MenuItem>
                    <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                    <MenuItem value="Puducherry">Puducherry</MenuItem>
                  </Select>

                  <ErrorMessage
                    name="state"
                    component="div"
                    style={{
                      color: "#d32f2f",
                      margin: "5px 14px",
                      fontSize: "10.2857px",
                      fontFamily: "Verdana, sans-serif",
                      fontWeight: "400",
                    }}
                  />
                </FormControl>

                <FormControl
                  autoComplete="off"
                  variant="filled"
                  error={!!touched.employment_type && !!errors.employment_type}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                  }}
                >
                  <InputLabel sx={{ color: "black" }}>
                    Employment Type*
                  </InputLabel>
                  <Select
                    variant="filled"
                    name="employment_type"
                    value={values.employment_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "#4E9FE5",
                          color: "black", // Optional: Set text color to white for better contrast
                        },
                      },
                    }}
                  >
                    <MenuItem value="salaried">Salaried </MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>
                    <MenuItem value="proprietorship">Proprietorship</MenuItem>
                  </Select>

                  <ErrorMessage
                    name="employment_type"
                    component="div"
                    style={{
                      color: "#d32f2f",
                      margin: "5px 14px",
                      fontSize: "10.2857px",
                      fontFamily: "Verdana, sans-serif",
                      fontWeight: "400",
                    }}
                  />
                </FormControl>
                <Box
                  sx={{
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    marginBottom: 3,
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD MMMM YYYY"
                      views={["year", "month", "day"]}
                      label="Select Date Of Birth*"
                      name="dob"
                      minDate={minDate} // Start at 1900
                      maxDate={maxDate} // End at 20 years before today
                      error={touched.dob && !!errors.dob}
                      helperText={touched.dob && errors.dob}
                      value={values.dob}
                      onBlur={() => setFieldTouched("dob", true)}
                      onChange={(newValue) => setFieldValue("dob", newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />

                    <ErrorMessage
                      name="dob"
                      component="div"
                      style={{
                        color: "#d32f2f",
                        margin: "5px 14px",
                        fontSize: "10.2857px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                      }}
                    />
                  </LocalizationProvider>
                  <Typography
                    sx={{
                      fontSize: "0.600rem",
                      color: "gray",
                      ml: "16px",
                      mt: "3px",
                    }}
                  >
                    Minimum age 20 required
                  </Typography>
                </Box>
                {/* Terms Checkbox */}
                <FormGroup
                  sx={{ display: "flex", ml: 5, mr: 8, marginBottom: 3 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          color: "#4E9FE5", // Unchecked box border
                          "&.Mui-checked": {
                            color: "#4E9FE5", // Checked tick color
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.75rem", // Mobile
                            sm: "0.875rem", // Tablet
                            md: "1rem", // Desktop
                          },
                          color: "gray",
                        }}
                      >
                        I agree to opt for the product and service of F2fintech.
                        By opting for F2fintech, I agree to have read,
                        understood and explicitly consent to the T&C, Privacy
                        Policy and F2fintech Credit Terms.
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup sx={{ display: "flex", ml: 5, mr: 8, mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          color: "#4E9FE5", // Unchecked box border
                          "&.Mui-checked": {
                            color: "#4E9FE5", // Checked tick color
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "0.800rem", color: "gray" }}>
                        I further consent to receive the loan and product
                        updates of F2fintech on WhatsApp and allow F2fintech
                        and/or their authorized third party service providers to
                        contact me for marketing purposes via
                        <br />
                        <SmsIcon /> <CallIcon /> <WhatsAppIcon />
                        <EmailIcon />
                      </Typography>
                    }
                  />
                </FormGroup>

                {/* a compelete button ready to use  */}
                <Button
                  disabled={!dirty || loading}
                  type="submit"
                  // onClick={handleNext}
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "20px",
                    fontSize: {
                      xs: "0.875rem", // Mobile
                      sm: "1rem", // Tablet
                      md: "1.125rem", // Desktop
                    },
                    lineHeight: "1.5rem",
                    width: {
                      xs: "50%", // Mobile
                      sm: "30%", // Tablet
                      md: "11vw", // Desktop
                    },
                    padding: {
                      xs: "8px 16px", // Mobile
                      sm: "10px 20px", // Tablet
                      md: "8px 16px", // Desktop
                    },
                    mt: 2,
                    backgroundColor: "#4E9FE5",
                    marginBottom: 3,
                    "&:hover": {
                      color: "black",
                      backgroundColor: "#4E9FE5",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "black" }} />
                  ) : (
                    "Apply Now"
                  )}
                </Button>
                {/* a compelete button ready to use  */}
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

Step1Form.propTypes = {
  customerId: PropTypes.string,
  applicationNumber: PropTypes.number,
  setApplicationNumber: PropTypes.func,
};

export default Step1Form;
