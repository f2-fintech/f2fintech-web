import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import PercentIcon from "@mui/icons-material/Percent";
import AddCardIcon from "@mui/icons-material/AddCard";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LockPersonIcon from "@mui/icons-material/LockPerson";

const faqData = [
  {
    question: "What is F2 Fintech?",
    answer:
      "F2 Fintech is a digital loan aggregator and financial service platform that helps individuals, professionals, and businesses compare and avail loans from multiple banks and NBFCs — quickly, transparently, and 100% paperless.",
  },
  {
    question: "What types of loans does F2 Fintech provide?",
    answer: `We offer a wide range of loans tailored to your needs:<br/>
    ✅ Personal Loans<br/>
    ✅ Doctor Loans<br/>
    ✅ Business Loans<br/>
    ✅ MSME Loans<br/>
    ✅ Home Loans<br/>
    ✅ Loan Against Property (LAP)<br/>
    ✅ Working Capital & Overdraft Facilities<br/>
    ✅ Equipment & Machinery Loans`,
  },
  {
    question: "How is F2 Fintech different from a bank or traditional agent?",
    answer: `Unlike traditional agents, F2 Fintech is a tech-driven loan marketplace that:<br/>
    🔍 Compares offers from 30+ lenders<br/>
    ⚡ Gives real-time eligibility checks<br/>
    📱 Ensures digital documentation & fast disbursal<br/>
    🤝 Offers unbiased advice, not tied to any one bank`,
  },
  {
    question: "Is F2 Fintech a direct lender?",
    answer:
      "No. F2 Fintech is a loan service provider and aggregator. We are partnered with India's leading banks and NBFCs to connect you to the best-matched loan options — based on your profile, need, and credit history.",
  },
  {
    question: "Is my data safe with F2 Fintech?",
    answer:
      "Absolutely. We follow bank-grade security protocols to ensure your personal and financial information is encrypted, secured, and never shared without your consent.",
  },
  {
    question: "How long does the loan approval process take?",
    answer: `✅ Pre-approval: Instantly after eligibility check<br/>
    ✅ Sanction: Within 24–72 hours (depends on product & lender)<br/>
    ✅ Disbursal: As fast as same-day in eligible cases`,
  },
  {
    question: "What are the eligibility criteria to apply for a loan?",
    answer: `While criteria vary by loan type and lender, here's the common requirement:<br/>
    • Age between 21–65 years<br/>
    • Valid PAN, Aadhaar, and KYC documents<br/>
    • Minimum monthly income or business turnover<br/>
    • Good credit score (ideally 700+)<br/>
    • Relevant documents like salary slips, ITRs, bank statements`,
  },
  {
    question: "Do I have to pay any upfront charges or fees?",
    answer: `No upfront fee is charged by F2 Fintech.<br/>
    Lender-specific charges like processing fee, legal charges, or foreclosure fee may apply and are clearly disclosed before sanction.`,
  },
  {
    question: "Can I apply if I have a low or no credit score?",
    answer: `Yes, you can apply. Our system finds the best possible lenders who offer loans even to individuals with:<br/>
    • Low CIBIL scores<br/>
    • No credit history (first-time borrowers)<br/>
    We also help you build or improve your credit score via smart financial tips and responsible borrowing.`,
  },
  {
    question: "How can I apply for a loan through F2 Fintech?",
    answer: `It's simple:<br/>
    • Visit our website or app<br/>
    • Choose your loan type<br/>
    • Fill in basic details<br/>
    • Upload KYC docs digitally<br/>
    • Get offers → Compare → Apply → Get funds!`,
  },
]

