export const GA_TRACKING_ID = "G-08JPE87VVY";

export const pageview = (url: string) => {
  (window as unknown as { gtag: Function }).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
