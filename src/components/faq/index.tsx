 
 
import DividedArea from '../../common/DividedArea'
import FooterOne from '../../layouts/footers/FooterOne'
import HeaderThree from '../../layouts/headers/HeaderThree'
import Wrapper from '../../layouts/Wrapper'
import FaqArea from './FaqArea'

export default function Faq() {
  return (
    <Wrapper>
      <HeaderThree />
      <FaqArea />
      <DividedArea />
      <FooterOne />
    </Wrapper>
  )
}
