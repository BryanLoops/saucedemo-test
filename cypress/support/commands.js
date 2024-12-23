// Log into the application using user credentials from the fixture userCredentials
Cypress.Commands.add('logIntoApp', (user) => {
    cy.fixture('usersCredentials.json').then((usersData) => {
        cy.get('[data-test="username"]').type(usersData[user]['username']);
        cy.get('[data-test="password"]').type(usersData[user]['password']);
        cy.get('[data-test="login-button"]').click();
    })
})

// Add all products from the home page or remove them if they're already selected
Cypress.Commands.add('addOrRemoveAllItems', () => {
    cy.get('[data-test="inventory-container"]')
    .find('button')
    .each(($button) => {
        $button.click();
    });
})

// Changes the filter at the home page so you sort the products by alphabetical order or price value
Cypress.Commands.add('changeFilter', (option) => {
    cy.get('[data-test="product-sort-container"]').select(option);
})

// Fill all input fields at the checkout page using informations from the fixture usersInformations
Cypress.Commands.add('fillCheckoutForm', (option) => {
    cy.fixture('usersInformations').then((user) => {
        cy.get('[data-test="firstName"]').type(user[option]['firstName']);
        cy.get('[data-test="lastName"]').type(user[option]['lastName']);
        cy.get('[data-test="postalCode"]').type(user[option]['zip']);
    })
})