export type DocsNavItem = {
  title: string;
  href: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNav: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Form",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Switch", href: "/docs/components/switch" },
    ],
  },
  {
    title: "Actions",
    items: [{ title: "Button", href: "/docs/components/button" }],
  },
  {
    title: "Display",
    items: [
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Table", href: "/docs/components/table" },
    ],
  },
  {
    title: "Utilities",
    items: [{ title: "Demo", href: "/docs/components/demo" }],
  },
];
