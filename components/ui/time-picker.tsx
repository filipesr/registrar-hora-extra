'use client';

import * as React from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { cn } from '@/lib/utils';

export interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  required?: boolean;
  className?: string;
}

const CustomTimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value, onChange, id, required, className }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)}>
        <TimePicker
          onChange={(newValue) => onChange(newValue || '')}
          value={value || null}
          disableClock={false}
          clockIcon={null}
          clearIcon={null}
          format="HH:mm"
          hourPlaceholder="HH"
          minutePlaceholder="MM"
          required={required}
          className="w-full"
          inputClassName={cn(
            "!h-12 !text-base !px-3 !py-2 !border !border-input !rounded-md",
            "!bg-background !text-foreground",
            "focus:!outline-none focus:!ring-2 focus:!ring-ring focus:!ring-offset-2",
            "hover:!border-primary/50 !transition-colors",
            "!cursor-pointer"
          )}
        />
      </div>
    );
  }
);

CustomTimePicker.displayName = 'CustomTimePicker';

export { CustomTimePicker as TimePicker };
