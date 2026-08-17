import Stripe from "stripe";

export type PaymentMethod = "card" | "blik";

export type CreatePaymentResult = {
  paymentIntentId: string;
  clientSecret: string | null;
  devMode: boolean;
};

const secretKey = process.env.STRIPE_SECRET_KEY;

// Bez skonfigurowanego klucza Stripe aplikacja działa w trybie deweloperskim:
// generuje fikcyjny identyfikator płatności, żeby cały przepływ zamówienia
// dało się przetestować lokalnie bez prawdziwego konta Stripe.
// PRZED PRODUKCJĄ: ustaw STRIPE_SECRET_KEY i usuń poleganie na trybie DEV.
export async function createPayment(
  amountCents: number,
  method: PaymentMethod,
  orderNumber: number
): Promise<CreatePaymentResult> {
  if (!secretKey) {
    return {
      paymentIntentId: `dev_pi_${orderNumber}_${Date.now()}`,
      clientSecret: null,
      devMode: true
    };
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

  // Stripe obsługuje BLIK jako metodę płatności dla kont rozliczających się
  // w PLN — zob. dokumentację Stripe dot. lokalnych metod płatności w Polsce.
  const paymentMethodTypes: Stripe.PaymentIntentCreateParams.PaymentMethodType[] =
    method === "blik" ? ["blik"] : ["card"];

  const intent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: "pln",
    payment_method_types: paymentMethodTypes,
    metadata: { orderNumber: String(orderNumber) }
  });

  return {
    paymentIntentId: intent.id,
    clientSecret: intent.client_secret,
    devMode: false
  };
}
