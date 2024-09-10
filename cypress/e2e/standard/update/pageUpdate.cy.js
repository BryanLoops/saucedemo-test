describe('Test if application is correctly updating the content', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.logIntoApp('standard');
  })

  it('Updates products inside cart information page', () => {
    cy.addOrRemoveAllItems();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="cart-contents-container"]')
      .find('[data-test="inventory-item"]')
      .should('have.length', 6);
  })

  it('Updates products at main page after changing cart information', () => {
    cy.addOrRemoveAllItems();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="cart-list"]')
      .find('button')
      .each(($button) => {
        $button.click();
      });
    cy.get('[data-test="cart-contents-container"]')
      .find('[data-test="inventory-item"]')
      .should('have.length', 0);
    cy.get('[data-test="continue-shopping"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .should('contain.text', 'Add to cart');
  })

  it('Checks the za product order', () => {
    let itemsList = [];
    let itemsListTest = [];

    cy.filterItems('inventory-container', itemsList);
    cy.changeFilter('za');

    cy.filterItems('inventory-container', itemsListTest)
      .then(() => {
        expect(itemsListTest).to.deep.equal(itemsList.reverse());
      })
  })

  it('Checks the az product order', () => {
    let itemsList = [];
    let itemsListTest = [];

    cy.changeFilter('za');
    cy.filterItems('inventory-container', itemsList);
    cy.changeFilter('az');

    cy.filterItems('inventory-container', itemsListTest)
      .then(() => {
        expect(itemsListTest).to.deep.equal(itemsList.reverse());
      })
  })

  it('Checks the lohi product price order', () => {
    let itemsList = [];
    let itemsListTest = [];

    cy.filterItems('inventory-container', itemsList);
    cy.changeFilter('lohi');

    cy.filterItems('inventory-container', itemsListTest)
      .then(() => {
        let originalPrices = itemsList.map(item => item.price);
        let newPrices = itemsListTest.map(item => item.price);

        expect(newPrices).to.deep.equal(originalPrices.sort((a, b) => { return a - b }));
      })
  })

  it('Checks the hilo product price order', () => {
    let itemsList = [];
    let itemsListTest = [];

    cy.changeFilter('lohi');
    cy.filterItems('inventory-container', itemsList);
    cy.changeFilter('hilo');

    cy.filterItems('inventory-container', itemsListTest)
      .then(() => {
        let originalPrices = itemsList.map(item => item.price);
        let newPrices = itemsListTest.map(item => item.price);

        expect(newPrices).to.deep.equal(originalPrices.sort((a, b) => { return b - a }));
      })
  })

  it('Checks the Reset App State button', () => {
    let buttonsTexts = [];
    cy.addOrRemoveAllItems();
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .then($buttons => {
        buttonsTexts = Cypress.$($buttons).map((_, button) => Cypress.$(button).text().trim()).get();
        cy.fixture('buttonsTestPatterns')
          .then((buttons) => {
            expect(buttonsTexts).to.deep.equal(buttons['allRemove']);
          });
      });

    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[data-test="reset-sidebar-link"]').click();

    cy.reload();
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .then($buttons => {
        buttonsTexts = Cypress.$($buttons).map((_, button) => Cypress.$(button).text().trim()).get();
        cy.fixture('buttonsTestPatterns')
          .then((buttons) => {
            expect(buttonsTexts).to.deep.equal(buttons['allAddToCart']);
          })
      });
  })

  it("Updates the 'Add to cart' button text to 'Remove'", () => {
    let buttonsTexts = [];
    cy.addOrRemoveAllItems();
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .then($buttons => {
        buttonsTexts = Cypress.$($buttons).map((_, button) => Cypress.$(button).text().trim()).get();

        cy.fixture('buttonsTestPatterns')
          .then((buttons) => {
            expect(buttonsTexts).to.deep.equal(buttons['allRemove']);
          })
      });
  })

  it("Updates the 'Remove' button text back to 'Add to Cart'", () => {
    let buttonsTexts = [];
    cy.addOrRemoveAllItems();
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .then($buttons => {
        buttonsTexts = Cypress.$($buttons).map((_, button) => Cypress.$(button).text().trim()).get();

        cy.fixture('buttonsTestPatterns')
          .then((buttons) => {
            expect(buttonsTexts).to.deep.equal(buttons['allRemove']);
          })
      });

    cy.addOrRemoveAllItems();
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .then($buttons => {
        buttonsTexts = Cypress.$($buttons).map((_, button) => Cypress.$(button).text().trim()).get();

        cy.fixture('buttonsTestPatterns')
          .then((buttons) => {
            expect(buttonsTexts).to.deep.equal(buttons['allAddToCart']);
          })
      });
  })
})