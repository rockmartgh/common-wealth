import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  light: "btn-light",
};

function classes(variant: Variant, className?: string) {
  return ["btn", variants[variant], className].filter(Boolean).join(" ");
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? "primary";
  const classNames = classes(variant, props.className);

  if (props.href) {
    return (
      <Link href={props.href} className={classNames}>
        <span className="btn-label">{props.children}</span>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const { children, type = "button", variant: _v, className: _c, ...rest } =
    buttonProps;

  return (
    <button type={type} className={classNames} {...rest}>
      <span className="btn-label">{children}</span>
    </button>
  );
}
