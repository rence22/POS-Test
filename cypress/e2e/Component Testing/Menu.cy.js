describe('GET Route', () => {
    it('1. Read Menu', () => {
      cy.visit('http://127.0.0.1:8000/docs#/Menu/read_menu_api_menu__get')
      cy.request('http://127.0.0.1:8000/api/menu/').then((response)=>{
  expect(response.status).to.eq(200)
  expect(response.body).to.have.length.above(0)
      })


  })


})


describe('POST Route', () => {
    it('2. Create Menu', () => {
        cy.visit('http://127.0.0.1:8000/docs#/Menu/create_item_api_menu__post');
        
        // Assert backend response to verify menu creation
        cy.request({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/menu/?item_id=50&menuItemCategory=breakfast&menuItemName=egg&menuItemPrice=20', // Endpoint to create a menu item
          body: {
            item_id: 50,
            menuItemCategory: 'breakfast',
            menuItemName: 'egg',
            menuItemPrice: 20
          },
          failOnStatusCode: false,
        }).then((response) => {
          // Verify if the request to create the menu item encountered an error (status 500)
          expect(response.status).to.equal(500);
        });

    })
})


describe('PUT Route', () => {
    it('3. Find a menu by ID', () => {
        cy.visit('http://127.0.0.1:8000/docs#/Menu/read_menu_api_menu__ItemID__get')
   
        cy.request({
          method: 'GET',
          url: `http://127.0.0.1:8000/api/menu/5`, // Request URL
        }).then((response) => {
          // Assert that the request was successful
          expect(response.status).to.equal(200);
   
          // Assert that the response contains the expected user ID
          expect(response.body).to.have.property('ItemID', 5);
   
          // Assert that the response contains the expected menu item category
          expect(response.body).to.have.property('menuItemCategory', "dessert");
   
          // Assert that the response contains the expected menu item name
          expect(response.body).to.have.property('menuItemName', "ice cream");
   
          // Assert that the response contains the expected menu item price
          expect(response.body).to.have.property('menuItemPrice', 20);
   
        });
   
     })


})


describe('DELETE Route', () => {
    it('4. Delete menu ', () => {
        cy.visit('http://127.0.0.1:8000/docs#/Menu/delete_menu_api_menu__menu_id__delete')
   
        cy.request({
          method: 'DELETE',
          url: `http://127.0.0.1:8000/api/menu/6`, // Request URL
          failOnStatusCode: false, // Do not fail test on non-2xx or 3xx status codes
        }).then((response) => {
          // Check if the request was successful (status code 2xx)
          if (response.status === 200) {
            // Assert that the deletion was successful
            expect(response.body).to.have.property({ message: "Item deleted successfully"});
          } else {
            // Assert specific error message or response body
            expect(response.body.detail).to.contain('Item not found');
          }
   
        });
   
    });


})
