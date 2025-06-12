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
    answer: "We offer business loans to sole proprietorships.",
  },
  {
    question: "What are the documents required for a business loan?",
    answer: `The documents required for Sole Proprietorship are listed below.
            <ul>
              <li>PAN Card</li>
              <li>Aadhaar Card</li>
              <li>Any 1 of the following business documents</li>
              <div>
                <ul>
                  <li>Udyog Aadhaar</li>
                  <li>Shops and establishment certificate</li>
                  <li>Food License</li>
                  <li>Regional state registration certificate</li>
                  <li>
                    IEC (Import exporter code) issued by the office of DGFT
                  </li>
                </ul>
                <ul>
                  <li>MSME Certificate</li>
                  <li>Trade License</li>
                  <li>GST Certificate</li>
                  <li>
                    Municipal corporation department certificate or License
                  </li>
                  <li>
                    Registration document issued by sales/service tax authority
                  </li>
                </ul>
                <ul>
                  <li>Gumasta License</li>
                  <li>Labour License</li>
                  <li>Registration Proof</li>
                  <li>Sales and Income Tax returns</li>
                </ul>
              </div>
            </ul>`,
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
