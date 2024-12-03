import { Dispatch, ReactNode, createContext, useReducer } from "react";

interface FormState {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  location: { country: string; city: string };
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: string;
  };
}

const initialState: FormState = {
  personalInfo: { firstName: "", lastName: "", email: "", phone: "" },
  location: { country: "", city: "" },
  paymentInfo: { cardNumber: "", expiryDate: "", cvv: "", billingAddress: "" },
};

type Action =
  | { type: "UPDATE_PERSONAL_INFO"; payload: FormState["personalInfo"] }
  | { type: "UPDATE_LOCATION"; payload: FormState["location"] }
  | { type: "UPDATE_PAYMENT_INFO"; payload: FormState["paymentInfo"] };

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return { ...state, personalInfo: action.payload };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_PAYMENT_INFO":
      return { ...state, paymentInfo: action.payload };
    default:
      return state;
  }
};

const FormContext = createContext<{
  state: FormState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
