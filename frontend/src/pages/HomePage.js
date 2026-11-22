import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import BrandsGrid from '../components/home/BrandsGrid';
import AboutSection from '../components/home/AboutSection';
import CategoriesSection from '../components/home/CategoriesSection';
import IndustriesSection from '../components/home/IndustriesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import QuickContact from '../components/home/QuickContact';
import EnquiryModal from '../components/common/EnquiryModal';
import SEOHead from '../components/common/SEOHead';

const HomePage = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <div>
      <SEOHead
        title="Industrial Insulation & Sealing Solutions"
        description="SARAR INDUSTRIES - Trusted manufacturer of industrial sealing, insulation, rubber and engineered products backed by over 50 years of manufacturing experience. Brands: SAKET & DWITECH."
      />

      <Hero onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      <BrandsGrid />
      <AboutSection />
      <CategoriesSection />
      <IndustriesSection />
      <WhyChooseUs />
      <QuickContact />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
