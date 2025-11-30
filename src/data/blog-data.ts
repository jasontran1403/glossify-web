 
import blog_img_1 from "../../public/assets/images/blog/b1.png";
import blog_img_2 from "../../public/assets/images/blog/b2.png";
import blog_img_3 from "../../public/assets/images/blog/b3.png"; 

export interface BlogItem {
  id: number;
  img: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  link: string;
  dataAos?: string;
  dataAosDelay?: number;
}



const year = new Date().getFullYear();

const blog_data: BlogItem[] = [
  {
    id: 1,
    img: blog_img_1,
    category: "Creative Agency",
    date: `20 June ${year}`,
    readTime: "10 min read",
    title: "Top 5 reasons to launch your product with a creative agency",
    link: "/single-blog",
    dataAos: "fade-up",
    dataAosDelay: 500,
  },
  {
    id: 2,
    img: blog_img_2,
    category: "Web",
    date: `18 June ${year}`,
    readTime: "15 min read",
    title: "Build a creative agency website in 4 steps",
    link: "/single-blog",
    dataAos: "fade-up",
    dataAosDelay: 600,
  },
  {
    id: 3,
    img: blog_img_3,
    category: "Technology",
    date: `16 June ${year}`,
    readTime: "6 min read",
    title: "What is click fraud and how to avoid it",
    link: "/single-blog",
    dataAos: "fade-up",
    dataAosDelay: 700,
  },
];

export default blog_data;
