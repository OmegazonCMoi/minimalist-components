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
      { title: "Blocks", href: "/docs/blocks" },
    ],
  },
  {
    title: "Form",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Slider", href: "/docs/components/slider" },
    ],
  },
  {
    title: "Actions",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
    ],
  },
  {
    title: "Display",
    items: [
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumbs", href: "/docs/components/breadcrumbs" },
      { title: "Collapsible", href: "/docs/components/collapsible" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Utilities",
    items: [{ title: "Demo", href: "/docs/components/demo" }],
  },
];
