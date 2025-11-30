import portfolio_img_1 from "../../public/assets/images/portfolio/thumb1.png";
import portfolio_img_2 from "../../public/assets/images/portfolio/thumb2.png";
import portfolio_img_3 from "../../public/assets/images/portfolio/thumb3.png";
import portfolio_img_4 from "../../public/assets/images/portfolio/thumb4.png";
import portfolio_img_5 from "../../public/assets/images/portfolio/thumb5.png";
import portfolio_img_6 from "../../public/assets/images/portfolio/thumb6.png";
import portfolio_img_7 from "../../public/assets/images/portfolio/thumb7.png";
 

interface PortfolioItem {
  id: number;
  img: string;
  category?: string;
  date?: string;
  title: string;
  dataAosDelay: number;
  cls: string;
  description?: string;
}


const year = new Date().getFullYear();

const portfolio_data: PortfolioItem[] = [
  {
    id: 1,
    img: portfolio_img_1,
    category: "App Design, UI/UX",
    date: `12 June ${year}`,
    title: "Lunora",
    dataAosDelay: 200,
    cls: "",
  },
  {
    id: 2,
    img: portfolio_img_3,
    category: "Creative Design, Branding",
    date: `10 June ${year}`,
    title: "VoltEdge",
    dataAosDelay: 400,
    cls: "",
  },
  {
    id: 3,
    img: portfolio_img_5,
    category: "Product Design, UX Research",
    date: `03 June ${year}`,
    title: "Nomio",
    dataAosDelay: 600,
    cls: "wrap2 wrap3",
  },
  {
    id: 4,
    img: portfolio_img_2,
    category: "Branding, Content Creation",
    date: `28 May ${year}`,
    title: "Haus&Co",
    dataAosDelay: 300,
    cls: "",
  },
  {
    id: 5,
    img: portfolio_img_4,
    category: "UI/UX, SaaS Dashboard Design",
    date: `25 May ${year}`,
    title: "ZentraPay",
    dataAosDelay: 500,
    cls: "",
  },
  {
    id: 6,
    img: portfolio_img_6,
    category: "Logo Design, Visual Identity",
    date: `22 May ${year}`,
    title: "Bravure",
    dataAosDelay: 700,
    cls: "wrap2",
  },
  // home 2
  {
    id: 7,
    title: "Lunora",
    description: "A clean and functional mobile app concept",
    img: portfolio_img_1,
    dataAosDelay: 200,
    cls: "",
  },
  {
    id: 8,
    title: "Nomio",
    description: "Elegant brand identity and interface for a skincare startup",
    img: portfolio_img_7,
    dataAosDelay: 600,
    cls: "wrap2 wrap3",
  },
  {
    id: 9,
    title: "VoltEdge",
    description: "Sophisticated brand and web presence",
    img: portfolio_img_2,
    dataAosDelay: 400,
    cls: "",
  },
  {
    id: 10,
    title: "VoltEdge",
    description: "Bold rebranding for a lifestyle clothing label aiming",
    img: portfolio_img_4,
    dataAosDelay: 800,
    cls: "wrap2",
  },



];

export default portfolio_data;

