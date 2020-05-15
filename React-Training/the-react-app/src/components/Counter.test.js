import React from 'react'
import Counter from './Counter'
import {render, screen, fireEvent} from '@testing-library/react'

describe('Counter Test', () => {
    it('should render the Counter', () => {
        render(<Counter/>);
        const element = screen.getByText(/Count : 5/i);
        expect(element).toBeTruthy();
    });

    it('should render the counter and increment the count', () => {
        render(<Counter/>);
        const btn = screen.getByText(/Increment/i);
        fireEvent.click(btn);
        const element = screen.getByText(/Count : 6/i);
        expect(element).toBeTruthy();
    });

    it('should render the counter and set the count', () => {
        render(<Counter/>);
        const input = screen.getByTestId('cnt');
        fireEvent.change(input, {target: {value: 200}});
        const element = screen.getByText(/Count : 200/i);
        expect(element).toBeTruthy();
    });
});
