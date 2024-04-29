/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    });

    it('Verifica o titulo da aplicação', () =>{
        
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {

        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE'

        cy.get('#firstName')
            .type('Luciano')
        cy.get('#lastName')
            .type('Pereira Maciel')
        cy.get('#email')
            .type('luciano.maciel1088@gmail.com')
        cy.get('#open-text-area')
            .type(longText, {delay: 0})
        cy.contains('button','Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
            .type('Luciano')
        cy.get('#lastName')
            .type('Pereira Maciel')
        cy.get('#email')
            .type('luciano.maciel1088gmail.com')
        cy.get('#open-text-area')
            .type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error')
            .should('be.visible')
    });

    it('Verifica que campo telefone aceita apenas números', () => {
        cy.get('#firstName')
            .type('Luciano');
        cy.get('#lastName')
            .type('Pereira Maciel');
        cy.get('#email')
            .type('luciano.maciel@1088gmail.com');
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
            .type('Luciano')
        cy.get('#lastName')
            .type('Pereira Maciel')
        cy.get('#email')
            .type('luciano.maciel1088@gmail.com')
        cy.get('#phone-checkbox')
            .check()
        .should('have.value', 'phone')
        cy.get('#open-text-area')
            .type('Teste')
        cy.contains('button','Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Luciano')
            .should('have.value', 'Luciano')
            .clear()
            .should('have.value', '');
        cy.get('#lastName').type('Pereira Maciel')
            .should('have.value', 'Pereira Maciel')
            .clear()
            .should('have.value', '');
        cy.get('#email').type('luciano.maciel1088@gmail.com')
            .should('have.value', 'luciano.maciel1088@gmail.com')
            .clear()
            .should('have.value', '');
        cy.get('#phone').type('987654321')
            .should('have.value', '987654321')
            .clear()
            .should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
        cy.contains('button','Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success')
            .should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]')
            .check()
            .should('be.checked')
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('have.value', 'phone')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: "drag-drop"} )
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('exampleFile')
            
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@exampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    });

});