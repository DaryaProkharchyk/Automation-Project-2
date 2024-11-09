class CommentModal {
  constructor() {
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.commentTextField = 'Add a comment...';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.confirmationPopup = '[data-testid="modal:confirm"]';
    this.commentSaveButton = 'Save';
    this.commentEditButton = 'Edit';
    this.commentDeleteButton = 'Delete';
    this.commentDeletionConfirmationButton = 'Delete comment';
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }
  getIssueComment() {
    return cy.get(this.issueComment);
  }

  clickCommentSaveButton() {
    cy.contains('button', this.commentSaveButton).click().should('not.exist');
  }

  addIssueComment(comment) {
    this.getIssueDetailModal()
      .should('be.visible')
      .within(() => {
        cy.contains(this.commentTextField).click();
        cy.get(this.commentTextArea).should('exist').type(comment);
        this.clickCommentSaveButton();
      });
  }
  assertCommentExists = (comment) => {
    this.getIssueComment()
      .first()
      .should('contain', comment)
      .should('be.visible');
  };

  editIssueComment(comment) {
    this.getIssueDetailModal().within(() => {
      this.getIssueComment().first().should('contain', comment);
      cy.contains(this.commentEditButton).click();
      cy.get(this.commentTextArea).clear().type(editedComment);

      this.clickCommentSaveButton();
    });
  }

  deleteIssueComment(comment) {
    this.getIssueDetailModal()
      .find(this.issueComment)
      .should('contain', comment)
      .contains(this.commentDeleteButton)
      .click();
    cy.get(this.confirmationPopup).should('be.visible');
  }

  commentDeletionConfirmation() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains('button', this.commentDeletionConfirmationButton)
        .click()
        .should('not.exist');
    });
    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueDetailModal).should('be.visible');
  }

  assertCommentNotExists = (comment) => {
    this.getIssueDetailModal().find(comment).should('not.exist');
  };
}

export default new CommentModal();
