'use client';

import { Button } from '@/components/ui/button';

export function CreateAccountButton() {
  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration-section');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button 
      className="w-full py-7 text-lg font-semibold shadow-lg" 
      size="lg"
      onClick={scrollToRegistration}
    >
      Create Free Account
    </Button>
  );
} 