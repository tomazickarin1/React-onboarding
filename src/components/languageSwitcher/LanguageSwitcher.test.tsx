import { render, screen } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";
import userEvent from "@testing-library/user-event";

const mockLnaguagelist = [
  { code: "en-US", label: "English" },
  { code: "de-DE", label: "German" },
];

describe("LanguageSwitcher", () => {
  test("Language switchers main button shows appropriate language information", () => {
    render(
      <LanguageSwitcher
        languageList={mockLnaguagelist}
        selectedMain="en-US"
        selectedFallback="de-DE"
        onSelect={() => {}}
        onReset={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /language settings/i });
    expect(button).toHaveTextContent("US");
  });

  test("Clicking on language switcher's main button displays the pick box with the controls.", async () => {
    const user = userEvent.setup();

    render(
      <LanguageSwitcher
        languageList={mockLnaguagelist}
        selectedMain="en-US"
        selectedFallback="de-DE"
        onSelect={() => {}}
        onReset={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /language settings/i });
    await user.click(button);

    expect(screen.getByRole('group', { name: /language preferences/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /german/i })).toBeInTheDocument();
  });
});
