import DividedArea from "./common/DividedArea";
import ErrorArea from "./common/ErrorArea";
import FooterOne from "./layouts/footers/FooterOne";
import HeaderThree from "./layouts/headers/HeaderThree";

export default function NotFound() {
	return (
		<>
			<HeaderThree />
			<ErrorArea />
			<DividedArea />
			<FooterOne />
		</>
	);
}
