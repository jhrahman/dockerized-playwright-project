export const loginData = [
  {
    username: "tester12sffrf3@example.com",
    password: "test123",
    expected: {
      type: "success",
    },
  },
  {
    username: "",
    password: "",
    expected: {
      type: "browserValidation",
      field: "email",
    },
  },
  {
    username: "wrong@example.com",
    password: "test123",
    expected: {
      type: "serverError",
      message: "Your email or password is incorrect!",
    },
  },
  {
    username: "tester12sffrf3@example.com",
    password: "wrongPassword",
    expected: {
      type: "serverError",
      message: "Your email or password is incorrect!",
    },
  },
];