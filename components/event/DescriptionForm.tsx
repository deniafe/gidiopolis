import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TextArea } from '../global/TextArea'

interface DescriptionFormProps {
  setEventDescription: Dispatch<SetStateAction<string>>;
  eventDescription: string
}

function DescriptionForm({ setEventDescription, eventDescription }: DescriptionFormProps) {
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
        Enter Event Description
      </h2>
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                  {/* Event Description input */}
        <div className="mb-1">
          <TextArea 
            label="About Event" 
            type="text" 
            value={eventDescription}
            rules={(val: string) => val.length < 50 }
            errorMessage='Event Description cannot be less than 50 chacracters'
            handleChange={(val) => setEventDescription(val)} 
          />
        </div>
      </div>
    </div>
  )
}

export default DescriptionForm