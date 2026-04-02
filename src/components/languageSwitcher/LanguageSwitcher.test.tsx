import { render, screen } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";

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
});
