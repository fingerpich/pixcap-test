var assert = require('assert');
import EmployeeOrgApp from "./src/EmployeeOrgApp"

const ceo = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      uniqueId: 2,
      name: "Sarah Donald",
      subordinates: [
        {
          uniqueId: 3,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 4,
              name: "Mary Blue",
              subordinates: []
            },
            {
              uniqueId: 5,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 6,
                  name: "Tina Teff",
                  subordinates: [
                    {
                      uniqueId: 7,
                      name: "Will Turner",
                      subordinates: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      uniqueId: 8,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 9,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 10,
              name: "Thomas Brown",
              subordinates: []
            }
          ]
        },
        {
          uniqueId: 11,
          name: "George Carrey",
          subordinates: []
        },
        {
          uniqueId: 12,
          name: "Gary Styles",
          subordinates: []
        }
      ]
    },
    {
      uniqueId: 13,
      name: "Bruce Willis",
      subordinates: []
    },
    {
      uniqueId: 14,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 15,
          name: "Sophie Turner",
          subordinates: []
        }
      ]
    },
  ]
}
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

describe('Moves', function() {
  it("move employee A to become the subordinate of employee B (i.e. B becomes A's supervisor) ", function() {
    const app = new EmployeeOrgApp(clone(ceo))
    app.move(2, 3)
    const { employee, supervisor } = app.findEmployee(2)
    assert.equal(supervisor.uniqueId, 3)
  })
  it("when an employee (e.g. Bob Saget) is moved to a new supervisor (e.g. Georgina), Bob's existing subordinates (Tina Teff) will become the subordinate of Cassandra, Bob's old supervisor. ", function() {
    const app = new EmployeeOrgApp(clone(ceo))
    app.move(5, 14)
    const { employee, supervisor } = app.findEmployee(6) //Tina Teff
    assert.equal(supervisor.name, "Cassandra Reynolds")
  })
})

describe('Undo/Redo', function() {
  it("undo moving Bob Saget", function() {
    const app = new EmployeeOrgApp(clone(ceo))
    app.move(5, 14) // Bob Saget -> Georgina Flangy
    app.undo()
    const { supervisor } = app.findEmployee(5)
    assert.equal(supervisor.name, "Cassandra Reynolds");
  })
  it("multiple undo", function() {
    const app = new EmployeeOrgApp(clone(ceo))
    app.move(5, 14) // Bob Saget -> Georgina Flangy
    app.move(2, 3) // Sarah Donald -> Cassandra Reynolds
    app.undo()
    app.undo()
    const { employee, supervisor } = app.findEmployee(5)
    assert.equal(supervisor.name, "Cassandra Reynolds")
  })

  it("multiple undo and redo", function() {
    const app = new EmployeeOrgApp(clone(ceo))
    //supervisor: Cassandra Reynolds employee: Bob Saget
    app.move(5, 14) // Bob Saget -> Georgina Flangy
    app.move(2, 3) // Sarah Donald -> Cassandra Reynolds
    app.undo()
    app.undo()
    // should be the same as the first state
    const { supervisor } = app.findEmployee(5)
    assert.equal(supervisor.name, "Cassandra Reynolds")
    app.redo()
    app.redo()
    const saraDonald = app.findEmployee(2)
    assert.equal(saraDonald.supervisor.name, "Cassandra Reynolds")
  })
})