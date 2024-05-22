import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [latestOrders, setLatestOrders] = useState([]);
  const [dailySales, setDailySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);

  useEffect(() => {
    // Fetch product, category, and customer counts
    // Replace these with actual API endpoints and logic
    setProductsCount(12);
    setCategoriesCount(3);
    setCustomersCount(5);

    // Dummy data for testing
    const dummyOrders = [
      {
        id: 1,
        timestamp: "2024-05-20T12:34:56",
        total_amount: 1500,
        shipping_address: "123 Main St",
        payment_method: "Mpesa",
      },
      {
        id: 2,
        timestamp: "2024-05-21T09:21:34",
        total_amount: 2200,
        shipping_address: "456 Elm St",
        payment_method: "Visa card",
      },
      {
        id: 3,
        timestamp: "2024-05-22T14:45:12",
        total_amount: 3000,
        shipping_address: "789 Oak St",
        payment_method: "Mpesa",
      },
    ];

    setLatestOrders(dummyOrders);

    // Calculate sales for the dummy data
    const today = new Date().toISOString().split("T")[0];
    const firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];

    let dailyTotal = 0;
    let monthlyTotal = 0;

    dummyOrders.forEach((order) => {
      const orderDate = order.timestamp.split("T")[0];
      if (orderDate === today) {
        dailyTotal += order.total_amount;
      }
      if (orderDate >= firstDayOfMonth) {
        monthlyTotal += order.total_amount;
      }
    });

    setDailySales(dailyTotal);
    setMonthlySales(monthlyTotal);
  }, []);

  return (
    <main className="p-5 text-black bg-light-mode min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold">DASHBOARD</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-5">
        <div className="bg-dark-mode p-5 rounded mb-2 md:mb-0 md:mr-2">
          <h4 className="text-lg font-bold">Total Daily Sales</h4>
          <p className="text-2xl font-bold">Kshs {dailySales.toFixed(2)}</p>
        </div>
        <div className="bg-dark-mode p-5 rounded">
          <h4 className="text-lg font-bold">Total Monthly Sales</h4>
          <p className="text-2xl font-bold">Kshs {monthlySales.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
        <div className="flex flex-col justify-around p-5 rounded bg-dark-mode">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">PRODUCTS</h3>
            <BsFillArchiveFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">{productsCount}</h1>
        </div>
        <div className="flex flex-col justify-around p-5 rounded bg-dark-mode">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">{categoriesCount}</h1>
        </div>
        <div className="flex flex-col justify-around p-5 rounded bg-dark-mode">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">CUSTOMERS</h3>
            <BsPeopleFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">{customersCount}</h1>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-3">Latest Orders</h2>
        <div className="md:block hidden">
          <table className="min-w-full">
            <thead className="bg-dark-mode">
              <tr>
                <th className="py-2 px-4 ">Order ID</th>
                <th className="py-2 px-4 ">Date</th>
                <th className="py-2 px-4 ">Total Amount</th>
                <th className="py-2 px-4 ">Shipping Address</th>
                <th className="py-2 px-4 ">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.timestamp}</td>
                  <td className="py-2 px-4">
                    Kshs {order.total_amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4">{order.shipping_address}</td>
                  <td className="py-2 px-4">{order.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden">
          {latestOrders.map((order) => (
            <div key={order.id} className="mb-4 p-4 bg-dark-mode rounded">
              <p className="font-bold">Order ID: {order.id}</p>
              <p>Date: {order.timestamp}</p>
              <p>Total Amount: Kshs {order.total_amount.toFixed(2)}</p>
              <p>Shipping Address: {order.shipping_address}</p>
              <p>Payment Method: {order.payment_method}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
