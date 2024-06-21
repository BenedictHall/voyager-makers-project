import createFetchMock from "vitest-fetch-mock";
import { describe, expect, test, vi } from "vitest";

import { getAllItineraries, createItinerary, deleteItinerary } from "../../src/services/itinerary";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("itinerary service", () => {
    describe("getAllItineraries", () => {
        test("calls the backend url for all itineraries", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ itineraries: [], token: "newToken" }), {
                status: 200,
            });

            await getAllItineraries(testToken);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/itineraries`);
            expect(options.method).toEqual("GET");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
        });

        test("returns the itineraries if the request was a success", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ itineraries: [], token: "newToken" }), {
                status: 200,
            });

            const result = await getAllItineraries(testToken);
            expect(result.itineraries).toEqual([]);
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await getAllItineraries(testToken);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to fetch itineraries. Received status 401. Expected 200"
                );
            }
        });
    })

    describe("createItinerary", () => {
        test("calls the backend url to create an itinerary", async () => {
            const testToken = "testToken";
            const testActivity = "testActivity";
            const testDate = "testDate";
            const testStartTime = "testStartTime";
            const testEndTime = "testEndTime";
            const testTripId = "testTripId";

            fetch.mockResponseOnce(JSON.stringify({ itinerary: {}, token: "newToken" }), {
                status: 201,
            });

            await createItinerary(testToken, testActivity, testDate, testStartTime, testEndTime, testTripId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/itineraries`);
            expect(options.method).toEqual("POST");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.body).toEqual(JSON.stringify({
                activity: testActivity,
                date: testDate,
                startTime: testStartTime,
                endTime: testEndTime,
                tripId: testTripId,
            }));
        });

        test("returns the new itinerary if the request was a success", async () => {
            const testToken = "testToken";
            const testActivity = "testActivity";
            const testDate = "testDate";
            const testStartTime = "testStartTime";
            const testEndTime = "testEndTime";
            const testTripId = "testTripId";

            fetch.mockResponseOnce(JSON.stringify({ itinerary: {}, token: "newToken" }), {
                status: 201,
            });

            const result = await createItinerary(testToken, testActivity, testDate, testStartTime, testEndTime, testTripId);
            expect(result.itinerary).toEqual({});
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testActivity = "testActivity";
            const testDate = "testDate";
            const testStartTime = "testStartTime";
            const testEndTime = "testEndTime";
            const testTripId = "testTripId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await createItinerary(testToken, testActivity, testDate, testStartTime, testEndTime, testTripId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to create itinerary. Received status 401. Expected 201"
                );
            }
        });
    })

    describe("deleteItinerary", () => {
        test("calls the backend url to delete an itinerary", async () => {
            const testToken = "testToken";
            const testItineraryId = "testItineraryId";

            fetch.mockResponseOnce(JSON.stringify({ token: "newToken" }), {
                status: 200,
            });

            await deleteItinerary(testToken, testItineraryId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/itineraries`);
            expect(options.method).toEqual("DELETE");
            expect(options.headers.Authorization).toEqual(`Bearer ${testToken}`);
            expect(options.body).toEqual(JSON.stringify({
                itineraryId: testItineraryId,
            }));
        });

        test("returns the new token if the request was a success", async () => {
            const testToken = "testToken";
            const testItineraryId = "testItineraryId";

            fetch.mockResponseOnce(JSON.stringify({ token: "newToken" }), {
                status: 200,
            });

            const result = await deleteItinerary(testToken, testItineraryId);
            expect(result.token).toEqual("newToken");
        });

        test("throws an error if the request failed", async () => {
            const testToken = "testToken";
            const testItineraryId = "testItineraryId";

            fetch.mockResponseOnce(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });

            try {
                await deleteItinerary(testToken, testItineraryId);
            } catch (err) {
                expect(err.message).toEqual(
                    "Unable to delete itinerary. Received status 401. Expected 200"
                );
            }
        });
    });
});
