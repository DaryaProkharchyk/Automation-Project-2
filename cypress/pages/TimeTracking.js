class TimeTracking {
  constructor() {
    this.inputFieldTime = 'input[placeholder="Number"]';
    this.timeTrackingModal = '[data-testid="modal:tracking"]';
    this.timeTrackingButton = '[data-testid="icon:stopwatch"]';
  }

  checkNoTimeLogged() {
    cy.contains('No time logged').should('be.visible');
  }

  logEstimatedTime(estimatedTime) {
    cy.get(this.inputFieldTime).type(estimatedTime);
    cy.get(this.inputFieldTime).should('have.value', estimatedTime);
  }

  checkEstimatedTime(estimatedTime) {
    cy.contains(`${estimatedTime}h estimated`).should('be.visible');
  }

  clearEstimatedTime() {
    cy.get(this.inputFieldTime).clear();
  }

  getTimeTrackingModal() {
    cy.get(this.timeTrackingButton).click();
    cy.get(this.timeTrackingModal).should('be.visible');
  }

  addLoggedTime(loggedTime, remainingTime) {
    cy.get(this.timeTrackingModal)
      .should('be.visible')
      .within(() => {
        cy.get(this.inputFieldTime).first().type(loggedTime);
        cy.get(this.inputFieldTime).last().type(remainingTime);
        cy.wait(2000);
        cy.contains('button', 'Done').click();
      });
  }

  clearLoggedTime() {
    cy.get(this.timeTrackingModal)
      .should('be.visible')
      .within(() => {
        cy.get(this.inputFieldTime).each(($el) => {
          cy.wrap($el).clear();
        });
        cy.wait(2000);
        cy.contains('button', 'Done').click();
      });
  }

  checkLoggedTime(loggedTime, remainingTime) {
    cy.contains(`${loggedTime}h logged`).should('be.visible');
    cy.contains(`${remainingTime}h remaining`).should('be.visible');
  }
}

export default new TimeTracking();
