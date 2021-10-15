beforeEach(() => {
  cy.task('resetDb');
});

describe('home page', () => {
  it('displays Sign up and Log in', () => {
    cy.visit('/');
    cy.contains('Sign up');
    cy.contains('Log in');
  });
});

describe('create users', () => {
  it('can create a new user', () => {
    cy.visit('/');
    cy.contains('Sign up').click();
    cy.url().should('include', '/signup');
    cy.get('input[name="email"]').type('adam@adam.com');
    cy.get('input[name="name"]').invoke('val', 'Adam');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button').click();
    cy.contains('Adam');
  });
});

describe('login', () => {
  it('can login into account', () => {
    cy.visit('/');
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('adam@adam.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button').click();
    cy.contains('Hello Adam');
  });
});

describe('logout', () => {
  it('can logout from account', () => {
    cy.visit('/');
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('adam@adam.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button').click();
    cy.contains('Hello Adam');
    cy.get('button[id="logoutBtn"]').click();
    cy.contains('Log in');
  });
});

describe('edit user details', () => {
  it('can edit user details', () => {
    cy.visit('/');
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('adam@adam.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button').click();
    cy.contains('Hello Adam');
    cy.contains('Edit').click();
    cy.url().should('include', '/edituser');
    cy.get('input[name="name"]').clear();
    cy.get('input[name="name"]').type('AdamSandler');
    cy.get('button').click();
    cy.contains('AdamSandler');
  });
});

describe('delete user', () => {
  it('can delete a user', () => {
    cy.visit('/');
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('adam@adam.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button').click();
    cy.get('button[id="deleteBtn"]').click();
    cy.contains('AdamSandler').should('not.exist');
  });
});
