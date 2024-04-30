import { useMutation } from "@tanstack/react-query";
import { api, endPoints } from "../api";
import { SignUpRequest } from "../types/user";
import { AxiosResponse } from "axios";

/**
 * Custom hook for handling sign-up mutations.
 * 
 * @param onSuccess Callback function invoked upon successful sign-up
 * @param onError Callback function invoked upon encountering an error during sign-up
 * @returns An object containing mutation-related functions and state
 */
interface useSignUpMutationProps {
  onSuccess: (response: AxiosResponse<any, any>) => void;
  onError: (error: Error) => void;
}

const useSignUpMutation = ({ onSuccess, onError }: useSignUpMutationProps) => {
  /**
   * Function to handle the sign-up mutation
   * @param userData The user data for sign-up
   * @returns Promise containing the result of the sign-up mutation
   */
  const mutation = useMutation({
    mutationFn: (userData: SignUpRequest) => {
      return api.post(endPoints.auth.signUp, userData);
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};

export { useSignUpMutation };
