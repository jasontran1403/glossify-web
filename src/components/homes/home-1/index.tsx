 
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeroAreaHomeOne from './HeroAreaHomeOne';
import ServiceAreaHomeOne from './ServiceAreaHomeOne';
import PortfolioAreaHomeOne from './PortfolioAreaHomeOne';
import TeamAreaHomeOne from './TeamAreaHomeOne';
import BlogAreaHomeOne from './BlogAreaHomeOne';
import TestimonialArea from './TestimonialArea';
import HomeLayout from '../HomeLayout';
import Wrapper from '../../../layouts/Wrapper';

export default function HomeOne() {
  const sections = [
    <HeroAreaHomeOne />,
    <ServiceAreaHomeOne />,
    <PortfolioAreaHomeOne />,
    <TestimonialArea />,
    <TeamAreaHomeOne />,
    <BlogAreaHomeOne />,
  ];

  return <Wrapper><HomeLayout header={<HeaderOne />} footer={<FooterOne />} sections={sections} /></Wrapper>;
}
