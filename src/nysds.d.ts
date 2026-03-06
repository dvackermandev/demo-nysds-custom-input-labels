/**
 * JSX.IntrinsicElements declarations for NYSDS custom elements.
 *
 * React 19 natively supports custom elements — properties are set as JS
 * properties (not attributes) on any tag containing a hyphen. This file
 * provides TypeScript types so <nys-*> elements get proper IntelliSense
 * and type-checking in JSX without needing @lit/react wrappers.
 *
 * Ref types use the actual Lit element class from @nysds/components so
 * you can access component-specific properties via refs (e.g.,
 * `modalRef.current.open = true`).
 */

import type {
  NysAccordion,
  NysAccordionItem,
  NysAlert,
  NysAvatar,
  NysBacktotop,
  NysBadge,
  NysButton,
  NysCheckbox,
  NysCheckboxgroup,
  NysDatepicker,
  NysDivider,
  NysFileinput,
  NysGlobalFooter,
  NysGlobalHeader,
  NysIcon,
  NysModal,
  NysOption,
  NysPagination,
  NysRadiobutton,
  NysRadiogroup,
  NysSelect,
  NysSkipnav,
  NysStep,
  NysStepper,
  NysTable,
  NysTextarea,
  NysTextinput,
  NysToggle,
  NysTooltip,
  NysUnavFooter,
  NysUnavHeader,
} from "@nysds/components";

