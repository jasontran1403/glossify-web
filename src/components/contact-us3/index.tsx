
import DividedArea from '../../common/DividedArea'
import GoogleMap from '../../common/GoogleMap'
import FooterOne from '../../layouts/footers/FooterOne'
import HeaderThree from '../../layouts/headers/HeaderThree'
import Wrapper from '../../layouts/Wrapper'
import Contactus3Area from './Contactus3Area'

export default function Contactus3() {
  return (
    <Wrapper>
      <HeaderThree />
      <Contactus3Area />
      <DividedArea />
      <GoogleMap />
      <DividedArea />
      <FooterOne />
    </Wrapper>
  )
}
