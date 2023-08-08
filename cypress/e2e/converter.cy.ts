import { CurrencyService } from "@/services";

describe("converter E2E", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should open modal", () => {
        cy.get("section")
            .eq(1)
            .within(() => {
                cy.get("div > div").eq(0).click();
            });

        cy.get("select[name='currencyOption']").should("be.visible");
    });

    it("should conver currency", () => {
        cy.get("section")
            .eq(1)
            .within(() => {
                cy.get("div > div").eq(0).click();
            });

        CurrencyService.getCurrencyExchangeRate("USD", "BRL")
            .then((rate: number) => {
                cy.get("input[type='number']").eq(0).type("2");
                cy.get("input[type='number']")
                    .eq(1)
                    .should("have.value", `${rate * 2}`);
            })
            .catch(() => {});
    });
});
