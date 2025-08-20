// ErrorPage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';
import "@testing-library/jest-dom/vitest"

describe('ErrorPage', () => {
    it('renders the error message and navigation link', () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Oops! Page not found.')).toBeInTheDocument();
        expect(
            screen.getByText("The page you're looking for doesn't exist or has been moved.")
        ).toBeInTheDocument();

        const homeLink = screen.getByRole('link', { name: /go back to home/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.getAttribute('href')).toBe('/');
    });
});
