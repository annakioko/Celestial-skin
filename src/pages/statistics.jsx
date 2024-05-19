import React, { useState, useEffect } from "react";

// Mock data for demonstration
const mockOrders = [
  {
    id: 1,
    timestamp: "2024-05-20",
    shipping_address: "123 Street, City",
    payment_method: "Credit Card",
    payment_status: "Paid",
    payment_amount: 20,
  },
  {
    id: 2,
    timestamp: "2024-05-19",
    shipping_address: "456 Avenue, Town",
    payment_method: "PayPal",
    payment_status: "Paid",
    payment_amount: 30,
  },
  // Add more orders as needed
];

const calculateTodaySales = (orders) => {
  // Calculate today's sales
  const today = new Date().toISOString().slice(0, 10); // Get today's date
  return orders.reduce((total, order) => {
    if (order.timestamp === today) {
      return total + order.payment_amount;
    }
    return total;
  }, 0);
};

const calculateMonthlySales = (orders) => {
  // Calculate monthly sales
  const thisMonth = new Date().toISOString().slice(0, 7); // Get current year-month
  return orders.reduce((total, order) => {
    if (order.timestamp.includes(thisMonth)) {
      return total + order.payment_amount;
    }
    return total;
  }, 0);
};

const OrderTable = ({ title }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch your order data here
    // For now, we are using mock data
    setOrders(mockOrders);
  }, []);

  const calculateSales =
    title === "Today's Sales"
      ? calculateTodaySales(orders)
      : calculateMonthlySales(orders);

  return (
    <div className="rounded-3xl bg-light-mode border border-solid border-dark-mode my-4 mx-4 p-4">
      <h1 className="text-2lg font-medium mb-4">{title}</h1>
      <div className="mt-4 text-2xl font-bold">
         ${calculateSales.toFixed(2)}
      </div>
    </div>
  );
};

const SalesDashboard = () => {
  return (
    <div className="flex">
      <OrderTable title="Today's Sales" />
      <OrderTable title="Monthly Sales" />
    </div>
  );
};

export default SalesDashboard;
