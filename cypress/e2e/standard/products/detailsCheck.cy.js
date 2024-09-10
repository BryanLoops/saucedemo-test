describe('Test if the products informations are the same as expected', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.logIntoApp('standard');
    })

    it('Checks if all products informations at home are the same as the fixture productsInformations', () => {
        let itemInfoHome = [];

        cy.filterItems('inventory-list', itemInfoHome);
        cy.fixture('productsInformations')
        .then((data) => {
            expect(itemInfoHome).to.deep.equal(data);
        });
    })

    it('Checks if all products details inside each product page are the same as in the fixture productsInformations', () => {
        let itemInfoHome = [];

        cy.filterItems('inventory-list', itemInfoHome);

        cy.fixture('productsInformations')
        .then((data) => {
            for (let i = 0; i < itemInfoHome.length; i++) {
                let testItem = [];
                cy.contains(itemInfoHome[i].name).click();
                cy.filterItem('inventory-container', testItem)
                    .then(() => {
                        expect(data[i]).to.deep.equal(testItem[0]);
                        cy.get('[data-test="back-to-products"]').click();
                    });
                }
        });
    })

    it('Checks if all products details inside the cart page are the same as in the fixture productsInformations', () => {
        let itemInfoCart = [];

        cy.addOrRemoveAllItems();

        cy.get('[data-test="shopping-cart-link"]').click();

        cy.filterItems('cart-list', itemInfoCart);

        cy.fixture('productsInformations')
        .then((data) => {
            console.log(itemInfoCart);
            console.log(data);
            expect(itemInfoCart).to.deep.equal(data);
        });
    })

    it('Checks if all products details inside each product page are the same as in the home page', () => {
        let itemInfoHome = [];

        cy.filterItems('inventory-list', itemInfoHome)
            .then(() => {

                for (let i = 0; i < itemInfoHome.length; i++) {
                let testItem = [];
                cy.contains(itemInfoHome[i].name).click();
                cy.filterItem('inventory-container', testItem)
                    .then(() => {
                        expect(itemInfoHome[i]).to.deep.equal(testItem[0]);
                        cy.get('[data-test="back-to-products"]').click();
                    });
                }
            });
    })

    it('Checks if the products inside the cart have the same information as in the home page', () => {
        let itemInfoHome = [];
        let itemInfoCart = [];
        
        cy.filterItems('inventory-list', itemInfoHome)
            .then(() => {
                console.log(itemInfoHome);
            });

        cy.addOrRemoveAllItems();

        cy.get('[data-test="shopping-cart-link"]').click();

        cy.filterItems('cart-list', itemInfoCart)
            .then(() => {
                console.log(itemInfoCart);
                expect(itemInfoCart).to.deep.equal(itemInfoHome);
            });
    })

    it('Checks if the products inside the cart have the same information as in the products pages', () => {
        let itemInfoCart = [];

        cy.addOrRemoveAllItems();

        cy.get('[data-test="shopping-cart-link"]').click();

        cy.filterItems('cart-list', itemInfoCart)
        .then(() => {
            cy.get('[data-test="continue-shopping"]').click();
            for (let i = 0; i < itemInfoCart.length; i++) {
                let testItem = [];
                cy.contains(itemInfoCart[i].name).click();
                cy.filterItem('inventory-container', testItem)
                    .then(() => {
                        expect(itemInfoCart[i]).to.deep.equal(testItem[0]);
                        cy.get('[data-test="back-to-products"]').click();
                    });
                }
        });
    })
})