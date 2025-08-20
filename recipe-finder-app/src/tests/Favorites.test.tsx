import Favorites from "../components/Favorites"
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest"

describe("Test favorite counting", () => {
    it("Should increment value", async () => {
        render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>
        )
        const btn = screen.getByRole("button", { name: /increment count/i });
        const counted = screen.getByTestId("counter-value");
        const user = userEvent.setup();
        expect(btn).toBeInTheDocument();
        expect(counted.textContent).toEqual("0");
        await user.click(btn);
        expect(counted.textContent).toEqual("1");
        await user.click(btn);
        expect(counted.textContent).toEqual("2");
    })
})