import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { siteInfo } from "../data/content";

export default function Privacy() {
  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="Privacy Policy"
        description="How Tamount Surf House handles your personal information when you book a stay, message us on WhatsApp, or use our website."
        ogImage="/images/hostel-living.jpg"
      />

      <section className="py-20 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="kicker text-ocean mb-5"
          >
            Privacy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-charcoal mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-copy text-stone max-w-3xl mx-auto"
          >
            Plain language about what we collect, why we collect it, and what we do with it. Last updated April 2026.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-10 shadow-sm space-y-10">

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Who we are</h2>
              <p className="text-stone leading-8">
                {siteInfo.name} is a small surf hostel run by Abdelwahd in Anza, Agadir, Morocco. The address is {siteInfo.location}. If you have any questions about how we handle your information, you can reach us at <a href={`mailto:${siteInfo.email}`} className="text-ocean hover:underline">{siteInfo.email}</a> or on WhatsApp at <a href={`https://wa.me/${siteInfo.whatsapp}`} className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">{siteInfo.phone}</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">What we collect</h2>
              <p className="text-stone leading-8 mb-4">
                We try to ask for as little as possible. Depending on how you reach us, we might receive:
              </p>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>Your name, email, phone number, and dates of stay when you book directly through us, by email, or on WhatsApp.</li>
                <li>Identity document details (passport or national ID) on arrival — we are required to register guests with the local police, the same as every accommodation in Morocco.</li>
                <li>Messages you send us through WhatsApp, email, or our contact form.</li>
                <li>Basic anonymous analytics about how the website is used (pages visited, rough country of origin), to help us improve the site.</li>
              </ul>
              <p className="text-stone leading-8 mt-4">
                If you book through a third-party platform like Booking.com or Hostelworld, that platform also handles your information under its own privacy policy. We only receive the booking details they pass to us.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Why we collect it</h2>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>To confirm and manage your booking.</li>
                <li>To answer your messages.</li>
                <li>To comply with Moroccan law on guest registration.</li>
                <li>To improve the website and the way we run the house.</li>
              </ul>
              <p className="text-stone leading-8 mt-4">
                We do not sell your data. We do not send marketing emails. If you message us once and never come back, we will not chase you.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Who we share it with</h2>
              <p className="text-stone leading-8 mb-4">
                We share your information only when we have to:
              </p>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>With Moroccan authorities, where required by law (guest registration).</li>
                <li>With booking platforms you used to find us (Booking.com, Hostelworld), since they already have the booking.</li>
                <li>With service providers we rely on to run the site — for example, our hosting provider (Vercel) and the booking-management tool we use to track availability. These providers process data on our behalf and do not use it for their own purposes.</li>
              </ul>
              <p className="text-stone leading-8 mt-4">
                That is the full list. No advertisers, no data brokers, no resale of any kind.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">How long we keep it</h2>
              <p className="text-stone leading-8">
                Booking records are kept for as long as Moroccan tax and accommodation law requires (currently up to 10 years for accounting records). WhatsApp and email conversations stay in our inbox unless you ask us to delete them. Website analytics are anonymous and rolled up after a few months.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Your rights</h2>
              <p className="text-stone leading-8 mb-4">
                You can ask us at any time to:
              </p>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>See what information we have about you.</li>
                <li>Correct anything that is wrong.</li>
                <li>Delete your information, where we are not legally required to keep it.</li>
                <li>Stop using your information for a particular purpose.</li>
              </ul>
              <p className="text-stone leading-8 mt-4">
                Send us an email or a WhatsApp message and we will sort it out within a reasonable time, usually within a week.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Cookies</h2>
              <p className="text-stone leading-8">
                Our site uses a small number of technical cookies that are needed for the site to work properly (for example, to remember which page you were on). We do not use advertising cookies and we do not use third-party tracking. If we add analytics in the future, we will update this page first.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Changes</h2>
              <p className="text-stone leading-8">
                If we change this policy, we update the date at the top of the page. The most recent version is always the one shown here.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Contact</h2>
              <p className="text-stone leading-8">
                Questions, complaints, or requests about your data: <a href={`mailto:${siteInfo.email}`} className="text-ocean hover:underline">{siteInfo.email}</a>. We try to reply within a few days.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
