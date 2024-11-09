import CommentModal from '../../pages/CommentModal';

describe('Issue comments creating, editing and deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains(issueTitle).click();
      });
  });

  const issueTitle = 'This is an issue of type: Task.';
  const newComment = 'TEST_COMMENT_DARYA';
  const editedComment = 'TEST_COMMENT_DARYA_EDITED';

  it('Should create, edit and delete a comment successfully', () => {
    CommentModal.addIssueComment(newComment);
    CommentModal.assertCommentExists(newComment);
    CommentModal.editIssueComment(newComment);
    CommentModal.assertCommentExists(editedComment);
    CommentModal.deleteIssueComment(editedComment);
    CommentModal.commentDeletionConfirmation();
    CommentModal.assertCommentNotExists(editedComment);
  });
});
