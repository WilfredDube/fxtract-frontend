export const SignInData = [
  {
    label: "Email",
    name: "email",
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const signUpData = [
  {
    label: "Firstname",
    name: "firstname",
    type: "text",
    width: 6,
  },
  {
    label: "Lastname",
    name: "lastname",
    type: "text",
    width: 6,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    width: 12,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    width: 12,
  },
  {
    label: "Confirm password",
    name: "confirmPassword",
    type: "password",
    width: 12,
  },
];

export const ForgotPasswordData = {
  label: "Email",
  name: "email",
  type: "text",
};

export const verificationData = {
  label: "Verification code",
  name: "code",
  type: "text",
};

export const passwordResetData = [
  {
    label: "New password",
    name: "password",
    type: "password",
  },
  {
    label: "Confirm password",
    name: "confirmPassword",
    type: "password",
  },
];

export const projectDeletionData = {
  label: "Project name",
  name: "title",
  type: "text",
};

export const projectCreationData = [
  {
    label: "Title",
    name: "title",
    type: "text",
    multiline: false,
    focus: true,
    rows: 0,
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    multiline: true,
    focus: false,
    rows: 5,
  },
];
