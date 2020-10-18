describe("Mobile UI", () => {
  it("has a hamburger nav menu", () => {
    cy.viewport("iphone-6").visit("/");

    cy.findByTestId("menu").should("be.hidden");

    cy.findByRole("button", { name: "menu" }).click();

    cy.findByTestId("menu").should("be.visible");

    cy.findByRole("button", { name: /log in/i }).should("be.visible");

    cy.findByTestId("menu").click("left");

    cy.findByTestId("menu").should("be.hidden");
  });
});
