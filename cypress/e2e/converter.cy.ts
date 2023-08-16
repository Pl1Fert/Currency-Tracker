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
});
