// src/App.test.js

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to DevOps Final Project1/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders list of contributors', () => {
  render(<App />);
  const contributorsElement = screen.getByText(/Contributors of This Project are:/i);
  expect(contributorsElement).toBeInTheDocument();

  // Example test for specific contributors (adjust as per your actual list)
  const milanElement = screen.getByText(/Milan Regmi/i);
  const sujalElement = screen.getByText(/Sujal Shrestha/i);
  const arunElement = screen.getByText(/Arun Wosti/i);
  const srijeshElement = screen.getByText(/Srijesh Khanal/i);

  expect(milanElement).toBeInTheDocument();
  expect(sujalElement).toBeInTheDocument();
  expect(arunElement).toBeInTheDocument();
  expect(srijeshElement).toBeInTheDocument();
});
