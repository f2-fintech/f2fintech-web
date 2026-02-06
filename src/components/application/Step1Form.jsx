/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
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
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Chip,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from "@mui/material";
import {
  CurrencyRupee as CurrencyRupeeIcon,
  ArrowForward as ArrowForwardIcon,
  WhatsApp as WhatsAppIcon,
  Call as CallIcon,
  Sms as SmsIcon,
  Email as EmailIcon,
  AccountBalance as AccountBalanceIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
  Close as CloseIcon,
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
import { axiosInstance } from "../../apis/config/axiosConfig";

// button lets get started
const PinkTextButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4E9FE5",
  color: "black !important",
  fontWeight: 500,
  fontSize: "1rem",
  fontFamily: "Poppins",
  lineHeight: "1.5rem",
  "&:hover": {
    backgroundColor: "#3244e6",
    color: "white",
  },
}));

const Step1Form = ({
  customerId,
  applicationNumber,
  setApplicationNumber,
  getStarted,
  setGetStarted,
  salary,
}) => {
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [loanType, setLoanType] = useState("");
  const [leadType, setLeadType] = useState("");
  const [providerAmounts, setProviderAmounts] = useState([]);
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdApplications, setCreatedApplications] = useState([]);
  const [errors, setErrors] = useState({
    amount: "",
    tenure: "",
    providers: "",
    loanType: "",
    loanCategory: "",
    leadType: "",
  });
  const [leadTypeError, setLeadTypeError] = useState("");
  const [hasRunningLoans, setHasRunningLoans] = useState("");
  const [whichLoan, setWhichLoan] = useState("");
  const [runningLoanAmount, setRunningLoanAmount] = useState("");
  const [hasRunningLoansError, setHasRunningLoansError] = useState("");
  const [whichLoanError, setWhichLoanError] = useState("");
  const [runningLoanAmountError, setRunningLoanAmountError] = useState("");
  const [caseType, setCaseType] = useState("");
  const [caseTypeError, setCaseTypeError] = useState("");
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

  // New state for provider amount dialog
  const [amountDialogOpen, setAmountDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

  const toastInfo = useSelector((state) => state.toastInfo);
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    getLocalStorage,
    setLocalStorage,
    remLocalStorage,
    toastAndNavigate,
  } = Utility();

  const isCreatingRef = useRef(false);
  const customerFetchedRef = useRef(false);
  const eligibilityFetchedRef = useRef(false);
  const [loanCategory, setLoanCategory] = useState("");

  const storedCustomerId = useMemo(
    () => getLocalStorage("customerInfo")?.id,
    []
  );
  const { getLeadCibilScore } = useCreateLeadsInfo();
  const [searchParams] = useSearchParams();
  const urlId = useMemo(() => searchParams.get("id"), [searchParams]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const result = await axiosInstance.get(
          "/get-all-loan-providers?page=1&limit=100"
        );
        if (result.status === 200) {
          setProviders(result.data.data.rows || []);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const leadTypes = [
    { value: "notion", label: "Notion" },
    { value: "Dialler", label: "Dialler" },
    { value: "field visit", label: "Field visit" },
    { value: "sourcer", label: "Sourcer" },
    { value: "channel partner", label: "Channel partner" },
    { value: "ref from customer", label: "Ref from customer" },
    { value: "left employee follow up", label: "Left employee follow up" }
  ];

  const loanTypes = {
    secured: [
      { value: "home loan", label: "Home Loan" },
      { value: "lap", label: "LAP (Loan Against Property)" },
      { value: "auto loan", label: "Auto Loan" },
      { value: "machinery loan", label: "Machinery Loan" }
    ],
    unsecured: [
      { value: "personal loan", label: "Personal Loan" },
      { value: "business loan", label: "Business Loan" },
      { value: "professional loan", label: "Professional Loan" },
      { value: "education loan", label: "Education Loan" },
      { value: "just inquiry", label: "Just Inquiry" }
    ]
  };

  const tenureOptions = {
    secured: [
      "5 Years",
      "8 Years",
      "10 Years",
      "15 Years",
      "20 Years",
      "25 Years",
      "30 Years"
    ],
    unsecured: [
      "1 Year",
      "2 Years",
      "3 Years",
      "4 Years",
      "5 Years",
      "6 Years",
      "7 Years",
      "8 Years"
    ]
  };

  const getLoanCategory = (loanType) => {
    const securedLoanTypes = ["home loan", "lap", "auto loan", "machinery loan"];
    const unsecuredLoanTypes = ["personal loan", "business loan", "professional loan", "education loan", "just inquiry"];

    if (securedLoanTypes.includes(loanType)) {
      return "secured";
    } else if (unsecuredLoanTypes.includes(loanType)) {
      return "unsecured";
    }
    return "";
  };

  const handleLoanTypeChange = (value) => {
    setLoanType(value);
    const category = getLoanCategory(value);
    setLoanCategory(category);
    setTenure("");
    validateLoanType(value);
  };

  // Validation functions
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

  const validateProviders = (value) => {
    let error = "";
    if (!value || value.length === 0) {
      error = "Please select at least one provider";
    }
    setErrors((prev) => ({ ...prev, providers: error }));
  };

  const validateLoanType = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setErrors((prev) => ({ ...prev, loanType: error }));
  };

  const validateLeadType = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setLeadTypeError(error); // Use separate state for leadType error
  };

  const validateHasRunningLoans = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setHasRunningLoansError(error);
  };

  const validateWhichLoan = (value) => {
    let error = "";
    if (hasRunningLoans === "yes" && !value) {
      error = "This Field is required";
    }
    setWhichLoanError(error);
  };

  const validateRunningLoanAmount = (value) => {
    let error = "";
    if (hasRunningLoans === "yes") {
      if (!value) {
        error = "This Field is required";
      } else if (isNaN(value)) {
        error = "Amount must be a number";
      } else if (value <= 0) {
        error = "Amount must be greater than 0";
      }
    }
    setRunningLoanAmountError(error);
  };

  const validateCaseType = (value) => {
    let error = "";
    if (!value) {
      error = "Case type is required";
    }
    setCaseTypeError(error);
  };

  const validateTenure = (value) => {
    let error = "";
    if (!value) {
      error = "This Field is required";
    }
    setErrors((prev) => ({ ...prev, tenure: error }));
  };

  // Handle provider selection change
  const handleProviderChange = (event) => {
    const value = event.target.value;

    // If "Let F2 Fintech decide your lender" is being selected
    if (value.includes("Let F2 Fintech decide your lender")) {
      setSelectedProviders(["Let F2 Fintech decide your lender"]);
      // Clear provider amounts when special option is selected
      setProviderAmounts([]);
    }
    // If regular providers are being selected and "Let F2 Fintech decide your lender" is currently selected
    else if (selectedProviders.includes("Let F2 Fintech decide your lender")) {
      const newSelection = value.filter(
        (item) => item !== "Let F2 Fintech decide your lender"
      );
      setSelectedProviders(newSelection);
      // Initialize amounts for newly selected providers
      const updatedAmounts = newSelection.map(providerName => ({
        provider: providerName,
        amount: amount || ""
      }));
      setProviderAmounts(updatedAmounts);
    }
    // Normal case - just set the selected providers
    else {
      // Get removed providers
      const removedProviders = selectedProviders.filter(
        provider => !value.includes(provider)
      );

      // Get newly added providers
      const newProviders = value.filter(
        provider => !selectedProviders.includes(provider)
      );

      setSelectedProviders(value);

      // Remove amounts for deselected providers
      let updatedAmounts = providerAmounts.filter(
        pa => value.includes(pa.provider)
      );

      // Add amounts for newly selected providers
      newProviders.forEach(providerName => {
        if (!updatedAmounts.find(pa => pa.provider === providerName)) {
          updatedAmounts.push({
            provider: providerName,
            amount: amount || ""
          });
        }
      });

      setProviderAmounts(updatedAmounts);
    }

    validateProviders(value);
  };

  // Handle provider removal
  const handleProviderRemove = (providerToRemove) => {
    const newProviders = selectedProviders.filter(p => p !== providerToRemove);
    setSelectedProviders(newProviders);
    validateProviders(newProviders);

    // Remove from provider amounts
    setProviderAmounts(prev =>
      prev.filter(pa => pa.provider !== providerToRemove)
    );
  };

  // Open amount dialog for a specific provider
  const openAmountDialog = (providerName) => {
    setEditingProvider(providerName);
    setAmountDialogOpen(true);
  };

  // Update amount for a specific provider
  const updateProviderAmount = (providerName, newAmount) => {
    setProviderAmounts(prev =>
      prev.map(pa =>
        pa.provider === providerName ? { ...pa, amount: newAmount } : pa
      )
    );
  };

  // Get amount for a specific provider
  const getProviderAmount = (providerName) => {
    const providerAmount = providerAmounts.find(pa => pa.provider === providerName);
    return providerAmount ? providerAmount.amount : amount || "";
  };

  // Validate all provider amounts
  const validateAllProviderAmounts = () => {
    if (selectedProviders.includes("Let F2 Fintech decide your lender")) {
      return true; // Special option doesn't need amount validation
    }

    for (const pa of providerAmounts) {
      if (!pa.amount) {
        return false;
      }
      if (isNaN(Number(pa.amount))) {
        return false;
      }
      if (Number(pa.amount) < 50000 || Number(pa.amount) > 100000000) {
        return false;
      }
      if (Number(pa.amount) % 5 !== 0) {
        return false;
      }
    }
    return true;
  };

  // Generate random application number
  const randomNumberGenerator = useCallback(
    () => Math.floor(10000000 + Math.random() * 90000000),
    []
  );

  const randomFourDigitNumber = useMemo(
    () => Math.floor(1000 + Math.random() * 9000),
    []
  );

  const minDate = dayjs("1900-01-01");
  const maxDate = dayjs().subtract(20, "year");

  useEffect(() => {
    console.log("Scroll To Top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const registerCustomer = useCallback(async (customer) => {
    const customerData = {
      ...customer,
      name: `${customer.prefix ?? ""} ${customer.name}`.trim(),
      companyId: 101,
    };

    const { data: res } = await API.CustomerAPI.register(customerData);
    if (res.status !== "Success") {
      throw new Error(`Registration failed: ${res.message}`);
    }
    return res.data.id;
  }, []);

  async function createCustomerInfo(customerId, restValues) {
    await API.CustomerInfoAPI.create({
      customer_id: customerId,
      companyId: 101,
      ...restValues,
    });
  }

  const createCustomerApplication = useCallback(
    async (
      customerId,
      applicationNumber,
      amount,
      tenure,
      provider,
      loanType,
      loanCategory,
      leadType,
      hasRunningLoans,
      whichLoan,
      runningLoanAmount,
      caseType,
    ) => {
      console.log("loanCategory", loanCategory);
      const { data: applicationResponse } =
        await API.CustomerApplicationAPI.createApplication({
          customer_id: customerId,
          application_no: applicationNumber,
          amount,
          tenure,
          provider,
          loan_type: loanType,
          loan_category: loanCategory,
          companyId: 101,
          lead_type: leadType,
          has_running_loans: hasRunningLoans,
          which_loan: whichLoan,
          running_loan_amount: runningLoanAmount,
          case_type: caseType,
        });
      return applicationResponse.data.applicationId;
    },
    []
  );

  const createLoanTracking = useCallback(async (applicationId) => {
    await API.LoanTrackingAPI.createLoanTracking({
      customer_application_id: applicationId,
      status: "submitted",
      companyId: 101,
    });
  }, []);

  const loginCustomer = useCallback(
    async (contact, name) => {
      const response = await API.CustomerAPI.login({
        contact,
        password: `${name.replace(/\s/g, "")}@${randomFourDigitNumber}`,
        companyId: 101,
      });

      if (response.data.status === "Success") {
        const customerInfo = {
          id: response.data.data.id,
          name: response.data.data.name,
          token: response.data.data.token,
        };
        setLocalStorage("customerInfo", customerInfo);
        window.location.reload();
      }
    },
    [randomFourDigitNumber, setLocalStorage]
  );

  const setCustomerData = async (customerInfo) => {
    setGetStarted(false);
    setLocalStorage("customerInfo", customerInfo);
    location.reload();
  };

  // Create new customer with loan applications for multiple providers
  const create = useCallback(
    async (values) => {
      if (isCreatingRef.current) {
        console.log("Application creation already in progress, skipping...");
        return;
      }

      isCreatingRef.current = true;
      setLoading(true);

      const { contact, email, name, prefix, status, dob, ...restValues } =
        values;
      const customer = {
        contact,
        dob,
        email,
        name,
        prefix,
        password: `${name.replace(/\s/g, "")}@${randomFourDigitNumber}`,
        status,
        companyId: 101,
      };

      try {
        const customerId =
          storedCustomerId || (await registerCustomer(customer));
        const customerInfoWithLeadType = {
          ...restValues,
          lead_type: leadType, // Use the state variable, not values.lead_type
        };
        await createCustomerInfo(customerId, customerInfoWithLeadType);

        // Create separate applications for each selected provider
        const applicationResults = [];
        for (const provider of selectedProviders) {
          // Get provider-specific amount or use main amount
          const providerAmount = selectedProviders.includes("Let F2 Fintech decide your lender")
            ? amount
            : getProviderAmount(provider);

          const applicationNumber = randomNumberGenerator();
          const applicationId = await createCustomerApplication(
            customerId,
            applicationNumber,
            providerAmount, // Use provider-specific amount
            tenure,
            provider,
            loanType,
            loanCategory,
            leadType,
            hasRunningLoans === "yes",
            hasRunningLoans === "yes" ? whichLoan : null,
            hasRunningLoans === "yes" ? Number(runningLoanAmount) : null,
            caseType,
          );

          await createLoanTracking(applicationId);
          applicationResults.push({
            provider,
            applicationNumber,
            applicationId,
          });
        }

        // Store all created applications
        setCreatedApplications(
          applicationResults.map((app) => app.applicationNumber)
        );

        if (applicationResults.length > 0) {
          setApplicationNumber(applicationResults[0].applicationNumber);
        }

        setGetStarted(false);

        !storedCustomerId
          ? await setCustomerData({
            id: customerId,
            name: customer.name,
          })
          : null;

        setLoading(false);
        console.log(
          "Customer info and multiple applications created successfully:",
          applicationResults
        );
      } catch (err) {
        setLoading(false);
        isCreatingRef.current = false;
        toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
        console.log(
          "Error during customer creation:",
          err?.response?.data?.msg
        );
      }
    },
    [amount, tenure, selectedProviders, loanType, randomFourDigitNumber, providerAmounts, leadType, hasRunningLoans, whichLoan, runningLoanAmount, caseType]
  );

  // Fetching initial values from Eligibility Criteria form
  useEffect(() => {
    if (!urlId || eligibilityFetchedRef.current) return;

    const fetchEligibilityData = async () => {
      eligibilityFetchedRef.current = true;
      setLoading(true);

      try {
        const result = await getLeadCibilScore(urlId);
        console.log("Fetching eligibility data for ID:", urlId, result);

        if (result.success && result.data) {
          const data = result.data;

          setInitialValues((prev) => ({
            ...prev,
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
          }));

          // Handle multiple providers if they exist
          if (data.provider) {
            const providersList = Array.isArray(data.provider) ? data.provider : [data.provider];
            setSelectedProviders(providersList);

            // Initialize provider amounts if available
            if (data.amount) {
              const initialAmounts = providersList.map(providerName => ({
                provider: providerName,
                amount: data.amount || ""
              }));
              setProviderAmounts(initialAmounts);
            }
          }

          setAmount(data.amount || "");

          // Set loan type and category
          if (data.loanType) {
            setLoanType(data.loanType);
            const category = getLoanCategory(data.loanType);
            setLoanCategory(category);
          }
          if (data.lead_type) {
            setLeadType(data.lead_type);
          }
          if (data.case_type) {
            setCaseType(data.case_type);
          }
        } else {
          console.error("Failed to fetch eligibility data:", result.error);
        }
      } catch (err) {
        console.error("Eligibility fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEligibilityData();
  }, [urlId]);

  useEffect(() => {
    const fetchCustomerData = async (id) => {
      if (customerFetchedRef.current) return;

      try {
        customerFetchedRef.current = true;
        console.log("customer profile for ID:", id);

        const { data } = await API.CustomerAPI.getCustomerProfile(id, 101);

        if (data.status === "Success") {
          setInitialValues((prev) => ({
            ...prev,
            name: data.data.customer.name || "",
            email: data.data.customer.email || "",
            contact: data.data.customer.contact || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const idToFetch = customerId || storedCustomerId;
    if (idToFetch && !urlId) {
      fetchCustomerData(idToFetch);
    }
  }, [customerId, storedCustomerId, urlId]);

  // Fetch application numbers using stored customer ID
  useEffect(() => {
    if (!storedCustomerId) return;
    let isCancelled = false;

    const fetchApplicationData = async () => {
      try {
        console.log(
          "Fetching application data for customer:",
          storedCustomerId
        );
        const { data: response } =
          await API.CustomerApplicationAPI.getApplicationByIdWeb(
            storedCustomerId
          );

        if (!isCancelled && response.status === "Success") {
          if (Array.isArray(response.data)) {
            setCreatedApplications(
              response.data.map((app) => app.application_no)
            );
            setApplicationNumber(response.data[0].application_no);
          } else {
            setApplicationNumber(response.data.application_no);
            setCreatedApplications([response.data.application_no]);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.log("Error fetching application data:", err);
        }
      }
    };
    fetchApplicationData();
    return () => {
      isCancelled = true;
    };
  }, [storedCustomerId]);

  // If application numbers exist, display success message
  if (createdApplications.length > 0) {
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
          maxWidth: "600px",
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
          Your applications are submitted!
        </Typography>

        {createdApplications.map((appNumber, index) => (
          <Typography
            key={appNumber}
            sx={{
              fontSize: "1rem",
              color: "#333",
              marginBottom: 1,
              textAlign: "center",
            }}
          >
            Application #{index + 1}: <strong>{appNumber}</strong>
          </Typography>
        ))}

        <Typography
          sx={{
            fontSize: "1rem",
            color: "#333",
            marginTop: 2,
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          We will contact you within the next half an hour for each application.
          {!salary &&
            ` To speed up the process, please complete the next steps.`}
        </Typography>

        {salary ? (
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              borderRadius: "0px 0px 10px 0px",
              bgcolor: "#3244e6",
              color: "white",
              "&:hover": {
                bgcolor: "#3244e6",
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

  // Initial form view with amount, tenure, and multiple provider selection
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
            color: "#3244e6",
            fontWeight: {},
            fontFamily: "DM sans",
            marginBottom: 2,
          }}
        >
          Get the loan best suited for your wish
        </Typography>

        {/* Base Amount Field */}
        <Box
          sx={{
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
            label="Enter Base Amount*"
            placeholder="Base Loan Amount (Can customize per provider)"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              validateAmount(e.target.value);

              // Update all provider amounts when base amount changes
              if (e.target.value && !selectedProviders.includes("Let F2 Fintech decide your lender")) {
                const updatedAmounts = providerAmounts.map(pa => ({
                  ...pa,
                  amount: e.target.value
                }));
                setProviderAmounts(updatedAmounts);
              }
            }}
            onBlur={() => validateAmount(amount)}
            error={!!errors.amount}
            helperText={errors.amount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon sx={{ color: "#3244e6" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: "13px",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: 1,
              "& .MuiInputBase-root": {
                backgroundColor: "D3D3D3",
              },
              "& .MuiFormLabel-root": {
                color: "#1a1a1a",
                fontWeight: 500,
              },
              "& .MuiFormLabel-root.Mui-error": {
                color: "#d32f2f",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#000000",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "gray",
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#ffffff",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FFD700",
              },
            }}
          />
        </Box>

        {/* Loan Type Field */}
        <Box
          sx={{
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          }}
        >
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel
              id="loan-type-label"
              sx={{
                color: errors.loanType ? "error.main" : "text.secondary",
                "&.Mui-focused": { color: "#3244e6" },
              }}
            >
              Loan Type*
            </InputLabel>

            <Select
              labelId="loan-type-label"
              name="loanType"
              value={loanType}
              onChange={(e) => handleLoanTypeChange(e.target.value)}
              onBlur={() => validateLoanType(loanType)}
              error={!!errors.loanType}
              input={<OutlinedInput label="Loan Type*" />}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: "#3244e6", mr: 1 }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: "8px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.loanType ? "red" : "#c4c4c4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                  borderWidth: "2px",
                },
              }}
            >
              <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                Secured Loans
              </MenuItem>
              {loanTypes.secured.map((loan) => (
                <MenuItem key={loan.value} value={loan.value}>
                  {loan.label}
                </MenuItem>
              ))}

              <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", mt: 1 }}>
                Unsecured Loans
              </MenuItem>
              {loanTypes.unsecured.map((loan) => (
                <MenuItem key={loan.value} value={loan.value}>
                  {loan.label}
                </MenuItem>
              ))}
            </Select>

            {errors.loanType && (
              <FormHelperText error>{errors.loanType}</FormHelperText>
            )}
          </FormControl>

          {/* Lead Type Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <InputLabel
              id="lead-type-label"
              sx={{
                color: leadTypeError ? "error.main" : "text.secondary",
                "&.Mui-focused": { color: "#3244e6" },
              }}
            >
              Lead Type*
            </InputLabel>

            <Select
              labelId="lead-type-label"
              name="leadType"
              value={leadType}
              onChange={(e) => {
                setLeadType(e.target.value);
                validateLeadType(e.target.value);
              }}
              onBlur={() => validateLeadType(leadType)}
              error={!!leadTypeError}
              input={<OutlinedInput label="Lead Type*" />}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: "#3244e6", mr: 1 }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: "8px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: leadTypeError ? "red" : "#c4c4c4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                  borderWidth: "2px",
                },
              }}
            >
              {leadTypes.map((lead) => (
                <MenuItem key={lead.value} value={lead.value}>
                  {lead.label}
                </MenuItem>
              ))}
            </Select>

            {leadTypeError && (
              <FormHelperText error>{leadTypeError}</FormHelperText>
            )}
          </FormControl>

          {/* Running Customer Loans Field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <InputLabel
              id="running-loans-label"
              sx={{
                color: hasRunningLoansError ? "error.main" : "text.secondary",
                "&.Mui-focused": { color: "#3244e6" },
              }}
            >
              Running Customer Loans*
            </InputLabel>

            <Select
              labelId="running-loans-label"
              name="hasRunningLoans"
              value={hasRunningLoans}
              onChange={(e) => {
                setHasRunningLoans(e.target.value);
                validateHasRunningLoans(e.target.value);
                // Clear conditional fields when switching to "no"
                if (e.target.value === "no") {
                  setWhichLoan("");
                  setRunningLoanAmount("");
                  setWhichLoanError("");
                  setRunningLoanAmountError("");
                }
              }}
              onBlur={() => validateHasRunningLoans(hasRunningLoans)}
              error={!!hasRunningLoansError}
              input={<OutlinedInput label="Running Customer Loans*" />}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: "#3244e6", mr: 1 }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: "8px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: hasRunningLoansError ? "red" : "#c4c4c4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                  borderWidth: "2px",
                },
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>

            {hasRunningLoansError && (
              <FormHelperText error>{hasRunningLoansError}</FormHelperText>
            )}
          </FormControl>

          {/* Conditional Fields - Which Loan and Loan Amount */}
          {hasRunningLoans === "yes" && (
            <>
              {/* Which Loan Field - now a dropdown */}
              <FormControl
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                error={!!whichLoanError}
              >
                <InputLabel
                  id="which-loan-label"
                  sx={{
                    color: whichLoanError ? "error.main" : "text.secondary",
                    "&.Mui-focused": { color: "#3244e6" },
                  }}
                >
                  Which Loan*
                </InputLabel>
                <Select
                  labelId="which-loan-label"
                  name="whichLoan"
                  value={whichLoan}
                  onChange={(e) => {
                    setWhichLoan(e.target.value);
                    validateWhichLoan(e.target.value);
                  }}
                  onBlur={() => validateWhichLoan(whichLoan)}
                  input={<OutlinedInput label="Which Loan*" />}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountBalanceIcon sx={{ color: "#3244e6", mr: 1 }} />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: whichLoanError ? "red" : "#c4c4c4",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3244e6",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3244e6",
                      borderWidth: "2px",
                    },
                  }}
                >
                  <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                    Secured Loans
                  </MenuItem>
                  {loanTypes.secured.map((loan) => (
                    <MenuItem key={loan.value} value={loan.value}>
                      {loan.label}
                    </MenuItem>
                  ))}

                  <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", mt: 1 }}>
                    Unsecured Loans
                  </MenuItem>
                  {loanTypes.unsecured.map((loan) => (
                    <MenuItem key={loan.value} value={loan.value}>
                      {loan.label}
                    </MenuItem>
                  ))}
                </Select>
                {whichLoanError && (
                  <FormHelperText error>{whichLoanError}</FormHelperText>
                )}
              </FormControl>

              {/* Loan Amount Field */}
              <TextField
                fullWidth
                variant="outlined"
                label="Loan Amount*"
                name="runningLoanAmount"
                value={runningLoanAmount}
                onChange={(e) => {
                  setRunningLoanAmount(e.target.value);
                  validateRunningLoanAmount(e.target.value);
                }}
                onBlur={() => validateRunningLoanAmount(runningLoanAmount)}
                error={!!runningLoanAmountError}
                helperText={runningLoanAmountError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon sx={{ color: "#3244e6", mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "white",
                    "& fieldset": {
                      borderColor: runningLoanAmountError ? "red" : "#c4c4c4",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3244e6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3244e6",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: runningLoanAmountError ? "error.main" : "text.secondary",
                    "&.Mui-focused": { color: "#3244e6" },
                  },
                }}
              />
            </>
          )}
        </Box>

        {/* Case Type Field */}
        <FormControl
          autoComplete="off"
          variant="outlined"
          error={!!caseTypeError}
          sx={{
            width: { xs: "80%", sm: "45%", md: "45%" },
            mb: 3,
          }}
        >
          <InputLabel
            id="case-type-label"
            sx={{
              color: caseTypeError ? "error.main" : "text.secondary",
              "&.Mui-focused": { color: "#3244e6" },
            }}
          >
            Case Type*
          </InputLabel>
          <Select
            labelId="case-type-label"
            name="caseType"
            value={caseType}
            onChange={(e) => {
              setCaseType(e.target.value);
              validateCaseType(e.target.value);
            }}
            onBlur={() => validateCaseType(caseType)}
            input={<OutlinedInput label="Case Type*" />}
            startAdornment={
              <InputAdornment position="start">
                <AccountBalanceIcon sx={{ color: "#3244e6", mr: 1 }} />
              </InputAdornment>
            }
            sx={{
              borderRadius: "8px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: caseTypeError ? "red" : "#c4c4c4",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3244e6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3244e6",
                borderWidth: "2px",
              },
            }}
          >
            <MenuItem
              value="top_up"
              sx={{
                padding: "10px 16px",
                fontSize: "14px",
                borderRadius: "6px",
              }}
            >
              Top Up
            </MenuItem>
            <MenuItem
              value="fresh"
              sx={{
                padding: "10px 16px",
                fontSize: "14px",
                borderRadius: "6px",
              }}
            >
              Fresh
            </MenuItem>
          </Select>

          {caseTypeError && (
            <FormHelperText error>{caseTypeError}</FormHelperText>
          )}
        </FormControl>

        {/* Tenure Field */}
        <FormControl
          autoComplete="off"
          variant="outlined"
          error={!!errors.tenure}
          sx={{
            width: { xs: "80%", sm: "45%", md: "45%" },
            mb: 3,
          }}
        >
          <InputLabel
            id="tenure-label"
            sx={{
              color: errors.tenure ? "error.main" : "text.secondary",
              "&.Mui-focused": { color: "#3244e6" },
            }}
          >
            {loanCategory ? `Select Tenure (${loanCategory === 'secured' ? 'Long Term' : 'Short Term'})` : "Select A Comfortable Tenure"}
          </InputLabel>

          <Select
            labelId="tenure-label"
            name="tenure"
            value={tenure}
            onChange={(e) => {
              setTenure(e.target.value);
              validateTenure(e.target.value);
            }}
            onBlur={() => validateTenure(tenure)}
            input={<OutlinedInput label={loanCategory ? `Select Tenure (${loanCategory === 'secured' ? 'Long Term' : 'Short Term'})` : "Select A Comfortable Tenure"} />}
            disabled={!loanCategory}
            startAdornment={
              <InputAdornment position="start">
                <AccessTimeIcon sx={{ color: "#3244e6", mr: 1 }} />
              </InputAdornment>
            }
            sx={{
              borderRadius: "8px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: errors.tenure ? "red" : "#c4c4c4",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3244e6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3244e6",
                borderWidth: "2px",
              },
            }}
          >
            {(loanCategory ? tenureOptions[loanCategory] : []).map((label) => (
              <MenuItem
                key={label}
                value={label}
                sx={{
                  "&:hover": { backgroundColor: "#f1f3ff" },
                  "&.Mui-selected": {
                    backgroundColor: "#3244e6",
                    color: "white",
                  },
                  "&.Mui-selected:hover": { backgroundColor: "#3244e6" },
                }}
              >
                <Typography variant="body2">{label}</Typography>
              </MenuItem>
            ))}
          </Select>

          {errors.tenure && (
            <FormHelperText error>
              {errors.tenure || (loanCategory ? "" : "Please select a loan type first")}
            </FormHelperText>
          )}
        </FormControl>

        {/* Providers Field */}
        <Box
          sx={{
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          }}
        >
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel
              id="providers-select-label"
              sx={{
                color: errors.providers ? "error.main" : "text.secondary",
                "&.Mui-focused": { color: "#3244e6" },
              }}
            >
              Select Providers*
            </InputLabel>

            <Select
              labelId="providers-select-label"
              multiple
              value={selectedProviders}
              onChange={handleProviderChange}
              onBlur={() => validateProviders(selectedProviders)}
              error={!!errors.providers}
              input={<OutlinedInput label="Select Providers*" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      onDelete={() => handleProviderRemove(value)}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      sx={{
                        borderRadius: "6px",
                        backgroundColor: "#f1f3ff",
                        color: "#3244e6",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              )}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: "#3244e6", mr: 1 }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: "8px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.providers ? "red" : "#c4c4c4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                  borderWidth: "2px",
                },
              }}
            >
              {/* Special Options */}
              <MenuItem
                value="Let F2 Fintech decide your lender"
                sx={{
                  backgroundColor: "#f8f9ff",
                  borderBottom: "1px solid #e0e0e0",
                  "&:hover": {
                    backgroundColor: "#e8edff",
                  },
                }}
              >
                <Checkbox
                  checked={
                    selectedProviders.indexOf(
                      "Let F2 Fintech decide your lender"
                    ) > -1
                  }
                  sx={{ color: "#3244e6" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#3244e6" }}
                >
                  Let F2 Fintech decide your lender
                </Typography>
              </MenuItem>

              {providers.map((prov) => (
                <MenuItem
                  key={prov.id}
                  value={prov.title}
                  disabled={selectedProviders.includes(
                    "Let F2 Fintech decide your lender"
                  )}
                  sx={{
                    opacity: selectedProviders.includes(
                      "Let F2 Fintech decide your lender"
                    )
                      ? 0.5
                      : 1,
                  }}
                >
                  <Checkbox
                    checked={selectedProviders.indexOf(prov.title) > -1}
                    sx={{ color: "#3244e6" }}
                  />
                  <Typography variant="body2">{prov.title}</Typography>
                </MenuItem>
              ))}
            </Select>

            {errors.providers && (
              <FormHelperText error>{errors.providers}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Provider Amounts Summary - Only show if multiple providers selected and not special option */}
        {selectedProviders.length > 0 && !selectedProviders.includes("Let F2 Fintech decide your lender") && (
          <Box
            sx={{
              width: {
                xs: "80%",
                md: "45%",
                sm: "45%",
              },
              mb: 3,
              p: 2,
              backgroundColor: "#f8f9ff",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              sx={{
                color: "#3244e6",
                fontSize: "14px",
                fontWeight: "600",
                mb: 2,
              }}
            >
              Customize Amounts per Provider:
            </Typography>
            <Stack spacing={1}>
              {selectedProviders.map((providerName) => {
                const providerAmount = getProviderAmount(providerName);
                return (
                  <Box
                    key={providerName}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#333",
                        fontSize: "13px",
                        flex: 1,
                      }}
                    >
                      {providerName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          color: "#3244e6",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        ₹{providerAmount || "Not set"}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => openAmountDialog(providerName)}
                        sx={{
                          color: "#3244e6",
                          '&:hover': {
                            backgroundColor: "rgba(50, 68, 230, 0.1)",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        <PinkTextButton
          disabled={
            !!errors.amount ||
            !!errors.tenure ||
            !!errors.loanType ||
            !!errors.leadType ||
            !!caseTypeError ||
            !!errors.providers ||
            !amount ||
            !tenure ||
            !loanType ||
            !leadType ||
            !caseType ||
            selectedProviders.length === 0 ||
            (selectedProviders.length > 0 && !selectedProviders.includes("Let F2 Fintech decide your lender") && !validateAllProviderAmounts())
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

        {/* Provider Amount Dialog */}
        <Dialog
          open={amountDialogOpen}
          onClose={() => setAmountDialogOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "white",
              borderRadius: "12px",
            },
          }}
        >
          <DialogTitle sx={{ color: "#3244e6", borderBottom: "1px solid #e0e0e0" }}>
            Set Amount for {editingProvider}
            <IconButton
              onClick={() => setAmountDialogOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#ffff",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, mt: 2 }}>
            <TextField
              autoComplete="off"
              fullWidth
              variant="filled"
              label="Loan Amount"
              placeholder="Enter amount for this provider"
              value={getProviderAmount(editingProvider)}
              onChange={(e) => {
                if (editingProvider) {
                  updateProviderAmount(editingProvider, e.target.value);
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon sx={{ color: "#3244e6" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  "&:before, &:after": {
                    borderBottom: "none !important",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666",
                },
              }}
            />
            <Typography sx={{ color: "#666", fontSize: "12px", mt: 1 }}>
              Amount must be between 50,000 and 10,00,00,000 and divisible by 5
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setAmountDialogOpen(false)}
              sx={{ color: "#ffff" }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }


  // Main form view for getting customer details (unchanged from original)
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
          isSubmitting,
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
                border: "2px solid #e0e0e0", // Added color to border
                borderRadius: "8px", // Added border radius
                marginTop: "20px", // Added top margin
                padding: "20px", // Added internal padding
                boxSizing: "border-box", // Ensure padding doesn't affect width
                maxWidth: {
                  // Limit maximum width for better responsiveness
                  xs: "95%",
                  sm: "90%",
                  md: "85%",
                  lg: "100%",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // border: "2px solid red",
                  width: "100%",
                  mt: 20,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    fontSize: {
                      xs: "1.7rem",
                      sm: "2.5rem",
                      md: "2rem",
                    },
                    color: "#3244e6",
                    fontWeight: 500,
                    marginBottom: 1,
                  }}
                >
                  Basic Details
                </Typography>

                {/* <Typography
                  sx={ {
                    fontFamily: "Poppins",
                    fontSize: "2vh",
                    color: "black",
                    marginBottom: 1,
                  } }
                >
                  Step 1/4
                </Typography> */}

                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#666",
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  Selected Providers: {selectedProviders.join(", ")}
                </Typography>
              </Box>

              {/* Rest of the form fields remain the same as in your original code */}
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
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 3,
                    height: "inherit",
                  }}
                >
                  {/* Prefix Dropdown */}
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "20%",
                      padding: "0 !important",
                      margin: "0 !important",
                    }}
                    error={!!touched.prefix && !!errors.prefix}
                  >
                    <InputLabel
                      id="prefix-label"
                      sx={{
                        color: "gray",
                      }}
                    >
                      Prefix
                    </InputLabel>
                    <Select
                      labelId="prefix-label"
                      name="prefix"
                      value={values.prefix}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{
                        backgroundColor: "#D3D3D3",
                        borderRadius: "4px",

                        "& .MuiSelect-filled.Mui-error": {
                          borderBottomColor: "red",
                          border: "2px solid red",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f !important",
                          fontSize: "0.75rem",
                        },
                        height: "10%",
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="mr">Mr</MenuItem>
                      <MenuItem value="miss">Miss</MenuItem>
                      <MenuItem value="mrs">Mrs</MenuItem>
                      <MenuItem value="dr">Dr</MenuItem>
                      <MenuItem value="ca">CA</MenuItem>
                    </Select>
                    <FormHelperText
                      sx={{
                        marginLeft: 1,
                        fontSize: "10.3px",
                        fontFamily: "Verdana, sans-serif",
                        fontWeight: "400",
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f !important",
                          fontSize: "0.75rem",
                          marginLeft: "14px",
                          marginRight: "14px",
                        },
                      }}
                    >
                      {errors.prefix}
                    </FormHelperText>
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
                    InputProps={{
                      sx: {
                        height: { xs: "48px", sm: "52px", md: "inherit" },
                      },
                    }}
                    sx={{
                      height: "10%",
                      width: { xs: "70%", sm: "70%", md: "75%" },
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
                      "& .MuiFormHelperText-root": {
                        color: "#d32f2f !important",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                        marginRight: "14px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    setFieldValue("pan", uppercaseValue);
                  }}
                  error={touched.pan && Boolean(errors.pan)}
                  helperText={touched.pan && errors.pan}
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: "uppercase" },
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                    fontSize: "16px",
                    marginBottom: 1,
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                  error={!!(touched.city && errors.city)}
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
                    fontSize: "16px",
                    marginBottom: 1,
                    "& .MuiInputBase-root": {
                      backgroundColor: "#D3D3D3",
                      minHeight: "50px",
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
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontSize: "0.75rem",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
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
                          color: "black",
                        },
                      },
                    }}
                  >
                    <MenuItem value="salaried">Salaried </MenuItem>
                    <MenuItem value="self_employed">Self Employed</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>
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
                      minDate={minDate}
                      maxDate={maxDate}
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
                          color: "#4E9FE5",
                          "&.Mui-checked": {
                            color: "#4E9FE5",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                            md: "1rem",
                          },
                          color: "gray",
                        }}
                      >
                        I agree to opt for the product and service of F2
                        Fintech. By opting for F2 Fintech, I agree to have read,
                        understood and explicitly consent to the T&C, Privacy
                        Policy and F2 Fintech Credit Terms.
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
                          color: "#4E9FE5",
                          "&.Mui-checked": {
                            color: "#4E9FE5",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "0.800rem", color: "gray" }}>
                        I further consent to receive the loan and product
                        updates of F2 Fintech on WhatsApp and allow F2 Fintech
                        and/or their authorized third party service providers to
                        contact me for marketing purposes via
                        <br />
                        <SmsIcon /> <CallIcon /> <WhatsAppIcon />
                        <EmailIcon />
                      </Typography>
                    }
                  />
                </FormGroup>

                <Button
                  disabled={!dirty || isSubmitting}
                  type="submit"
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "20px",
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                      md: "1.125rem",
                    },
                    lineHeight: "1.5rem",
                    width: {
                      xs: "50%",
                      sm: "30%",
                      md: "11vw",
                    },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "8px 16px",
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
  applicationNumber: PropTypes.string,
  setApplicationNumber: PropTypes.func,
  getStarted: PropTypes.bool,
  setGetStarted: PropTypes.func,
  salary: PropTypes.string,
};

export default Step1Form;