import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
  const user = userEvent.setup();

  const firstnameInputEl = screen.getByLabelText("Firstname:");
  const lastnameInputEl = screen.getByLabelText("Lastname:");
  const usernameInputEl = screen.getByLabelText("Username:");
  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(firstnameInputEl, "Test");
  await user.type(lastnameInputEl, "User");
  await user.type(usernameInputEl, "testuser");
  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "Password1!");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("Test", "User", "testuser", "test@email.com", "Password1!");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("displays an error message when no firstname is provided", async () => {
    render(<SignupPage />);

    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.click(submitButtonEl);

    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Please enter your first name.");
  });

  test("displays an error message when no lastname is provided", async () => {
    render(<SignupPage />);
    const firstnameInputEl = screen.getByLabelText("Firstname:");
    await userEvent.type(firstnameInputEl, "Test");

    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.click(submitButtonEl);

    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Please enter your last name.");
  });

  test("displays an error message when username is too short", async () => {
    render(<SignupPage />);
    const firstnameInputEl = screen.getByLabelText("Firstname:");
    await userEvent.type(firstnameInputEl, "Test");
    const lastnameInputEl = screen.getByLabelText("Lastname:");
    await userEvent.type(lastnameInputEl, "User");

    const usernameInputEl = screen.getByLabelText("Username:");
    await userEvent.type(usernameInputEl, "test");

    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.click(submitButtonEl);

    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Username must be at least 5 characters.");
  });

  test("displays an error message when an invalid email is provided", async () => {
    render(<SignupPage />);
    const firstnameInputEl = screen.getByLabelText("Firstname:");
    await userEvent.type(firstnameInputEl, "Test");
    const lastnameInputEl = screen.getByLabelText("Lastname:");
    await userEvent.type(lastnameInputEl, "User");
    const usernameInputEl = screen.getByLabelText("Username:");
    await userEvent.type(usernameInputEl, "testuser");

    const emailInputEl = screen.getByLabelText("Email:");
    await userEvent.type(emailInputEl, "testemail.com");

    const submitButtonEl = screen.getByRole("submit-button");

    await userEvent.click(submitButtonEl);

    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Please enter a valid email address.");
  });

  test("displays an error message when an invalid password is provided", async () => {
    render(<SignupPage />);
    const firstnameInputEl = screen.getByLabelText("Firstname:");
    await userEvent.type(firstnameInputEl, "Test");
    const lastnameInputEl = screen.getByLabelText("Lastname:");
    await userEvent.type(lastnameInputEl, "User");
    const usernameInputEl = screen.getByLabelText("Username:");
    await userEvent.type(usernameInputEl, "testuser");
    const emailInputEl = screen.getByLabelText("Email:");
    await userEvent.type(emailInputEl, "test@email.com");
    const passwordInputEl = screen.getByLabelText("Password:");
    await userEvent.type(passwordInputEl, "password");
    const submitButtonEl = screen.getByRole("submit-button");
    await userEvent.click(submitButtonEl);
    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Password must be at least 8 characters, with at least one special character, one uppercase and one lower case.");
  });

  test("displays an error message when the username already exists", async () => {
    render(<SignupPage />);
    const firstnameInputEl = screen.getByLabelText("Firstname:");
    await userEvent.type(firstnameInputEl, "Test");
    const lastnameInputEl = screen.getByLabelText("Lastname:");
    await userEvent.type(lastnameInputEl, "User");
    const usernameInputEl = screen.getByLabelText("Username:");
    await userEvent.type(usernameInputEl, "testuser");
    const emailInputEl = screen.getByLabelText("Email:");
    await userEvent.type(emailInputEl, "test@email.com");
    const passwordInputEl = screen.getByLabelText("Password:");
    await userEvent.type(passwordInputEl, "Password1!");
    const submitButtonEl = screen.getByRole("submit-button");
    signup.mockRejectedValue(new Error("Username already exists"));
    await userEvent.click(submitButtonEl);
    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Username already exists. Please enter a valid username.");
  });

  test("displays an error message when the email already exists", async () => {
    render(<SignupPage />);
    const firstnameInputEl = screen.getByLabelText("Firstname:");
    await userEvent.type(firstnameInputEl, "Test");
    const lastnameInputEl = screen.getByLabelText("Lastname:");
    await userEvent.type(lastnameInputEl, "User");
    const usernameInputEl = screen.getByLabelText("Username:");
    await userEvent.type(usernameInputEl, "testuser");
    const emailInputEl = screen.getByLabelText("Email:");
    await userEvent.type(emailInputEl, "test@email.com");
    const passwordInputEl = screen.getByLabelText("Password:");
    await userEvent.type(passwordInputEl, "Password1!");
    const submitButtonEl = screen.getByRole("submit-button");
    signup.mockRejectedValue(new Error("Email already exists"));
    await userEvent.click(submitButtonEl);
    const errorMessage = screen.getByRole("error");
    expect(errorMessage.textContent).toEqual("Email already exists. Please enter a valid email address.");
  });
});