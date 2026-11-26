/** FAQ as on the bestdebtoptions.com homepage: each question an h3, the answer below it. */
export function HubFaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-5">
      {items.map((faq) => (
        <div key={faq.q}>
          <h3 className="mb-1 text-base text-black">{faq.q}</h3>
          <p className="prose-editorial">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
