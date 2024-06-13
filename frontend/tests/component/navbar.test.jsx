import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from "vitest";
import '@testing-library/jest-dom';
import Navbar from '../../src/components/Navbar/navbar';

// set up localStorage mock ?
const localStroageMock = (()=>{
    let store ={};
    return {
        getItem(key) {
            return store[key] || null;
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store={};
        }
    };
})();

//I need to mock the modules
// vi.mock("react-router-dom", () => {
//     const originalModule = vi.importActual('react-router-dom');
//     return {
//         ...originalModule,
//         useNavigate: vi.fn(()=> vi.fn())
//     }
//     // const navigateMock = vi.fn();
//     // const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
//     // return { useNavigate: useNavigateMock };
// });

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(() => vi.fn()),
    }
});

describe('test Navbar component', ()=>{
    beforeEach(()=>{
        localStorage.clear();
        vi.resetAllMocks()
    });

    test('navigates to the dashboard when "Voyager" is clicked', () => {
        render(<Navbar />, {wrapper: MemoryRouter});
        const voyagerLink = screen.getByText('Voyager');
        userEvent.click(voyagerLink);
        expect(voyagerLink.closest('a')).toHaveAttribute('href', '/dashboard');
    });

    test('renders all navigation links correctly', () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        expect(screen.getByText('Voyager').closest('a')).toHaveAttribute('href', '/dashboard');
        expect(screen.getByText('My To Do').closest('a')).toHaveAttribute('href', '/todo');
        expect(screen.getByText('My Budget').closest('a')).toHaveAttribute('href', '/budget');
    });
});