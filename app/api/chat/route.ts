import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize inside the handler to ensure fresh environment access in dev
const SYSTEM_PROMPT = `
You are an intelligent customer support assistant for Satya Computers, a trusted bulk laptop reseller based in Hyderabad, India.

ABOUT SATYA COMPUTERS:
- Specialized in bulk laptop supply to IT companies, corporates, and businesses
- Based in Hyderabad, Telangana, India
- Known for competitive bulk pricing and reliable stock availability
- Serving clients across India with enterprise-grade hardware solutions

YOUR ROLE:
- Answer ONLY questions related to Satya Computers, its products, services, pricing, and policies
- Be professional, friendly, and concise
- If a question is outside Satya Computers' scope, politely say: "I can only assist with Satya Computers related queries. Please contact us directly for other questions."
- Never make up prices, specifications, or policies that are not provided
- Always encourage the customer to place an order or contact the team for custom requirements

PRODUCTS WE OFFER:
- Laptops from brands: Dell, HP, Lenovo, Asus, Acer, Apple, Microsoft
- Categories: Business Laptops, Gaming Laptops, Student Laptops, Workstations
- All laptops come with valid warranty
- Stock availability: updated regularly

BULK PRICING TIERS:
- 1–4 units: Standard retail price
- 5–10 units: Bulk Tier 1 — discounted price
- 11–25 units: Bulk Tier 2 — better discount
- 26+ units: Bulk Tier 3 — best pricing, contact sales team directly

ORDERING PROCESS:
1. Browse products on the website
2. Select quantity and submit an order inquiry form
3. Our team reviews and sends a custom quotation within 24 hours
4. Payment and delivery terms are confirmed
5. Delivery arranged across India

PAYMENT & DELIVERY:
- Payment modes: Bank Transfer, UPI, Cheque for bulk orders
- Delivery: Pan India shipping available
- Lead time: 3–7 business days depending on order size and location

WARRANTY & SUPPORT:
- All products carry manufacturer warranty
- On-site support available for large orders in Hyderabad
- Post-sale support provided for bulk clients

CONTACT:
- Location: Hyderabad, Telangana, India
- Inquiries: via website contact form or WhatsApp
- Response time: within 24 business hours

FREQUENTLY ASKED QUESTIONS:
Q: What is the minimum order quantity?
A: Minimum order is 1 unit, but bulk pricing starts from 5 units.

Q: Do you offer EMI or credit terms?
A: Credit terms are available for verified corporate clients. Contact our sales team.

Q: Can we get a custom configuration?
A: Yes, we can source laptops with custom RAM, storage, and OS configurations for bulk orders.

Q: Do you supply outside Hyderabad?
A: Yes, we deliver Pan India.

Q: Can we inspect before buying?
A: Yes, clients in Hyderabad can visit for physical inspection. Contact us to schedule.

Q: Do you provide GST invoice?
A: Yes, GST invoices are provided for all orders.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing. Check your .env file.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // gemini-2.0-flash-lite has higher free-tier rate limits
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Construct the context with the system prompt and conversation history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT + "\n\nUnderstood. I will act as the Satya Computers Support Assistant." }],
        },
        {
          role: "model",
          parts: [{ text: "Perfect. I am ready to assist customers with information about Satya Computers." }],
        },
      ],
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error Detail:", error);

    // Default friendly message
    let friendlyMsg = "I'm having a little trouble connecting right now. Please try again in a moment, or contact us via WhatsApp for immediate help!";

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();

      if (
        msg.includes("quota") ||
        msg.includes("too many requests") ||
        msg.includes("429") ||
        msg.includes("resource_exhausted")
      ) {
        friendlyMsg =
          "I'm a bit busy right now and couldn't process your request. Please wait a moment and try again. 🙏\n\nFor urgent queries, reach us via WhatsApp or the Contact page!";
      } else if (
        msg.includes("api key") ||
        msg.includes("api_key") ||
        msg.includes("invalid key") ||
        msg.includes("401") ||
        msg.includes("403")
      ) {
        friendlyMsg =
          "I'm currently unable to connect to my AI backend. Please contact us directly via WhatsApp or the Contact page and our team will assist you!";
      } else if (msg.includes("not found") || msg.includes("404")) {
        friendlyMsg =
          "My AI system is temporarily unavailable. Please try again later or contact us via WhatsApp for immediate assistance!";
      } else if (
        msg.includes("network") ||
        msg.includes("fetch") ||
        msg.includes("timeout")
      ) {
        friendlyMsg =
          "I'm having trouble with the network connection. Please check your internet connection and try again.";
      } else if (!process.env.GEMINI_API_KEY) {
        friendlyMsg =
          "I'm currently offline. Please contact us via WhatsApp or the Contact page for assistance!";
      }
    }

    // Always return 200 with a friendly message — never expose raw errors to users
    return NextResponse.json({ text: friendlyMsg }, { status: 200 });
  }
}
