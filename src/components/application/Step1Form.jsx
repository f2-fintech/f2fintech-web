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
  Tooltip,
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
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
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

// Premium Button styling
const ModernButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #4E9FE5 0%, #3244e6 100%)",
  color: "white !important",
  fontWeight: 600,
  fontSize: "1rem",
  fontFamily: "Poppins",
  padding: "12px 24px",
  borderRadius: "12px",
  textTransform: "none",
  boxShadow: "0 4px 14px 0 rgba(50, 68, 230, 0.39)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #3244e6 0%, #1a2bbd 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(50, 68, 230, 0.23)",
  },
  "&:disabled": {
    background: "#e0e0e0",
    color: "#999 !important",
  }
}));

const OutlinedModernButton = styled(Button)(({ theme }) => ({
  color: "#3244e6",
  border: "2px solid #3244e6",
  fontWeight: 600,
  fontSize: "0.9rem",
  fontFamily: "Poppins",
  padding: "10px 20px",
  borderRadius: "12px",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(50, 68, 230, 0.05)",
    border: "2px solid #1a2bbd",
    color: "#1a2bbd",
  }
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
  const [leadType, setLeadType] = useState(null);
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
  });
  const [leadTypeError, setLeadTypeError] = useState("");
  const [existingLoans, setExistingLoans] = useState([
    {
      has_running_loans: "",
      which_loan: "",
      loan_amount: "",
      running_emi: "",
    }
  ]);
  const [existingLoansErrors, setExistingLoansErrors] = useState([
    {
      has_running_loans: "",
      which_loan: "",
      loan_amount: "",
      running_emi: "",
    }
  ]);

  const handleAddLoan = () => {
    setExistingLoans([...existingLoans, { has_running_loans: "yes", which_loan: "", loan_amount: "", running_emi: "" }]);
    setExistingLoansErrors([...existingLoansErrors, { has_running_loans: "", which_loan: "", loan_amount: "", running_emi: "" }]);
  };

  const handleRemoveLoan = (indexToRemove) => {
    const updatedLoans = existingLoans.filter((_, index) => index !== indexToRemove);
    const updatedErrors = existingLoansErrors.filter((_, index) => index !== indexToRemove);
    setExistingLoans(updatedLoans);
    setExistingLoansErrors(updatedErrors);
    validateExistingLoans(updatedLoans, updatedErrors);
  };

  const isExistingLoansValid = () => {
    return existingLoans.every((loan, index) => {
      const err = existingLoansErrors[index] || {};
      if (err.has_running_loans || err.which_loan || err.loan_amount || err.running_emi) return false;
      if (!loan.has_running_loans) return false;
      if (loan.has_running_loans === "yes" && (!loan.which_loan || !loan.loan_amount)) return false;
      return true;
    });
  };
  const [caseType, setCaseType] = useState("fresh");
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

  // Capture UTM / platform click-ID params from the landing URL
  const utmAttributes = useMemo(() => {
    const raw = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_term: searchParams.get("utm_term"),
      utm_content: searchParams.get("utm_content"),
      // Capture whichever click-ID the ad platform appends
      utm_id: searchParams.get("utm_id")
        ?? searchParams.get("gclid")
        ?? searchParams.get("fbclid")
        ?? searchParams.get("gbraid")
        ?? searchParams.get("ttclid"),
    };
    // Store null when user arrives with no UTM params at all
    return Object.values(raw).some(Boolean) ? raw : null;
  }, [searchParams]);

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
    }
    // else if (value % 5 !== 0) {
    //   error = "Amount must be divisible by 5";
    // }
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



  const validateExistingLoans = (loans, errors = null) => {
    let hasIssues = false;
    const newErrors = loans.map((loan) => {
      const err = { has_running_loans: "", which_loan: "", loan_amount: "", running_emi: "" };
      if (!loan.has_running_loans) {
        err.has_running_loans = "This Field is required";
        hasIssues = true;
      }
      if (loan.has_running_loans === "yes") {
        if (!loan.which_loan) {
          err.which_loan = "This Field is required";
          hasIssues = true;
        }
        if (!loan.loan_amount) {
          err.loan_amount = "This Field is required";
          hasIssues = true;
        } else if (isNaN(loan.loan_amount)) {
          err.loan_amount = "Amount must be a number";
          hasIssues = true;
        } else if (loan.loan_amount <= 0) {
          err.loan_amount = "Amount must be greater than 0";
          hasIssues = true;
        }
        if (loan.running_emi) {
          if (isNaN(loan.running_emi)) {
            err.running_emi = "EMI must be a number";
            hasIssues = true;
          } else if (loan.running_emi < 0) {
            err.running_emi = "EMI cannot be negative";
            hasIssues = true;
          }
        }
      }
      return err;
    });
    setExistingLoansErrors(newErrors);
    return !hasIssues;
  };

  const handleExistingLoanChange = (index, field, value) => {
    const updatedLoans = [...existingLoans];
    updatedLoans[index][field] = value;

    if (field === "has_running_loans" && value === "no") {
      updatedLoans[index].which_loan = "";
      updatedLoans[index].loan_amount = "";
      updatedLoans[index].running_emi = "";
    }

    setExistingLoans(updatedLoans);
    validateExistingLoans(updatedLoans, existingLoansErrors);
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
      // if (Number(pa.amount) % 5 !== 0) {
      //   return false;
      // }
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
  }, [getStarted]);

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
    async (params) => {
      const {
        customerId,
        applicationNumber,
        amount,
        tenure,
        provider,
        loanType,
        loanCategory,
        leadType,
        existingLoans,
        caseType,
        utmAttributes,
      } = params;
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
          lead_type: null,
          existing_loans: JSON.stringify(existingLoans.map(l => ({
            has_running_loans: l.has_running_loans === "yes" ? 1 : 0,
            which_loan: l.which_loan,
            loan_amount: l.loan_amount ? Number(l.loan_amount) : null,
            running_emi: l.running_emi ? Number(l.running_emi) : null
          }))),
          case_type: "fresh",
          source: "website",
          utm_attributes: utmAttributes ?? null,
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
          const applicationId = await createCustomerApplication({
            customerId,
            applicationNumber,
            amount: providerAmount,
            tenure,
            provider,
            loanType,
            loanCategory,
            leadType,
            existingLoans,
            caseType,
            utmAttributes,
          });

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
    [amount, tenure, selectedProviders, loanType, randomFourDigitNumber, providerAmounts, leadType, existingLoans, caseType, utmAttributes]
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
          if (data.existing_loans) {
            try {
              const parsed = typeof data.existing_loans === "string" ? JSON.parse(data.existing_loans) : data.existing_loans;
              if (Array.isArray(parsed) && parsed.length > 0) {
                const formatted = parsed.map(l => ({
                  has_running_loans: l.has_running_loans === 1 || l.has_running_loans === "yes" || l.has_running_loans === true ? "yes" : "no",
                  which_loan: l.which_loan || "",
                  loan_amount: l.loan_amount || "",
                  running_emi: l.running_emi || ""
                }));
                setExistingLoans(formatted);
                setExistingLoansErrors(formatted.map(() => ({ has_running_loans: "", which_loan: "", loan_amount: "", running_emi: "" })));
              }
            } catch (e) { console.error(e); }
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
          mt: 8,
          p: { xs: 4, md: 6 },
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(30, 60, 114, 0.1)",
          borderRadius: "32px",
          boxShadow: "0 20px 40px rgba(30, 60, 114, 0.1)",
          maxWidth: "650px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            boxShadow: "0 10px 20px rgba(30, 60, 114, 0.2)",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 45, color: "white" }} />
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            fontWeight: 800,
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Poppins",
            mb: 2,
          }}
        >
          Success!
        </Typography>

        <Typography
          sx={{
            fontSize: "1.1rem",
            color: "rgba(0,0,0,0.6)",
            fontFamily: "Poppins",
            fontWeight: 500,
            mb: 4,
          }}
        >
          Your applications have been submitted successfully.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mb: 4,
            p: 3,
            background: "rgba(30, 60, 114, 0.03)",
            borderRadius: "20px",
            border: "1px solid rgba(30, 60, 114, 0.05)",
          }}
        >
          {createdApplications.map((appNumber, index) => (
            <Box
              key={appNumber}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "rgba(0,0,0,0.5)",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
              >
                Application #{index + 1}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#1e3c72",
                  fontFamily: "Poppins",
                  fontWeight: 800,
                }}
              >
                {appNumber}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            fontSize: "0.95rem",
            color: "rgba(0,0,0,0.6)",
            fontFamily: "Poppins",
            lineHeight: 1.6,
            mb: 5,
          }}
        >
          Our executive will contact you within the next <strong>30 minutes</strong> for each application.
          {!salary &&
            ` To expedite your processing, please continue with the next verification steps.`}
        </Typography>

        {salary && (
          <ModernButton
            fullWidth
            onClick={() => {
              remLocalStorage("customerInfo");
              location.reload();
            }}
            sx={{
              height: "56px",
              borderRadius: "16px",
              fontSize: "1.1rem",
            }}
          >
            Fill Another Application
          </ModernButton>
        )}
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
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2rem" },
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%, #1e3c72 200%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              animation: "gradientFlow 5s linear infinite",
              "@keyframes gradientFlow": {
                "0%": { backgroundPosition: "0% center" },
                "100%": { backgroundPosition: "200% center" },
              },
            }}
          >
            Loan Request
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "rgba(0,0,0,0.5)",
              fontWeight: 500,
              mt: 1,
              fontFamily: "Poppins"
            }}
          >
            Get the loan best suited for your wish
          </Typography>
        </Box>

        {/* Main Fields Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
            width: "100%",
            mb: 4
          }}
        >
          {/* Base Amount Field */}
          <Box>
            <Tooltip title="Enter the loan amount you want to apply for." arrow followCursor>
              <TextField
                type="number"
                autoComplete="off"
                fullWidth
                variant="outlined"
                name="amount"
                label="Base Loan Amount*"
                placeholder="e.g. 5,00,000"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  validateAmount(e.target.value);
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
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    transition: "all 0.3s ease",
                    "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                    "&:hover fieldset": { borderColor: "#1e3c72" },
                    "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#555",
                    fontWeight: 500,
                    "&.Mui-focused": { color: "#1e3c72" },
                  },
                }}
              />
            </Tooltip>
          </Box>

          {/* Loan Type Field */}
          <Box>
            <FormControl fullWidth variant="outlined">
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
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(30, 60, 114, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1e3c72",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1e3c72",
                    borderWidth: "1px",
                  },
                }}
              >
                <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", mt: 1 }}>
                  Unsecured Loans
                </MenuItem>
                {loanTypes.unsecured.map((loan) => (
                  <MenuItem key={loan.value} value={loan.value}>
                    {loan.label}
                  </MenuItem>
                ))}
                <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                  Secured Loans
                </MenuItem>
                {loanTypes.secured.map((loan) => (
                  <MenuItem key={loan.value} value={loan.value}>
                    {loan.label}
                  </MenuItem>
                ))}


              </Select>

              {errors.loanType && (
                <FormHelperText error>{errors.loanType}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Tenure Field */}
          <Box>
            <FormControl
              autoComplete="off"
              fullWidth
              variant="outlined"
              error={!!errors.tenure}
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
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(30, 60, 114, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1e3c72",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1e3c72",
                    borderWidth: "1px",
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
          </Box>

          {/* Providers Field */}
          <Box>
            <FormControl fullWidth variant="outlined">
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
                          borderRadius: "8px",
                          backgroundColor: "#f1f3ff",
                          color: "#3244e6",
                          fontWeight: 600,
                          fontFamily: "Poppins",
                          fontSize: "0.75rem",
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
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(30, 60, 114, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1e3c72",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1e3c72",
                    borderWidth: "1px",
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
        </Box>

        {/* Existing Loans - Dynamic loop */}
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              color: "#1e3c72",
              fontWeight: 800,
              fontSize: "1.2rem",
              fontFamily: "Poppins",
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(30, 60, 114, 0.1)",
                p: 1,
                borderRadius: "10px",
                display: "flex"
              }}
            >
              <AccountBalanceIcon sx={{ color: "#1e3c72" }} />
            </Box>
            Existing Loans
          </Typography>

          {existingLoans.map((loan, index) => {
            const loanErr = existingLoansErrors[index] || {};
            return (
              <Box
                key={index}
                sx={{
                  border: "1px solid rgba(30, 60, 114, 0.1)",
                  borderRadius: "20px",
                  p: { xs: 2.5, sm: 4 },
                  mb: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(5px)",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    boxShadow: "0 12px 32px rgba(30, 60, 114, 0.08)",
                    borderColor: "rgba(30, 60, 114, 0.3)",
                    transform: "translateY(-4px)"
                  }
                }}
              >
                {/* Header row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>

                  {existingLoans.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveLoan(index)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": { backgroundColor: "rgba(211,47,47,0.08)" },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {/* Has Running Loans */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3, mb: 1 }}>
                  <FormControl fullWidth variant="outlined" error={!!loanErr.has_running_loans}>
                    <InputLabel
                      sx={{
                        color: loanErr.has_running_loans ? "error.main" : "text.secondary",
                        "&.Mui-focused": { color: "#3244e6" },
                      }}
                    >
                      Existing Loans*
                    </InputLabel>
                    <Select
                      value={loan.has_running_loans}
                      onChange={(e) => handleExistingLoanChange(index, "has_running_loans", e.target.value)}
                      input={<OutlinedInput label="Running Obligation?*" />}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountBalanceIcon sx={{ color: "#1e3c72", mr: 1 }} />
                        </InputAdornment>
                      }
                      sx={{
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(30, 60, 114, 0.2)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1e3c72",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1e3c72",
                          borderWidth: "1px",
                        },
                      }}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                    {loanErr.has_running_loans && <FormHelperText error>{loanErr.has_running_loans}</FormHelperText>}
                  </FormControl>

                  {loan.has_running_loans === "yes" && (
                    <FormControl fullWidth variant="outlined" error={!!loanErr.which_loan}>
                      <InputLabel
                        sx={{
                          color: loanErr.which_loan ? "error.main" : "text.secondary",
                          "&.Mui-focused": { color: "#3244e6" },
                        }}
                      >
                        Loan Type*
                      </InputLabel>
                      <Select
                        value={loan.which_loan}
                        onChange={(e) => handleExistingLoanChange(index, "which_loan", e.target.value)}
                        input={<OutlinedInput label="Lender Class*" />}
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountBalanceIcon sx={{ color: "#1e3c72", mr: 1 }} />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: "16px",
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(30, 60, 114, 0.2)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1e3c72",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1e3c72",
                            borderWidth: "1px",
                          },
                        }}
                      >
                        <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", mt: 1 }}>Unsecured</MenuItem>
                        {loanTypes.unsecured.map((l) => (
                          <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>
                        ))}
                        <MenuItem disabled sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Secured</MenuItem>
                        {loanTypes.secured.map((l) => (
                          <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>
                        ))}
                      </Select>
                      {loanErr.which_loan && <FormHelperText error>{loanErr.which_loan}</FormHelperText>}
                    </FormControl>
                  )}
                </Box>

                {/* Conditional: Loan Amount, Running EMI in a grid row */}
                {loan.has_running_loans === "yes" && (
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3, mt: 2 }}>
                    {/* Loan Amount */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Outstanding Amount*"
                      placeholder="e.g. 50,000"
                      value={loan.loan_amount}
                      onChange={(e) => handleExistingLoanChange(index, "loan_amount", e.target.value)}
                      error={!!loanErr.loan_amount}
                      helperText={loanErr.loan_amount}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyRupeeIcon sx={{ color: "#1e3c72", mr: 1 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                          "&:hover fieldset": { borderColor: "#1e3c72" },
                          "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#555",
                          "&.Mui-focused": { color: "#1e3c72" },
                        },
                      }}
                    />

                    {/* Running EMI */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Monthly EMI"
                      placeholder="e.g. 5,000"
                      value={loan.running_emi}
                      onChange={(e) => handleExistingLoanChange(index, "running_emi", e.target.value)}
                      error={!!loanErr.running_emi}
                      helperText={loanErr.running_emi}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyRupeeIcon sx={{ color: "#1e3c72", mr: 1 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                          "&:hover fieldset": { borderColor: "#1e3c72" },
                          "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#555",
                          "&.Mui-focused": { color: "#1e3c72" },
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          })}

          {/* Add Loan Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddLoan}
              sx={{
                borderRadius: "14px",
                textTransform: "none",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: "1rem",
                color: "#1e3c72",
                border: "2px solid rgba(30, 60, 114, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  border: "2px solid #1e3c72",
                  backgroundColor: "rgba(30, 60, 114, 0.05)",
                  transform: "scale(1.02)"
                }
              }}
            >
              Add Additional Loan
            </Button>
          </Box>
        </Box>

        {/* Provider Amounts Summary - Premium Data Card */}
        {selectedProviders.length > 0 && !selectedProviders.includes("Let F2 Fintech decide your lender") && (
          <Box
            sx={{
              width: "100%",
              mb: 6,
              p: 4,
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              border: "1px solid rgba(30, 60, 114, 0.1)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#1e3c72",
                mb: 2,
                display: "block"
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

        <ModernButton
          disabled={
            !!errors.amount ||
            !!errors.tenure ||
            !!errors.loanType ||
            !!errors.providers ||
            !isExistingLoansValid() ||
            !amount ||
            !tenure ||
            !loanType ||
            selectedProviders.length === 0 ||
            (selectedProviders.length > 0 && !selectedProviders.includes("Let F2 Fintech decide your lender") && !validateAllProviderAmounts())
          }
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => setGetStarted(true)}
          sx={{
            width: { xs: "100%", sm: "240px" },
            alignSelf: "center",
            mt: 4,
            mb: 3,
          }}
        >
          Let&apos;s Get Started
        </ModernButton>

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
                color: "#1e3c72",
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
              Amount must be between 50,000 and 10,00,00,000
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setAmountDialogOpen(false)}
              sx={{ color: "#1e3c72", fontWeight: 700 }}
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
              maxWidth="md"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "40px",
                backgroundColor: "white",
                borderRadius: "24px",
                marginTop: "40px",
                padding: { xs: "24px", sm: "40px" },
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Decorative Header Background */}
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(90deg, #4E9FE5 0%, #3244e6 100%)"
              }} />

              <Box sx={{ width: "100%", textAlign: "center", mb: 0 }}>
                <Typography variant="h4" sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  fontFamily: "Poppins",
                  mb: 1
                }}>
                  Loan Application
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    mb: 2
                  }}
                >                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#1e3c72",
                    fontWeight: 700,
                    marginBottom: 1,
                    textAlign: "center",
                    backgroundColor: "rgba(30, 60, 114, 0.05)",
                    px: 3,
                    py: 1,
                    borderRadius: "12px",
                    display: "inline-block"
                  }}
                >
                    Selected Providers: {selectedProviders.join(", ")}
                  </Typography>
                </Box>
              </Box>

              <Container
                maxWidth="md"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "32px",
                  marginTop: "40px",
                  padding: { xs: "32px", sm: "48px" },
                  boxShadow: "0 24px 48px rgba(30, 60, 114, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Decorative Accent */}
                <Box sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "8px",
                  background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)"
                }} />



                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                    width: "100%",
                    mt: 4
                  }}
                >
                  {/* Name Group (Prefix + Name) */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Prefix" arrow placement="top" disableInteractive>
                      <FormControl
                        variant="outlined"
                        sx={{ width: "30%" }}
                        error={!!touched.prefix && !!errors.prefix}
                      >
                        <InputLabel id="prefix-label">Pfx</InputLabel>
                        <Select
                          labelId="prefix-label"
                          name="prefix"
                          value={values.prefix}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Pfx"
                          sx={{
                            borderRadius: "16px",
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(30, 60, 114, 0.2)" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3c72" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3c72", borderWidth: "1px" },
                          }}
                        >
                          <MenuItem value="mr">Mr.</MenuItem>
                          <MenuItem value="miss">Miss</MenuItem>
                          <MenuItem value="mrs">Mrs.</MenuItem>
                          <MenuItem value="dr">Dr.</MenuItem>
                          <MenuItem value="ca">CA</MenuItem>
                        </Select>
                      </FormControl>
                    </Tooltip>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="name"
                      label="Full Name*"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                          "&:hover fieldset": { borderColor: "#1e3c72" },
                          "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
                        },
                        "& .MuiInputLabel-root": { color: "#555", "&.Mui-focused": { color: "#1e3c72" } },
                      }}
                    />
                  </Box>

                  {/* Contact and Email */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    name="contact"
                    label="Contact Number*"
                    value={values.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.contact && !!errors.contact}
                    helperText={touched.contact && errors.contact}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    name="email"
                    label="Email Address*"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      },
                    }}
                  />

                  {/* PAN and Father's Name */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="pan"
                    label="PAN ID*"
                    value={values.pan}
                    onBlur={handleBlur}
                    onChange={(event) => setFieldValue("pan", event.target.value.toUpperCase())}
                    error={touched.pan && Boolean(errors.pan)}
                    helperText={touched.pan && errors.pan}
                    inputProps={{ maxLength: 10 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="father_name"
                    label="Father's Name*"
                    value={values.father_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.father_name && !!errors.father_name}
                    helperText={touched.father_name && errors.father_name}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      },
                    }}
                  />

                  {/* Mother's Name and City */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="mother_name"
                    label="Mother's Name*"
                    value={values.mother_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.mother_name && !!errors.mother_name}
                    helperText={touched.mother_name && errors.mother_name}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="city"
                    label="City*"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      },
                    }}
                  />

                  {/* Working Address */}
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    name="working_address"
                    label="Working Address*"
                    value={values.working_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.working_address && !!errors.working_address}
                    helperText={touched.working_address && errors.working_address}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      gridColumn: { xs: "span 1", sm: "span 2" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                        "& textarea": { paddingTop: "12px" }
                      },
                      "& .MuiInputLabel-root": {
                        color: "#555",
                        "&.Mui-focused": { color: "#1e3c72" },
                        "&.MuiInputLabel-shrink": { color: "#1e3c72", fontWeight: 600 }
                      },
                    }}
                  />
                  {/* Permanent Address */}
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    name="permanent_address"
                    label="Permanent Address*"
                    value={values.permanent_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.permanent_address && !!errors.permanent_address}
                    helperText={touched.permanent_address && errors.permanent_address}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      gridColumn: { xs: "span 1", sm: "span 2" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                        "& textarea": { paddingTop: "12px" }
                      },
                      "& .MuiInputLabel-root": {
                        color: "#555",
                        "&.Mui-focused": { color: "#1e3c72" },
                        "&.MuiInputLabel-shrink": { color: "#1e3c72", fontWeight: 600 }
                      },
                    }}
                  />
                  {/* Current Address */}
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    name="current_address"
                    label="Current Address*"
                    value={values.current_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.current_address && !!errors.current_address}
                    helperText={touched.current_address && errors.current_address}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      gridColumn: { xs: "span 1", sm: "span 2" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                        "& textarea": { paddingTop: "12px" }
                      },
                      "& .MuiInputLabel-root": {
                        color: "#555",
                        "&.Mui-focused": { color: "#1e3c72" },
                        "&.MuiInputLabel-shrink": { color: "#1e3c72", fontWeight: 600 }
                      },
                    }}
                  />
                  {/* State and Employment Type */}
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!touched.state && !!errors.state}
                  >
                    <InputLabel>State*</InputLabel>
                    <Select
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="State*"
                      sx={{
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      }}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                      <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                      <MenuItem value="Assam">Assam</MenuItem>
                      <MenuItem value="Bihar">Bihar</MenuItem>
                      <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                      <MenuItem value="Goa">Goa</MenuItem>
                      <MenuItem value="Gujarat">Gujarat</MenuItem>
                      <MenuItem value="Haryana">Haryana</MenuItem>
                      <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
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
                      <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
                      <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                      <MenuItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</MenuItem>
                      <MenuItem value="Delhi">Delhi</MenuItem>
                      <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                      <MenuItem value="Ladakh">Ladakh</MenuItem>
                      <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                      <MenuItem value="Puducherry">Puducherry</MenuItem>
                    </Select>
                    {touched.state && errors.state && (
                      <FormHelperText sx={{ color: "#d32f2f", mx: 2 }}>{errors.state}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!touched.employment_type && !!errors.employment_type}
                  >
                    <InputLabel>Employment Type*</InputLabel>
                    <Select
                      name="employment_type"
                      value={values.employment_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Employment Type*"
                      sx={{
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(30, 60, 114, 0.2)" },
                      }}
                    >
                      <MenuItem value="salaried">Salaried</MenuItem>
                      <MenuItem value="self_employed">Self Employed</MenuItem>
                      <MenuItem value="professional">Professional</MenuItem>
                    </Select>
                    {touched.employment_type && errors.employment_type && (
                      <FormHelperText sx={{ color: "#d32f2f", mx: 2 }}>{errors.employment_type}</FormHelperText>
                    )}
                  </FormControl>

                  {/* Date of Birth */}
                  <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD MMMM YYYY"
                        label="Select Date of Birth*"
                        value={values.dob}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={(newValue) => setFieldValue("dob", newValue)}
                        onBlur={() => setFieldTouched("dob", true)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.dob && !!errors.dob,
                            helperText: (touched.dob && errors.dob) || "Minimum age 20 required",
                            variant: "outlined",
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "16px",
                                backgroundColor: "rgba(255, 255, 255, 0.6)",
                                "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                              },
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>

                {/* Consent and Submit Section */}
                <Box sx={{ width: "100%", mt: 6, display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box
                    sx={{
                      p: 3,
                      background: "rgba(30, 60, 114, 0.03)",
                      borderRadius: "24px",
                      border: "1px dashed rgba(30, 60, 114, 0.1)",
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{ color: "#1e3c72", "&.Mui-checked": { color: "#1e3c72" } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                            I agree to opt for the product and service of <strong>F2 Fintech</strong>. I have read and consent to the T&C, Privacy Policy and Credit Terms.
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{ color: "#25D366", "&.Mui-checked": { color: "#25D366" } }}
                          />
                        }
                        label={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.6)" }}>
                              Enable WhatsApp updates for loan status and offers
                            </Typography>
                            <WhatsAppIcon sx={{ fontSize: 20, color: "#25D366" }} />
                          </Box>
                        }
                      />
                    </FormGroup>
                  </Box>

                  <ModernButton
                    disabled={!dirty || isSubmitting}
                    type="submit"
                    sx={{
                      width: { xs: "100%", sm: "280px" },
                      height: "56px",
                      fontSize: "1.1rem",
                      alignSelf: "center",
                      mt: 2,
                      boxShadow: "0 12px 24px rgba(30, 60, 114, 0.2)",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={26} sx={{ color: "white" }} />
                    ) : (
                      "Apply Now"
                    )}
                  </ModernButton>
                </Box>

              </Container>
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