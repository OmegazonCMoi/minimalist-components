import Badge from "@/components/badge";
import Demo from "@/components/demo";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { CheckIcon } from "lucide-react";

function PropSection({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{name}</h2>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      <Demo>{children}</Demo>
    </section>
  );
}

const props = [
  { prop: "children", type: "ReactNode", default: "—", description: "Badge text" },
  { prop: "variant", type: "solid | outline | ghost", default: "solid", description: "Visual style" },
  { prop: "tone", type: "neutral | success | warning | danger", default: "neutral", description: "State color" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Badge scale" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "image", type: "string | ReactNode", default: "—", description: "Avatar image" },
  { prop: "imagePosition", type: "left | right", default: "left", description: "Image side" },
  { prop: "alt", type: "string", default: "", description: "Image alt" },
  { prop: "icon", type: "ReactNode", default: "—", description: "Optional icon" },
  { prop: "iconPosition", type: "left | right", default: "left", description: "Icon side" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const avatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%233f3f46' width='40' height='40'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%23a1a1aa'/%3E%3Cellipse cx='20' cy='34' rx='12' ry='8' fill='%23a1a1aa'/%3E%3C/svg%3E";

export default function BadgeDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Badge
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Compact status label with tone, optional icon, and image.
        </p>
      </header>

      <InstallBlock name="Badge" />

      <PropSection name="variant" description="solid · outline · ghost — default solid">
        <Badge variant="solid">Solid</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </PropSection>

      <PropSection name="tone" description="neutral · success · warning · danger">
        <Badge tone="neutral">Neutral</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="danger">Danger</Badge>
      </PropSection>

      <PropSection name="size" description="sm · md · lg — default md">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </PropSection>

      <PropSection name="border" description="boolean — default false">
        <Badge>No border</Badge>
        <Badge border>With border</Badge>
        <Badge border tone="success">
          Success
        </Badge>
        <Badge border tone="danger">
          Danger
        </Badge>
      </PropSection>

      <PropSection name="image" description="string | ReactNode — avatar next to label">
        <Badge image={avatar} alt="User">
          Ava
        </Badge>
        <Badge image={avatar} tone="success" imagePosition="left">
          Online
        </Badge>
        <Badge image={avatar} imagePosition="right" tone="warning">
          Pending
        </Badge>
      </PropSection>

      <PropSection name="icon" description="ReactNode — optional">
        <Badge icon={<CheckIcon />} tone="success">
          Done
        </Badge>
        <Badge icon={<CheckIcon />} iconPosition="right">
          Verified
        </Badge>
      </PropSection>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Props</h2>
        <Table
          columns={[
            { key: "prop", header: "Prop", mono: true },
            { key: "type", header: "Type", mono: true },
            { key: "default", header: "Default", mono: true },
            { key: "description", header: "Description" },
          ]}
          rows={props}
        />
      </section>
    </article>
  );
}
