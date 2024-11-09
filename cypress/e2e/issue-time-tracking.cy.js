describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url()
        .should('eq', `${Cypress.env('baseUrl')}project/board`)
        .then((url) => {
          cy.visit(url + '/board');
          cy.contains('This is an issue of type: Task.').click();
        });
    });




// Time Estimation Functionality

//Time Logging Functionality
