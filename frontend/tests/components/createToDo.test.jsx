import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";
import { createToDo } from "../../src/services/todo";

import { CreateToDo } from "../../src/components/ToDo/CreateToDo";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

// Mocking the createToDo service
vi.mock("../../src/services/todo", () => {
    const createToDoMock = vi.fn();
    return { createToDo: createToDoMock };
});

// Reusable function for filling out createToDo form
const completeCreateToDoForm = async () => {
    const user = userEvent.setup();

    const titleInputEl = screen.getByLabelText("Title:");
    const descriptionInputEl = screen.getByLabelText("Description:");
    const dueDateInputEl = screen.getByLabelText("Due Date:");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(titleInputEl, "Test Title");
    await user.type(descriptionInputEl, "Test Description");
    await user.type(dueDateInputEl, "2024-12-31");
    await user.click(submitButtonEl);
};

describe("CreateToDo Component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows a user to create a ToDo", async () => {
        localStorage.setItem("userId", "mockUserId");
        render(<CreateToDo token="mockToken" tripId="mockTripId"/>);

        await completeCreateToDoForm();

        expect(createToDo).toHaveBeenCalledWith(
            "mockToken",
            "Test Title",
            "Test Description",
            "2024-12-31",
            false,
            "mockTripId",
            "mockUserId"
        );
    });

    test("displays an error message when no title is provided", async () => {
        render(<CreateToDo token="mockToken" tripId="mockTripId"/>);

        const submitButtonEl = screen.getByRole("submit-button");

        await userEvent.click(submitButtonEl);

        const errorMessage = screen.getByRole("error");
        expect(errorMessage.textContent).toEqual("Please enter a title.");
    });

    test("displays an error message when no description is provided", async () => {
        render(<CreateToDo token="mockToken" tripId="mockTripId"/>);

        const titleInputEl = screen.getByLabelText("Title:");
        const submitButtonEl = screen.getByRole("submit-button");

        await userEvent.type(titleInputEl, "Test Title");
        await userEvent.click(submitButtonEl);

        const errorMessage = screen.getByRole("error");
        expect(errorMessage.textContent).toEqual("Please enter a description.");
    });

    test("displays an error message when no due date is provided", async () => {
        render(<CreateToDo token="mockToken" tripId="mockTripId"/>);

        const titleInputEl = screen.getByLabelText("Title:");
        const descriptionInputEl = screen.getByLabelText("Description:");
        const submitButtonEl = screen.getByRole("submit-button");

        await userEvent.type(titleInputEl, "Test Title");
        await userEvent.type(descriptionInputEl, "Test Description");
        await userEvent.click(submitButtonEl);

        const errorMessage = screen.getByRole("error");
        expect(errorMessage.textContent).toEqual("Please enter a valid due date.");
    });

    test("displays an error message when due date is in the past", async () => {
        render(<CreateToDo token="mockToken" tripId="mockTripId"/>);

        const titleInputEl = screen.getByLabelText("Title:");
        const descriptionInputEl = screen.getByLabelText("Description:");
        const dueDateInputEl = screen.getByLabelText("Due Date:");
        const submitButtonEl = screen.getByRole("submit-button");

        await userEvent.type(titleInputEl, "Test Title");
        await userEvent.type(descriptionInputEl, "Test Description");
        await userEvent.type(dueDateInputEl, "2020-12-31");
        await userEvent.click(submitButtonEl);

        const errorMessage = screen.getByRole("error");
        expect(errorMessage.textContent).toEqual("Please enter a future date.");
    });
});