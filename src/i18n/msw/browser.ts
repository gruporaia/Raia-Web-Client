import { setupWorker } from 'msw/browser';

import { debugError, debugLog } from '../../utils/debugControl';
import { handlers } from './handlers';

// Create the MSW worker
export const worker = setupWorker(...handlers);

// Initialize the MSW worker only in development
export async function initMswForI18n() {
  // Only initialize in development environment
  if (!import.meta.env.DEV) {
    debugLog('MSW is disabled in production');
    return false;
  }

  // Check if MSW should be disabled based on localStorage preference
  const useMSW = localStorage.getItem('useMSW');
  if (useMSW === 'false') {
    debugLog('MSW is disabled based on localStorage preference');
    return false;
  }

  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: { scope: '/' },
      },
    });
    debugLog('MSW initialized for i18n API mocking');
    return true;
  } catch (error) {
    debugError('Failed to start MSW for i18n:', error);
    return false;
  }
}

// Check if MSW is running
export const isMswRunning = () => {
  return Boolean(
    navigator.serviceWorker?.controller?.scriptURL?.includes(
      'mockServiceWorker.js'
    )
  );
};
