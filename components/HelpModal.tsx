'use client';

import { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

const FIRST_VISIT_KEY = 'overtime-help-modal-seen';

export function HelpModal() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenModal = localStorage.getItem(FIRST_VISIT_KEY);

    if (!hasSeenModal) {
      // Open modal on first visit
      setOpen(true);
      // Mark as seen
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          title={t('help')}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t('helpTitle')}</DialogTitle>
          <DialogDescription className="text-base">
            {t('helpDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Step 1 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">
              {t('helpStep1Title')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('helpStep1Content')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">
              {t('helpStep2Title')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('helpStep2Content')}
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">
              {t('helpStep3Title')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('helpStep3Content')}
            </p>
          </div>

          {/* Important sections with visual emphasis */}
          <div className="border-t pt-4 space-y-4">
            {/* Export Timing */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
              <h3 className="text-base font-semibold text-blue-900 dark:text-blue-100">
                {t('exportTimingTitle')}
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                {t('exportTimingContent')}
              </p>
            </div>

            {/* Description Importance */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-2">
              <h3 className="text-base font-semibold text-amber-900 dark:text-amber-100">
                {t('descriptionImportanceTitle')}
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                {t('descriptionImportanceContent')}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
