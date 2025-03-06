const PriceBreakdown = ({
  totalPrice,
  gstAmount,
  gstPercentage,
  platformFee,
  platformGstAmount,
  gatewayFeeRate,
  feesPercentage,
}) => {
  function calculateOriginalValue(increasedValue, increasePercentage) {
    const originalValue = increasedValue / (1 + increasePercentage / 100);
    return originalValue;
}

  const vendorPrice =calculateOriginalValue(totalPrice, feesPercentage);
    // totalPrice * (1 - Number(feesPercentage ? feesPercentage : 12) / 100);
  console.log(vendorPrice, totalPrice);

  const vendorGST = vendorPrice * (Number(gstPercentage) / 100);

  const adminPrice = totalPrice - vendorPrice;
  const adminGST = gstAmount - vendorGST;

  const gatewayFeesVendor =
    (totalPrice + platformFee + gstAmount) * gatewayFeeRate;
  const adminShare = adminPrice + platformFee + platformGstAmount + adminGST;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Price Breakdown</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Category
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">User</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Vendor
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Evaga
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              Total Base Price
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{totalPrice?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{vendorPrice?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{adminPrice?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Total GST</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{gstAmount?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{vendorGST?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{adminGST?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Platform Fees</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformFee?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformFee?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              Platform Fees GST
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformGstAmount?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformGstAmount?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2"> Payment Gateway Fees</td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
            <td className="border border-gray-300 px-4 py-2 text-red-500">
              ₹{gatewayFeesVendor?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 font-bold">
              Final Amount
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold">
              ₹
              {(
                totalPrice +
                gstAmount +
                platformFee +
                platformGstAmount
              )?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold ">
              ₹{(vendorPrice - gatewayFeesVendor + vendorGST)?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold">
              ₹{adminShare?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PriceBreakdown;
