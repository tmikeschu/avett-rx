describe("Mobile UI", () => {
  it("has a hamburger nav menu", () => {
    cy.viewport("iphone-6").visit("/");

    cy.findByTestId("mobile-menu").should("be.hidden");

    cy.findByRole("button", { name: "menu" }).click();

    cy.findByTestId("mobile-menu").should("be.visible");

    cy.findByRole("button", { name: /log in/i }).should("be.visible");

    cy.findByTestId("mobile-menu").click("left");

    cy.findByTestId("mobile-menu").should("be.hidden");

    cy.viewport("macbook-11");

    cy.findByRole("button", { name: "menu" }).should("not.be.visible");
  });
});
