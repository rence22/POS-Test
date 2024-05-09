describe('GET Route', () => {
    it('1. Read User', () => {
      cy.visit('http://127.0.0.1:8000/docs#/Cashier/read_cashier_api_cashier__get')
      cy.request('http://127.0.0.1:8000/api/cashier/').then((response)=>{
  expect(response.status).to.eq(200)
  expect(response.body).to.have.length.above(0)
      })


  })


})


describe('PUT Route', () => {
  it(' 2. Find a user by ID', () => {
    cy.visit('http://127.0.0.1:8000/docs#/Cashier/read_cashier_api_cashier__CashierID__get')


    cy.request({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/cashier/4`, // Request URL
    }).then((response) => {
      // Assert that the request was successful
      expect(response.status).to.equal(200);


      // Assert that the response contains the expected user ID
      expect(response.body).to.have.property('cashierID', 4);


      // Assert that the response contains the expected username
      expect(response.body).to.have.property('username', "EmmaBrown");


    });


  })


})




describe('DELETE Route', () => {
  it('3. Delete user', () => {
    cy.visit('http://127.0.0.1:8000/docs#/Cashier/delete_cashier_api_cashier__cashier_id__delete')


    cy.request({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/cashier/6`, // Request URL
      failOnStatusCode: false, // Do not fail test on non-2xx or 3xx status codes
    }).then((response) => {
      // Check if the request was successful (status code 2xx)
      if (response.status === 200) {
        // Assert that the deletion was successful
        expect(response.body).to.have.property({ message: "Cashier deleted successfully"});
      } else {
        // Assert specific error message or response body
        expect(response.body.detail).to.contain('Cashier not found');
      }


    });


  });


})




