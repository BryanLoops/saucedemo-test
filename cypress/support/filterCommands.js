// Fill an array with information from all products inside a container, use location to set where it will search
// and arrayName to indicate the variable to receive the data

Cypress.Commands.add('filterItems', (location, arrayName) => {
    cy.get(`[data-test="${location}"]`)
        .find('[data-test="inventory-item"]')
        .each(($item, _) => {
            let name = Cypress.$($item).find('[data-test="inventory-item-name"]').text().trim();
            let desc = Cypress.$($item).find('[data-test="inventory-item-desc"]').text().trim();
            let priceText = Cypress.$($item).find('[data-test="inventory-item-price"]').text().trim();
            let price = parseFloat(priceText.replace('$', ''));

            arrayName.push({
                name: name,
                description: desc,
                price: price
            });
        })
})

// Does about the same as the last one, but with only one item
Cypress.Commands.add('filterItem', (location, arrayName) => {
    cy.get(`[data-test="${location}"]`)
        .find('[data-test="inventory-item"]')
        .then(($item, _) => {
            let name = Cypress.$($item).find('[data-test="inventory-item-name"]').text().trim();
            let desc = Cypress.$($item).find('[data-test="inventory-item-desc"]').text().trim();
            let priceText = Cypress.$($item).find('[data-test="inventory-item-price"]').text().trim();
            let price = parseFloat(priceText.replace('$', ''));

            arrayName.push({
                name: name,
                description: desc,
                price: price
            });
        })
})