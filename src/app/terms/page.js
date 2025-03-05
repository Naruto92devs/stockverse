'use client'
import { useMetadata } from "@/context/MetadataContext";
import { useEffect } from "react";
export default function Terms() {
  const { setMetadata } = useMetadata();


  useEffect(()=>{
    setMetadata({
      title : "Terms of Service - Stockverse",
      description : "Review Stockverse's Terms of Service. Learn about your rights, responsibilities, account security, subscription details and more while using the platform"
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="hero py-16 max-md:py-6 w-full">
      <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
        <h1 className="text-3xl font-sansSemibold text-primaryText">Stockverse Terms of Service</h1>
        <h2 className="mt-8 text-primaryText text-xl font-sansSemibold">1. Acceptance of Terms</h2>
        <p className="text-base text-primaryText">By accessing or using Stockverse (“the Platform”), you agree to comply with and be bound by these Terms of Service (“Terms”). If you do not agree to these Terms, you must not use the Platform.</p>
        <h3 className="mt-8 text-primaryText text-xl font-sansSemibold">2. Changes to Terms</h3>
        <p className="text-base text-primaryText">We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of the Platform after any modifications constitute acceptance of the new Terms. It is your responsibility to review the Terms periodically.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">3. Eligibility</h4>
        <p className="text-base text-primaryText">You must be at least 18 years old to use the Platform. By using Stockverse, you confirm that you are at least 18 years of age and that you are legally able to enter into a binding contract.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">4. No Sharing of Information</h4>
          <p className="text-base text-primaryText">We respect your privacy and are committed to keeping your information secure. We do not share, sell, rent, or trade your personal information with any third parties. Any information collected through our services is used solely for the purpose of providing and improving those services. We do not disclose your information to outside parties under any circumstances, except as required by law.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">5. Account Registration and Security</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">You may be required to create an account to access certain features of the Platform. You must provide accurate, current, and complete information during the registration process and keep your account information up to date.</li>
          <li className="text-base text-primaryText">You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately if you suspect any unauthorized use of your account.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">6. Subscription Refunds</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">Monthly Subscriptions: All monthly subscriptions are non-refundable once a payment has been processed. By subscribing to a monthly plan, you agree that the payment is final and non-refundable.</li>
          <li className="text-base text-primaryText">Annual Subscriptions: Annual subscriptions are also non-refundable, except in cases where Stockverse fails to deliver the services outlined. We encourage you to try a monthly plan if you are unsure of your commitment.</li>
          <li className="text-base text-primaryText">Trial Periods: If applicable, any free trials will convert to a paid subscription at the end of the trial period. Canceling before the trial ends will ensure you aren’t billed.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">7. Cancellation Policy</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">You may cancel your subscription at any time through your account settings. Cancellations will take effect at the end of your current billing period, and you will retain access to Stockverse services until that time.</li>
          <li className="text-base text-primaryText">We do not offer partial refunds for cancellations made in the middle of a billing cycle.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">8. Exceptional Circumstances</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">Technical Issues: If you experience technical difficulties that prevent you from accessing Stockverse services, we may, at our discretion, offer a refund or account credit for the period affected, provided you notify us within [30 days].</li>
          <li className="text-base text-primaryText">Service Disruptions: In rare cases of extended service disruptions (lasting 24 hours or more), we may issue partial refunds or credits to affected users.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">9. How to Request a Refund</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">If you believe you qualify for a refund based on the conditions outlined in this policy, please contact our support team at <a href="mailto:support@stockverse.com">support@stockverse.com</a> with your account details and reason for the refund request.</li>
          <li className="text-base text-primaryText">Refund requests are reviewed on a case-by-case basis, and we aim to respond within [5-7 business days].</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">10. Changes to This Policy</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">Stockverse reserves the right to update or modify this Refund Policy at any time. We will notify you of significant changes through email or our website, and the updated policy will take effect immediately upon posting.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">11. Content Disclaimer and Investment Advice</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">The content and information provided on the Platform are for informational purposes only and should not be considered as financial advice, investment advice, or recommendations.</li>
          <li className="text-base text-primaryText">Stockverse does not guarantee the accuracy, completeness, or timeliness of any content or information on the Platform. You acknowledge that any reliance on such content or information is at your own risk.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">12. No Financial or Investment Advice</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">Stockverse is not a registered broker-dealer, investment advisor, or financial planner. Any information available on the Platform is general and should not be construed as professional financial advice.</li>
          <li className="text-base text-primaryText">You should always conduct your own research and seek professional advice before making any investment decisions.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">13. User Conduct</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">You agree not to engage in any behavior that is abusive, threatening, defamatory, fraudulent, or otherwise inappropriate.</li>
          <li className="text-base text-primaryText">You should always conduct your own research and seek professional advice before making any investment decisions.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">14. Privacy Policy</h4>
        <p className="text-base text-primaryText">Your use of the Platform is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using Stockverse, you consent to the data practices described in the Privacy Policy.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">15. Intellectual Property</h4>
        <ol className="list-disc pl-8 flex flex-col gap-y-4">
          <li className="text-base text-primaryText">All content on the Platform, including but not limited to text, graphics, logos, and software, is the property of Stockverse and is protected by copyright, trademark, and other laws.</li>
          <li className="text-base text-primaryText">You may not use any content from the Platform for commercial purposes without obtaining prior written consent from Stockverse.</li>
        </ol>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">16. Termination</h4>
        <p className="text-base text-primaryText">We may terminate or suspend your access to the Platform at any time, with or without cause or notice, and without liability to you. Upon termination, all provisions of the Terms that should survive termination will remain in effect.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">17. Disclaimer of Warranties</h4>
        <p className="text-base text-primaryText">The Platform is provided on an “AS IS” and “AS AVAILABLE” basis. Stockverse disclaims all warranties, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Platform will be secure, error-free, or available at all times.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">18. Limitation of Liability</h4>
        <p className="text-base text-primaryText">To the fullest extent permitted by law, Stockverse shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or related to your use of the Platform.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">19. Indemnification</h4>
        <p className="text-base text-primaryText">You agree to indemnify and hold Stockverse harmless from any claims, losses, damages, liabilities, and expenses (including legal fees) arising out of your use of the Platform, your violation of these Terms, or your violation of any third-party rights.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">20. Governing Law and Jurisdiction</h4>
        <p className="text-base text-primaryText">These Terms are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">21. Entire Agreement</h4>
        <p className="text-base text-primaryText">These Terms, along with any policies referenced herein, constitute the entire agreement between you and Stockverse and supersede any prior agreements or understandings.</p>
        <h4 className="mt-8 text-primaryText text-xl font-sansSemibold">22. Contact Information</h4>
        <p className="text-base text-primaryText">If you have any questions or concerns about these Terms or the Platform, please contact us at <a className="text-primaryHeading" href='mailto:support@stockverse.com'>[Support@stockverse.com]</a>.</p>
        <p className="text-base text-primaryText">By using Stockverse, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
      </div>
    </div>
  );
}