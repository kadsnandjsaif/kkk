import HeroBanner from '../components/HeroBanner'
import MembershipSelector from '@/components/MembershipSelector';
import TestimonialSlider from '@/components/TestimonialSlider';
import AboutCostco from '@/components/AboutCostco';
import MembershipCards from '@/components/MembershipCards';
import MembershipCTA from '@/components/MembershipCTA';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <MembershipSelector/>
      <TestimonialSlider/>
      <AboutCostco/>
      <MembershipCards/>
    <MembershipCTA/>
    </>
  );
}