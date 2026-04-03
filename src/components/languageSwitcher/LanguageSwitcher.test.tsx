import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";
import userEvent from "@testing-library/user-event";

const mockLnaguagelist = [
  { code: "en-US", label: "English" },
  { code: "de-DE", label: "German" },
];

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    render(
      <LanguageSwitcher
        languageList={mockLnaguagelist}
        selectedMain="en-US"
        selectedFallback="de-DE"
        onSelect={() => {}}
        onReset={() => {}}
      />,
    );
  });

  test("Language switchers main button shows appropriate language information", () => {
    const button = screen.getByRole("button", { name: /language settings/i });
    expect(button).toHaveTextContent("US");
  });

  test("Clicking on language switcher's main button displays the pick box with the controls.", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /language settings/i });
    await user.click(button);

    expect(
      screen.getByRole("group", { name: /language preferences/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /english/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /german/i })).toBeInTheDocument();
  });

  test("Clicking on language switcher's main button while pick box is open keeps it open.", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /language settings/i });
    // Click twice
    await user.click(button);
    await user.click(button);
    expect(
      screen.getByRole("group", { name: /language preferences/i }),
    ).toBeInTheDocument();
  });

  test("Clicking outside the langue switcher closes the pick box", async () => {
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /language settings/i });
    // open
    await user.click(button);

    expect(
      screen.getByRole("group", { name: /language preferences/i }),
    ).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(
      screen.queryByRole("group", { name: /language preferences/i }),
    ).not.toBeInTheDocument();
  });

  test("Pick box has appropriate elements displayed", async () => {
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /language settings/i });
    await user.click(button);

    expect(
      screen.getByRole("group", { name: /language preferences/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/default language/i)).toBeInTheDocument();
    expect(screen.getByText(/fallback language/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /english/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /german/i })).toBeInTheDocument();
  });

  test("Clicking on a pick box control opens the autocomplete list. Clicking on it again closes it", async () => {
    const user = userEvent.setup();

    const buttonLanguageSettings = screen.getByRole("button", {
      name: /language settings/i,
    });
    // open the Language Preferences form
    await user.click(buttonLanguageSettings);

    const buttonDefaultLanguage = screen.getByRole("button", {
      name: /english/i,
    });

    expect(
      screen.getByRole("group", { name: /language preferences/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/default language/i)).toBeInTheDocument();

    // open the both dropdowns dropdown
    await user.click(buttonDefaultLanguage);

    expect(
      screen.getByRole("textbox", { name: /filter languages/i }),
    ).toBeInTheDocument();
    await user.click(buttonDefaultLanguage);
    expect(
      screen.queryByRole("textbox", { name: /filter languages/i }),
    ).not.toBeInTheDocument();
  });

  test("Clicking outside the language picker while the autocomplete list is open, closes all of them", async () => {
    const user = userEvent.setup();

    const buttonLanguageSettings = screen.getByRole("button", {
      name: /language settings/i,
    });
    // open the Language Preferences form
    await user.click(buttonLanguageSettings);

    const buttonDefaultLanguage = screen.getByRole("button", {
      name: /english/i,
    });
    // open the filter
    await user.click(buttonDefaultLanguage);

    expect(
      screen.getByRole("group", { name: /language preferences/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /filter languages/i }),
    ).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(
      screen.queryByRole("group", { name: /language preferences/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", { name: /filter languages/i }),
    ).not.toBeInTheDocument();
  });
});
