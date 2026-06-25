import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

describe("QuestLearn prototype app", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders the student dashboard as the first usable screen", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /QuestLearn control room/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Student/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: /My learning path/i })).toBeInTheDocument();
    expect(screen.getByText(/Start next lesson/i)).toBeInTheDocument();
    expect(screen.getByText(/Blocked: approve instructor account/i)).toBeInTheDocument();
  });

  it("switches to the advisor dashboard and shows early alerts", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Academic Advisor/i }));

    expect(screen.getByRole("button", { name: /Academic Advisor/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Risk queue/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Advisor follow-up/i })).toBeInTheDocument();
    expect(screen.getByText(/Allowed: send advisory follow-up/i)).toBeInTheDocument();
    expect(screen.getByText(/Blocked: create course/i)).toBeInTheDocument();
  });

  it("switches to instructor and admin interfaces with different functions", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Instructor/i }));

    expect(screen.getByRole("heading", { name: /Course authoring/i })).toBeInTheDocument();
    expect(screen.getByText(/Allowed: create course/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /My learning path/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Admin/i }));

    expect(screen.getByRole("heading", { name: /User and role management/i })).toBeInTheDocument();
    expect(screen.getByText(/Allowed: assign roles/i)).toBeInTheDocument();
    expect(screen.getByText(/Blocked: attempt quiz/i)).toBeInTheDocument();
  });

  it("opens a role-specific interface from the role query string", () => {
    window.history.pushState({}, "", "/?role=admin");

    render(<App />);

    expect(screen.getByRole("button", { name: /Admin/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: /User and role management/i })).toBeInTheDocument();
  });
});
