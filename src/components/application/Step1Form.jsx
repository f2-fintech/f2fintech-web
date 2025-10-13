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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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

// button lets get started
const PinkTextButton = styled( Button )( ( { theme } ) => ( {
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
} ) );

const Step1Form = ( {
  customerId,
  applicationNumber,
  setApplicationNumber,
  getStarted,
  setGetStarted,
  salary,
} ) => {
  const [ selectedProviders, setSelectedProviders ] = useState( [] ); // Changed to array
  const [ loanType, setLoanType ] = useState( "" );
  const [ amount, setAmount ] = useState( "" );
  const [ tenure, setTenure ] = useState( "" );
  const [ loading, setLoading ] = useState( false );
  const [ createdApplications, setCreatedApplications ] = useState( [] ); // Track created applications
  const [ errors, setErrors ] = useState( {
    amount: "",
    tenure: "",
    providers: "", // Changed to providers (plural)
    loanType: "",
  } );
  const [ initialValues, setInitialValues ] = useState( {
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
  } );
  const toastInfo = useSelector( ( state ) => state.toastInfo );
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    getLocalStorage,
    setLocalStorage,
    remLocalStorage,
    toastAndNavigate,
  } = Utility();

  // Refs to prevent duplicate API calls
  const isCreatingRef = useRef( false );
  const customerFetchedRef = useRef( false );
  const eligibilityFetchedRef = useRef( false );

  const storedCustomerId = useMemo(
    () => getLocalStorage( "customerInfo" )?.id,
    []
  );
  const { getLeadCibilScore } = useCreateLeadsInfo();
  const [ searchParams ] = useSearchParams();
  const urlId = useMemo( () => searchParams.get( "id" ), [ searchParams ] );
  console.log( "ID from URL:", urlId );
  const [ providers, setProviders ] = useState( [] );

  useEffect( () => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "https://admin.f2fintech.in/api/v1/get-all-loan-providers?page=1&limit=100"
        );
        const result = await response.json();
        if ( result.statusCode === 200 ) {
          setProviders( result.data.results || [] );
        }
      } catch ( error ) {
        console.error( "Error fetching providers:", error );
      }
    };

    fetchProviders();
  }, [] );

  // Fetching initial values from Eligibility Criteria form
  useEffect( () => {
    if ( !urlId || eligibilityFetchedRef.current ) return;

    const fetchEligibilityData = async () => {
      eligibilityFetchedRef.current = true;
      setLoading( true );

      try {
        const result = await getLeadCibilScore( urlId );
        console.log( "Fetching eligibility data for ID:", urlId, result );

        if ( result.success && result.data ) {
          const data = result.data;

          setInitialValues( ( prev ) => ( {
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
            dob: data.dob ? dayjs( data.dob ) : null,
            city: data.city || "",
            state: data.state || "",
            pan: data.pan || "",
            employment_type: data.employment_type || "",
          } ) );

          // Handle multiple providers if they exist
          if ( data.provider ) {
            setSelectedProviders( Array.isArray( data.provider ) ? data.provider : [ data.provider ] );
          }
          setAmount( data.amount || "" );
          setLoanType( data.loanType || "" );
        } else {
          console.error( "Failed to fetch eligibility data:", result.error );
        }
      } catch ( err ) {
        console.error( "Eligibility fetch error:", err );
      } finally {
        setLoading( false );
      }
    };

    fetchEligibilityData();
  }, [ urlId ] );

  useEffect( () => {
    const fetchCustomerData = async ( id ) => {
      if ( customerFetchedRef.current ) return;

      try {
        customerFetchedRef.current = true;
        console.log( "customer profile for ID:", id );

        const { data } = await API.CustomerAPI.getCustomerProfile( id );

        if ( data.status === "Success" ) {
          setInitialValues( ( prev ) => ( {
            ...prev,
            name: data.data.customer.name || "",
            email: data.data.customer.email || "",
            contact: data.data.customer.contact || "",
          } ) );
        }
      } catch ( error ) {
        console.error( "Error fetching customer data:", error );
      }
    };

    const idToFetch = customerId || storedCustomerId;
    if ( idToFetch && !urlId ) {
      fetchCustomerData( idToFetch );
    }
  }, [ customerId, storedCustomerId, urlId ] );

  // Fetch application numbers using stored customer ID
  useEffect( () => {
    if ( !storedCustomerId ) return;
    let isCancelled = false;

    const fetchApplicationData = async () => {
      try {
        console.log( "Fetching application data for customer:", storedCustomerId );
        const { data: response } = await API.CustomerApplicationAPI.getApplicationByIdWeb( storedCustomerId );

        if ( !isCancelled && response.status === "Success" ) {
          // If multiple applications exist, handle them appropriately
          if ( Array.isArray( response.data ) ) {
            setCreatedApplications( response.data.map( app => app.application_no ) );
            setApplicationNumber( response.data[ 0 ].application_no ); // Set the first one for backward compatibility
          } else {
            setApplicationNumber( response.data.application_no );
            setCreatedApplications( [ response.data.application_no ] );
          }
        }
      } catch ( err ) {
        if ( !isCancelled ) {
          console.log( "Error fetching application data:", err );
        }
      }
    };
    fetchApplicationData();
    return () => {
      isCancelled = true;
    };
  }, [ storedCustomerId ] );

  // Validation functions
  const validateAmount = ( value ) => {
    let error = "";
    if ( !value ) {
      error = "This Field is required";
    } else if ( isNaN( value ) ) {
      error = "Amount must be a number";
    } else if ( value < 50000 || value > 100000000 ) {
      error = "Amount must be within 50 thousand and 10 crore";
    } else if ( value % 5 !== 0 ) {
      error = "Amount must be divisible by 5";
    }
    setErrors( ( prev ) => ( { ...prev, amount: error } ) );
  };

  const validateProviders = ( value ) => {
    let error = "";
    if ( !value || value.length === 0 ) {
      error = "Please select at least one provider";
    }
    setErrors( ( prev ) => ( { ...prev, providers: error } ) );
  };

  const validateLoanType = ( value ) => {
    let error = "";
    if ( !value ) {
      error = "This Field is required";
    }
    setErrors( ( prev ) => ( { ...prev, loanType: error } ) );
  };

  const validateTenure = ( value ) => {
    let error = "";
    if ( !value ) {
      error = "This Field is required";
    }
    setErrors( ( prev ) => ( { ...prev, tenure: error } ) );
  };

  // Handle provider selection change
  const handleProviderChange = ( event ) => {
    const value = event.target.value;
    setSelectedProviders( typeof value === 'string' ? value.split( ',' ) : value );
    validateProviders( typeof value === 'string' ? value.split( ',' ) : value );
  };

  // Generate random application number
  const randomNumberGenerator = useCallback(
    () => Math.floor( 10000000 + Math.random() * 90000000 ),
    []
  );

  const randomFourDigitNumber = useMemo(
    () => Math.floor( 1000 + Math.random() * 9000 ),
    []
  );

  // Get the current date and calculate 20 years ago
  const minDate = dayjs( "1900-01-01" );
  const maxDate = dayjs().subtract( 20, "year" );

  useEffect( () => {
    console.log( "Scroll To Top" );
    window.scrollTo( { top: 0, behavior: "smooth" } );
  }, [] );

  // Function to register the customer
  const registerCustomer = useCallback( async ( customer ) => {
    const customerData = {
      ...customer,
      name: `${ customer.prefix ?? "" } ${ customer.name }`.trim(),
    };

    const { data: res } = await API.CustomerAPI.register( customerData );
    if ( res.status !== "Success" ) {
      throw new Error( `Registration failed: ${ res.message }` );
    }
    return res.data.id;
  }, [] );

  // Function to create customer info
  async function createCustomerInfo( customerId, restValues ) {
    await API.CustomerInfoAPI.create( {
      customer_id: customerId,
      ...restValues,
    } );
  }

  // Function to create the customer application for a single provider
  const createCustomerApplication = useCallback(
    async ( customerId, applicationNumber, amount, tenure, provider, loanType ) => {
      const { data: applicationResponse } = await API.CustomerApplicationAPI.createApplication( {
        customer_id: customerId,
        application_no: applicationNumber,
        amount,
        tenure,
        provider,
        loan_type: loanType,
      } );
      return applicationResponse.data.applicationId;
    },
    []
  );

  // Function to create loan tracking
  const createLoanTracking = useCallback( async ( applicationId ) => {
    await API.LoanTrackingAPI.createLoanTracking( {
      customer_application_id: applicationId,
      status: "submitted",
    } );
  }, [] );

  // Function to log in the customer
  const loginCustomer = useCallback(
    async ( contact, name ) => {
      const response = await API.CustomerAPI.login( {
        contact,
        password: `${ name.replace( /\s/g, "" ) }@${ randomFourDigitNumber }`,
      } );

      if ( response.data.status === "Success" ) {
        const customerInfo = {
          id: response.data.data.id,
          name: response.data.data.name,
          token: response.data.data.token,
        };
        setLocalStorage( "customerInfo", customerInfo );
        window.location.reload();
      }
    },
    [ randomFourDigitNumber, setLocalStorage ]
  );

  const setCustomerData = async ( customerInfo ) => {
    setGetStarted( false );
    setLocalStorage( "customerInfo", customerInfo );
    location.reload();
  };

  // Create new customer with loan applications for multiple providers
  const create = useCallback(
    async ( values ) => {
      if ( isCreatingRef.current ) {
        console.log( "Application creation already in progress, skipping..." );
        return;
      }

      isCreatingRef.current = true;
      setLoading( true );

      const { contact, email, name, prefix, status, dob, ...restValues } = values;
      const customer = {
        contact,
        dob,
        email,
        name,
        prefix,
        password: `${ name.replace( /\s/g, "" ) }@${ randomFourDigitNumber }`,
        status,
      };

      try {
        const customerId = storedCustomerId || ( await registerCustomer( customer ) );
        await createCustomerInfo( customerId, restValues );

        // Create separate applications for each selected provider
        const applicationResults = [];
        for ( const provider of selectedProviders ) {
          const applicationNumber = randomNumberGenerator();
          const applicationId = await createCustomerApplication(
            customerId,
            applicationNumber,
            amount,
            tenure,
            provider,
            loanType
          );

          await createLoanTracking( applicationId );
          applicationResults.push( {
            provider,
            applicationNumber,
            applicationId
          } );
        }

        // Store all created applications
        setCreatedApplications( applicationResults.map( app => app.applicationNumber ) );

        !storedCustomerId
          ? await setCustomerData( {
            id: customerId,
            name: customer.name,
          } )
          : location.reload();

        setLoading( false );
        console.log( "Customer info and multiple applications created successfully:", applicationResults );
      } catch ( err ) {
        setLoading( false );
        isCreatingRef.current = false;
        toastAndNavigate( dispatch, true, "error", err?.response?.data?.msg );
        console.log( "Error during customer creation:", err?.response?.data?.msg );
      }
    },
    [ amount, tenure, selectedProviders, loanType, randomFourDigitNumber ]
  );

  // If application numbers exist, display success message
  if ( createdApplications.length > 0 ) {
    return (
      <Box
        sx={ {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
          padding: 3,
          border: "1px solid #b6b6b6",
          borderRadius: "20px",
          boxShadow: `0 0 10px ${ theme.palette.secondary.main }`,
          backgroundColor: "#f9f9f9",
          maxWidth: "600px",
          margin: "auto",
        } }
      >
        <Typography
          sx={ {
            fontSize: "1.4rem",
            lineHeight: "2rem",
            color: "#1976d2",
            fontWeight: "600",
            fontFamily: "Roboto, sans-serif",
            marginBottom: 2,
            textAlign: "center",
          } }
        >
          Your applications are submitted!
        </Typography>

        { createdApplications.map( ( appNumber, index ) => (
          <Typography
            key={ appNumber }
            sx={ {
              fontSize: "1rem",
              color: "#333",
              marginBottom: 1,
              textAlign: "center",
            } }
          >
            Application #{ index + 1 }: <strong>{ appNumber }</strong>
          </Typography>
        ) ) }

        <Typography
          sx={ {
            fontSize: "1rem",
            color: "#333",
            marginTop: 2,
            marginBottom: 2,
            textAlign: "center",
          } }
        >
          We will contact you within the next half an hour for each application.
          { !salary && ` To speed up the process, please complete the next steps.` }
        </Typography>

        { salary ? (
          <Button
            variant="contained"
            color="primary"
            sx={ {
              width: "100%",
              borderRadius: "0px 0px 10px 0px",
              bgcolor: "#3244e6",
              color: "white",
              "&:hover": {
                bgcolor: "#3244e6",
                color: "white",
              },
            } }
            onClick={ () => {
              remLocalStorage( "customerInfo" );
              location.reload();
            } }
          >
            Fill Another Application
          </Button>
        ) : null }
      </Box>
    );
  }

  // Initial form view with amount, tenure, and multiple provider selection
  if ( !getStarted ) {
    return (
      <Box
        sx={ {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
        } }
      >
        <Typography
          sx={ {
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
          } }
        >
          Get the loan best suited for your wish
        </Typography>

        <Box
          sx={ {
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          } }
        >
          <TextField
            type="number"
            autoComplete="off"
            fullWidth
            variant="filled"
            name="amount"
            label="Enter Amount*"
            placeholder="How Much Loan Do You Require?"
            value={ amount }
            onChange={ ( e ) => {
              setAmount( e.target.value );
              validateAmount( e.target.value );
            } }
            onBlur={ () => validateAmount( amount ) }
            error={ !!errors.amount }
            helperText={ errors.amount }
            InputProps={ {
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon sx={ { color: "#2f3ee3" } } />
                </InputAdornment>
              ),
            } }
            sx={ {
              fontSize: "13px",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: 1,
              "& .MuiInputBase-root": {
                backgroundColor: "D3D3D3",
              },
              "& .MuiFormLabel-root": {
                color: "#1a1a1a", // default dark
                fontWeight: 500,
              },
              "& .MuiFormLabel-root.Mui-error": {
                color: "#d32f2f", // red on error
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#000000", // darker when focused
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
            } }
          />
        </Box>

        <Box
          sx={ {
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          } }
        >
          <FormControl fullWidth variant="outlined" sx={ { mb: 2 } }>
            <InputLabel
              id="loan-type-label"
              sx={ {
                color: errors.loanType ? "error.main" : "text.secondary",
                "&.Mui-focused": { color: "#2f3ee3" },
              } }
            >
              Loan Type*
            </InputLabel>

            <Select
              labelId="loan-type-label"
              name="loanType"
              value={ loanType }
              onChange={ ( e ) => {
                setLoanType( e.target.value );
                validateLoanType( e.target.value );
              } }
              onBlur={ () => validateLoanType( loanType ) }
              error={ !!errors.loanType }
              input={ <OutlinedInput label="Loan Type*" /> }
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={ { color: "#2f3ee3", mr: 1 } } />
                </InputAdornment>
              }
              sx={ {
                borderRadius: "8px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.loanType ? "red" : "#c4c4c4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2f3ee3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2f3ee3",
                  borderWidth: "2px",
                },
              } }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="just inquiry">Just Inquiry</MenuItem>
              <MenuItem value="term loan">Term Loan</MenuItem>
              <MenuItem value="personal loan">Personal Loan</MenuItem>
              <MenuItem value="business loan">Business Loan</MenuItem>
              <MenuItem value="professional loan">Professional Loan</MenuItem>
              <MenuItem value="home loan">Home Loan</MenuItem>
              <MenuItem value="education loan">Education Loan</MenuItem>
              <MenuItem value="lap">LAP</MenuItem>
              <MenuItem value="machinery loan">Machinery Loan</MenuItem>
              <MenuItem value="auto loan">Auto Loan</MenuItem>
            </Select>

            { errors.loanType && (
              <FormHelperText error>{ errors.loanType }</FormHelperText>
            ) }
          </FormControl>

        </Box>

        <FormControl
          autoComplete="off"
          variant="outlined"
          error={ !!errors.tenure }
          sx={ {
            width: { xs: "80%", sm: "45%", md: "45%" },
            mb: 3,
          } }
        >
          <InputLabel
            id="tenure-label"
            sx={ {
              color: errors.tenure ? "error.main" : "text.secondary",
              "&.Mui-focused": { color: "#2f3ee3" },
            } }
          >
            Select A Comfortable Tenure
          </InputLabel>

          <Select
            labelId="tenure-label"
            name="tenure"
            value={ tenure }
            onChange={ ( e ) => {
              setTenure( e.target.value );
              validateTenure( e.target.value );
            } }
            onBlur={ () => validateTenure( tenure ) }
            input={ <OutlinedInput label="Select A Comfortable Tenure" /> }
            startAdornment={
              <InputAdornment position="start">
                <AccessTimeIcon sx={ { color: "#2f3ee3", mr: 1 } } />
              </InputAdornment>
            }
            sx={ {
              borderRadius: "8px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: errors.tenure ? "red" : "#c4c4c4",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2f3ee3",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2f3ee3",
                borderWidth: "2px",
              },
            } }
          >
            { [
              "3 Years",
              "5 Years",
              "8 Years",
              "10 Years",
              "15 Years",
              "20 Years",
              "25 Years",
              "30 Years",
            ].map( ( label ) => (
              <MenuItem
                key={ label }
                value={ label }
                sx={ {
                  "&:hover": { backgroundColor: "#f1f3ff" },
                  "&.Mui-selected": {
                    backgroundColor: "#2f3ee3",
                    color: "white",
                  },
                  "&.Mui-selected:hover": { backgroundColor: "#2f3ee3" },
                } }
              >
                <Typography variant="body2">{ label }</Typography>
              </MenuItem>
            ) ) }
          </Select>

          { errors.tenure && (
            <FormHelperText error>{ errors.tenure }</FormHelperText>
          ) }
        </FormControl>

        <Box
          sx={ {
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            marginBottom: 3,
          } }
        >
          <FormControl fullWidth variant="outlined" sx={ { mb: 2 } }>
            <InputLabel
              id="providers-select-label"
              sx={ {
                color: errors.providers ? "error.main" : "text.secondary",
                "&.Mui-focused": { color: "#2f3ee3" },
              } }
            >
              Select Providers*
            </InputLabel>

            <Select
              labelId="providers-select-label"
              multiple
              value={ selectedProviders }
              onChange={ handleProviderChange }
              onBlur={ () => validateProviders( selectedProviders ) }
              error={ !!errors.providers }
              input={ <OutlinedInput label="Select Providers*" /> }
              renderValue={ ( selected ) => (
                <Box sx={ { display: "flex", flexWrap: "wrap", gap: 0.5 } }>
                  { selected.map( ( value ) => (
                    <Chip
                      key={ value }
                      label={ value }
                      size="small"
                      sx={ {
                        borderRadius: "6px",
                        backgroundColor: "#f1f3ff",
                        color: "#2f3ee3",
                        fontWeight: 500,
                      } }
                    />
                  ) ) }
                </Box>
              ) }
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={ { color: "#2f3ee3", mr: 1 } } />
                </InputAdornment>
              }
              sx={ {
                borderRadius: "8px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.providers ? "red" : "#c4c4c4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2f3ee3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2f3ee3",
                  borderWidth: "2px",
                },
              } }
            >
              {/* Special Options */ }
              <MenuItem
                value="Let F2fintech decide your lender"
                sx={ {
                  backgroundColor: "#f8f9ff",
                  borderBottom: "1px solid #e0e0e0",
                  "&:hover": {
                    backgroundColor: "#e8edff",
                  },
                } }
              >
                <Checkbox
                  checked={ selectedProviders.indexOf( "Let F2fintech decide your lender" ) > -1 }
                  sx={ { color: "#2f3ee3" } }
                />
                <Typography variant="body2" sx={ { fontWeight: 600, color: "#2f3ee3" } }>
                  Let F2fintech decide your lender
                </Typography>
              </MenuItem>

              <MenuItem
                value="Don't know lender"
                sx={ {
                  backgroundColor: "#f8f9ff",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: 1,
                  "&:hover": {
                    backgroundColor: "#e8edff",
                  },
                } }
              >
                <Checkbox
                  checked={ selectedProviders.indexOf( "Don't know lender" ) > -1 }
                  sx={ { color: "#2f3ee3" } }
                />
                <Typography variant="body2" sx={ { fontWeight: 600, color: "#2f3ee3" } }>
                  Don't know lender
                </Typography>
              </MenuItem>
              
              { providers.map( ( prov ) => (
                <MenuItem key={ prov.id } value={ prov.title }>
                  <Checkbox
                    checked={ selectedProviders.indexOf( prov.title ) > -1 }
                    sx={ { color: "#2f3ee3" } }
                  />
                  <Typography variant="body2">{ prov.title }</Typography>
                </MenuItem>
              ) ) }
            </Select>

            { errors.providers && (
              <FormHelperText error>{ errors.providers }</FormHelperText>
            ) }
          </FormControl>

        </Box>


        <PinkTextButton
          disabled={
            !!errors.amount ||
            !!errors.tenure ||
            !!errors.loanType ||
            !!errors.providers ||
            !amount ||
            !tenure ||
            !loanType ||
            selectedProviders.length === 0
          }
          variant="contained"
          endIcon={ <ArrowForwardIcon /> }
          onClick={ () => setGetStarted( true ) }
          sx={ {
            width: {
              xs: "80%",
              md: "45%",
              sm: "45%",
            },
            alignSelf: "center",
            marginBottom: 3,
          } }
        >
          LET&apos;S GET STARTED
        </PinkTextButton>
      </Box>
    );
  }

  // Main form view for getting customer details (unchanged from original)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={ initialValues }
        validationSchema={ step1ValidationSchema }
        onSubmit={ ( values ) => create( values ) }
      >
        { ( {
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
        } ) => (
          <Form onSubmit={ handleSubmit }>
            <Container
              sx={ {
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
                maxWidth: { // Limit maximum width for better responsiveness
                  xs: "95%",
                  sm: "90%",
                  md: "85%",
                  lg: "100%"
                }
              } }
            >
              <Box
                sx={ {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // border: "2px solid red",
                  width: "100%",
                  mt:20
                } }
              >
                <Typography
                  sx={ {
                    fontFamily: "DM Sans",
                    fontSize: {
                      xs: "1.7rem",
                      sm: "2.5rem",
                      md: "2rem",
                    },
                    color: "#2f3ee3",
                    fontWeight: 500,
                    marginBottom: 1,
                  } }
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
                  sx={ {
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#666",
                    marginBottom: 3,
                    textAlign: "center",
                  } }
                >
                  Selected Providers: { selectedProviders.join( ", " ) }
                </Typography>
              </Box>

              {/* Rest of the form fields remain the same as in your original code */ }
              <Box
                sx={ {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "15px 15px",
                  gap: 2,
                } }
              >
                <Box
                  sx={ {
                    width: "77%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 3,
                  } }
                >
                  {/* Prefix Dropdown */ }
                  <FormControl
                    variant="filled"
                    sx={ { width: "20%" } }
                    error={ !!touched.prefix && !!errors.prefix }
                  >
                    <InputLabel id="prefix-label" sx={ { color: "gray" } }>
                      Prefix
                    </InputLabel>
                    <Select
                      labelId="prefix-label"
                      name="prefix"
                      value={ values.prefix }
                      onChange={ handleChange }
                      onBlur={ handleBlur }
                      sx={ {
                        backgroundColor: "#D3D3D3",
                        borderRadius: "4px",
                        "& .MuiSelect-filled.Mui-error": {
                          borderBottomColor: "red",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f !important",
                          fontSize: "0.75rem",
                          marginTop: "3px",
                          marginLeft: "14px",
                          marginRight: "14px",
                        },
                      } }
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
                      sx={ {
                        marginLeft: 1,
                        fontSize: "10.3px",
                        fontFamily: "Verdana, sans-serif",
                        fontWeight: "400",
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f !important",
                          fontSize: "0.75rem",
                          marginTop: "3px",
                          marginLeft: "14px",
                          marginRight: "14px",
                        },
                      } }
                    >
                      { errors.prefix }
                    </FormHelperText>
                  </FormControl>

                  {/* Name TextField */ }
                  <TextField
                    autoComplete="off"
                    variant="filled"
                    type="text"
                    name="name"
                    label="Name*"
                    value={ values.name }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    error={ !!touched.name && !!errors.name }
                    helperText={ touched.name && errors.name }
                    InputLabelProps={ {
                      style: { color: "black" },
                    } }
                    sx={ {
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
                      "& .MuiFormHelperText-root": {
                        color: "#d32f2f !important",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                        marginRight: "14px",
                      },
                    } }
                  />
                </Box>

                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="number"
                  name="contact"
                  label="Contact*"
                  value={ values.contact }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!touched.contact && !!errors.contact }
                  helperText={ touched.contact && errors.contact }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="email"
                  name="email"
                  label="E-mail*"
                  value={ values.email }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!touched.email && !!errors.email }
                  helperText={ touched.email && errors.email }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  name="pan"
                  label="PAN*"
                  value={ values.pan }
                  onBlur={ handleBlur }
                  onChange={ ( event ) => {
                    const uppercaseValue = event.target.value.toUpperCase();
                    setFieldValue( "pan", uppercaseValue );
                  } }
                  error={ touched.pan && Boolean( errors.pan ) }
                  helperText={ touched.pan && errors.pan }
                  inputProps={ {
                    maxLength: 10,
                    style: { textTransform: "uppercase" },
                  } }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="father_name"
                  label="Father's Name*"
                  value={ values.father_name }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!touched.father_name && !!errors.father_name }
                  helperText={ touched.father_name && errors.father_name }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="mother_name"
                  label="Mother's Name*"
                  value={ values.mother_name }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!touched.mother_name && !!errors.mother_name }
                  helperText={ touched.mother_name && errors.mother_name }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="working_address"
                  label="Working Address*"
                  value={ values.working_address }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!touched.working_address && !!errors.working_address }
                  helperText={ touched.working_address && errors.working_address }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="permanent_address"
                  label="Permanent Address*"
                  value={ values.permanent_address }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={
                    !!touched.permanent_address && !!errors.permanent_address
                  }
                  helperText={
                    touched.permanent_address && errors.permanent_address
                  }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  name="current_address"
                  label="Current Address*"
                  value={ values.current_address }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!touched.current_address && !!errors.current_address }
                  helperText={ touched.current_address && errors.current_address }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />
                <TextField
                  autoComplete="off"
                  variant="filled"
                  name="city"
                  label="City*"
                  value={ values.city }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  error={ !!( touched.city && errors.city ) }
                  helperText={ touched.city && errors.city }
                  InputLabelProps={ {
                    style: { color: "black" },
                  } }
                  sx={ {
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
                  } }
                />

                <FormControl
                  autoComplete="off"
                  variant="filled"
                  error={ !!touched.state && !!errors.state }
                  sx={ {
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                  } }
                >
                  <InputLabel sx={ { color: "black" } }>State*</InputLabel>
                  <Select
                    variant="filled"
                    name="state"
                    value={ values.state }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    MenuProps={ {
                      PaperProps: {
                        sx: {
                          bgcolor: "#4E9FE5",
                          color: "black",
                        },
                      },
                    } }
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
                    style={ {
                      color: "#d32f2f",
                      margin: "5px 14px",
                      fontSize: "10.2857px",
                      fontFamily: "Verdana, sans-serif",
                      fontWeight: "400",
                    } }
                  />
                </FormControl>

                <FormControl
                  autoComplete="off"
                  variant="filled"
                  error={ !!touched.employment_type && !!errors.employment_type }
                  sx={ {
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    marginBottom: 3,
                  } }
                >
                  <InputLabel sx={ { color: "black" } }>
                    Employment Type*
                  </InputLabel>
                  <Select
                    variant="filled"
                    name="employment_type"
                    value={ values.employment_type }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    MenuProps={ {
                      PaperProps: {
                        sx: {
                          bgcolor: "#4E9FE5",
                          color: "black",
                        },
                      },
                    } }
                  >
                    <MenuItem value="salaried">Salaried </MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>
                    <MenuItem value="proprietorship">Proprietorship</MenuItem>
                  </Select>

                  <ErrorMessage
                    name="employment_type"
                    component="div"
                    style={ {
                      color: "#d32f2f",
                      margin: "5px 14px",
                      fontSize: "10.2857px",
                      fontFamily: "Verdana, sans-serif",
                      fontWeight: "400",
                    } }
                  />
                </FormControl>
                <Box
                  sx={ {
                    width: {
                      xs: "80%",
                      md: "75%",
                      sm: "75%",
                    },
                    marginBottom: 3,
                  } }
                >
                  <LocalizationProvider dateAdapter={ AdapterDayjs }>
                    <DatePicker
                      format="DD MMMM YYYY"
                      views={ [ "year", "month", "day" ] }
                      label="Select Date Of Birth*"
                      name="dob"
                      minDate={ minDate }
                      maxDate={ maxDate }
                      error={ touched.dob && !!errors.dob }
                      helperText={ touched.dob && errors.dob }
                      value={ values.dob }
                      onBlur={ () => setFieldTouched( "dob", true ) }
                      onChange={ ( newValue ) => setFieldValue( "dob", newValue ) }
                      renderInput={ ( params ) => (
                        <TextField { ...params } fullWidth margin="normal" />
                      ) }
                    />

                    <ErrorMessage
                      name="dob"
                      component="div"
                      style={ {
                        color: "#d32f2f",
                        margin: "5px 14px",
                        fontSize: "10.2857px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                      } }
                    />
                  </LocalizationProvider>
                  <Typography
                    sx={ {
                      fontSize: "0.600rem",
                      color: "gray",
                      ml: "16px",
                      mt: "3px",
                    } }
                  >
                    Minimum age 20 required
                  </Typography>
                </Box>
                {/* Terms Checkbox */ }
                <FormGroup
                  sx={ { display: "flex", ml: 5, mr: 8, marginBottom: 3 } }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={ {
                          color: "#4E9FE5",
                          "&.Mui-checked": {
                            color: "#4E9FE5",
                          },
                        } }
                      />
                    }
                    label={
                      <Typography
                        sx={ {
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                            md: "1rem",
                          },
                          color: "gray",
                        } }
                      >
                        I agree to opt for the product and service of F2fintech.
                        By opting for F2fintech, I agree to have read,
                        understood and explicitly consent to the T&C, Privacy
                        Policy and F2fintech Credit Terms.
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup sx={ { display: "flex", ml: 5, mr: 8, mb: 3 } }>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={ {
                          color: "#4E9FE5",
                          "&.Mui-checked": {
                            color: "#4E9FE5",
                          },
                        } }
                      />
                    }
                    label={
                      <Typography sx={ { fontSize: "0.800rem", color: "gray" } }>
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

                <Button
                  disabled={ !dirty || isSubmitting }
                  type="submit"
                  sx={ {
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
                  } }
                >
                  { loading ? (
                    <CircularProgress size={ 24 } sx={ { color: "black" } } />
                  ) : (
                    "Apply Now"
                  ) }
                </Button>
              </Box>
            </Container>
          </Form>
        ) }
      </Formik>
      <Toast
        alerting={ toastInfo.toastAlert }
        message={ toastInfo.toastMessage }
        severity={ toastInfo.toastSeverity }
        anchorOrigin={ { vertical: "top", horizontal: "center" } }
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