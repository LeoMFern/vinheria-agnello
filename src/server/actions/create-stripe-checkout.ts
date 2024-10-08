"use server";

import type Stripe from "stripe";
import { getBaseUrl } from "~/lib/utils";
import { stripe } from "../stripe";

export const createStripeCheckout = async (
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1Q5uzuEDdg2X3pnu1AT8qJvW", //hardcoded. yes indeed very cool
      },
    ],
    success_url: `${getBaseUrl()}/cart/success`,
    cancel_url: `${getBaseUrl()}/cart/cancel`,
  });
  return session.id;
};