const advantagesData = [
  {
    logo: <AccessTimeIcon sx={ { fontSize: "50px", width: "95px" } } />,
    title: "Apply in few minutes",
  },
  {
    logo: <BoltIcon sx={ { fontSize: "50px", width: "95px" } } />,
    title: "Fast Approval",
  },
  {
    logo: <PercentIcon sx={ { fontSize: "50px", width: "95px" } } />,
    title: "Tenure up to 60 months",
  },
  {
    logo: <AddCardIcon sx={ { fontSize: "50px", width: "95px" } } />,
    title:"Money in 3hr to 3 days"
  },
  {
    logo: <FmdGoodIcon sx={ { fontSize: "50px", width: "95px" } } />,
    title: "Optional Branch Visit",
  },
  {
    logo: <CurrencyRupeeIcon sx={ { fontSize: "50px", width: "95px" } } />,
    title: "Up to 10 crore",
  },
];
const bLadvantagesData = [
  {
    logo: <BoltIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Lightning-Fast Approvals",
    subtitle: "Get your funds disbursed in 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Easy Loan Application",
    subtitle: "Apply within 5 minutes with minimal documentation",
  },
  {
    logo: <PaymentsIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Flexible Repayment Plans",
    subtitle: "Simple repayment options to suit your business",
  },
  {
    logo: <AccountBalanceIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Hassle free Loan",
    subtitle: "No visit to the branch is required",
  },
  {
    logo: <LockPersonIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Safe and Secure",
    subtitle: "An ISO-certified company keeps your data safe",
  },
  {
    logo: <PercentIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Low-Interest Rates",
    subtitle: "Enjoy affordable interest rates that suit your needs",
  },
];
const unadvantagesData = [
  {
    logo: <BoltIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Rapid Approvals",
    subtitle: "Receive your funds in just 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Simple Loan Application",
    subtitle: "Apply within 5 minutes with minimal documentation",
  },
  {
    logo: <PaymentsIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Flexible Repayment Plans",
    subtitle: "Select from simple repayment choices",
  },
  {
    logo: <AccountBalanceIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Effortless Process",
    subtitle: "No need to visit the branch",
  },
  {
    logo: <LockPersonIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Safe and Secure",
    subtitle: "Trust an ISO-certified company to keep your data secure",
  },
  {
    logo: <PercentIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Low-Interest Rates",
    subtitle: "Enjoy affordable rates tailored to your needs",
  },
];
const woadvantagesData = [
  {
    logo: <BoltIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Fast Approvals",
    subtitle: "Fund in 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Easy Application",
    subtitle: "Apply in 5 minutes",
  },
  {
    logo: <PaymentsIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Flexible Repayment Plans",
    subtitle: "Choose Simple Plans",
  },
  {
    logo: <AccountBalanceIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Seamless Process",
    subtitle: "No branch visits",
  },
  {
    logo: <LockPersonIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Safe and Secure",
    subtitle: "ISO-certified",
  },
  {
    logo: <PercentIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Competitive Rates",
    subtitle: "Affordable and tailored",
  },
];
const ecadvantagesData = [
  {
    logo: <BoltIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Swift Approvals",
    subtitle: "Receive your funds in just 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Simple Application",
    subtitle: "Apply with minimal documentation",
  },
  {
    logo: <PaymentsIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Flexible Repayment Plans",
    subtitle: "Choose from straightforward repayment options",
  },
  {
    logo: <AccountBalanceIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Effortless Process",
    subtitle: "No need to visit the branch",
  },
  {
    logo: <LockPersonIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Safe and Secure",
    subtitle: "Trust an ISO-certified company to keep your data security",
  },
  {
    logo: <PercentIcon sx={ { fontSize: "40px", width: "75px" } } />,
    title: "Competitive Rates",
    subtitle: "Enjoy affordable rates tailored to your needs",
  },
];
const lendingpartnerData = [
  {
    src: "cholamandalam.png",
    title: "Grievance Redressal Officer",
    name: "Mr Sahu Singh",
    alt: "cholamandalam logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.flexloan.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "hdfc1.png",
    title: "Grievance Redressal Officer",
    name: "Mr Kamal Agarwal",
    alt: "HDFC bank logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.hdfc.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "Bajaj_Finserv.png",
    title: "Grievance Redressal Officer",
    name: "Mr Vishwanathan Ayyar",
    alt: "Bajaj finserv logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.indifi.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "icic.png",
    title: "Grievance Redressal Officer",
    name: "Mr Yash Awasthi",
    alt: "Icici logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        https://www.icicibank.com/
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "poonewala.png",
    title: "Grievance Redressal Officer",
    name: "Mr Yash Awasthi",
    alt: "Poonewala logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        https://www.icicibank.com/
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "L&T.png",
    title: "Grievance Redressal Officer",
    name: "Mr Lokesh Yadav",
    alt: "L&T logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.aven.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "godrej.jpg",
    title: "Grievance Redressal Officer",
    name: "Mr Lokesh Yadav",
    alt: "Godrej logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.aven.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },
  {
    src: "Lendingkartlogo1.png",
    title: "Grievance Redressal Officer",
    name: "Mr Vineet Agarwal",
    alt: "Lendingkart logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.gromorfinance.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },

  // 🔹 Newly Added Lending Partners

  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Standard_Chartered_%282021%29.svg/2560px-Standard_Chartered_%282021%29.svg.png",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Standard Chartered logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.sc.com/in
      </a>
    ),
    email: "test@sc.com",
    contact: "0000000000",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Yes_Bank_Logo_in_2024.png",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Yes Bank logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.yesbank.in
      </a>
    ),
    email: "test@yesbank.com",
    contact: "0000000000",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/2560px-Axis_Bank_logo.svg.png",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Axis Bank logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.axisbank.com
      </a>
    ),
    email: "test@axisbank.com",
    contact: "0000000000",
  },
  {
    src: "https://www.kotak811.com/open-zero-balance-savings-account/images/logo-new.svg",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Kotak Mahindra Bank logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.kotak.com
      </a>
    ),
    email: "test@kotak.com",
    contact: "0000000000",
  },

  {
    src: "https://icon2.cleanpng.com/lnd/20241224/fe/656de25930c6fdc0e12ba4162d0f25.webp",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "SBI logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.sbi.co.in
      </a>
    ),
    email: "test@sbi.com",
    contact: "0000000000",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Punjab_National_Bank_new_logo.svg/744px-Punjab_National_Bank_new_logo.svg.png?20220702001037",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "PNB logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.pnbindia.in
      </a>
    ),
    email: "test@pnb.com",
    contact: "0000000000",
  },
  {
    src: "https://www.financialexpress.com/wp-content/uploads/2024/12/smfg.x.jpg?w=1024",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "SMFG India Credit logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.smfgindia.com
      </a>
    ),
    email: "test@smfg.com",
    contact: "0000000000",
  },
  {
    src: "https://wordpress.buddyloan.com/wp-content/uploads/2025/07/canara-bank-personal-loan.webp",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Canara Bank logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.canarabank.com
      </a>
    ),
    email: "test@canara.com",
    contact: "0000000000",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/BankOfBarodaLogo.svg/500px-BankOfBarodaLogo.svg.png",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Bank of Baroda logo",
    web: (
      <a style={ { textDecoration: "none" } } href="www.google.com">
        www.bankofbaroda.in
      </a>
    ),
    email: "test@bob.com",
    contact: "0000000000",
  }
];


