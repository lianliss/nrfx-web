import React from "react";

function TransactionTable({ data }) {
  return (
    <table className="TransactionTable">
      <tbody>
        {data.map(item => (
          <tr className="TransactionTable__row">
            <td className="TransactionTable__row__key">{item.key}</td>
            <td className="TransactionTable__row__value">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
