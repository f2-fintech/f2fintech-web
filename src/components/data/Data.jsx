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
// import FactCheckIcon from "@mui/icons-material/FactCheck";

const faqData = [
  {
    question: "What is a business loan? ",
    answer: `At f2fintech, we understand that every business is different and
              has different financial needs. That's why we offer Business Loans
              that are designed to be flexible and customisable, so you can get
              the quick funding required to grow your business. Whether you're
              new to business, experiencing a slowdown, or need funds for any
              other purpose, our Business Loans can help you get the money when
              you need it the most.`,
  },
  {
    question: "Who can get business loans?",
    answer: "Sole proprietor, Partnership firms, Private Limited"
  },
  {
    question: "What are the documents required for a business loan?",
    answer: `
    <h3>Proprietor</h3>
    <ul>
      <li>PAN Card</li>
      <li>Aadhar Card</li>
      <li>Last 1 year Bank Statement (Current & Saving)</li>
      <li>GST Certificate</li>
      <li>Last 2 years ITR & Financials</li>
      <li>Last 2 years Form 26 AS</li>
    </ul>

    <h3>Partnership</h3>
    <ul>
      <li>PAN Card (Company & all partners)</li>
      <li>Aadhar Card (All partners)</li>
      <li>Company Address Proof</li>
      <li>Partnership Deed</li>
      <li>Last 3 months Salary Slip</li>
      <li>Last 2 years Form AS</li>
      <li>Last 2 years ITR & Financials</li>
      <li>GST Certificate (3 Years vintage)</li>
      <li>Last 1 year Bank Statement (Current & Saving) (All partners)</li>
    </ul>

    <h3>Private Limited</h3>
    <ul>
      <li>PAN Card (Company & Directors)</li>
      <li>Aadhar card (Directors)</li>
      <li>Company Address Proof</li>
      <li>GST Certificate (3 Years vintage)</li>
      <li>Last 2 years ITR & Financials</li>
      <li>MOA/AOA/COI</li>
      <li>Board Resolution</li>
      <li>Latest MCA Report</li>
      <li>Last 2 years FORM AS</li>
      <li>Last 1 year Bank Statement (Current & Saving) (All partners)</li>
    </ul>
  `,
  },
  {
    question: "Can I get a business loan without collateral?",
    answer:
      "Yes! You can get a Business Loan without any collateral or security.",
  },
  {
    question: "Am I eligible for a business loan?",
    answer: `You are eligible for a Business Loan if you fall under the category
            of sole proprietorship. However, the loan approval depends on the
            proper submission of documents, the basis of your financial history
            and our internal credit policy.`,
  },
  {
    question: "How long does it take for a business loan to be disbursed?",
    answer: `The business loan is disbursed within 48 hours from the time of loan
            approval.`,
  },
  {
    question: "How much EMI do I need to pay?",
    answer: `Your EMI depends on the loan amount and the tenure you selected for
            repayment.`,
  },
];

