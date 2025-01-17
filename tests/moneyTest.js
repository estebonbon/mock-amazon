import { formatCurrency } from "../scripts/money.js";

describe('Test suite: formatCurrency', () => {
  it('converts cents to dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00')
  })

  it('works with negative integer', () => {
    expect(formatCurrency(-8900.3)).toEqual('-89.00')
  })
});
