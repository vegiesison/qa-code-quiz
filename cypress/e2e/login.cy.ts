describe('Login Test', () => {
    it('should log in successfully with correct credentials', () => {
        cy.visit('http://localhost:8080'); // Adjust the URL to your application's URL



        cy.get('body').should('be.visible');
        cy.get('[placeholder="Enter Username"]').type('SomeUser_name');
        cy.get('[placeholder="password"]').type('TopSecret1234!');
        cy.get('.sc-bZQynM').click();

        // Verify successful login by checking if the user is redirected or an element is present
        cy.contains('Hello SomeName').should('be.visible');
    });

    it('should show an error message with invalid credentials', () => {
        cy.visit('http://localhost:8080'); // Adjust the URL to your application's URL

        cy.get('[placeholder="Enter Username"]').type('SomeUser_name');
        cy.get('[placeholder="password"]').type('WrongPassword');
        cy.get('.sc-bZQynM').click();

        // Verify that the error message is shown
        cy.contains('Invalid username or password').should('be.visible');
    });
});
