import { ComponentType } from "react";


export const withDictionary = <P extends object>(
  WrappedComponent: ComponentType<P>,
  language:string
) => {
  // Return a new component that renders the WrappedComponent with the dictionary as a prop
  const WithDictionary: React.FC<P & {language:string}> = (props) => {
    return <WrappedComponent {...(props as P)} language={language} />;
  };
  return WithDictionary;
};
