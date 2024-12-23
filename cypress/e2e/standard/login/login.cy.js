describe('Test the login functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Log into the application with the standard user', () => {
    cy.get('[data-test="login-container"]').should('be.visible');
    cy.logIntoApp('standard');
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })

  it('Log into the application with the locked user', () => {
    cy.get('[data-test="login-container"]').should('be.visible');
    cy.logIntoApp('locked');
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  })

  it('Log into the application with the problem user', () => {
    cy.get('[data-test="login-container"]').should('be.visible');
    cy.logIntoApp('problem');
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })

  it('Log into the application with the performance glitch user', () => {
    const expectedMinimumTime = 3000;
    cy.get('[data-test="login-container"]').should('be.visible');
    const startTime = new Date().getTime();
    cy.logIntoApp('performance');
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
    cy.then(() => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      expect(expectedMinimumTime).to.be.lessThan(duration, `Test took: ${duration}ms`);
    });
  })

  it('Log into the application with the error user', () => {
    cy.get('[data-test="login-container"]').should('be.visible');
    cy.logIntoApp('error');
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })

  it('Log into the application with the visual user', () => {
    cy.get('[data-test="login-container"]').should('be.visible');
    cy.logIntoApp('visual');
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })
})