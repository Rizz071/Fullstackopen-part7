// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })


describe('BLOGS Application', function () {

  before(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Test User',
      username: 'testuser',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
      name: 'Test User 2',
      username: 'testuser2',
      password: 'salasana2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    // const blog = {
    //   title: 'Sample Blog 1',
    //   author: 'Esi MErkki',
    //   url: 'http://some123.address.org',
    //   likes: 0,
    //   user: {
    //     username: 'testuser'
    //   }
    // }

    // cy.request('POST', 'http://localhost:3003/api/blogs/', blog)

    // cy.visit('http://localhost:5173')
  })



  describe('Before login', function () {

    it('front page can be opened', function () {
      cy.visit('http://localhost:5173')
      cy.contains('BLOGS Application')
    })

    it('login form can be opened', function () {
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
    })

  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
      cy.get('input:first').type('testuser')
      cy.get('input:last').type('salasana')

      cy.get('#login-button').click()
      cy.contains('testuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
      cy.get('input:first').type('wronguser')
      cy.get('input:last').type('salasana')

      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })


    describe('When logged in', function () {
      beforeEach(function () {
        cy.visit('http://localhost:5173')

        cy.contains('Login').click()
        cy.get('input:first').type('testuser')
        cy.get('input:last').type('salasana')

        cy.get('#login-button').click()
      })

      it('A blog can be created', function () {

        cy.contains('New blog').click()

        cy.get('#title').type('Sample Blog 114')
        cy.get('#author').type('John Doe')
        cy.get('#url').type('http://some.address.com')
        cy.get('#add-blog-button').click()

        cy.contains('Sample Blog 114')
      })

      it('A blog can be liked', function () {
        cy.contains('View').click()
        cy.get('.button-likes').click()
        cy.wait(1000)
        cy.get('.blog-likes').contains('1')
        cy.get('.button-likes').click()
        cy.wait(1000)
        cy.get('.blog-likes').contains('2')
      })

      it('A blog can be deleted', function () {
        cy.contains('View').click()
        cy.get('#blog-delete-button').click()
        cy.contains('blog Sample Blog 114 was deleted successfully')
      })
    })



    describe('When logged as different user', function () {
      it('only the creator can see the delete button of a blog, not anyone else', function () {
        cy.visit('http://localhost:5173')

        cy.contains('Login').click()
        cy.get('input:first').type('testuser')
        cy.get('input:last').type('salasana')

        cy.get('#login-button').click()

        cy.contains('New blog').click()

        cy.get('#title').type('Sample Blog 114')
        cy.get('#author').type('John Doe')
        cy.get('#url').type('http://some.address.com')
        cy.get('#add-blog-button').click()

        cy.contains('Sample Blog 114')

        cy.contains('Logout').click()

        cy.contains('Login').click()
        cy.get('input:first').type('testuser2')
        cy.get('input:last').type('salasana2')

        cy.get('#login-button').click()
        cy.contains('View').click()
        cy.get('#blog-delete-button').should('not.exist')
      })

    })





  })
  describe('Blogs order checking', function () {

    it('blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.visit('http://localhost:5173')

      cy.contains('Login').click()
      cy.get('input:first').type('testuser')
      cy.get('input:last').type('salasana')

      cy.get('#login-button').click()


      //Dummy BLOG 2
      cy.contains('New blog').click()
      cy.get('#title').type('Sample Blog 400')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('http://some.address.com')
      cy.get('#add-blog-button').click()
      cy.contains('Sample Blog 400')

      //Dummy BLOG 3
      cy.contains('New blog').click()
      cy.get('#title').type('Sample Blog 200')
      cy.get('#author').type('John Doe 2')
      cy.get('#url').type('http://some.address.com')
      cy.get('#add-blog-button').click()
      cy.contains('Sample Blog 200')

      //Dummy BLOG 4
      cy.contains('New blog').click()
      cy.get('#title').type('First in order blog')
      cy.get('#author').type('John Doe 3')
      cy.get('#url').type('http://some.address.com')
      cy.get('#add-blog-button').click()
      cy.contains('First in order blog')


      //Clicking likes-button always in same order
      cy.contains('View').eq(0).click()

      cy.get('.button-likes').eq(2).click()
      cy.wait(1000)
      cy.get('.button-likes').eq(2).click()
      cy.wait(1000)

      cy.get('.button-likes').eq(3).click()
      cy.wait(1000)
      cy.get('.button-likes').eq(3).click()
      cy.wait(1000)
      cy.get('.button-likes').eq(3).click()
      cy.wait(1000)


      //Right blogs order to finall checking
      cy.get('.blog-title').eq(0).should('contain', 'First in order blog')
      cy.get('.blog-title').eq(1).should('contain', 'Sample Blog 114')
      cy.get('.blog-title').eq(2).should('contain', 'Sample Blog 400')
      cy.get('.blog-title').eq(3).should('contain', 'Sample Blog 200')
    })

  })


})

