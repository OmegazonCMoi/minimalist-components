import InputOTP from "@/components/input-otp";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const otpProps = [
  { prop: "length", type: "4 … 12", default: "6", description: "Number of digits" },
  { prop: "value", type: "string", default: "—", description: "Controlled OTP" },
  { prop: "defaultValue", type: "string", default: "—", description: "Initial OTP" },
  { prop: "label", type: "string", default: "—", description: "Field label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Slot scale" },
  { prop: "delimiter", type: "boolean | ReactNode", default: "false", description: "Mid split marker" },
  { prop: "letters", type: "boolean", default: "false", description: "Allow A–Z (uppercase)" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable field" },
  { prop: "autoFocus", type: "boolean", default: "false", description: "Focus first slot" },
  { prop: "name", type: "string", default: "—", description: "Field name" },
  { prop: "id", type: "string", default: "—", description: "Base element id" },
  { prop: "onChange", type: "(value: string) => void", default: "—", description: "Change handler" },
  { prop: "onComplete", type: "(value: string) => void", default: "—", description: "All slots filled" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { InputOTP } from "@/components";`;

export default function InputOTPDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          InputOTP
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Mini digit slots for one-time codes — paste, arrows, and auto-advance built in.
        </p>
      </header>

      <InstallBlock name="InputOTP" />

      <PropSection
        name="length"
        description="4 … 12 — default 6"
        stack
        codes={[
          `${imp}\n\n<InputOTP length={4} />`,
          `${imp}\n\n<InputOTP length={6} />`,
        ]}
      >
        <InputOTP length={4} />
        <InputOTP length={6} />
      </PropSection>

      <PropSection
        name="defaultValue"
        description="string — prefilled digits"
        code={`${imp}\n\n<InputOTP defaultValue="482193" />`}
      >
        <InputOTP defaultValue="482193" />
      </PropSection>

      <PropSection
        name="label"
        description="string — optional field label"
        code={`${imp}\n\n<InputOTP label="Verification code" />`}
      >
        <InputOTP label="Verification code" />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        stack
        codes={[
          `${imp}\n\n<InputOTP size="sm" />`,
          `${imp}\n\n<InputOTP size="md" />`,
          `${imp}\n\n<InputOTP size="lg" />`,
        ]}
      >
        <InputOTP size="sm" />
        <InputOTP size="md" />
        <InputOTP size="lg" />
      </PropSection>

      <PropSection
        name="delimiter"
        description="boolean | ReactNode — default false"
        stack
        codes={[
          `${imp}\n\n<InputOTP length={6} />`,
          `${imp}\n\n<InputOTP length={6} delimiter />`,
          `${imp}\n\n<InputOTP\n  length={6}\n  delimiter={<span>–</span>}\n/>`,
        ]}
      >
        <InputOTP length={6} />
        <InputOTP length={6} delimiter />
        <InputOTP
          length={6}
          delimiter={
            <span className="px-1 text-sm text-zinc-400/50 dark:text-zinc-500/50">
              –
            </span>
          }
        />
      </PropSection>

      <PropSection
        name="letters"
        description="boolean — default false"
        stack
        codes={[
          `${imp}\n\n<InputOTP />`,
          `${imp}\n\n<InputOTP letters defaultValue="A9F2K1" />`,
        ]}
      >
        <InputOTP />
        <InputOTP letters defaultValue="A9F2K1" />
      </PropSection>

      <PropSection
        name="border"
        description="boolean — default false"
        stack
        codes={[`${imp}\n\n<InputOTP />`, `${imp}\n\n<InputOTP border />`]}
      >
        <InputOTP />
        <InputOTP border />
      </PropSection>

      <PropSection
        name="error"
        description="string — error message + red slots"
        code={`${imp}\n\n<InputOTP\n  label="Code"\n  defaultValue="000000"\n  error="Invalid verification code"\n/>`}
      >
        <InputOTP
          label="Code"
          defaultValue="000000"
          error="Invalid verification code"
        />
      </PropSection>

      <PropSection
        name="disabled"
        description="boolean — default false"
        stack
        codes={[
          `${imp}\n\n<InputOTP />`,
          `${imp}\n\n<InputOTP disabled defaultValue="918273" />`,
        ]}
      >
        <InputOTP />
        <InputOTP disabled defaultValue="918273" />
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
          rows={otpProps}
        />
      </section>
    </article>
  );
}
