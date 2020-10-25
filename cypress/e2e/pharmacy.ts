describe("Pharmacy", () => {
  it("mobile: can be visited from home via nav and return to home with logo", () => {
    cy.viewport("iphone-6").visit("/");
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: /pharmacy/i }).click();
    cy.url().should("match", /\/pharmacy/);
    cy.findByRole("heading", { name: /avett\s?rx/i }).click();
    cy.url().should("match", /\/$/);
  });

  it("desktop: can be visited from home via nav and return to home with logo", () => {
    cy.viewport("macbook-13").visit("/");
    cy.findByRole("link", { name: /pharmacy/i }).click();
    cy.url().should("match", /\/pharmacy/);
    cy.findByRole("heading", { name: /avett\s?rx/i }).click();
    cy.url().should("match", /\/$/);
  });
});
