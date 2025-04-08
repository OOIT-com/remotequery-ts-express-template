// noinspection SqlResolve
/* tslint:disable:no-console */

describe("Person select test", () => {
  // before(() => {}); // the tests container
  it("person select", async () => {
    const res = await fetch("http://localhost:3002/api/person.select");
  });
});
