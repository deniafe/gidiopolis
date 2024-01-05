import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Input } from '../global/Input';
import { SelectInput } from '../global/SelectInput';
import { makePrice, validatePrice } from '@/utils/func';
import { catexts } from '@/utils/constants';
import ImageUpload from '../global/ImageUpload';

interface EventBasicsFormProps {
  setEventName: Dispatch<SetStateAction<string>>;
  setEventCategory: Dispatch<SetStateAction<string>>;
  setEventPrice: Dispatch<SetStateAction<string>>;
  setEventPriceAmount: Dispatch<SetStateAction<string>>;
  setEventBanner: Dispatch<SetStateAction<string>>;
  eventBanner: string
  eventName: string
  eventCategory: string
  eventPrice: string
  eventPriceAmount: string
}

function EventBasicsForm({
  setEventName,
  setEventCategory,
  setEventPrice,
  setEventPriceAmount,
  setEventBanner,
  eventName,
  eventCategory,
  eventPrice,
  eventPriceAmount,
  eventBanner
}: EventBasicsFormProps) {

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
        Enter Basic Details About Event
      </h2>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
        {/* Event Name input */}
        <div className="mb-1">
          <Input
            label="Event Name"
            len={25}
            type="text"
            value={eventName}
            rules={(val: string) => val.length < 3}
            errorMessage='Event Name cannot be less than 2 characters'
            handleChange={(val) => setEventName(val)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 gap-y-12 mb-[2rem] md:grid-cols-2 md:mb-[2rem]">
        {/* Event Category input */}
        <div className="mb-1">
          <SelectInput 
            label='Event Category' 
            value={eventCategory}
            items={catexts} 
            handleChange={(value) => setEventCategory(value)} 
          />
        </div>

        {/* Event Price input */}
        <div className="mb-1">
          <Input
            label="Event Price (₦)"
            len={10}
            type="text"
            value={eventPriceAmount}
            rules={(val: string) => !validatePrice(val)}
            errorMessage="Price should either be 'free' or a number"
            handleChange={(val) => {
              if (makePrice(val) === 'free') {
                setEventPrice('free');
                setEventPriceAmount('0');
              } else if (makePrice(val) === 'paid') {
                setEventPrice('paid');
                setEventPriceAmount(val);
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
        {/* Event Upload Banner */}
        <div className="mb-1">
          <ImageUpload
            onChange={(value: any) => setEventBanner(value)}
            value={eventBanner}
          />
        </div>
      </div>
    </div>
  );

}

export default EventBasicsForm;
