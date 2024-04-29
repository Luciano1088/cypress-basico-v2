Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Luciano');
    cy.get('#lastName').type('Pereira Maciel');
    cy.get('#email').type('luciano.maciel1088@gmail.com');
    cy.get('#open-text-area').type('Teste');
    cy.contains('button','Enviar').click();
});