/** Standard HTML attributes + ref + children, typed to a specific element class. */
type NysBase<T = HTMLElement> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T>;
  children?: React.ReactNode;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React.JSX {
    interface IntrinsicElements {
      /* ── Layout & Navigation ─────────────────────────────── */

      "nys-skipnav": NysBase<NysSkipnav>;

      "nys-unavheader": NysBase<NysUnavHeader>;

      "nys-unavfooter": NysBase<NysUnavFooter>;

      "nys-globalheader": NysBase<NysGlobalHeader> & {
        appName?: string;
        agencyName?: string;
        homepageLink?: string;
      };

      "nys-globalfooter": NysBase<NysGlobalFooter> & {
        agencyName?: string;
      };

      "nys-backtotop": NysBase<NysBacktotop>;

      /* ── Feedback ────────────────────────────────────────── */

      "nys-alert": NysBase<NysAlert> & {
        type?: "base" | "info" | "success" | "warning" | "danger" | "emergency";
        heading?: string;
        text?: string;
        icon?: string;
        dismissible?: boolean;
        duration?: number;
        primaryAction?: string;
        secondaryAction?: string;
        primaryLabel?: string;
        secondaryLabel?: string;
      };

      "nys-badge": NysBase<NysBadge> & {
        label?: string;
        intent?: "neutral" | "error" | "success" | "warning";
        variant?: "strong" | "";
        size?: "sm" | "md";
        prefixIcon?: string | boolean;
        suffixIcon?: string | boolean;
        prefixLabel?: string;
      };

      "nys-tooltip": NysBase<NysTooltip> & {
        for?: string;
        text?: string;
      };

      "nys-modal": NysBase<NysModal> & {
        heading?: string;
        subheading?: string;
        open?: boolean;
        mandatory?: boolean;
        width?: "sm" | "md" | "lg";
      };

      /* ── Buttons & Icons ─────────────────────────────────── */

      "nys-button": NysBase<NysButton> & {
        label?: string;
        variant?: "filled" | "outline" | "ghost" | "text";
        size?: "sm" | "md" | "lg";
        prefixIcon?: string;
        suffixIcon?: string;
        icon?: string;
        circle?: boolean;
        disabled?: boolean;
        fullWidth?: boolean;
        inverted?: boolean;
        href?: string;
        target?: "_self" | "_blank" | "_parent" | "_top";
        type?: "submit" | "reset" | "button";
        form?: string | null;
        value?: string;
      };

      "nys-icon": NysBase<NysIcon> & {
        name?: string;
        size?: string;
        color?: string;
      };

      "nys-avatar": NysBase<NysAvatar> & {
        initials?: string;
        icon?: string;
        interactive?: boolean;
      };

      /* ── Form Inputs ─────────────────────────────────────── */

      "nys-textinput": NysBase<NysTextinput> & {
        label?: string;
        name?: string;
        type?: string;
        description?: string;
        value?: string;
        placeholder?: string;
        required?: boolean;
        optional?: boolean;
        disabled?: boolean;
        width?: "sm" | "md" | "lg" | "full";
        maxlength?: number;
        minlength?: number;
        pattern?: string;
        form?: string | null;
        showError?: boolean;
        errorMessage?: string;
        tooltip?: string;
      };

      "nys-textarea": NysBase<NysTextarea> & {
        label?: string;
        name?: string;
        description?: string;
        value?: string;
        placeholder?: string;
        required?: boolean;
        optional?: boolean;
        disabled?: boolean;
        rows?: number;
        maxlength?: number;
        form?: string | null;
        showError?: boolean;
        errorMessage?: string;
        tooltip?: string;
      };

      "nys-select": NysBase<NysSelect> & {
        label?: string;
        name?: string;
        description?: string;
        value?: string;
        disabled?: boolean;
        required?: boolean;
        optional?: boolean;
        width?: "sm" | "md" | "lg" | "full";
        form?: string | null;
        showError?: boolean;
        errorMessage?: string;
        tooltip?: string;
      };

      "nys-option": NysBase<NysOption> & {
        value?: string;
        label?: string;
      };

      "nys-datepicker": NysBase<NysDatepicker> & {
        label?: string;
        name?: string;
        description?: string;
        value?: string;
        required?: boolean;
        optional?: boolean;
        disabled?: boolean;
        width?: "sm" | "md" | "lg" | "full";
        form?: string | null;
        showError?: boolean;
        errorMessage?: string;
      };

      "nys-fileinput": NysBase<NysFileinput> & {
        label?: string;
        name?: string;
        description?: string;
        accept?: string;
        multiple?: boolean;
        dropzone?: boolean;
        required?: boolean;
        disabled?: boolean;
      };

      /* ── Selection Controls ──────────────────────────────── */

      "nys-checkbox": NysBase<NysCheckbox> & {
        label?: string;
        name?: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        description?: string;
      };

      "nys-checkboxgroup": NysBase<NysCheckboxgroup> & {
        label?: string;
        description?: string;
      };

      "nys-radiobutton": NysBase<NysRadiobutton> & {
        label?: string;
        name?: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        description?: string;
      };

      "nys-radiogroup": NysBase<NysRadiogroup> & {
        label?: string;
        name?: string;
        description?: string;
      };

      "nys-toggle": NysBase<NysToggle> & {
        label?: string;
        name?: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        size?: "sm" | "md";
        icon?: boolean;
        noIcon?: boolean;
      };

      /* ── Accordion ───────────────────────────────────────── */

      "nys-accordion": NysBase<NysAccordion> & {
        singleSelect?: boolean;
        bordered?: boolean;
      };

      "nys-accordionitem": NysBase<NysAccordionItem> & {
        heading?: string;
        expanded?: boolean;
      };

      /* ── Data Display ────────────────────────────────────── */

      "nys-table": NysBase<NysTable> & {
        striped?: boolean;
        bordered?: boolean;
        sortable?: boolean;
        download?: string;
      };

      "nys-pagination": NysBase<NysPagination> & {
        totalPages?: number;
        currentPage?: number;
      };

      /* ── Stepper ─────────────────────────────────────────── */

      "nys-stepper": NysBase<NysStepper> & {
        label?: string;
      };

      "nys-step": NysBase<NysStep> & {
        label?: string;
        current?: boolean;
      };

      /* ── Misc ────────────────────────────────────────────── */

      "nys-divider": NysBase<NysDivider>;
    }
  }
}

export {};