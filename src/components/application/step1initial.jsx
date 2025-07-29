// import React from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   FormHelperText,
//   Button,
// } from "@mui/material";
// import {
//   CurrencyRupee as CurrencyRupeeIcon,
//   ArrowForward as ArrowForwardIcon,
//   AccountBalance as AccountBalanceIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// const PinkTextButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#4E9FE5",
//   color: "black !important",
//   fontWeight: 500,
//   fontSize: "1rem",
//   fontFamily: "Poppins",
//   lineHeight: "1.5rem",
//   "&:hover": {
//     backgroundColor: "#2f3ee3",
//     color: "white",
//   },
// }));

// const Step1Initial = ({
//   getStarted,
//   setGetStarted,
//   provider,
//   setProvider,
//   validateProvider,
//   amount,
//   setAmount,
//   validateAmount,
//   loanType,
//   setLoanType,
//   validateLoanType,
//   tenure,
//   setTenure,
//   validateTenure,
//   errors,
// }) => {
//   if (getStarted) return null;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         marginTop: 2,
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: {
//             xs: "4vw",
//             sm: "3.5vw",
//             md: "1.7vw",
//           },
//           lineHeight: "2rem",
//           color: "#2f3ee3",
//           fontFamily: "DM sans",
//           marginBottom: 2,
//         }}
//       >
//         Get the loan best suited for your wish
//       </Typography>

//       {/* Provider */}
//       <Box sx={{ width: { xs: "80%", md: "45%" }, marginBottom: 3 }}>
//         {!provider ? (
//           <FormControl fullWidth variant="filled" sx={{ mb: 1 }}>
//             <InputLabel id="provider-select-label" sx={{ color: "gray" }}>
//               Provider Name*
//             </InputLabel>
//             <Select
//               labelId="provider-select-label"
//               name="provider"
//               value={provider}
//               onChange={(e) => {
//                 setProvider(e.target.value);
//                 validateProvider(e.target.value);
//               }}
//               onBlur={() => validateProvider(provider)}
//               error={!!errors.provider}
//               startAdornment={
//                 <InputAdornment position="start">
//                   <AccountBalanceIcon sx={{ color: "#2f3ee3", mr: 1 }} />
//                 </InputAdornment>
//               }
//               sx={{
//                 backgroundColor: "#D3D3D3",
//                 borderRadius: "4px",
//               }}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               {[
//                 "bajaj finance",
//                 "bajaj market",
//                 "chola",
//                 "l&t",
//                 "tata",
//                 "abfl",
//                 "godrej",
//                 "idfc",
//                 "hdfc bank",
//                 "icici",
//                 "indusland",
//                 "lending cart",
//                 "incred",
//                 "credit saison",
//                 "paysense",
//                 "shriram",
//               ].map((item) => (
//                 <MenuItem key={item} value={item}>
//                   {item}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.provider && (
//               <FormHelperText error>{errors.provider}</FormHelperText>
//             )}
//           </FormControl>
//         ) : (
//           <TextField
//             fullWidth
//             variant="filled"
//             label="Provider Name"
//             value={provider}
//             InputProps={{
//               readOnly: true,
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountBalanceIcon sx={{ color: "#2f3ee3" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               mb: 1,
//               backgroundColor: "#D3D3D3",
//               borderRadius: "4px",
//             }}
//           />
//         )}
//       </Box>

//       {/* Amount */}
//       <Box sx={{ width: { xs: "80%", md: "45%" }, marginBottom: 3 }}>
//         <TextField
//           type="number"
//           autoComplete="off"
//           fullWidth
//           variant="filled"
//           name="amount"
//           label="Enter Amount*"
//           placeholder="How Much Loan Do You Require?"
//           value={amount}
//           onChange={(e) => {
//             setAmount(e.target.value);
//             validateAmount(e.target.value);
//           }}
//           onBlur={() => validateAmount(amount)}
//           error={!!errors.amount}
//           helperText={errors.amount}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <CurrencyRupeeIcon sx={{ color: "#2f3ee3" }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             fontSize: "13px",
//             borderRadius: "4px",
//             overflow: "hidden",
//             marginBottom: 1,
//             "& .MuiInputBase-root": { backgroundColor: "#D3D3D3" },
//           }}
//         />
//       </Box>

//       {/* Loan Type */}
//       <Box sx={{ width: { xs: "80%", md: "45%" }, marginBottom: 3 }}>
//         <FormControl fullWidth variant="filled" sx={{ mb: 1 }}>
//           <InputLabel id="loan-type-label" sx={{ color: "gray" }}>
//             Loan Type*
//           </InputLabel>
//           <Select
//             labelId="loan-type-label"
//             name="loanType"
//             value={loanType}
//             onChange={(e) => {
//               setLoanType(e.target.value);
//               validateLoanType(e.target.value);
//             }}
//             onBlur={() => validateLoanType(loanType)}
//             error={!!errors.loanType}
//             sx={{ backgroundColor: "#D3D3D3", borderRadius: "4px" }}
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             {[
//               "term loan",
//               "personal loan",
//               "business loan",
//               "professional loan",
//               "home",
//               "education loan",
//               "lap",
//               "machinery loan",
//               "auto loan",
//             ].map((item) => (
//               <MenuItem key={item} value={item}>
//                 {item}
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.loanType && (
//             <FormHelperText error>{errors.loanType}</FormHelperText>
//           )}
//         </FormControl>
//       </Box>

//       {/* Tenure */}
//       <FormControl
//         autoComplete="off"
//         variant="filled"
//         error={!!errors.tenure}
//         sx={{
//           width: { xs: "80%", md: "45%" },
//           fontSize: "13px",
//           marginBottom: 3,
//         }}
//       >
//         <InputLabel style={{ color: "black" }}>
//           Select A Comfortable Tenure
//         </InputLabel>
//         <Select
//           variant="filled"
//           name="tenure"
//           value={tenure}
//           onChange={(e) => {
//             setTenure(e.target.value);
//             validateTenure(e.target.value);
//           }}
//           onBlur={() => validateTenure(tenure)}
//           sx={{
//             "& .MuiFilledInput-root": {
//               borderRadius: "10px",
//               border: "1px solid transparent",
//               "&:hover": { borderColor: "#0000ff" },
//               "&.Mui-focused": { borderColor: "#0000ff", borderWidth: "2px" },
//             },
//           }}
//         >
//           {["3 Years", "5 Years", "8 Years"].map((label) => (
//             <MenuItem key={label} value={label}>
//               {label}
//             </MenuItem>
//           ))}
//         </Select>
//         {errors.tenure && (
//           <Typography
//             color="error"
//             sx={{ marginLeft: 1, margin: "3px 14px", fontSize: "10.2857px" }}
//           >
//             {errors.tenure}
//           </Typography>
//         )}
//       </FormControl>

//       <PinkTextButton
//         disabled={
//           !!errors.amount ||
//           !!errors.tenure ||
//           !!errors.loanType ||
//           !amount ||
//           !tenure ||
//           !loanType ||
//           !provider
//         }
//         variant="contained"
//         endIcon={<ArrowForwardIcon />}
//         onClick={() => setGetStarted(true)}
//         sx={{
//           width: { xs: "80%", md: "45%" },
//           alignSelf: "center",
//           marginBottom: 3,
//         }}
//       >
//         LET'S GET STARTED
//       </PinkTextButton>
//     </Box>
//   );
// };

// export default Step1Initial;
