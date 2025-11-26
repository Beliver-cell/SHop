import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";

//payment-gateway
const stripe = new Stripe(process.env.stripeKey);
// const razorpayInstance = new razorpay() 

const currency = "inr";
const deleiveryCharge = 10;

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Deleivery Chargest",
        },
        unit_amount: deleiveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      response: error.message,
    });
  }
};

    
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: "true" });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {

};

// Placing orders using Flutterwave method
const placeOrderFlutterwave = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Flutterwave",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const flutterwavePayload = {
      tx_ref: `order_${newOrder._id}_${Date.now()}`,
      amount: amount,
      currency: "NGN",
      redirect_url: `${origin}/verify?success=true&orderId=${newOrder._id}&method=flutterwave`,
      customer: {
        email: address.email,
        phonenumber: address.phone,
        name: `${address.firstName} ${address.lastName}`,
      },
      customizations: {
        title: "Fantasy Store Order Payment",
        description: "Payment for order",
        logo: "https://checkout.flutterwave.com/assets/img/hero/Group_1688-7.png",
      },
    };

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      flutterwavePayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      res.json({
        success: true,
        payment_link: response.data.data.link,
      });
    } else {
      await orderModel.findByIdAndDelete(newOrder._id);
      res.json({
        success: false,
        message: "Failed to create Flutterwave payment",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Placing orders using Paystack method
const placeOrderPaystack = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Paystack",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const paystackPayload = {
      email: address.email,
      amount: amount * 100, // Paystack expects amount in kobo
      metadata: {
        order_id: newOrder._id.toString(),
        items: items,
        address: address,
      },
    };

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      paystackPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status) {
      res.json({
        success: true,
        authorization_url: response.data.data.authorization_url,
        access_code: response.data.data.access_code,
        reference: response.data.data.reference,
      });
    } else {
      await orderModel.findByIdAndDelete(newOrder._id);
      res.json({
        success: false,
        message: "Failed to create Paystack payment",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Flutterwave payment
const verifyFlutterwave = async (req, res) => {
  const { orderId, success, userId, transactionId } = req.body;

  try {
    if (success === "true") {
      // Verify transaction with Flutterwave
      const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );

      if (response.data.status === "success" && response.data.data.status === "successful") {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Payment verification failed" });
      }
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Paystack payment
const verifyPaystack = async (req, res) => {
  const { reference, orderId, userId } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status && response.data.data.status === "success") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  placeOrderFlutterwave,
  placeOrderPaystack,
  allOrders,
  updateStatus,
  userOrders,
  verifyStripe,
  verifyFlutterwave,
  verifyPaystack,
};
