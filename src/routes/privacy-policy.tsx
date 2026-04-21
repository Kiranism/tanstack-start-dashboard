import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{ title: "Privacy Policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-foreground text-3xl font-bold">Privacy Policy</h1>
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold">Introduction</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            This Privacy Policy explains how we handle your personal information when you use our
            application. We are committed to protecting your privacy and ensuring transparency about
            our data practices. Please read this policy carefully to understand how we collect, use,
            and safeguard your information.
          </p>
        </section>
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold">Data Collection</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Our application collects minimal data necessary for authentication purposes. When you
            sign in using our authentication provider, we receive basic profile information such as
            your email address and name. This data is used solely to identify you within the
            application and provide personalized access to features.
          </p>
        </section>
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold">No Data Misuse</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            We take your privacy seriously. We want to assure you that your personal data is never
            sold, rented, or shared with third parties for marketing or commercial purposes. Your
            information is used exclusively for the intended functionality of this application and
            is never misused or exploited in any way.
          </p>
        </section>
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold">Demo Application</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Please note that this is a demo application created for demonstration and educational
            purposes. It showcases various features and technologies but should not be considered a
            production-ready service. Any data you provide may be temporary and could be removed at
            any time as part of regular maintenance.
          </p>
        </section>
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please feel free to contact us at{" "}
            <a
              href="mailto:contact@kiranism.dev"
              className="text-primary font-medium hover:underline"
            >
              contact@kiranism.dev
            </a>
            .
          </p>
        </section>
        <div className="border-border border-t pt-4">
          <p className="text-muted-foreground text-sm">Last updated: February 2026</p>
        </div>
      </div>
    </div>
  );
}
