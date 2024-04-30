/**
 * Represents a user entity.
 */
export interface User {
  /** The email address of the user. */
  email: string;
  /** The full name of the user. */
  full_name: string;
  /** The phone number of the user. */
  phone_number: string;
  /** The URL to the user's profile picture. */
  profileSignedUrl: string;
  /** The authentication token associated with the user. */
  token: string;
}

/**
 * Represents the values submitted in the login form.
 */
export interface LoginValueType {
  /** The email address entered in the login form. */
  email: string;
  /** The password entered in the login form. */
  password: string;
}

/**
 * Represents the values submitted in the sign-up form.
 */
export interface SignUpRequest {
  /** The full name of the user signing up. */
  name: string;
  /** The email address of the user signing up. */
  email: string;
  /** The password chosen by the user for signing up. */
  password: string;
  /** The confirmation of the password chosen by the user for signing up. */
  confirmPassword: string;
}
