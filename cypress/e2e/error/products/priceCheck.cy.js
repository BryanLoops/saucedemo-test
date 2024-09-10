describe('Test if the prices are shown correctly through the shopping proccess', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.logIntoApp('error');
    })

    it('Tests if the sum of prices from selected products are the same as in the checkout', () => {
        let homeItemsList = [];
        let cartItemsList = [];
        let totalHomePrice;
        let totalCartPrice;

        cy.addOrRemoveAllItems();

        cy.filterItems('inventory-list', homeItemsList)
            .then(() => {
                totalHomePrice = homeItemsList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0);
            });

        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.fillCheckoutForm('standard');
        cy.get('[data-test="continue"]').click();

        cy.filterItems('cart-list', cartItemsList)
            .then(() => {
                totalCartPrice = cartItemsList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0);
                expect(totalCartPrice).to.deep.equal(totalHomePrice);
            });

        cy.get('[data-test="subtotal-label"]')
            .then(($value) => {
                const subtotalText = Cypress.$($value).text().trim();
                const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));

                expect(subtotal).to.deep.equal(totalHomePrice);
                expect(subtotal).to.deep.equal(totalCartPrice);
            });
    })

    it('Tests if the 8% tax is correctly calculated and being applied to the total', () => {
        let homeItemsList = [];
        let cartItemsList = [];
        let totalHomePrice;
        let totalCartPrice;
        let subtotal;

        cy.addOrRemoveAllItems();

        cy.filterItems('inventory-list', homeItemsList)
            .then(() => {
                totalHomePrice = homeItemsList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0);
            });

        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('standard');
        cy.get('[data-test="lastName"]').type('user');
        cy.get('[data-test="postalCode"]').type('71000000');
        cy.get('[data-test="continue"]').click();

        cy.filterItems('cart-list', cartItemsList)
            .then(() => {
                totalCartPrice = cartItemsList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0);
                expect(totalCartPrice).to.deep.equal(totalHomePrice);
            });

        cy.get('[data-test="subtotal-label"]')
            .then(($value) => {
                const subtotalText = Cypress.$($value).text().trim();
                subtotal = parseFloat(subtotalText.replace('Item total: $', ''));

                expect(subtotal).to.deep.equal(totalHomePrice);
                expect(subtotal).to.deep.equal(totalCartPrice);
            });

        cy.get('[data-test="tax-label"]')
            .then(($value) => {
                const taxText = Cypress.$($value).text().trim();
                const tax = parseFloat(taxText.replace('Tax: $', ''));
                const expectedTax = parseFloat((subtotal * (8 / 100)).toFixed(2));
                const expectedHomeTax = parseFloat((totalHomePrice * (8 / 100)).toFixed(2));
                const expectedCartTax = parseFloat((totalCartPrice * (8 / 100)).toFixed(2));

                expect(tax).to.equal(expectedTax);
                expect(tax).to.equal(expectedHomeTax);
                expect(tax).to.equal(expectedCartTax);
            });
    })

    it('Tests if the final value corresponds to the sum of total/subtotal and tax', () => {
        let homeItemsList = [];
        let cartItemsList = [];
        let totalHomePrice;
        let totalCartPrice;
        let subtotal;
        let expectedTax;

        cy.addOrRemoveAllItems();

        cy.filterItems('inventory-list', homeItemsList)
            .then(() => {
                totalHomePrice = homeItemsList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0);
            });

        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('standard');
        cy.get('[data-test="lastName"]').type('user');
        cy.get('[data-test="postalCode"]').type('71000000');
        cy.get('[data-test="continue"]').click();

        cy.filterItems('cart-list', cartItemsList)
            .then(() => {
                totalCartPrice = cartItemsList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0);
                expect(totalCartPrice).to.deep.equal(totalHomePrice);
            });

        cy.get('[data-test="subtotal-label"]')
            .then(($value) => {
                const subtotalText = Cypress.$($value).text().trim();
                subtotal = parseFloat(subtotalText.replace('Item total: $', ''));

                expect(subtotal).to.deep.equal(totalHomePrice);
                expect(subtotal).to.deep.equal(totalCartPrice);
            });

        cy.get('[data-test="tax-label"]')
            .then(($value) => {
                const taxText = Cypress.$($value).text().trim();
                const tax = parseFloat(taxText.replace('Tax: $', ''));
                expectedTax = parseFloat((subtotal * (8 / 100)).toFixed(2));

                expect(tax).to.equal(expectedTax);
            });

        cy.get('[data-test="total-label"]')
            .then(($value) => {
                const finalPriceText = Cypress.$($value).text().trim();
                const finalPrice = parseFloat(finalPriceText.replace('Total: $', ''));
                const finalHomePrice = totalHomePrice + expectedTax;
                const finalCartPrice = totalCartPrice + expectedTax;

                expect(finalPrice).to.equal(finalHomePrice);
                expect(finalPrice).to.equal(finalCartPrice);
            });
    })
})