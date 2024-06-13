import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from "vitest";
import '@testing-library/jest-dom';
import Navbar from '../../src/components/Navbar/navbar';

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

