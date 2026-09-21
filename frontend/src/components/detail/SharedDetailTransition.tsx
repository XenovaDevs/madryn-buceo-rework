import { ViewTransition, type ReactNode } from "react";

export type DetailTransitionRole = "image" | "title" | "description";

const transitionClass: Record<DetailTransitionRole, string> = {
  image: "detail-image-morph",
  title: "detail-title-morph",
  description: "detail-description-morph",
};

function normalizeTransitionId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDetailTransitionName(id: string, role: DetailTransitionRole) {
  return `detail-${normalizeTransitionId(id)}-${role}`;
}

export function SharedDetailTransition({
  id,
  role,
  children,
  enabled = true,
}: {
  id?: string;
  role: DetailTransitionRole;
  children: ReactNode;
  enabled?: boolean;
}) {
  if (!id || !enabled) return children;

  return (
    <ViewTransition
      name={getDetailTransitionName(id, role)}
      share={transitionClass[role]}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

export function DetailEnterTransition({
  children,
  className = "detail-content-enter",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition enter={className} default="none">
      {children}
    </ViewTransition>
  );
}
