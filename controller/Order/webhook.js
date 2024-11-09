const stripe = require("../../config/stripe");
const orderModel = require("../../models/OrderProductModel");

async function getLineItems(lineItems) {
  let productItems = [];
  if (lineItems.data.length > 0) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: item.price.unit_amount / 100,
      };
      productItems.push(productData);
    }
  }
  return productItems;
}

const webhooks = async (req, res) => {
  // Retrieve the endpoint secret from your environment variables
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    // Verify the event with Stripe using the signature and endpoint secret
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const productDetails = await getLineItems(lineItems);
      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },

        shipping_options: session.shipping_options.map((s) => {
          return {
            ...s,
            shipping_amount: s.shipping_amount / 100,
          };
        }),
        totalAmount: session.amount_total / 100,
      };

      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Acknowledge receipt of the event
  res.status(200).send();
};

module.exports = webhooks;
