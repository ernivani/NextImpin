import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "Impin",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "impin.fr",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        name: "Gratuit",
        description:
          "Explorer les capacités de l'applications avec un Free access, sans engagement qui offre toutes les fonctionnalités de base sans la possibilité de mettre en production.",
        features: [
          {
            name: "lorem",
          },
          { name: "ipsum" },
          { name: "dolor" },
          { name: "sit" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1PAgjTKecr5ajmpZasX2B537"
            : "price_456",
        isFeatured: true,
        name: "Standard",
        description: "Déployer vos applications en production avec un accès complet à toutes les fonctionnalités de l'application.",
        price: 20,
        priceAnchor: 25,
        planInterval: "MO",
        features: [
          {
            name: "lorem",
          },
          { name: "ipsum" },
          { name: "dolor" },
          { name: "sit" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Impin <noreply@mg.impin.fr>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Thomas de Impin <thomas@mg.impin.fr>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "thomas@mg.impin.fr",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "tlindeker@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
