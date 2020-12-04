const db = require('./db.json') as Employee[];

type Time = {
  id: string;
  clockedIn: string;
  clockedOut: string;
  unproductiveTime: string;
};

type Employee = {
  id: string;
  name: string;
  times: Time[];
  active: boolean;
};

export const setActive = (id: string, active: boolean): void => {
  const employee = db.find(employee => employee.id === id);
  employee.active = active;
};

export default db;
