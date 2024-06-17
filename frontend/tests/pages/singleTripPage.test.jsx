import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {expect, test, vi} from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { SingleTripPage } from "../../src/pages/Trips/singleTripPage";

createFetchMock(vi).enableMocks();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    const useParamsMock = vi.fn(() => ({tripId : "testTripId"}));
    const useNavigateMock = vi.fn();
    return {
      ...actual,
      useNavigate: useNavigateMock,
      useParams: useParamsMock
    }
});

vi.mock("../../src/services/trips", () => {
    const getSingleTripMock = vi.fn(() => ({singleTrip : {
        _id: "testTripId",
        location: "Manchester",
        startDate: "2025-06-12",
        endDate: "2025-06-24"
    }}));
    return { getSingleTrip: getSingleTripMock };
});

describe("Single Trip Page", () => {
    test("display the details of a single trip", async () => {
        localStorage.setItem("token", "testToken")
        render(
            <BrowserRouter>
                <SingleTripPage />
            </BrowserRouter>
        );

        const h3 = screen.getByTestId("singleTripHeader");
        expect(h3.textContent).toEqual("Your Trip");
        await waitFor(() => {
            expect(screen.getByTestId("singleTripLocation").textContent).toEqual("Manchester");
        })
        expect(screen.getByTestId("singleTripStartDate").textContent).toEqual("2025-06-12");
        expect(screen.getByTestId("singleTripEndDate").textContent).toEqual("2025-06-24");
    })
})