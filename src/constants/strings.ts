export const Strings = {
  // Sign In page String
  welcomeBack: "Welcome Back 👋",
  secondaryText:
    "Today is a new day. It's your day. You shape it. Sign in to start managing your expenses.",
  email: "Email",
  emailPlaceholder: "Example@email.com",
  password: "Password",
  passwordPlaceholder: "At least 8 characters",
  signIn: "Sign In",
  forgetPassword: "Forget Password?",
  signUpLinkText: "Don't you have an account?",
  signUp: "Sign Up",
  successSignInMsg: "Successfully signed in!",

  //Sign up page string
  welcomeText: "Welcome to Expense Tracker",
  name: "Name",
  confirmPassword: "Confirm Password",
  signInLinkText: "Already have an account?",
  namePlaceholder: "Alex Carry",
  nameIsRequired: "Name is required",
  invalidEmail: "Invalid email",
  emailIsRequired: "Email is required",
  passwordRules: "Password must be at least 8 characters",
  passwordIsRequired: "Password is required",
  passwordMustMatch: "Password must match",
  confirmPasswordIsRequired: "Confirm Password is required",
  successSignUpMsg: "Successfully signed up!",

  //Home page string
  addExpense: "Add Expense",
  filters: "FILTERS",
  categories: "CATEGORIES",
  amount: "AMOUNT",
  date: "DATE",
  from: "From",
  to: "To",
  addNewExpanse: "Add New Expense",
  title: "Title",
  amountStr: "Amount",
  description: "Description",
  dateStr: "Date",
  categoryStr: "Category",
  submit: "Submit",
  titleRequired: "Title is required",
  descriptionRequired: "Description is required",
  amountRequired: "Amount is required",
  dateRequired: "Date is required",
  categoryRequired: "Category is required",
  titleAtLeast3Characters: "The title should be at least of 3 characters",
  descriptionAtLeast3Characters:
    "The description should be at least of 3 characters",
  amountPositive: "The Amount should be at greater than zero",
  invalidDate: "Invalid Date",
  profile: "Profile",
  logout: "Logout",
  navbarHeading: "Expense Tracker App",

  apiErrors: {
    requestTimeout:
      "Request timed out. Please check your internet connection or try again later.",
    networkError: "Network error. Please check your internet connection.",
    requestCanceled: "Request canceled. Please try again or contact support.",
    unauthorizedAccess: "Unauthorized access. Please log in again.",
    forbiddenAccess:
      "Forbidden. You do not have permission to access this resource.",
    resourceNotFound: "Resource not found.",
    internalServerError:
      "Internal server error. Please try again later or contact support.",
    unexpectedError: "Unexpected error occurred. Please try again.",
    badRequest: "Bad request. Please check your request parameters.",
    appleSignInError: "Apple Sign in failed!",
    appleSignInCancel: "User canceled Apple Sign in.",
  },

  queryKeys: {
    expanses: 'expenses'
  }
} as const;
