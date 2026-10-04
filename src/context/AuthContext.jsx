import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "../lib/supabaseClient";

/*
 * Application statuses stored in verification_applications.status.
 * Only APPROVED companies may use the marketplace and RFQs.
 */
export const APPLICATION_STATUS = {
  PENDING_REVIEW: "PENDING_REVIEW",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [application, setApplication] = useState(null);
  const [applicationLoading, setApplicationLoading] = useState(false);

  /*
   * Restore the session on page load and keep it in sync.
   * The callback only stores the session; database calls happen in the
   * effect below, because awaiting Supabase calls inside this callback
   * can deadlock the auth client.
   */
  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const userId = session?.user?.id ?? null;

  const loadApplication = useCallback(async () => {
    if (!userId) {
      setApplication(null);
      return;
    }

    setApplicationLoading(true);

    const { data, error } = await supabase
      .from("verification_applications")
      .select(
        "id, status, legal_company_name, business_roles, submitted_at, rejection_reason"
      )
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Could not load verification application:", error);
      setApplication(null);
    } else {
      setApplication(data ?? null);
    }

    setApplicationLoading(false);
  }, [userId]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setApplication(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      application,
      isApproved: application?.status === APPLICATION_STATUS.APPROVED,
      loading: authLoading,
      applicationLoading,
      refreshApplication: loadApplication,
      signOut,
    }),
    [
      session,
      application,
      authLoading,
      applicationLoading,
      loadApplication,
      signOut,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
