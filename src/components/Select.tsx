import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

type Option = { value: string; text: string };

interface SelectProps extends ChakraSelectProps {
  label?: string;
  name: string;
  placeholder?: string;
  bold?: boolean;
  error?: FieldError;
  options: Option[];
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    label,
    name,
    placeholder = "",
    bold = false,
    error = null,
    options,
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel
          htmlFor={name}
          fontWeight={bold ? "semibold" : "normal"}
          fontSize="sm"
        >
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        id={name}
        name={name}
        placeholder={placeholder}
        focusBorderColor="telegram"
        fontSize="sm"
        variant="flushed"
        ref={ref}
        {...rest}
      >
        {options.map((option) => (
          <option
            style={{ color: "#000" }}
            value={option.value}
            key={option.value}
          >
            {option.text}
          </option>
        ))}
      </ChakraSelect>
      {!!error && (
        <FormErrorMessage  fontWeight="semibold">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
