import { companyDetails } from "./companyDetails";
import { internalRoutes } from "./internalRoutes";

export const footerMenuItems = {
  leftMenu: [
    { label: "About Evaga", path: internalRoutes.aboutUs },
    { label: "Careers", path: internalRoutes.careers },
    { label: "Press Releases", path: internalRoutes.pressReleases },
    { label: "Advertise with Us", path: internalRoutes.advertiseWithUs },
    { label: "Grievance Officer", path: internalRoutes.grievanceOfficer },
    { label: "Popular Searches", path: internalRoutes.popularSearches },
  ],
  midMenu: [
    { label: "Evaga Community", path: internalRoutes.evagaCommunity },
    { label: "Become a Vendor", path: internalRoutes.vendorSignup },
    { label: "Vendor Onboarding", path: internalRoutes.vendorLogin },
  ],
  rightMenu: [
    { label: "Cancellation Policy", path: internalRoutes.cancellationPolicy },
    { label: "Feedback Form", path: internalRoutes.feedbackForm },
  ],
};