const advantagesData = [
  {
    logo: <AccessTimeIcon sx={{ fontSize: "50px", width: "95px" }} />,
    title: "Apply in few minutes",
  },
  {
    logo: <BoltIcon sx={{ fontSize: "50px", width: "95px" }} />,
    title: "Fast Approval",
  },
  {
    logo: <PercentIcon sx={{ fontSize: "50px", width: "95px" }} />,
    title: "Tenure up to 60 months",
  },
  {
    logo: <AddCardIcon sx={{ fontSize: "50px", width: "95px" }} />,
    title: "Get money in 2-4 days",
  },
  {
    logo: <FmdGoodIcon sx={{ fontSize: "50px", width: "95px" }} />,
    title: "No Branch Visit",
  },
  {
    logo: <CurrencyRupeeIcon sx={{ fontSize: "50px", width: "95px" }} />,
    title: "Up to 10 crore",
  },
];
const bLadvantagesData = [
  {
    logo: <BoltIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Lightning-Fast Approvals",
    subtitle: "Get your funds disbursed in 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Easy Loan Application",
    subtitle: "Apply within 5 minutes with minimal documentation",
  },
  {
    logo: <PaymentsIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Flexible Repayment Plans",
    subtitle: "Simple repayment options to suit your business",
  },
  {
    logo: <AccountBalanceIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Hassle free Loan",
    subtitle: "No visit to the branch is required",
  },
  {
    logo: <LockPersonIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Safe and Secure",
    subtitle: "An ISO-certified company keeps your data safe",
  },
  {
    logo: <PercentIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Low-Interest Rates",
    subtitle: "Enjoy affordable interest rates that suit your needs",
  },
];
const unadvantagesData = [
  {
    logo: <BoltIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Rapid Approvals",
    subtitle: "Receive your funds in just 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Simple Loan Application",
    subtitle: "Apply within 5 minutes with minimal documentation",
  },
  {
    logo: <PaymentsIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Flexible Repayment Plans",
    subtitle: "Select from simple repayment choices",
  },
  {
    logo: <AccountBalanceIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Effortless Process",
    subtitle: "No need to visit the branch",
  },
  {
    logo: <LockPersonIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Safe and Secure",
    subtitle: "Trust an ISO-certified company to keep your data secure",
  },
  {
    logo: <PercentIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Low-Interest Rates",
    subtitle: "Enjoy affordable rates tailored to your needs",
  },
];
const woadvantagesData = [
  {
    logo: <BoltIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Fast Approvals",
    subtitle: "Fund in 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Easy Application",
    subtitle: "Apply in 5 minutes",
  },
  {
    logo: <PaymentsIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Flexible Repayment Plans",
    subtitle: "Choose Simple Plans",
  },
  {
    logo: <AccountBalanceIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Seamless Process",
    subtitle: "No branch visits",
  },
  {
    logo: <LockPersonIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Safe and Secure",
    subtitle: "ISO-certified",
  },
  {
    logo: <PercentIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Competitive Rates",
    subtitle: "Affordable and tailored",
  },
];
const ecadvantagesData = [
  {
    logo: <BoltIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Swift Approvals",
    subtitle: "Receive your funds in just 2-4 days",
  },
  {
    logo: <WatchLaterIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Simple Application",
    subtitle: "Apply with minimal documentation",
  },
  {
    logo: <PaymentsIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Flexible Repayment Plans",
    subtitle: "Choose from straightforward repayment options",
  },
  {
    logo: <AccountBalanceIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Effortless Process",
    subtitle: "No need to visit the branch",
  },
  {
    logo: <LockPersonIcon sx={{ fontSize: "40px", width: "75px" }} />,
    title: "Safe and Secure",
    subtitle: "Trust an ISO-certified company to keep your data security",
  },
  {
    logo: <PercentIcon sx={{ fontSize: "40px", width: "75px" }} />,
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
        www.gromorfinance.com
      </a>
    ),
    email: "test@gmaik.co",
    contact: "242443242323",
  },

  // 🔹 Newly Added Lending Partners
  {
    src: "https://www.hsbc.co.in/content/dam/hsbc/in/images/01_HSBC_MASTERBRAND_LOGO_RGB.svg",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "HSBC logo",
    web: (
      <a style={{ textDecoration: "none" }} href="www.google.com">
        www.hsbc.co.in
      </a>
    ),
    email: "test@hsbc.com",
    contact: "0000000000",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Standard_Chartered_%282021%29.svg/2560px-Standard_Chartered_%282021%29.svg.png",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Standard Chartered logo",
    web: (
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
        www.kotak.com
      </a>
    ),
    email: "test@kotak.com",
    contact: "0000000000",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Deutsche_Bank_logo_without_wordmark.svg",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "Deutsche Bank logo",
    web: (
      <a style={{ textDecoration: "none" }} href="www.google.com">
        www.deutschebank.co.in
      </a>
    ),
    email: "test@db.com",
    contact: "0000000000",
  },
  {
    src: "https://icon2.cleanpng.com/lnd/20241224/fe/656de25930c6fdc0e12ba4162d0f25.webp",
    title: "Grievance Redressal Officer",
    name: "Mr John Doe",
    alt: "SBI logo",
    web: (
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      <a style={{ textDecoration: "none" }} href="www.google.com">
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
      "I came across f2fintech's ads on Facebook while I was looking for a loan to upgrade my printer and a few other pieces of equipment. The application process was quick and easy - it only took me 20-25 minutes to complete it. I was approved for the loan almost instantly, and the funds were disbursed within one day. I would highly recommend f2fintech to any businesses who are looking for quick loans without any hassle.",
    name: "Kaushiki Khandelwal - Sole Proprietor",
    address: "Noida ",
  },
  {
    img: "/customer2.jpg",
    description:
      "I was looking to increase production and expand my distribution outside of Jalandhar when I came across f2fintech. I was initially hesitant to try, but I decided to go for it as no one else was willing to give me credit. I'm glad I did! The process was incredibly smooth and straightforward, and I received the 8 Lakh loan within 48 hours. The interest rates are also very competitive when compared to other lenders.",
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
