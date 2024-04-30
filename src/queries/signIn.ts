import { useMutation } from "@tanstack/react-query";
import { api, endPoints } from "../api";
import { LoginValueType } from "../types/user";
import { AxiosResponse } from "axios";

/**
 * Custom hook for handling sign-in mutations.
 * 
 * @param onSuccess Callback function invoked upon successful sign-in
 * @param onError Callback function invoked upon encountering an error during sign-in
 * @returns An object containing mutation-related functions and state
 */
interface useSignInMutationProps {
  onSuccess: (response: AxiosResponse<any, any>) => void;
  onError: (error: Error) => void;
}

const useSignInMutation = ({ onSuccess, onError }: useSignInMutationProps) => {
  /**
   * Function to handle the sign-in mutation
   * @param userData The user data for sign-in
   * @returns Promise containing the result of the sign-in mutation
   */
  const mutation = useMutation({
    mutationFn: (userData: LoginValueType) => {
      return api.post(endPoints.auth.logIn, userData);
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};

export { useSignInMutation };
