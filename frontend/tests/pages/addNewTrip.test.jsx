import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {beforeEach, expect, test, vi} from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { useNavigate } from 'react-router-dom';
import { newTrip } from '../../src/services/trips';

import { AddNewTrip } from '../../src/pages/AddNewTrip/AddNewTrip';
import jwt from 'jsonwebtoken';

createFetchMock(vi).enableMocks();

vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

vi.mock("../../src/services/trips", () => {
    const newTripMock = vi.fn();
    return { newTrip: newTripMock };
});

const completeNewTripForm = async () => {
    const user = userEvent.setup();

    const locationInputEl = screen.getByLabelText("Location:");
    const startDateInputEl = screen.getByLabelText("Start Date:");
    const endDateInputEl = screen.getByLabelText("End Date:");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(locationInputEl, "Test");
    await user.type(startDateInputEl, "2025-06-12");
    await user.type(endDateInputEl, "2025-06-24");
    await user.click(submitButtonEl);
};

describe("Add new trip page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows user to create a new trip", async () => {
        fetch.mockResponseOnce(JSON.stringify({ token: "testToken"}), {
        status:201,
        });
        render(<AddNewTrip />);
        await completeNewTripForm();
        expect(newTrip).toHaveBeenCalledWith("testToken", "Test", "2025-06-12", "2025-06-24");
    });

    // test("nagivates to /trips/:id on successful trip creation", async () => {
    //     render(<AddNewTrip/>);
    //     const navigateMock = useNavigate();
    //     await completeNewTripForm();
    //     expect(navigateMock).toHaveBeenCalledWith(`/trips/${}`)
    //     // will have to call this by position - need to use findall and then get its id.

    // })

    test("no trip created when location not supplied", async () => {
        render(<AddNewTrip/>)
        const startDateInputEl = screen.getByLabelText("Start Date:");
        const endDateInputEl = screen.getByLabelText("End Date:");
        await userEvent.type(startDateInputEl, "2025-06-12");
        await userEvent.type(endDateInputEl, "2025-06-24");
        const errorMessage = screen.getByRole("error")
        expect(errorMessage.textContent).toEqual("Location must be provided.")
    })
})