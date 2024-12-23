describe('Test the navigation on home, cart and checkout pages', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.logIntoApp('standard');
  })

  it('Opens a product details page', () => {
    cy.get('[data-test="inventory-item-name"]').eq(0).click();
    cy.get('[data-test="back-to-products"]').should('be.visible');
    cy.get('[data-test="back-to-products"]').should('contain.text', 'Back to products');
  })

  it('Returns to home from the product details page', () => {
    cy.get('[data-test="inventory-item-name"]').eq(0).click();
    cy.get('[data-test="back-to-products"]').click();
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })

  it('Opens the cart information page', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Your Cart');
  })

  it('Returns to home from the cart information page', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="continue-shopping"]').click();
    cy.get('[data-test="title"]').should('be.visible');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })

  it('Opens the checkout information page', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information');
  })

  it('Returns to cart information page from checkout information page', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="cancel"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Your Cart');
  })

  it('Opens the checkout overview page', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.fillCheckoutForm('standard');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Checkout: Overview');
  })

  it('Returns to the main page from the checkout overview page', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.fillCheckoutForm('standard');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Checkout: Overview');
    cy.get('[data-test="cancel"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })

  it('Complete checkout', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.fillCheckoutForm('standard');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Checkout: Overview');
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Checkout: Complete!');
  })

  it('Complete checkout and back home', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.fillCheckoutForm('standard');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Checkout: Overview');
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="back-to-products"]').click();
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  })
})