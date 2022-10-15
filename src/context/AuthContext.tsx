import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { auth } from "../firebase/config";

type Props = {
  children: React.ReactNode;
};

interface IAuthState {
  user: User | null;
  authIsReady: boolean;
}

type Action =
  | {
      type: "LOGIN";
      payload: {
        user: User | null;
      };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "AUTH_IS_READY";
    };

type Dispatch = React.Dispatch<Action>;
type Reducer = React.Reducer<IAuthState, Action>;

interface IAuthContext {
  authState: IAuthState;
  dispatch: Dispatch;
}

const defaultContext = {
  authState: {
    user: null,
    authIsReady: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: (): void => {},
};

export const AuthContext = createContext<IAuthContext>(defaultContext);

const authReducer: Reducer = (state: IAuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, defaultContext.authState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: { user } });
      }
      dispatch({ type: "AUTH_IS_READY" });
    });
  }, []);

  const value = useMemo(
    () => ({
      authState,
      dispatch,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
