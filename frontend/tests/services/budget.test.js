import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { getBudgets, addBudget, deleteBudget, calculateRemainingBudget } from "../../src/services/budget";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("budget service", () => {
    describe("getBudgets", () => {
        test("calls the backend url for all budgets", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ budgets: [], token: "newToken" }), {
                status: 200,
            });

            await getBudgets(testToken);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/budget`);
            expect(options.method).toEqual("GET");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
        });

        test("returns the budgets if the request was a success", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ budgets: [], token: "newToken" }), {
                status: 200,
            });

            const result = await getBudgets(testToken);
            expect(result.budgets).toEqual([]);
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await getBudgets(testToken);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to fetch budget"
                );
            }
        });
    });

    describe("addBudget", () => {
        test("calls the backend url to create a budget", async () => {
            const testToken = "testToken";
            const testTitle = "testTitle";
            const testAmount = "testAmount";
            const testTripId = "testTripId";

            fetch.mockResponseOnce(JSON.stringify({ budget: { title: testTitle, amount: testAmount, tripId: testTripId }, token: "newToken" }), {
                status: 200,
            });

            await addBudget(testToken, testTitle, testAmount, testTripId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/budget`);
            expect(options.method).toEqual("POST");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.body).toEqual(JSON.stringify({ token: testToken, title: testTitle, amount: testAmount, tripId: testTripId }));
        });

        test("returns the budget if the request was a success", async () => {
            const testToken = "testToken";
            const testTitle = "testTitle";
            const testAmount = "testAmount";
            const testTripId = "testTripId";

            fetch.mockResponseOnce(JSON.stringify({ budget: {}, token: "newToken" }), {
                status: 200,
            });

            const result = await addBudget(testToken, testTitle, testAmount, testTripId);
            expect(result).toEqual({});
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testTitle = "testTitle";
            const testAmount = "testAmount";
            const testTripId = "testTripId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await addBudget(testToken, testTitle, testAmount, testTripId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to add budget"
                );
            }
        });
    });

    describe("deleteBudget", () => {
        test("calls the backend url to delete a budget", async () => {
            const testToken = "testToken";
            const testBudgetId = "testBudgetId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Budget Deleted", token: "newToken" }), {
                status: 200,
            });

            await deleteBudget(testToken, testBudgetId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/budget`);
            expect(options.method).toEqual("DELETE");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testBudgetId = "testBudgetId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await deleteBudget(testToken, testBudgetId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to delete budget. Received status 401. Expected 200"
                );
            }
        });
    });
});