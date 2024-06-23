import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header Tests', () => {
    it('should render the header with the given App name', () => {
        const appName = 'Test App';
        process.env.REACT_APP_NAME = appName;

        render(<Header />);

        expect(screen.getByText(appName)).toBeInTheDocument();
    });
});