const data = [
  {
    date: "1/2/2018",
    netSales: 32.34,
    payments: 32.34,
    balance: 0
  },
  {
    date: "1/3/2018",
    netSales: 12.0,
    payments: 12.0,
    balance: 0
  }
];

const expected = [
  ["date", "1/2/18", "1/3/2018"],
  ["netSales", 32.34, 12.0],
  ["payments", 32.34, 12.0],
  ["balance", 0, 0]
];

export const pivot = <T>(arr: T[]): any[][] => {
  if (arr.length === 0) return [[]];
  return [
    ...Object.keys(arr[0]).map(key =>
      arr.reduce((acc, x) => acc.concat(x[key]), [key])
    )
  ];
};
