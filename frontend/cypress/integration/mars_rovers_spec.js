describe('mars-rovers', () => {
    it('Expected output: 1 3 N, 5 1 E', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#exampleFormControlTextarea1').select('0')
        cy.get('#inputText').type('5 5{enter}1 2 N{enter}LMLMLMLMM{enter}3 3 E{enter}MMRMMRMRRM')
        cy.get('#submitInput').click()
        cy.get('#listResult').contains('Rover 1 : 13N')
        cy.get('#listResult').contains('Rover 2 : 51E')
    })
})