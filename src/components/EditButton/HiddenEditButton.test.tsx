import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HiddenEditButton from "./HiddenEditButton";

// Mock de useNavigate()
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("Déclenche la navigation après 3 clics", () => {
  render(
    <MemoryRouter>
      <HiddenEditButton />
    </MemoryRouter>
  );

  const button = screen.getByRole("button");

  // Simuler 3 clics
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);

  // Vérifier que navigate a été appelé avec "/login"
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});
