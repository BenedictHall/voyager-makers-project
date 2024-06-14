import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";
import { ToDo } from "../../src/components/ToDo/ToDo";
import { toggleCompleteToDo, deleteToDo } from "../../src/services/todo";


// Mocking the toggleCompleteToDo and deleteToDo service
vi.mock("../../src/services/todo", () => {
    const toggleCompleteToDoMock = vi.fn();
    const deleteToDoMock = vi.fn();
    return { toggleCompleteToDo: toggleCompleteToDoMock, deleteToDo: deleteToDoMock };
});


describe("ToDo Component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows a user to toggle a ToDo's completion status", async () => {
        const toDo = {
            _id: "mockToDoId",
            title: "Test Title",
            description: "Test Description",
            dueDate: "2024-12-31",
            isCompleted: false,
            tripId: "mockTripId",
            userId: "mockUserId",
        };
        render(<ToDo toDo={toDo} token="mockToken" />);

        const toggleCompleteButtonEl = screen.getByText("Mark Complete");

        await userEvent.click(toggleCompleteButtonEl);

        expect(toggleCompleteToDo).toHaveBeenCalledWith("mockToken", "mockToDoId");
    });

    test("allows a user to delete a ToDo", async () => {
        const toDo = {
            _id: "mockToDoId",
            title: "Test Title",
            description: "Test Description",
            dueDate: "2024-12-31",
            isCompleted: false,
        };
        render(<ToDo toDo={toDo} token="mockToken" />);

        const deleteButtonEl = screen.getByText("Delete");

        await userEvent.click(deleteButtonEl);

        expect(deleteToDo).toHaveBeenCalledWith("mockToken", "mockToDoId");
    });
});