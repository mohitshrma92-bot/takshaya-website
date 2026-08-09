import { createContext, useContext, useEffect, useState } from "react";

const OnboardingContext = createContext(null);

const initialOnboardingData = {
  account: {
    email: "",
    accountCreated: false,
    emailVerified: false,
  },

  businessRoles: [],

  companyProfile: {
    legalCompanyName: "",
    tradeBrandName: "",
    yearEstablished: "",
    primaryIndustry: "",
    companySize: "",
    companyWebsite: "",
    aboutBusiness: "",
  },

  gst: {
    gstin: "",
    verified: false,
    legalName: "",
    taxpayerType: "",
    state: "",
    registeredAddress: "",
  },

  pan: {
    panNumber: "",
    verified: false,
    holderName: "",
    status: "",
    category: "",
  },

  udyam: {
    udyamNumber: "",
    verified: false,
    enterpriseName: "",
    status: "",
    enterpriseCategory: "",
  },

  factoryAddresses: [],

  authorizedPerson: {
    fullName: "",
    designation: "",
    businessEmail: "",
    mobileNumber: "",
    panNumber: "",
    authorizationType: "",
    isAuthorized: false,
    governmentId: null,
    profilePhoto: null,
  },

  submission: {
    status: "draft",
    applicationId: "",
    submittedAt: null,
  },
};

export function OnboardingProvider({ children }) {
  const [onboarding, setOnboarding] = useState(() => {
    try {
      const savedData = localStorage.getItem("takshaya_onboarding");

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        return {
          ...initialOnboardingData,
          ...parsedData,
        };
      }
    } catch (error) {
      console.error("Failed to load onboarding data:", error);
    }

    return initialOnboardingData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "takshaya_onboarding",
        JSON.stringify(onboarding)
      );
    } catch (error) {
      console.error("Failed to save onboarding data:", error);
    }
  }, [onboarding]);

  const updateSection = (section, data) => {
    setOnboarding((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        ...data,
      },
    }));
  };

  const setSection = (section, data) => {
    setOnboarding((previous) => ({
      ...previous,
      [section]: data,
    }));
  };

  const updateField = (section, field, value) => {
    setOnboarding((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
  };

  const setBusinessRoles = (roles) => {
    setOnboarding((previous) => ({
      ...previous,
      businessRoles: roles,
    }));
  };

  const addFactoryAddress = (address) => {
    setOnboarding((previous) => ({
      ...previous,
      factoryAddresses: [
        ...previous.factoryAddresses,
        {
          ...address,
          id: Date.now(),
        },
      ],
    }));
  };

  const updateFactoryAddress = (id, data) => {
    setOnboarding((previous) => ({
      ...previous,
      factoryAddresses: previous.factoryAddresses.map((address) =>
        address.id === id
          ? {
              ...address,
              ...data,
            }
          : address
      ),
    }));
  };

  const removeFactoryAddress = (id) => {
    setOnboarding((previous) => ({
      ...previous,
      factoryAddresses: previous.factoryAddresses.filter(
        (address) => address.id !== id
      ),
    }));
  };

  const updateSubmission = (data) => {
    setOnboarding((previous) => ({
      ...previous,
      submission: {
        ...previous.submission,
        ...data,
      },
    }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem("takshaya_onboarding");
    setOnboarding(initialOnboardingData);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboarding,

        updateSection,
        setSection,
        updateField,

        setBusinessRoles,

        addFactoryAddress,
        updateFactoryAddress,
        removeFactoryAddress,

        updateSubmission,

        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );
  }

  return context;
}