'use client';

import { FormEvent, useState } from 'react';

const INQUIRY_EMAIL = 'glutathione@exploretreatments.com';
// FormSubmit relays each submission to INQUIRY_EMAIL. The first submission
// sends a one-time activation email to that inbox; inquiries are delivered
// once the link in it has been clicked.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const INPUT_CLASS =
  'mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200';
// Fixed height so text inputs and the select line up; Safari otherwise renders
// a native select shorter than the inputs, so drop its native styling and draw
// our own chevron.
const FIELD_CLASS = `${INPUT_CLASS} h-11`;
const SELECT_CLASS = `${FIELD_CLASS} appearance-none pr-10`;

export default function DomainInquiryForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'Glutathione.net domain inquiry',
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-secondary-200 bg-secondary-50 p-6 text-sm text-secondary-800">
        Thanks, your inquiry has been sent. We&apos;ll get back to you by email shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Honeypot: bots fill it, FormSubmit drops those submissions. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-neutral-800">
          Name
          <input type="text" name="name" required autoComplete="name" className={FIELD_CLASS} />
        </label>
        <label className="block text-sm font-medium text-neutral-800">
          Email
          <input type="email" name="email" required autoComplete="email" className={FIELD_CLASS} />
        </label>
        <label className="block text-sm font-medium text-neutral-800">
          Phone <span className="font-normal text-neutral-500">(optional)</span>
          <input type="tel" name="phone" autoComplete="tel" className={FIELD_CLASS} />
        </label>
        <label className="block text-sm font-medium text-neutral-800">
          Interested in
          <span className="relative block">
            <select name="interest" defaultValue="Buy Now ($25,000)" className={SELECT_CLASS}>
              <option>Buy Now ($25,000)</option>
              <option>Lease to Own ($30,000 / 12 months)</option>
              <option>Making an offer</option>
              <option>Other question</option>
            </select>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 mt-0.5 h-5 w-5 -translate-y-1/2 text-neutral-500"
            >
              <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
            </svg>
          </span>
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-neutral-800">
        Message
        <textarea name="message" required rows={5} className={INPUT_CLASS} />
      </label>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm text-accent-700">
          Something went wrong sending your inquiry. Please try again, or email{' '}
          <a href={`mailto:${INQUIRY_EMAIL}`} className="underline">
            {INQUIRY_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 w-full rounded-lg bg-primary-600 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  );
}
