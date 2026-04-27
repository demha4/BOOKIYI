import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { siteInfo } from "../data/content";

export default function Terms() {
  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="Terms of Service"
        description="The terms that apply when you book a stay at Tamount Surf House — payment, cancellation, house rules, and what we are responsible for."
        ogImage="/images/hostel-living.jpg"
      />

      <section className="py-20 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="kicker text-ocean mb-5"
          >
            Terms
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-charcoal mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-copy text-stone max-w-3xl mx-auto"
          >
            The terms that apply when you book a stay or use the website. Plain language, no fine print games. Last updated April 2026.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-10 shadow-sm space-y-10">

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">About these terms</h2>
              <p className="text-stone leading-8">
                These terms apply to bookings made directly with {siteInfo.name} — through this website, by email, or on WhatsApp. If you booked through a platform like Booking.com or Hostelworld, the platform's terms also apply, alongside ours.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Booking and confirmation</h2>
              <p className="text-stone leading-8">
                A booking is confirmed when we send you a confirmation message — by email or WhatsApp — that includes your dates, room, and total price. Until then, prices and availability are not guaranteed. Please tell us in advance roughly when you expect to arrive so we can let you in.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Payment</h2>
              <p className="text-stone leading-8 mb-4">
                For direct bookings, payment is due on arrival. We accept cash in euros (EUR) or Moroccan dirhams (MAD). All taxes are included in the price we quote you.
              </p>
              <p className="text-stone leading-8">
                If we agreed a deposit for a special group stay or longer booking, the rest is due on arrival in the same way. If you booked through Booking.com or another platform, payment terms follow that platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Cancellation</h2>
              <p className="text-stone leading-8 mb-4">
                Direct bookings can be cancelled free of charge, no questions asked, as long as you let us know at least 24 hours before your check-in time. After that, we may charge the cost of the first night to cover the empty room.
              </p>
              <p className="text-stone leading-8">
                For bookings made through a third-party platform, the platform's cancellation policy applies.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Check-in and check-out</h2>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>Check-in: from 12:00 PM. Late arrivals are fine — please let us know your time so someone is at the house.</li>
                <li>Check-out: by 12:00 PM. Late check-out is sometimes possible if no one is arriving in the same room — just ask the day before.</li>
                <li>You will be asked to show a passport or national ID on arrival, in line with Moroccan law.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Who can stay</h2>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>Children of all ages are welcome. Please tell us how many people are coming and their ages so we can give you an accurate price.</li>
                <li>We do not host bachelor or bachelorette parties or similar groups. If a booking turns out to be for an event of that kind, we may decline the stay on arrival.</li>
                <li>Pets are not allowed.</li>
                <li>Cribs and extra beds are not available.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">House rules</h2>
              <ul className="space-y-2.5 text-stone leading-8 list-disc pl-5">
                <li>Quiet from 11:00 PM. The walls are thin and other guests want to surf in the morning.</li>
                <li>Smoking is allowed only on the rooftop or outside, never in the rooms or shared spaces.</li>
                <li>Take care of the house. Damage caused by guests is the guest's responsibility.</li>
                <li>Common areas are shared. Please clean up after yourself in the kitchen and on the rooftop.</li>
                <li>Outside guests are not allowed in the rooms.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Surf lessons and activities</h2>
              <p className="text-stone leading-8 mb-4">
                Surf lessons, trips, and other activities organized through us depend on the weather, the surf, and the number of guests on a given day. We will always do our best to run a planned activity, but we may need to move it to another day or refund it if conditions are not safe or if there are not enough people.
              </p>
              <p className="text-stone leading-8">
                Surfing involves real risks. You take part at your own risk and you are responsible for being honest with us about your level. Our instructors will do their part by giving safe instruction and using proper equipment.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Personal belongings</h2>
              <p className="text-stone leading-8">
                We provide lockers in the dorm and a safe space for valuables on request. We are not responsible for items lost, stolen, or damaged during your stay. Use the lockers, lock your room, and keep your passport on you.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Limits of our responsibility</h2>
              <p className="text-stone leading-8">
                We do everything we reasonably can to make your stay safe, clean, and comfortable. We are not responsible for things outside our control — flight delays, weather, surf conditions, illness, third-party transport, or actions of other guests. Where Moroccan law puts a limit on what we can disclaim, those laws prevail.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Use of this website</h2>
              <p className="text-stone leading-8">
                The text, photos, and design on this site are ours or used with permission. Please do not republish them without asking. The site is provided as is — we try to keep it accurate and up to date, but we cannot guarantee it is free of errors. If you spot something wrong, please tell us.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Governing law</h2>
              <p className="text-stone leading-8">
                These terms are governed by the laws of the Kingdom of Morocco. Any dispute that cannot be sorted out by talking to us will be handled by the courts of Agadir.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Changes</h2>
              <p className="text-stone leading-8">
                If we change these terms, we update the date at the top of the page. The version that applies to your booking is the one in force when you booked.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">Contact</h2>
              <p className="text-stone leading-8">
                Questions about these terms or your booking: <a href={`mailto:${siteInfo.email}`} className="text-ocean hover:underline">{siteInfo.email}</a> or WhatsApp <a href={`https://wa.me/${siteInfo.whatsapp}`} className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">{siteInfo.phone}</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
