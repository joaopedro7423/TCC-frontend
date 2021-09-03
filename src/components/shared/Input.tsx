import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  bold?: boolean;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, bold = false, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          htmlFor={name}
          fontWeight={bold ? "semibold" : "normal"}
          fontSize="sm"
          color="white"
        >
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="cinza.500"
        fontSize="sm"
        variant="flushed"
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage  fontWeight="semibold">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
