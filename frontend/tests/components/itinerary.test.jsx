import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";
import { Itinerary } from "../../src/components/Itinerary/Itinerary";
import { deleteItinerary } from "../../src/services/itinerary";

// Mocking the deleteItinerary service
vi.mock("../../src/services/itinerary", () => {
    const deleteItineraryMock = vi.fn();
    return { deleteItinerary: deleteItineraryMock };
});

describe("Itinerary Component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows a user to delete an Itinerary", async () => {
        const itinerary = {
            _id: "mockItineraryId",
            activity: "Test Activity",
            date: "2024-12-31",
            startTime: "12:00",
            endTime: "14:00",
            tripId: "mockTripId",
        };
        render(<Itinerary itinerary={itinerary} token="mockToken" />);

        const deleteButtonEl = screen.getByText("Delete");

        await userEvent.click(deleteButtonEl);

        expect(deleteItinerary).toHaveBeenCalledWith("mockToken", "mockItineraryId");
    });
});