interface GTMEvent {
  event: string;
  page?: string;
  [key: string]: unknown;
}

type WindowWithDataLayer = Window & {
  dataLayer: GTMEvent[];
};

declare const window: WindowWithDataLayer;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM;

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  } else {
    // console.log({
    //   event: "pageview",
    //   page: url,
    // });
  }
};
