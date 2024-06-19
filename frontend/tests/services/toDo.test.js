import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { getAllToDos, createToDo, deleteToDo, toggleCompleteToDo } from "../../src/services/todo";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("toDo service", () => {
    describe("getAllToDos", () => {
        test("calls the backend url for all toDos", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ toDos: [], token: "newToken" }), {
                status: 200,
            });

            await getAllToDos(testToken);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/toDos`);
            expect(options.method).toEqual("GET");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
        });

        test("returns the toDos if the request was a success", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ toDos: [], token: "newToken" }), {
                status: 200,
            });

            const result = await getAllToDos(testToken);
            expect(result.toDos).toEqual([]);
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await getAllToDos(testToken);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to fetch toDos. Received status 401. Expected 200"
                );
            }
        });
    })

    describe("createToDo", () => {
        test("calls the backend url to create a toDo", async () => {
            const testToken = "testToken";
            const testTitle = "testTitle";
            const testDescription = "testDescription";
            const testDueDate = "testDueDate";
            const testIsCompleted = false;
            const testTripId = "testTripId";
            const testUserId = "testUserId";

            fetch.mockResponseOnce(JSON.stringify({ message: "ToDo Created", token: "newToken", toDo: {} }), {
                status: 201,
            });

            await createToDo(testToken, testTitle, testDescription, testDueDate, testIsCompleted, testTripId, testUserId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/toDos`);
            expect(options.method).toEqual("POST");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.headers["Content-Type"]).toEqual("application/json");
            expect(options.body).toEqual(JSON.stringify({
                title: testTitle,
                description: testDescription,
                dueDate: testDueDate,
                isCompleted: testIsCompleted,
                tripId: testTripId,
                userId: testUserId,
            }));
        });

        test("returns the new toDo if the request was a success", async () => {
            const testToken = "testToken";
            const testTitle = "testTitle";
            const testDescription = "testDescription";
            const testDueDate = "testDueDate";
            const testIsCompleted = false;
            const testTripId = "testTripId";
            const testUserId = "testUserId";

            fetch.mockResponseOnce(JSON.stringify({ message: "ToDo Created", token: "newToken", toDo: {} }), {
                status: 201,
            });

            const result = await createToDo(testToken, testTitle, testDescription, testDueDate, testIsCompleted, testTripId, testUserId);
            expect(result.toDo).toEqual({});
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testTitle = "testTitle";
            const testDescription = "testDescription";
            const testDueDate = "testDueDate";
            const testIsCompleted = false;
            const testTripId = "testTripId";
            const testUserId = "testUserId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Internal server error" }), {
                status: 400,
            });

            try {
                await createToDo(testToken, testTitle, testDescription, testDueDate, testIsCompleted, testTripId, testUserId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to create toDo. Received status 400. Expected 201"
                );
            }
        });
    });

    describe("toggleCompleteToDo", () => {
        test("calls the backend url to toggle a toDo", async () => {
            const testToken = "testToken";
            const testToDoId = "testToDoId";

            fetch.mockResponseOnce(JSON.stringify({ message: "ToDo Completed", token: "newToken", toDo: {} }), {
                status: 200,
            });

            await toggleCompleteToDo(testToken, testToDoId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/toDos`);
            expect(options.method).toEqual("PUT");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.headers["Content-Type"]).toEqual("application/json");
            expect(options.body).toEqual(JSON.stringify({
                toDoId: testToDoId,
            }));
        });

        test("returns the toDo if the request was a success", async () => {
            const testToken = "testToken";
            const testToDoId = "testToDoId";

            fetch.mockResponseOnce(JSON.stringify({ message: "ToDo Completed", token: "newToken", toDo: {} }), {
                status: 200,
            });

            const result = await toggleCompleteToDo(testToken, testToDoId);
            expect(result.toDo).toEqual({});
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testToDoId = "testToDoId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Internal server error" }), {
                status: 400,
            });

            try {
                await toggleCompleteToDo(testToken, testToDoId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to toggle toDo. Received status 400. Expected 200"
                );
            }
        });
    });

    describe("deleteToDo", () => {
        test("calls the backend url to delete a toDo", async () => {
            const testToken = "testToken";
            const testToDoId = "testToDoId";

            fetch.mockResponseOnce(JSON.stringify({ message: "ToDo Deleted", token: "newToken" }), {
                status: 200,
            });

            await deleteToDo(testToken, testToDoId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/toDos`);
            expect(options.method).toEqual("DELETE");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.headers["Content-Type"]).toEqual("application/json");
            expect(options.body).toEqual(JSON.stringify({
                toDoId: testToDoId,
            }));
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testToDoId = "testToDoId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Internal server error" }), {
                status: 400,
            });

            try {
                await deleteToDo(testToken, testToDoId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to delete toDo. Received status 400. Expected 200"
                );
            }
        });
    });
});