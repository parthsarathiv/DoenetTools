describe('Slider Tag Tests', function () {

  beforeEach(() => {
    cy.visit('/test')

  })


  it('number slider', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider>
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });

    //cy.get('#\\/_text1').should('have.text', 'a')  // to wait for page to load
    // cy.log('move handle to 100 px');
    
    cy.get('[data-cy=slider-handle]')
      .then($el => {
        var rect = $el[0].getBoundingClientRect()
        // cy.log('current position', rect.x)
        
        cy.get('[data-cy=slider-handle]')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove', { which: 1, clientX: rect.x + 100, clientY: 0})
        .wait(300)
        .trigger('mouseup')
        .wait(300)
      })
      

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })

    cy.get('[data-cy=slider-handle]')
      .then($el => {
        var rect = $el[0].getBoundingClientRect()
        // cy.log('current position', rect.x)
        
        cy.get('[data-cy=slider-handle]')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove', { which: 1, clientX: rect.x + 200, clientY: 0})
        .wait(300)
        .trigger('mouseup')
        .wait(300)
      })
      

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.get('[data-cy=slider-handle]')
      .then($el => {
        var rect = $el[0].getBoundingClientRect()
        // cy.log('current position', rect.x)
        
        cy.get('[data-cy=slider-handle]')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove', { which: 1, clientX: rect.x + 100, clientY: 0})
        .wait(300)
        .trigger('mouseup')
        .wait(300)
      })
      

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.get('[data-cy=slider-handle]')
      .then($el => {
        var rect = $el[0].getBoundingClientRect()
        // cy.log('current position', rect.x)
        
        cy.get('[data-cy=slider-handle]')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove', { which: 1, clientX: rect.x + 200, clientY: 0})
        .wait(300)
        .trigger('mouseup')
        .wait(300)
      })
      

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(3)
    })
    // cy.wait(500);
    // cy.get('[data-cy=slider-handle]')
    //   .trigger('mousedown')
    //   .trigger('mousemove', {clientX: 200, clientY: 0 })
    //   .trigger('mouseup')

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(2)
    // })

    // cy.wait(500);
    // cy.get('[data-cy=slider-handle]')
    //   .trigger('mousedown')
    //   .trigger('mousemove', { which:1, pageX: 400, pageY: 0 })
    //   .trigger('mouseup')

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(2)
    // })

    // cy.get('[data-cy=slider-handle]')
    //   .trigger('mousedown')
    //   .trigger('mousemove', { which:1, pageX: 80, pageY: 0 })
    //   .trigger('mouseup')

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(3)
    // })

    // cy.get('[data-cy=tick-0]')
    //   .click('left');

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(1)
    // })

    // cy.get('[data-cy=tick-1]')
    //   .click('left');

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(2)
    // })

    // cy.get('[data-cy=tick-label-0]')
    //   .click('left');

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(1)
    // })

    // cy.get('[data-cy=tick-label-1]')
    //   .click('left');

    // cy.window().then((win) => {
    //   let components = Object.assign({}, win.state.components);
    //   let slider1value = components['/_slider1'].stateValues.value;
    //   expect(slider1value).eq(2)
    // })
  })
})