const customersdata = [
  {
    img: "/customer1.jpg",
    description:
      "Navaratri to New Year is the busiest season for our business. I often face financial challenges during that time because there is always a high demand for our products. I applied for a 20 lakh loan and it was instantly approved. The money was credited to my account in just 2 days. The loan amount helped me stock up on inventory and maintain a healthy balance sheet. The interest rate is also affordable, and the flexible tenure helped me manage my cash flow smoothly.",
    name: "Swastik Khanna - Sole Proprietor",
    address: "Bareilly ",
  },
  {
    img: "/customer3.jpg",
    description:
      "I came across F2 Fintech's ads on Facebook while I was looking for a loan to upgrade my printer and a few other pieces of equipment. The application process was quick and easy - it only took me 20-25 minutes to complete it. I was approved for the loan almost instantly, and the funds were disbursed within one day. I would highly recommend F2 Fintech to any businesses who are looking for quick loans without any hassle.",
    name: "Kaushiki Khandelwal - Sole Proprietor",
    address: "Noida ",
  },
  {
    img: "/customer2.jpg",
    description:
      "I was looking to increase production and expand my distribution outside of Jalandhar when I came across F2 Fintech. I was initially hesitant to try, but I decided to go for it as no one else was willing to give me credit. I'm glad I did! The process was incredibly smooth and straightforward, and I received the 8 Lakh loan within 48 hours. The interest rates are also very competitive when compared to other lenders.",
    name: "Atharv Mishra - Sole Proprietor",
    address: "Moradabad ",
  },
];

export {
  advantagesData,
  bLadvantagesData,
  unadvantagesData,
  woadvantagesData,
  ecadvantagesData,
  lendingpartnerData,
  faqData,
  customersdata,
};
