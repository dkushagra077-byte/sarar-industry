import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import EnquiryModal from '../components/common/EnquiryModal';

const PublicLayout = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.scrollState = 'visible';
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    const observeRevealTargets = () => {
      main.querySelectorAll('.section-py, .section-py-sm, .industrial-card').forEach((element) => {
        if (element.dataset.scrollObserved) return;
        element.dataset.scrollObserved = 'true';
        element.dataset.scrollState = 'pending';
        revealObserver.observe(element);
      });
    };

    observeRevealTargets();
    const contentObserver = new MutationObserver(observeRevealTargets);
    contentObserver.observe(main, { childList: true, subtree: true });

    return () => {
      contentObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      
      <main ref={mainRef} style={{ flex: 1 }}>
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
