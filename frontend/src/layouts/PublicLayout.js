import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import EnquiryModal from '../components/common/EnquiryModal';

const PublicLayout = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFloat />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
};

export default PublicLayout;
