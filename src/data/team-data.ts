 

import team_img_1 from "../../public/assets/images/team/team1.png";
import team_img_2 from "../../public/assets/images/team/team2.png";
import team_img_3 from "../../public/assets/images/team/team3.png";
import team_img_4 from "../../public/assets/images/team/team4.png";
// home 3 
import team_img_5 from "../../public/assets/images/team/team5.png";
import team_img_6 from "../../public/assets/images/team/team6.png";
import team_img_8 from "../../public/assets/images/team/team8.png";





export interface TeamItem {
  id: number;
  img: string;
  name: string;
  role: string;
  dataAos?: string;
  dataAosDelay?: number;
}

const team_data: TeamItem[] = [
  {
    id: 1,
    img: team_img_1,
    name: "Ava Reynolds",
    role: "Creative Director",
    dataAos: "fade-up",
    dataAosDelay: 300,
  },
  {
    id: 2,
    img: team_img_2,
    name: "Leo Martinez",
    role: "Lead UI/UX Designer",
    dataAos: "fade-up",
    dataAosDelay: 400,
  },
  {
    id: 3,
    img: team_img_3,
    name: "Ethan Brooks",
    role: "Head of Development",
    dataAos: "fade-up",
    dataAosDelay: 500,
  },
  {
    id: 4,
    img: team_img_4,
    name: "Miles Turner",
    role: "Webflow Expert",
    dataAos: "fade-up",
    dataAosDelay: 600,
  },

  // home 3
  { id: 1, name: "Ava Reynolds", role: "Creative Director", img: team_img_1, },
  { id: 2, name: "Ethan Brooks", role: "Head of Development", img: team_img_3, },
  { id: 3, name: "Isla Bennett", role: "Content & Copy Lead", img: team_img_6, },
  { id: 4, name: "Adam Smith", role: "Interaction Designer", img: team_img_8, },
  { id: 5, name: "Miles Turner", role: "Webflow Expert", img: team_img_4, },
  { id: 6, name: "Leo Martinez", role: "Lead UI/UX Designer", img: team_img_2, },
  { id: 7, name: "Leo Martinez", role: "Lead UI/UX Designer", img: team_img_4, },
  { id: 8, name: "Noah Kim", role: "Digital Marketing Manager", img: team_img_5, },


];

export default team_data;
