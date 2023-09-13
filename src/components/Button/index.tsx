
import React from "react";

interface InputProps {
  icon?: string;
  disabled?: boolean;
  text: string;
  full?: boolean
  isLoading?: boolean;
  primary?: boolean;
  ghost?: boolean;
  auth?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  click?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  type,
  click,
  icon,
  disabled,
  text,
  isLoading,
  full,
  primary,
  ghost,
  auth,
  ...rest
}: InputProps) => {
 

  return (
    <button
      disabled={disabled || isLoading}
      onClick={click}
      {...rest}
      type={type}
      className={`btn ${full && "w-full"} ${auth && "auth"} ${primary && "primary"} ${ghost && "ghost"} `}
    >
      {isLoading && (
        <div className="loader-body">
          <div className="loader-body-roller"></div>
        </div>
      )}

      {icon && icon}

      {/* <div className="w-2"></div> */}

      { <p className={`capitalize`}>{text}</p>}
    </button>
  );
};

export default Button;
