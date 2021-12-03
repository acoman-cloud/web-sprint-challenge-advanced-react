import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
	render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
	render(<CheckoutForm />)
	const firstField = screen.getByLabelText(/First Name:/i);
	userEvent.type(firstField, 'John');
	const lastField = screen.getByLabelText(/Last Name:/i);
	userEvent.type(lastField, 'Smith');
	const addressField = screen.getByLabelText(/Address:/i);
	userEvent.type(addressField, '518 Dover dr.');
	const cityField = screen.getByLabelText(/City:/i);
	userEvent.type(cityField, 'Chicago');
	const stateField = screen.getByLabelText(/State:/i);
	userEvent.type(stateField, 'IL');
	const zipField = screen.getByLabelText(/Zip:/i);
	userEvent.type(zipField, '55555');
	const button = screen.getByRole('button');
	userEvent.click(button);
	await waitFor(()=>{
		const happyMessage = screen.getByText(/You have ordered some plants! Woo-hoo!/i)
		expect(happyMessage).toBeInTheDocument();
		const despressedMessage = screen.getByTestId('successMessage');
		expect(despressedMessage).toBeInTheDocument();
	})
});
