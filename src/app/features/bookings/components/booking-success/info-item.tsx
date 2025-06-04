import React from "react";

export function InfoItem({
  icon,
  label,
  children,
  primaryText,
  secondaryText,
}: {
  icon?: React.ComponentType<any>;
  label: string;
  children?: React.ReactNode;
  primaryText?: string | number;
  secondaryText?: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{label}</h3>
      {icon && primaryText && (
        <div className="flex items-center gap-2">
          {icon && React.createElement(icon, { className: "w-4 h-4 text-gray-500" })}
          <span>{primaryText}</span>
        </div>
      )}
      {primaryText && !icon && <p className="text-gray-600">{primaryText}</p>}
      {secondaryText && <p className="text-sm text-gray-500">{secondaryText}</p>}
      {children}
    </div>
  );
}
