import { render, screen } from "@testing-library/react";
import * as React from "react";
import App from "./App";
import calc from "./Calculations";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("Returns Invalid Input if given non digits, non operators, non spaces, non decimals", () => {
  expect(calc("5+hello-kitty")).toEqual("Invalid Input");
  expect(calc("one plus two")).toEqual("Invalid Input");
});

test("Adds numbers", () => {
  expect(calc("1+3")).toEqual(4);
  expect(calc("2+100")).toEqual(102);
});

test("Does not care about spaces", () => {
  expect(calc("   1 +    3")).toEqual(4);
  expect(calc("9    +        100")).toEqual(109);
});

test("Subtracts numbers", () => {
  expect(calc("1-3")).toEqual(-2);
  expect(calc("100-2")).toEqual(98);
});

test("Understands multiple operators", () => {
  expect(calc("1+2+3")).toEqual(6);
  expect(calc("3+5+6")).toEqual(14);
});

test("Can add and subtract", () => {
  expect(calc("1+2-3")).toEqual(0);
  expect(calc("3-5+6")).toEqual(4);
});

test("Can multiply", () => {
  expect(calc("1*2")).toEqual(2);
  expect(calc("3*6")).toEqual(18);
});

test("Can multiply several numbers", () => {
  expect(calc("1*2*20")).toEqual(40);
  expect(calc("3*6*2")).toEqual(36);
});

test("Can divide", () => {
  expect(calc("20/4")).toEqual(5);
  expect(calc("6/2")).toEqual(3);
});

test("Can divide several numbers", () => {
  expect(calc("20/4/5")).toEqual(1);
  expect(calc("100/5/4")).toEqual(5);
});

test("Can divide and multiple", () => {
  expect(calc("20/4*5")).toEqual(25);
  expect(calc("100/5*4")).toEqual(80);
});

test("Can multiply, divide, add, subtract in correct order of operations", () => {
  expect(calc("20+18/6")).toEqual(23);
  expect(calc("100-3+2*4")).toEqual(105);
  expect(calc("25-5*2")).toEqual(15);
  expect(calc("100/5+8*1")).toEqual(28);
});

test("Can handle decimals", () => {
  expect(calc("0.5 + 0.5")).toEqual(1);
  expect(calc("5.3 - 0.3")).toEqual(5);
  expect(calc("1.1 * 2")).toEqual(2.2);
});

test("Can handle decimals without 0 before .", () => {
  expect(calc(".5 + .5")).toEqual(1);
  expect(calc(".3 - .3")).toEqual(0);
  expect(calc(".1 * 2")).toEqual(0.2);
});

test("Can handle longer strings", () => {
  expect(calc("1+1+1-2+3+1-10")).toEqual(-5);
  expect(calc("2*2-6/3+4*2")).toEqual(10);
});

test("Can handle parenthesis", () => {
  expect(calc("2+(5-2)")).toEqual(5);
  expect(calc("2*(3+(4*2))")).toEqual(22);
});

test("Can handle negative numbers", () => {
  expect(calc("-10+5")).toEqual(-5);
  expect(calc("2*-10")).toEqual(20);
});

test("Returns Invalid Syntax when given consecutive operators except for a second negative operator", () => {
  expect(calc("5++5")).toEqual("Invalid Syntax");
  expect(calc("5**/5")).toEqual("Invalid Syntax");
  expect(calc("2+-3")).toEqual(-1);
});

test("Returns Invalid Syntax if parenthesis are unbalanced", () => {
  expect(calc("(1+2)")).toEqual(3);
  expect(calc("(5+2(-3+2)))")).toEqual("Invalid Syntax");
  expect(calc("((1*2)")).toEqual("Invalid Syntax");
});
