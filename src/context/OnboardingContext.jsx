import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OnboardingContext =
  createContext(null);

/*
 * =========================================================
 * INITIAL DATA
 * =========================================================
 */

const initialOnboardingData = {
  account: {
    email: "",
    accountCreated: false,
    emailVerified: false,
  },

  /*
   * BUSINESS ROLES
   *
   * IMPORTANT:
   * This is the ONLY place where business roles
   * are stored.
   */

  businessRoles: [],

  /*
   * COMPANY PROFILE
   */

  companyProfile: {
    legalCompanyName: "",
    tradeBrandName: "",
    yearEstablished: "",
    primaryIndustry: "",
    companySize: "",
    companyWebsite: "",
    aboutBusiness: "",
  },

  /*
   * GST
   */

  gst: {
    gstin: "",
    verified: false,
    legalName: "",
    taxpayerType: "",
    state: "",
    registeredAddress: "",
  },

  /*
   * PAN
   */

  pan: {
    panNumber: "",
    verified: false,
    holderName: "",
    status: "",
    category: "",
  },

  /*
   * UDYAM
   */

  udyam: {
    udyamNumber: "",
    verified: false,
    enterpriseName: "",
    status: "",
    enterpriseCategory: "",
  },

  /*
   * FACTORY ADDRESSES
   */

  factoryAddresses: [],

  /*
   * AUTHORIZED PERSON
   */

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

  /*
   * SUBMISSION
   */

  submission: {
    status: "draft",
    applicationId: "",
    submittedAt: null,
  },
};

/*
 * =========================================================
 * NORMALIZE SAVED DATA
 * =========================================================
 */

const normalizeOnboardingData = (
  savedData
) => {
  if (!savedData) {
    return initialOnboardingData;
  }

  /*
   * -------------------------------------------------------
   * BUSINESS ROLES
   * -------------------------------------------------------
   */

  let businessRoles = [];

  if (
    Array.isArray(
      savedData.businessRoles
    )
  ) {
    businessRoles =
      savedData.businessRoles;
  }

  /*
   * Backwards compatibility:
   *
   * Older version saved:
   *
   * onboarding.business.roles
   */

  if (
    businessRoles.length === 0 &&
    savedData.business &&
    Array.isArray(
      savedData.business.roles
    )
  ) {
    businessRoles =
      savedData.business.roles;
  }

  /*
   * -------------------------------------------------------
   * FACTORY ADDRESSES
   * -------------------------------------------------------
   */

  const factoryAddresses =
    Array.isArray(
      savedData.factoryAddresses
    )
      ? savedData.factoryAddresses
      : [];

  /*
   * -------------------------------------------------------
   * RETURN CLEAN DATA
   * -------------------------------------------------------
   */

  return {
    ...initialOnboardingData,

    ...savedData,

    account: {
      ...initialOnboardingData.account,
      ...(savedData.account || {}),
    },

    businessRoles,

    companyProfile: {
      ...initialOnboardingData.companyProfile,
      ...(savedData.companyProfile || {}),
    },

    gst: {
      ...initialOnboardingData.gst,
      ...(savedData.gst || {}),
    },

    pan: {
      ...initialOnboardingData.pan,
      ...(savedData.pan || {}),
    },

    udyam: {
      ...initialOnboardingData.udyam,
      ...(savedData.udyam || {}),
    },

    factoryAddresses,

    authorizedPerson: {
      ...initialOnboardingData.authorizedPerson,
      ...(savedData.authorizedPerson || {}),
    },

    submission: {
      ...initialOnboardingData.submission,
      ...(savedData.submission || {}),
    },
  };
};

/*
 * =========================================================
 * PROVIDER
 * =========================================================
 */

export function OnboardingProvider({
  children,
}) {
  const [onboarding, setOnboarding] =
    useState(() => {

      try {
        const savedData =
          localStorage.getItem(
            "takshaya_onboarding"
          );

        if (savedData) {
          return normalizeOnboardingData(
            JSON.parse(savedData)
          );
        }

      } catch (error) {
        console.error(
          "Failed to load onboarding data:",
          error
        );
      }

      return initialOnboardingData;
    });

  /*
   * -------------------------------------------------------
   * SAVE TO LOCAL STORAGE
   * -------------------------------------------------------
   */

  useEffect(() => {

    try {

      localStorage.setItem(
        "takshaya_onboarding",
        JSON.stringify(onboarding)
      );

    } catch (error) {

      console.error(
        "Failed to save onboarding data:",
        error
      );

    }

  }, [onboarding]);

  /*
   * =========================================================
   * UPDATE SECTION
   * =========================================================
   */

  const updateSection = (
    section,
    data
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        [section]: {
          ...(previous[section] || {}),
          ...data,
        },
      })
    );

  };

  /*
   * =========================================================
   * SET SECTION
   * =========================================================
   */

  const setSection = (
    section,
    data
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,
        [section]: data,
      })
    );

  };

  /*
   * =========================================================
   * UPDATE FIELD
   * =========================================================
   */

  const updateField = (
    section,
    field,
    value
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        [section]: {
          ...(previous[section] || {}),
          [field]: value,
        },
      })
    );

  };

  /*
   * =========================================================
   * BUSINESS ROLES
   * =========================================================
   */

  const setBusinessRoles = (
    roles
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        businessRoles:
          Array.isArray(roles)
            ? roles
            : [],
      })
    );

  };

  /*
   * =========================================================
   * FACTORY ADDRESS
   * =========================================================
   */

  const addFactoryAddress = (
    address
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        factoryAddresses: [
          ...(Array.isArray(
            previous.factoryAddresses
          )
            ? previous.factoryAddresses
            : []),

          {
            ...address,

            id:
              address.id ||
              `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,
          },
        ],
      })
    );

  };

  const updateFactoryAddress = (
    id,
    data
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        factoryAddresses:
          previous.factoryAddresses.map(
            (address) =>
              address.id === id
                ? {
                    ...address,
                    ...data,
                  }
                : address
          ),
      })
    );

  };

  const removeFactoryAddress = (
    id
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        factoryAddresses:
          previous.factoryAddresses.filter(
            (address) =>
              address.id !== id
          ),
      })
    );

  };

  /*
   * =========================================================
   * SUBMISSION
   * =========================================================
   */

  const updateSubmission = (
    data
  ) => {

    setOnboarding(
      (previous) => ({
        ...previous,

        submission: {
          ...previous.submission,
          ...data,
        },
      })
    );

  };

  /*
   * =========================================================
   * RESET
   * =========================================================
   */

  const resetOnboarding = () => {

    localStorage.removeItem(
      "takshaya_onboarding"
    );

    localStorage.removeItem(
      "takshaya_onboarding_status"
    );

    localStorage.removeItem(
      "takshaya_application_id"
    );

    setOnboarding(
      initialOnboardingData
    );

  };

  /*
   * =========================================================
   * PROVIDER
   * =========================================================
   */

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

/*
 * =========================================================
 * HOOK
 * =========================================================
 */

export function useOnboarding() {

  const context =
    useContext(
      OnboardingContext
    );

  if (!context) {

    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );

  }

  return context;
}