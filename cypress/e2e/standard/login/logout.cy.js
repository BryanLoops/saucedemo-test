describe('Test the logout functionality', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Log out of the application with the standard user', () => {
        cy.logIntoApp('standard');
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible');
        cy.get('[data-test="logout-sidebar-link"]').click();
        cy.get('[data-test="login-container"]').should('be.visible');
    })

    it('Log out of the application with the problem user', () => {
        cy.logIntoApp('problem');
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible');
        cy.get('[data-test="logout-sidebar-link"]').click();
        cy.get('[data-test="login-container"]').should('be.visible');
    })

    it('Log out of the application with the performance glitch user', () => {
        const expectedMinimumTime = 3000;
        const startTime = new Date().getTime();
        cy.logIntoApp('performance');
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible');
        cy.get('[data-test="logout-sidebar-link"]').click();
        cy.then(() => {
            const endTime = new Date().getTime();
            const duration = endTime - startTime;
            expect(expectedMinimumTime).to.be.lessThan(duration, `Test took too: ${duration}ms`);
        });
        cy.get('[data-test="login-container"]').should('be.visible');
    })

    it('Log out of the application with the error user', () => {
        cy.logIntoApp('error');
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible');
        cy.get('[data-test="logout-sidebar-link"]').click();
        cy.get('[data-test="login-container"]').should('be.visible');
    })

    it('Log out of the application with the visual user', () => {
        cy.logIntoApp('visual');
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible');
        cy.get('[data-test="logout-sidebar-link"]').click();
        cy.get('[data-test="login-container"]').should('be.visible');
    })
})