describe("navigation E2E", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it('home link should be active when url is "/"', () => {
        cy.get("a")
            .contains("Home")
            .should("have.css", "cursor", "default")
            .should("have.attr", "href");
    });

    it("contacts link shoud be active when url is 'contacts'", () => {
        cy.get("a").contains("Contacts").should("have.attr", "href");
        cy.get("a").contains("Contacts").click();
        cy.url().should("be.equal", "http://localhost:4000/contacts");
        cy.get("a").contains("Contacts").should("have.css", "cursor", "default");
    });

    it("bankcard link shoud be active when url is 'bankcard'", () => {
        cy.get("a").contains("Bank Card").should("have.attr", "href");
        cy.get("a").contains("Bank Card").click();
        cy.url().should("be.equal", "http://localhost:4000/bank_card");
        cy.get("a").contains("Bank Card").should("have.css", "cursor", "default");
    });

    it("timeline link shoud be active when url is 'timeline'", () => {
        cy.get("a").contains("Timeline").should("have.attr", "href");
        cy.get("a").contains("Timeline").click();
        cy.url().should("be.equal", "http://localhost:4000/timeline");
        cy.get("a").contains("Timeline").should("have.css", "cursor", "default");
    });
});
