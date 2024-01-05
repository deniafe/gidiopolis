import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '../global/Input';
import { TextArea } from '../global/TextArea'; // Assuming you have a TextArea component
import { validateEmail, validatePhoneNumber, validateUrl } from '@/utils/func';

interface OrganizerDetailsFormProps {
  setOrganizerName: Dispatch<SetStateAction<string>>;
  setOrganizerEmail: Dispatch<SetStateAction<string>>;
  setOrganizerNumber: Dispatch<SetStateAction<string>>;
  setOrganizerWebsite: Dispatch<SetStateAction<string>>;
  setOrganizerDescription: Dispatch<SetStateAction<string>>;
  organizerName: string
  organizerEmail: string
  organizerNumber: string
  organizerWebsite: string
  organizerDescription: string
}

function OrganizerDetailsForm({
  setOrganizerName,
  setOrganizerEmail,
  setOrganizerNumber,
  setOrganizerWebsite,
  setOrganizerDescription,
  organizerName,
  organizerEmail,
  organizerNumber,
  organizerWebsite,
  organizerDescription,
}: OrganizerDetailsFormProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const scrollToScrollDiv = () => {
      const scrollDiv = document.getElementById("share");
      if (scrollDiv) {
        scrollDiv.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToScrollDiv();
  }, []); 
  
  return (
    <div className={`transition-all transform ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
        Enter Organizer Details
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">

        {/* Organizer Name input */}
        <div className="mb-1">
          <Input 
            label="Name" 
            len={25} 
            type="text"
            value={organizerName} 
            rules={(val: string) => val.length < 3 }
            errorMessage='Organizer Name cannot be less than 2 characters'
            handleChange={(val) => setOrganizerName(val)} 
          />
        </div>

        {/* Organizer Email input */}
        <div className="mb-1">
          <Input 
            label="Email" 
            type="email" 
            value={organizerEmail}
            rules={(val: string) => !validateEmail(val) }
            errorMessage='Organizer Email must be valid'
            handleChange={(val) => setOrganizerEmail(val)} 
          />
        </div>

        {/* Organizer Number input */}
        <div className="mb-1">
          <Input 
            label="Phone Number" 
            len={13} 
            type="text" 
            value={organizerNumber}
            rules={(val: string) => !validatePhoneNumber(val) }
            errorMessage='Organizer Phone Number must be valid'
            handleChange={(val) => setOrganizerNumber(val)} 
          />
        </div>

        {/* Organizer Website input */}
        <div className="mb-1">
          <Input 
            label="Website" 
            type="text" 
            value={organizerWebsite}
            rules={(val: string) => !validateUrl(val) }
            errorMessage='Organizer Website url must be valid'
            handleChange={(val) => setOrganizerWebsite(val)} 
          />
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-4">
        {/* About Organizer input */}
        <div className="mb-1">
          <TextArea 
            label="Description" 
            type="text" 
            value={organizerDescription}
            rules={(val: string) => val.length < 50 }
            errorMessage='About organizer cannot be less than 50 characters'
            handleChange={(val) => setOrganizerDescription(val)} 
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizerDetailsForm;
