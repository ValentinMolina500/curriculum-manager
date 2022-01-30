describe('Sign In Test', () => {
    it('Clicking sign in button without entering credentials', () => {
        // go to app
        cy.visit('http://localhost:3000/login');

        // click on the sign in button
        cy.get('button[id="sign-in-btn"]').click();

        // check if the dashboard is on the Homepage
        cy.get('[id="home-header"]').should('be.visible');

        // check if the active side menu item is the 'Home' option
        cy.get('.css-6ktjnr.active').should('contain', 'Home')
    })
})