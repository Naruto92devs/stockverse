// components/DesktopNewsletterPopup.js
import dynamic from 'next/dynamic';

const NewsLetterPopup = dynamic(() => import('./NewsLetterPopup'), {
  ssr: false,
  loading: () => null, // Optional: return null while loading
});

export default function DesktopNewsletterPopup({ newsletter, setNewsletter }) {
  // Only render on large screens
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <div>
      <NewsLetterPopup
        newsletter={newsletter}
        setNewsletter={setNewsletter}
        tag={"cvkd subscriber popup"}
        heading = {"Want the Next Stock That Could Explode?"}
        subHeading = {"💸 Join 12,042+ Investors Getting Alerts First"}
      />
    </div>
  );
}