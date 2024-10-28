const issueTitle = "This is an issue of type: Task.";
const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
const getDeletionModal = () => cy.get('[data-testid="modal:confirm"]');

describe("Issue deletion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
      });
  });

  it("Should delete issue successfully", () => {
    const expectedAmountOfIssuesAfterDeletion = 3;

    getIssueDetailsModal().should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    getDeletionModal().should("be.visible");
    getDeletionModal().within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains("Delete issue").click();
    });

    getDeletionModal().should("not.exist");

    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(issueTitle).should("not.exist");
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedAmountOfIssuesAfterDeletion
      );
    });
  });

  it("Should cancel issue deletion successfully", () => {
    const expectedAmountOfIssuesAfterCancellation = 4;

    getIssueDetailsModal().should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    getDeletionModal().should("be.visible");
    getDeletionModal().within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains("Cancel").click();
    });

    getDeletionModal().should("not.exist");

    cy.get('[data-testid="icon:close"]').first().click();
    getIssueDetailsModal().should("not.exist");

    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(issueTitle).should("be.visible");
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedAmountOfIssuesAfterCancellation
      );
    });
  });
});
