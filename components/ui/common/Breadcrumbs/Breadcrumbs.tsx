"use client";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-1 block">
      <ol className="flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`flex items-center ${
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            }`}
          >
            <button disabled={breadcrumb.active}>{breadcrumb.label}</button>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">{">"}</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
