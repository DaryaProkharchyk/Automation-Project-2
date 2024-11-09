import { faker } from '@faker-js/faker';

const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');

const addCommentAndAssert = (comment, shouldExist) => {
  getIssueDetailsModal()
    .should('be.visible')
    .within(() => {
      cy.contains('Add a comment...').click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      if (shouldExist) {
        cy.contains('button', 'Save').click().should('not.exist');
        cy.contains('Add a comment...').should('exist');
        cy.get('[data-testid="issue-comment"]').should('contain', comment);
      } else {
        cy.contains('button', 'Cancel').click().should('not.exist');
        cy.contains('Add a comment...').should('exist');
        cy.get('[data-testid="issue-comment"]').should('not.contain', comment);
      }
    });
};

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

  it('Should create a comment successfully', () => {
    const randomComment = faker.lorem.words(5);
    addCommentAndAssert(randomComment, true);
  });

  it('Should cancel creation of comment successfully', () => {
    const randomComment = faker.lorem.words(5);
    addCommentAndAssert(randomComment, false);
  });
});
