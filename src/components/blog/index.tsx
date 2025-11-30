 
import DividedArea from '../../common/DividedArea'
import FooterOne from '../../layouts/footers/FooterOne'
import HeaderThree from '../../layouts/headers/HeaderThree'
import Wrapper from '../../layouts/Wrapper'
import BlogArea from './BlogArea'

export default function Blog() {
  return (
    <Wrapper>
      <HeaderThree />
      <BlogArea />
      <DividedArea />
      <FooterOne />
    </Wrapper>
  )
}
