import React, { Dispatch, SetStateAction } from 'react';
import { validateUrl } from '@/utils/func';
import { Input } from '../global/Input';

interface SocialLinkFormProps {
  setTwitter: Dispatch<SetStateAction<string>>
  setInstagram: Dispatch<SetStateAction<string>>
  setLinkedIn: Dispatch<SetStateAction<string>>
  twitter: string 
  instagram: string
  linkedIn: string  
}

function SocialLinkForm({ 
  setTwitter, 
  setInstagram, 
  setLinkedIn,
  twitter, 
  instagram, 
  linkedIn  
}: SocialLinkFormProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 md:mb-2">
        {/* Twitter input */}
        <div className="mb-1">
          <Input
            label="Twitter"
            type="text"
            value={twitter}
            rules={(val: string) => !validateUrl(val)}
            errorMessage="Url must be valid"
            handleChange={(val) => setTwitter(val)}
          />
        </div>

        {/* Instagram input */}
        <div className="mb-1">
          <Input
            label="Instagram"
            type="text"
            value={instagram}
            rules={(val: string) => !validateUrl(val)}
            errorMessage="Url must be valid"
            handleChange={(val) => setInstagram(val)}
          />
        </div>

        {/* LinkedIn input */}
        <div className="mb-1">
          <Input
            label="LinkedIn"
            type="text"
            value={linkedIn}
            rules={(val: string) => !validateUrl(val)}
            errorMessage="Url must be valid"
            handleChange={(val) => setLinkedIn(val)}
          />
        </div>
      </div>
    </div>
  );
}

export default SocialLinkForm;
