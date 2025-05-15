
import React, { ReactNode } from 'react';

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  icon?: ReactNode;
}

export function PageHeader({ heading, subheading, icon }: PageHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {icon && <div className="text-primary">{icon}</div>}
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
      </div>
      {subheading && (
        <p className="text-muted-foreground mt-1">{subheading}</p>
      )}
    </div>
  );
}
