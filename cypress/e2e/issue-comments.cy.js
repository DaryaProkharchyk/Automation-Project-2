const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
const textAreaAddComment = () =>
  cy.get('textarea[placeholder="Add a comment..."]');
const clickSaveButton = () => cy.contains('button', 'Save').click();
const assertCommentExists = (comment) =>
  cy.get(issueComment).should('contain.text', comment);

const newComment = 'TEST_COMMENT_DARYA';
const editedComment = 'TEST_COMMENT_DARYA_EDITED';
const issueComment = '[data-testid="issue-comment"]';

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

  it('Should create, edit and delete a comment successfully', () => {
    // Adding a comment

    getIssueDetailsModal()
      .should('be.visible')
      .within(() => {
        cy.contains('Add a comment...').click();
        textAreaAddComment().type(newComment);
        clickSaveButton().should('not.exist');
        cy.contains('Add a comment...').should('exist');
        assertCommentExists(newComment);
      });

    //  Editing the existing comment

    getIssueDetailsModal().within(() => {
      cy.get(issueComment).first().contains('Edit').click();
      textAreaAddComment().clear().type(editedComment);
      clickSaveButton().should('not.exist');
      assertCommentExists(editedComment);
    });

    // Deleting the comment

    getIssueDetailsModal()
      .find(issueComment)
      .should('contain', editedComment)
      .contains('Delete')
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete comment')
      .click()
      .should('not.exist');

    getIssueDetailsModal().find(editedComment).should('not.exist');
  });
});
