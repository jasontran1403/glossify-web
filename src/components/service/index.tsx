 
import DividedArea from "../../common/DividedArea";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderThree from "../../layouts/headers/HeaderThree";
import Wrapper from "../../layouts/Wrapper";
import ServiceArea from "./ServiceArea"; 
export default function Service() {
	return (
		<Wrapper>
			<HeaderThree />
			<ServiceArea />
      <DividedArea />
      <FooterOne />
		</Wrapper>
	);
}
