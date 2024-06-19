import createFetchMock from "vitest-fetch-mock";
import { describe, expect, test, vi } from "vitest";

import { addExpense, getExpenses, deleteExpense } from "../../src/services/expense";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("expense service", () => {
    describe("getExpenses", () => {
        test("calls the backend url for all expenses", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ expenses: [], token: "newToken" }), {
                status: 200,
            });

            await getExpenses(testToken);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/expense`);
            expect(options.method).toEqual("GET");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
        });

        test("returns the expenses if the request was a success", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ expenses: [], token: "newToken" }), {
                status: 200,
            });

            const result = await getExpenses(testToken);
            expect(result.expenses).toEqual([]);
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await getExpenses(testToken);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to fetch expense"
                );
            }
        });
    });

    describe("addExpense", () => {
        test("calls the backend url to create an expense", async () => {
            const testToken = "testToken";
            const description = "test description";
            const amount = 100;
            const date = "2022-12-12";
            const category = "test category";
            const budgetId = "test budgetId";

            fetch.mockResponseOnce(JSON.stringify({ expense: {}, token: "newToken" }), {
                status: 200,
            });

            await addExpense(testToken, description, amount, date, category, budgetId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/expense`);
            expect(options.method).toEqual("POST");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.body).toEqual(JSON.stringify({
                token: testToken,
                description: description, 
                amount: amount, 
                date: date, 
                category: category, 
                budgetId: budgetId, 
            }));
        });

        test("returns the expense if the request was a success", async () => {
            const testToken = "testToken";
            const description = "test description";
            const amount = 100;
            const date = "2022-12-12";
            const category = "test category";
            const budgetId = "test budgetId";

            fetch.mockResponseOnce(JSON.stringify({ expense: {}, token: "newToken" }), {
                status: 200,
            });

            const result = await addExpense(testToken, description, amount, date, category, budgetId);
            expect(result).toEqual({});
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const description = "test description";
            const amount = 100;
            const date = "2022-12-12";
            const category = "test category";
            const budgetId = "test budgetId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await addExpense(testToken, description, amount, date, category, budgetId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to add expense"
                );
            }
        });
    });

    describe("deleteExpense", () => {
        test("calls the backend url to delete an expense", async () => {
            const testToken = "testToken";
            const expenseId = "testExpenseId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Expense Deleted", token: "newToken" }), {
                status: 200,
            });

            await deleteExpense(testToken, expenseId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/expense`);
            expect(options.method).toEqual("DELETE");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const expenseId = "testExpenseId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await deleteExpense(testToken, expenseId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to delete expense. Received status 401. Expected 200"
                );
            }
        });
    });
});