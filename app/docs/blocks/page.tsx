import { BlockSection } from "@/components/docs/block-section";
import {
  AccountSettingsBlock,
  accountSettingsCode,
} from "@/components/blocks/account-settings";
import {
  DangerZoneBlock,
  dangerZoneCode,
} from "@/components/blocks/danger-zone";
import {
  OrderSummaryBlock,
  orderSummaryCode,
} from "@/components/blocks/order-summary";
import { SignInBlock, signInCode } from "@/components/blocks/sign-in";
import {
  TeamRosterBlock,
  teamRosterCode,
} from "@/components/blocks/team-roster";
import {
  VerifyOtpBlock,
  verifyOtpCode,
} from "@/components/blocks/verify-otp";

export default function BlocksPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Getting started
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Blocks
        </h1>
        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Ready-made compositions using the kit — copy the pattern, then swap
          copy and data for your product.
        </p>
      </header>

      <BlockSection
        id="sign-in"
        title="Sign in"
        description="Email + password form with remember-me and an alternate provider."
        components={["Input", "Checkbox", "Button", "Separator"]}
        code={signInCode}
      >
        <SignInBlock />
      </BlockSection>

      <BlockSection
        id="verify-otp"
        title="Verify email"
        description="One-time code entry with a gated confirm action."
        components={["InputOTP", "Button", "Toast"]}
        code={verifyOtpCode}
      >
        <VerifyOtpBlock />
      </BlockSection>

      <BlockSection
        id="order-summary"
        title="Order summary"
        description="Collapsible line items and shipping with a status badge."
        components={[
          "Badge",
          "Collapsible",
          "Separator",
          "Button",
        ]}
        code={orderSummaryCode}
      >
        <OrderSummaryBlock />
      </BlockSection>

      <BlockSection
        id="account-settings"
        title="Account settings"
        description="Preferences panel with switch, select, slider, and save toast."
        components={["Switch", "Select", "Slider", "Button", "Toast"]}
        code={accountSettingsCode}
      >
        <AccountSettingsBlock />
      </BlockSection>

      <BlockSection
        id="team"
        title="Team roster"
        description="Members table with role, status badges, and row actions."
        components={["Table", "Badge", "Button", "Tooltip"]}
        code={teamRosterCode}
        className="!overflow-x-auto"
      >
        <TeamRosterBlock />
      </BlockSection>

      <BlockSection
        id="danger-zone"
        title="Danger zone"
        description="Destructive confirm flow wired to an alert dialog."
        components={["AlertDialog", "Button", "Toast"]}
        code={dangerZoneCode}
      >
        <DangerZoneBlock />
      </BlockSection>
    </article>
  );
}
