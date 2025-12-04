
interface MenuItem {
  title: string;
  link: string;
  has_dropdown: boolean;
  sub_menus?: {
    title: string;
    link: string;
    has_sub_dropdown?: boolean;
    sub_menus?: {
      title: string;
      link: string;
    }[];
  }[];
}[];


const menu_data: MenuItem[]  = [
  {
    title: "Home",
    link: "/",
    has_dropdown: false,
  },
  // {
  //   title: "About Us",
  //   link: "/about-us",
  //   has_dropdown: false,
  // },
  {
    title: "Services",
    link: "/services",
    has_dropdown: false,
  },
  {
    title: "Galerry",
    link: "/galerry",
    has_dropdown: false,
  },
  {
    title: "Contact",
    link: "/contact-us",
    has_dropdown: false,
  },
];

export default menu_data;