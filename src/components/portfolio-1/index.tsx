 
import DividedArea from '../../common/DividedArea'
import FooterOne from '../../layouts/footers/FooterOne'
import HeaderThree from '../../layouts/headers/HeaderThree'
import Wrapper from '../../layouts/Wrapper'
import PortfolioOneArea from './PortfolioOneArea'


export default function PortfolioOne() {
  return (
    <Wrapper>
      <HeaderThree />
      <PortfolioOneArea />
      <DividedArea />
      <FooterOne />
    </Wrapper>
  )
}
