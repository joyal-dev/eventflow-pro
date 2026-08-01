import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AdminPage from "./Admin";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => React.createElement("div", props, children),
  },
}));

vi.mock("@/components/Navbar", () => ({
  default: () => React.createElement("div", { "data-testid": "navbar" }),
}));

describe("AdminPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the management UI after a successful login", () => {
    render(React.createElement(AdminPage));

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "admin123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText(/product management/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add product/i })).toBeInTheDocument();
  });
});
