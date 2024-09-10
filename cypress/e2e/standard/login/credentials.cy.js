describe('Test the credential requirements to log in', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it("Can't log into the application with wrong username", () => {
    cy.logIntoApp('wrongUsername');
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[class="error-message-container error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  })

  it("Can't log into the application with wrong password", () => {
    cy.logIntoApp('wrongPassword');
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[class="error-message-container error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  })

  it("Can't log into the application without username", () => {
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[class="error-message-container error"]').should('contain.text', 'Epic sadface: Username is required');
  })

  it("Can't log into the application without password", () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[class="error-message-container error"]').should('contain.text', 'Epic sadface: Password is required');
  })
})