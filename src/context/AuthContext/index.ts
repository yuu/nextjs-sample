import { createContext, useContext } from "react";
import { Session } from "next-auth";
import { type SessionContextValue } from "next-auth/react";

type StatusType =
  | SessionContextValue<true>["status"]
  | SessionContextValue<false>["status"];

export type AuthContext = {
  status: StatusType;
  session: Session | null;
  signup: () => Promise<void>;
  signin: () => Promise<void>;
  signout: () => Promise<void>;
};

const authContext = createContext<AuthContext>(undefined!);

export const AuthContextProvider = authContext.Provider;

export const AuthContextConsumer = authContext.Consumer;

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};
