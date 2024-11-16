const description = 'Some description';
const title = 'Some title';
const issueCreationConfirmation = 'Issue has been successfully created.';
const backlogList = '[data-testid="board-list:backlog"]';
const inputFieldTime = 'input[placeholder="Number"]';
const timeTrackingModal = '[data-testid="modal:tracking"]';
const timeTrackingButton = '[data-testid="icon:stopwatch"]';

const estimatedTime = '5';
const estimatedTimeUpdated = '10';
const loggedTime = '2';
const remainingTime = '3';
const loggedTimeUpdated = '4';
const remainingTimeUpdated = '6';

const expectedText = {
  estimated: 'h estimated',
  logged: 'h logged',
  remaining: 'h remaining',
};

const checkNoTimeLoggedVisible = () => {
  cy.contains('No time logged').should('be.visible');
};

const clickTimeTrackingButton = () => {
  cy.get(timeTrackingButton).click();
};

const assertTimeTrackingModalNotVisible = () => {
  cy.get(timeTrackingModal).should('not.exist');
};

const assertEstimationVisibility = (time, visibility) => {
  if (visibility) {
    cy.contains(`${time}${expectedText.estimated}`).should('be.visible');
  } else {
    cy.contains(`${time}${expectedText.estimated}`).should('not.exist');
  }
};

const fillTimeTrackingModal = (logged, remaining) => {
  cy.get(timeTrackingModal).within(() => {
    if (logged) {
      cy.get(inputFieldTime).eq(0).type(logged);
    } else {
      cy.get(inputFieldTime).eq(0).clear();
    }
    if (remaining) {
      cy.get(inputFieldTime).eq(1).type(remaining);
    } else {
      cy.get(inputFieldTime).eq(1).clear();
    }
    cy.contains('button', 'Done').click();
  });
};

const assertLoggedAndRemainingVisible = (logged, remaining) => {
  cy.contains(`${logged}${expectedText.logged}`).should('be.visible');
  cy.contains(`${remaining}${expectedText.remaining}`).should('be.visible');
};

describe('Time-tracking functionality tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');

        // Create a new issue

        cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('.ql-editor').type(description);
          cy.get('[data-testid="select:type"]').click();
          cy.get('[data-testid="select-option:Bug"]').click();
          cy.get('input[name="title"]').type(title);
          cy.get('[data-testid="select:userIds"]').click();
          cy.get('[data-testid="select-option:Lord Gaben"]').click();
          cy.get('button[type="submit"]').click();
        });

        cy.contains(issueCreationConfirmation).should('be.visible');
        cy.wait(2000);
        cy.get(backlogList).should('be.visible').contains(title).click();
      });
  });

  // Time Estimation Functionality

  it('Should add, update and remove estimated time', () => {
    checkNoTimeLoggedVisible();

    // Initial estimation
    cy.get(inputFieldTime).type(estimatedTime);
    assertEstimationVisibility(estimatedTime, true);

    // Update estimation
    cy.get(inputFieldTime).clear().type(estimatedTimeUpdated);
    assertEstimationVisibility(estimatedTimeUpdated, true);

    // Remove estimation
    cy.get(inputFieldTime).clear();
    assertEstimationVisibility(estimatedTime, false);
    assertEstimationVisibility(estimatedTimeUpdated, false);
    checkNoTimeLoggedVisible();
  });

  //Time Logging Functionality

  it('Should add, update and remove logged time values', () => {
    checkNoTimeLoggedVisible();
    cy.get(inputFieldTime).type(estimatedTime);
    assertEstimationVisibility(estimatedTime, true);

    // Log time and verify logged time appears
    clickTimeTrackingButton();
    fillTimeTrackingModal(loggedTime, remainingTime);
    assertTimeTrackingModalNotVisible();
    assertLoggedAndRemainingVisible(loggedTime, remainingTime);

    // Update logged time and verify updated logged time appears
    clickTimeTrackingButton();
    fillTimeTrackingModal(loggedTimeUpdated, remainingTimeUpdated);
    assertTimeTrackingModalNotVisible();
    assertLoggedAndRemainingVisible(loggedTimeUpdated, remainingTimeUpdated);

    // Clear logged time and ensure no time logged is visible
    clickTimeTrackingButton();
    fillTimeTrackingModal('', '');
    checkNoTimeLoggedVisible();
    cy.contains(`${loggedTime}${expectedText.logged}`).should('not.exist');
    cy.contains(`${remainingTime}${expectedText.remaining}`).should(
      'not.exist'
    );
    cy.contains(`${estimatedTime}${expectedText.estimated}`).should(
      'be.visible'
    );
  });
});
