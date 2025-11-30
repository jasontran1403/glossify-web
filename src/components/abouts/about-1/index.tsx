 
import HeroAbout from "./HeroAbout";
import AboutArea from "./AboutArea"; 
import AboutCounter from "./AboutCounter";
import AboutHistory from "./AboutHistory";
import AboutFeatures from "./AboutFeatures";
import AboutFaq from "./AboutFaq";
import AboutTeam from "./AboutTeam"; 
import Wrapper from "../../../layouts/Wrapper";
import HeaderThree from "../../../layouts/headers/HeaderThree";
import DividedArea from "../../../common/DividedArea";
import FooterOne from "../../../layouts/footers/FooterOne";
export default function AboutOne() {
	return (
		<Wrapper>
			<HeaderThree />
      <DividedArea />
			<HeroAbout />
      <DividedArea />
			<AboutArea />
      <DividedArea />
      <AboutCounter />
      <DividedArea />
			<AboutHistory />
			<AboutFeatures />
			<AboutFaq />
			<AboutTeam />
      <DividedArea />
			<FooterOne />      
		</Wrapper>
	);
}
