import { render, screen } from "@testing-library/react";
import App from "./App";

window.HTMLElement.prototype.scrollIntoView = function () {};

test("renders AI name", () => {
  render(<App />);
  const aiName = screen.getByText(/AI Sam/i);
  expect(aiName).toBeInTheDocument();
});

test("render AI greetings", () => {
  render(<App />);
  const aiGreetings = screen.getByText(/Hi, How are you today?/i);
  expect(aiGreetings).toBeInTheDocument();
});
