import React from 'react';

interface StepsProps {
  currentStep: number;
}

function Steps({ currentStep }: StepsProps) {

  const steps = [
    { label: 'Organizer', number: 1 },
    { label: 'Basics', number: 2 },
    { label: 'Description', number: 3 },
    { label: 'Date and Time', number: 4 },
    { label: 'Address', number: 5 },
    { label: 'Links', number: 6 },
  ];

  return (
    <div className="my-[4rem] flex justify-center">
      <div>
        <h2 className="sr-only">Steps</h2>
        <div>
          <ol className="flex items-center gap-2 text-xs font-medium">
            {steps.map((step) => (
              <li
                key={step.number}
                className={`flex items-center justify-end gap-2 ${
                  currentStep > step.number
                    ? 'text-green-600'
                    : currentStep === step.number
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <span className={`h-6 w-6 rounded bg-gray-50 text-center text-[10px]/6 font-bold ${currentStep >= step.number ? 'text-green-600' : 'text-gray-600'}`}>
                  {step.number}
                </span>
                <span className={`${currentStep === step.number ? 'flex' : 'hidden'} sm:flex`}>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Steps;
