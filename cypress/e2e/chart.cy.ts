describe("chart E2E", () => {
    it("chart should be visible", () => {
        cy.visit("/timeline");

        cy.get("canvas").should("be.visible");
    });
});
