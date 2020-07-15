//include copy tests

describe('Slider Tag Tests', function () {

  beforeEach(() => {
    cy.visit('/test')

  })

  it('number slider hide test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel" hide>
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });

    cy.get('[data-cy = "slider-handle"]').should('not.exist')

  })

  it('disabled slider drag test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider disabled showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });
    cy.get('[data-cy=slider-handle]')
      .then($el => {
        var rect = $el[0].getBoundingClientRect()
        // cy.log('current position', rect.x)
        
        cy.get('[data-cy=slider-handle]')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove', { which: 1, clientX: rect.x + 400, clientY: 0})
        .wait(300)
        .trigger('mouseup')
        .wait(300)
      })
      

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })
    
  })

  it('disabled slider button test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider disabled showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });
    cy.get('[data-cy=button-next]')
      .should('be.disabled');    
  })


  it('slider label test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });

    cy.get('[data-cy = label]').should('have.text', 'testlabel')  // to wait for page to load
    // cy.log('move handle to 100 px');

  })

  it('number slider handle test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });

    
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

  })

  it('number slider tick and tick label click test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });
    

    cy.get('[data-cy=tick-0]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })

    cy.get('[data-cy=tick-1]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.get('[data-cy=tick-2]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(3)
    })

    cy.get('[data-cy=tick-label-0]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })

    cy.get('[data-cy=tick-label-1]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.get('[data-cy=tick-label-2]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(3)
    })

  })

  it('number slider button test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>
    `}, "*");
    });

    cy.get('[data-cy=button-next]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.get('[data-cy=button-next]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(3)
    })

    cy.get('[data-cy=button-next]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(3)
    })

    cy.get('[data-cy=button-prev]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.get('[data-cy=button-prev]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })

    cy.get('[data-cy=button-prev]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })

  })

  it('text slider handle test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel">
    <text>a</text>
    <text>b</text>
    <text>c</text>
  </slider>
    `}, "*");
    });

    
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
      expect(slider1value).eq("a")
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
      expect(slider1value).eq("b")
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
      expect(slider1value).eq("b")
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
      expect(slider1value).eq("c")
    })

  })

  it('text slider tick and tick label click test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
      <slider showControls label = "testlabel">
        <text>a</text>
        <text>b</text>
        <text>c</text>
      </slider>
    `}, "*");
    });
    

    cy.get('[data-cy=tick-0]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("a")
    })

    cy.get('[data-cy=tick-1]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("b")
    })

    cy.get('[data-cy=tick-2]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("c")
    })

    cy.get('[data-cy=tick-label-0]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("a")
    })

    cy.get('[data-cy=tick-label-1]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("b")
    })

    cy.get('[data-cy=tick-label-2]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("c")
    })

  })

  it('text slider button test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
      <slider showControls label = "testlabel">
        <text>a</text>
        <text>b</text>
        <text>c</text>
      </slider>
    `}, "*");
    });

    cy.get('[data-cy=button-next]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("b")
    })

    cy.get('[data-cy=button-next]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("c")
    })

    cy.get('[data-cy=button-next]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("c")
    })

    cy.get('[data-cy=button-prev]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("b")
    })

    cy.get('[data-cy=button-prev]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("a")
    })

    cy.get('[data-cy=button-prev]')
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq("a")
    })

  })

  it('slider copy test', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <slider showControls label = "testlabel">
    <number>1</number>
    <number>2</number>
    <number>3</number>
  </slider>

  <copy tname = '/_slider1' />
    `}, "*");
    });

    cy.get('[data-cy=button-next]')
      .eq(0)
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let slider1value = components['__slider_mpsCoH43rBvf'].stateValues.value;
      expect(slider1value).eq(2)
    })

    cy.wait(300)

    cy.get('[data-cy=button-prev]')
      .eq(1)
      .click('left');

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      
      let slider1value = components['/_slider1'].stateValues.value;
      expect(slider1value).eq(1)
    })

  })
  
})



