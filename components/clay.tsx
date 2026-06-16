"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

/* ------------------------------------------------------------------ *
 * Small className combiner
 * ------------------------------------------------------------------ */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ *
 * ClayButton — primary (brand) / cta / secondary / ghost
 * Pressed state removes the outer shadow and presses in (translate-y).
 * ------------------------------------------------------------------ */
type ClayVariant = "primary" | "cta" | "secondary" | "ghost";

const variantClasses: Record<ClayVariant, string> = {
  primary:
    "bg-brand-500 text-white shadow-clay-brand active:translate-y-px font-display font-bold",
  cta: "bg-cta text-white shadow-clay-cta active:translate-y-px active:shadow-clay-cta-pressed font-display font-bold",
  secondary: "bg-surface text-ink shadow-clay active:translate-y-px font-semibold",
  ghost: "bg-transparent text-brand-600 hover:bg-brand-50 font-semibold",
};

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ClayVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const ClayButton = forwardRef<HTMLButtonElement, ClayButtonProps>(
  function ClayButton(
    { variant = "primary", leftIcon, rightIcon, className, children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cx(
          "flex w-full items-center justify-center gap-2.5 rounded-lg border-none outline-none transition-[transform,box-shadow] duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          variantClasses[variant],
          className,
        )}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

/* ------------------------------------------------------------------ *
 * ClayInput / ClayTextarea — carved (inset) clay fields
 * ------------------------------------------------------------------ */
const fieldClass =
  "w-full rounded-md border-none bg-surface px-4 py-[13px] text-[15px] text-ink outline-none shadow-clay-inset transition-shadow focus:shadow-[inset_4px_4px_8px_rgba(214,170,110,0.30),inset_-4px_-4px_8px_rgba(255,255,255,0.85),0_0_0_2px_#F89D06]";

export const ClayInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function ClayInput({ className, ...rest }, ref) {
  return <input ref={ref} className={cx(fieldClass, className)} {...rest} />;
});

export const ClayTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function ClayTextarea({ className, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      className={cx(fieldClass, "leading-relaxed", className)}
      {...rest}
    />
  );
});

export function FieldLabel({
  children,
  hint,
}: {
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
      {hint ? <span className="font-normal text-ink-3"> {hint}</span> : null}
    </label>
  );
}

/* ------------------------------------------------------------------ *
 * ClaySegmented — carved track with a raised active pill
 * ------------------------------------------------------------------ */
interface ClaySegmentedProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}

export function ClaySegmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: ClaySegmentedProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex gap-1.5 rounded-md bg-brand-50 p-[5px] shadow-[inset_3px_3px_6px_rgba(214,170,110,0.22),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]"
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={cx(
              "h-10 flex-1 cursor-pointer rounded-[13px] border-none text-[14.5px] transition-all duration-200",
              active
                ? "bg-surface font-semibold text-ink shadow-[3px_3px_7px_rgba(214,170,110,0.30),-3px_-3px_7px_rgba(255,255,255,0.9)]"
                : "bg-transparent font-medium text-ink-2",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * IconButton — round clay back / utility button (min 44px target)
 * ------------------------------------------------------------------ */
export function ClayIconButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(
        "flex size-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-surface text-ink shadow-clay outline-none transition-transform active:translate-y-px focus-visible:ring-2 focus-visible:ring-brand-500",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * PhoneFrame — centered mobile canvas (max-width 430px)
 * ------------------------------------------------------------------ */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-stretch justify-center bg-[radial-gradient(130%_90%_at_50%_-10%,#FFFBF3_0%,#FBE9D2_70%,#F6DDBF_100%)]">
      <div className="relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-cream shadow-[0_30px_90px_rgba(190,130,60,0.28)]">
        {children}
      </div>
    </div>
  );
}
