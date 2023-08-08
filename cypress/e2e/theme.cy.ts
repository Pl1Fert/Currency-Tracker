import { themeActions } from "@/store/themeSlice";

describe("theme E2E", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("theme should be false", () => {
        cy.window()
            .its("store")
            .invoke("getState")
            .its("theme")
            .its("darkTheme")
            .should("be.equal", true);
    });

    it("theme should change", () => {
        cy.window().its("store").invoke("dispatch", themeActions.toggleTheme());

        cy.window()
            .its("store")
            .invoke("getState")
            .its("theme")
            .its("darkTheme")
            .should("be.equal", false);
    });

    it("theme should change onclick", () => {
        cy.get("input[type='radio']").should("have.value", "false").eq(0).click();

        cy.window()
            .its("store")
            .invoke("getState")
            .its("theme")
            .its("darkTheme")
            .should("be.equal", false);
    });
});
