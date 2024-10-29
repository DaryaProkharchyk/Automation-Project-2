import IssueModal from "../../pages/IssueModal";

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  //data set with which we are creating issue
  const issueDetails = {
    title: "TEST_TITLE",
    type: "Bug",
    description: "TEST_DESCRIPTION",
    assignee: "Lord Gaben",
  };

  const EXPECTED_AMOUNT_OF_ISSUES = "5";

  it("Should create issue successfully", () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
  });
});
