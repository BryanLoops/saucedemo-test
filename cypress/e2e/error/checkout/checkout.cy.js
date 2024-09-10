describe('Test the navigation on cart and checkout pages', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.logIntoApp('error');
    })

    it('Checks if the form works correctly with all information complete', () => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.fillCheckoutForm('standard');
        cy.fixture('usersInformations')
        .then((userInfo) => {
            cy.get('[data-test="firstName"]').should('have.value', userInfo['standard']['firstName']);
            cy.get('[data-test="lastName"]').should('have.value', userInfo['standard']['lastName']);
            cy.get('[data-test="postalCode"]').should('have.value', userInfo['standard']['zip']);
        });
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="title"]').should('be.visible');
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Overview');
    })

    it('Checks if the form works correctly without any information', () => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('be.visible');
        cy.get('[data-test="error"]').should('contain.text', 'Error: First Name is required');
    })

    it('Checks if it continues without the First Name', () => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="lastName"]').type('user');
        cy.get('[data-test="postalCode"]').type('71000000');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('be.visible');
        cy.get('[data-test="error"]').should('contain.text', 'Error: First Name is required');
    })

    it('Checks if it continues without the Last Name', () => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('standard');
        cy.get('[data-test="postalCode"]').type('71000000');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('be.visible');
        cy.get('[data-test="error"]').should('contain.text', 'Error: Last Name is required');
    })

    it('Checks if it continues without the Zip/Postal Code', () => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('standard');
        cy.get('[data-test="lastName"]').type('user');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('be.visible');
        cy.get('[data-test="error"]').should('contain.text', 'Error: Postal Code is required');
    })

    
})