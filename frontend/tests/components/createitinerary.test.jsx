import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";
import { createItinerary } from "../../src/services/itinerary";
import { CreateItinerary } from "../../src/components/Itinerary/CreateItinerary";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

// Mocking the createItinerary service
vi.mock("../../src/services/itinerary", () => {
    const createItineraryMock = vi.fn();
    return { createItinerary: createItineraryMock };
});

// Reusable function for filling out createItinerary form
const completeCreateItineraryForm = async () => {
    const user = userEvent.setup();

    const activityInputEl = screen.getByRole("activity");
    const dateInputEl = screen.getByRole("date");
    const startTimeInputEl = screen.getByRole("start-time");
    const endTimeInputEl = screen.getByRole("end-time");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(activityInputEl, "Test Activity");
    await user.type(dateInputEl, "2024-12-31");
    await user.type(startTimeInputEl, "12:00");
    await user.type(endTimeInputEl, "14:00");
    await user.click(submitButtonEl);
};

describe("CreateItinerary Component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows a user to create an Itinerary", async () => {
        localStorage.setItem("userId", "mockUserId");
        render(<CreateItinerary token="mockToken" tripId="mockTripId"/>);

        await completeCreateItineraryForm();

        expect(createItinerary).toHaveBeenCalledWith(
            "mockToken",
            "Test Activity",
            "2024-12-31",
            "12:00",
            "14:00",
            "mockTripId",
        );
    });

    test("displays an error message when no activity is provided", async () => {
        render(<CreateItinerary token="mockToken" tripId="mockTripId"/>);

        const user = userEvent.setup();
        const submitButtonEl = screen.getByRole("submit-button");

        await user.click(submitButtonEl);

        const errorMessage = screen.getByRole("error");
        expect(errorMessage.textContent).toEqual("Please enter an activity.");
    });
});